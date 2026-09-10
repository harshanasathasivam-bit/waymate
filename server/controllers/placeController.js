const Place = require('../models/Place');
const PlaceReport = require('../models/PlaceReport');
const SyncLog = require('../models/SyncLog');
const { isMongoConnected } = require('../config/mongodb');
const {
  DESTINATION_BOUNDS,
  fetchOverpassPlaces,
  fetchWikipediaEnrichment,
  deduplicatePlaces,
  calculateDistanceKm
} = require('../services/externalDiscoveryService');
const { enrichDiscoveredPlace } = require('../services/placeEnrichmentService');
const { rankPlacesByPreferences } = require('../services/personalizationService');

// Synchronization state lock
let isSyncInProgress = false;

// In-memory fallback repository when MongoDB is reconnecting
let fallbackPlaces = [];

/**
 * 1. GET /api/places
 * Discover and list tourism places for a destination
 */
async function getPlaces(req, res) {
  try {
    const {
      destination = 'Chennai',
      category,
      status,
      hiddenGemsOnly,
      search,
      budget,
      duration,
      companion,
      interests,
      maxDistance,
      includeUnreviewed = 'false'
    } = req.query;

    let placesList = [];

    if (isMongoConnected()) {
      const query = {
        destination: new RegExp(`^${destination}$`, 'i')
      };

      // Filter by category
      if (category && category !== 'All') {
        query.category = category;
      }

      // Hidden gem filter
      if (hiddenGemsOnly === 'true') {
        query.hiddenGemCandidate = true;
      }

      // Verification status filter:
      // By default public sees VERIFIED + NEEDS_REVIEW (or VERIFIED if strict)
      if (status) {
        query.verificationStatus = status;
      } else if (includeUnreviewed !== 'true') {
        query.verificationStatus = { $in: ['VERIFIED', 'NEEDS_REVIEW'] };
      }

      // Text search
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [{ name: regex }, { description: regex }, { address: regex }, { tags: regex }];
      }

      placesList = await Place.find(query).lean();
    } else {
      // Memory fallback
      placesList = fallbackPlaces.filter(p => {
        const matchesDest = p.destination.toLowerCase() === destination.toLowerCase();
        const matchesCat = !category || category === 'All' || p.category === category;
        const matchesGem = hiddenGemsOnly !== 'true' || p.hiddenGemCandidate;
        return matchesDest && matchesCat && matchesGem;
      });
    }

    // Apply personalization if preferences supplied
    const preferences = {};
    if (budget) preferences.budget = budget;
    if (duration) preferences.duration = duration;
    if (companion) preferences.companion = companion;
    if (interests) preferences.interests = interests.split(',');
    if (maxDistance) preferences.maxDistance = parseFloat(maxDistance);

    const bounds = DESTINATION_BOUNDS[destination.toLowerCase()] || DESTINATION_BOUNDS.chennai;
    const centerCoords = { lat: bounds.centerLat, lng: bounds.centerLng };

    const rankedPlaces = rankPlacesByPreferences(placesList, preferences, centerCoords);

    res.json({
      success: true,
      count: rankedPlaces.length,
      destination,
      places: rankedPlaces
    });
  } catch (err) {
    console.error('Error in getPlaces:', err);
    res.status(500).json({ success: false, message: 'Error retrieving tourism places', error: err.message });
  }
}

/**
 * 2. GET /api/places/:id
 * Retrieve details for a single place with computed nearby attractions
 */
async function getPlaceById(req, res) {
  try {
    const { id } = req.params;
    let place = null;

    if (isMongoConnected()) {
      place = await Place.findById(id).lean();
    } else {
      place = fallbackPlaces.find(p => p._id === id || p.id === id);
    }

    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    // Dynamically calculate top 4 nearby attractions
    let nearby = [];
    if (isMongoConnected()) {
      const allOther = await Place.find({
        _id: { $ne: place._id },
        destination: place.destination
      }).lean();

      nearby = allOther
        .map(other => ({
          placeId: other._id,
          name: other.name,
          category: other.category,
          distanceKm: parseFloat(
            calculateDistanceKm(place.latitude, place.longitude, other.latitude, other.longitude).toFixed(2)
          ),
          image: other.images?.[0]?.url || ''
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 4);
    }

    place.computedNearby = nearby;

    res.json({ success: true, place });
  } catch (err) {
    console.error('Error in getPlaceById:', err);
    res.status(500).json({ success: false, message: 'Error fetching place details', error: err.message });
  }
}

/**
 * 3. GET /api/places/:id/nearby
 * Geospatial nearby search around a place
 */
async function getNearbyPlaces(req, res) {
  try {
    const { id } = req.params;
    const radiusMeters = parseInt(req.query.radius) || 10000; // default 10km

    let targetPlace = null;
    if (isMongoConnected()) {
      targetPlace = await Place.findById(id);
    } else {
      targetPlace = fallbackPlaces.find(p => p._id === id || p.id === id);
    }

    if (!targetPlace) {
      return res.status(404).json({ success: false, message: 'Reference place not found' });
    }

    let nearbyList = [];

    if (isMongoConnected()) {
      nearbyList = await Place.find({
        _id: { $ne: targetPlace._id },
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [targetPlace.longitude, targetPlace.latitude]
            },
            $maxDistance: radiusMeters
          }
        }
      }).lean();
    } else {
      nearbyList = fallbackPlaces
        .filter(p => (p._id || p.id) !== id)
        .map(p => ({
          ...p,
          distanceKm: calculateDistanceKm(
            targetPlace.latitude,
            targetPlace.longitude,
            p.latitude,
            p.longitude
          )
        }))
        .filter(p => p.distanceKm * 1000 <= radiusMeters)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    }

    res.json({
      success: true,
      referencePlace: targetPlace.name,
      radiusMeters,
      count: nearbyList.length,
      places: nearbyList
    });
  } catch (err) {
    console.error('Error in getNearbyPlaces:', err);
    res.status(500).json({ success: false, message: 'Error fetching nearby places', error: err.message });
  }
}

/**
 * 4. POST /api/places/sync
 * Dynamic synchronization from OpenStreetMap Overpass API and Wikimedia
 */
async function syncDestination(req, res) {
  if (isSyncInProgress) {
    return res.status(429).json({
      success: false,
      message: 'A synchronization operation is already in progress. Please wait for it to finish.'
    });
  }

  isSyncInProgress = true;
  const startTime = Date.now();
  const destination = req.body.destination || 'Chennai';

  let syncLog = null;
  if (isMongoConnected()) {
    syncLog = new SyncLog({
      destination,
      status: 'STARTED',
      triggeredBy: req.body.triggeredBy || 'Admin'
    });
    await syncLog.save();
  }

  try {
    console.log(`🔄 Starting dynamic place sync for ${destination}...`);

    // 1. Fetch raw geo entities from OpenStreetMap
    const osmElements = await fetchOverpassPlaces(destination.toLowerCase());

    if (!osmElements || osmElements.length === 0) {
      throw new Error('No elements discovered from external source or service temporarily unreachable');
    }

    // 2. Deduplicate raw OSM entities
    const rawPlaces = osmElements.map(el => ({
      name: el.tags.name || el.tags['name:en'] || 'Unnamed Point',
      latitude: el.lat,
      longitude: el.lon,
      raw: el
    }));
    const uniqueRaw = deduplicatePlaces(rawPlaces);

    console.log(`🧹 Deduplicated ${osmElements.length} items down to ${uniqueRaw.length} unique candidates`);

    let newlyAdded = 0;
    let updatedCount = 0;

    // 3. Process top 25 candidates with Wikipedia enrichment and AI categorization
    const candidatesToEnrich = uniqueRaw.slice(0, 25);

    for (const item of candidatesToEnrich) {
      try {
        const wikiData = await fetchWikipediaEnrichment(item.name, item.latitude, item.longitude);
        const enriched = enrichDiscoveredPlace({
          osmElement: item.raw,
          wikiData,
          destination
        });

        if (isMongoConnected()) {
          // Check if place already exists in MongoDB
          const existing = await Place.findOne({
            destination: new RegExp(`^${destination}$`, 'i'),
            $or: [
              { externalId: enriched.externalId },
              { name: new RegExp(`^${enriched.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
            ]
          });

          if (existing) {
            // Do NOT overwrite verified information with unverified AI data
            if (existing.verificationStatus !== 'VERIFIED') {
              existing.description = enriched.description !== 'Not available' ? enriched.description : existing.description;
              existing.dataConfidenceScore = Math.max(existing.dataConfidenceScore, enriched.dataConfidenceScore);
              existing.lastVerifiedAt = new Date();
              if (enriched.images?.length > 0 && (!existing.images || existing.images.length === 0)) {
                existing.images = enriched.images;
              }
              await existing.save();
              updatedCount++;
            }
          } else {
            // Mark newly discovered place as NEEDS_REVIEW
            enriched.verificationStatus = 'NEEDS_REVIEW';
            await Place.create(enriched);
            newlyAdded++;
          }
        } else {
          // Memory store fallback
          fallbackPlaces.push({
            ...enriched,
            _id: `place_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
          });
          newlyAdded++;
        }
      } catch (itemErr) {
        console.warn(`Error processing item ${item.name}:`, itemErr.message);
      }
    }

    const durationMs = Date.now() - startTime;

    if (syncLog && isMongoConnected()) {
      syncLog.status = 'COMPLETED';
      syncLog.discoveredCount = uniqueRaw.length;
      syncLog.newlyAddedCount = newlyAdded;
      syncLog.updatedCount = updatedCount;
      syncLog.durationMs = durationMs;
      await syncLog.save();
    }

    console.log(`✅ Sync completed: +${newlyAdded} new, ~${updatedCount} updated in ${durationMs}ms`);

    res.json({
      success: true,
      message: `Successfully synchronized tourism places for ${destination}`,
      summary: {
        destination,
        discovered: uniqueRaw.length,
        newlyAdded,
        updated: updatedCount,
        durationMs
      }
    });
  } catch (err) {
    console.error('Sync failed:', err);
    if (syncLog && isMongoConnected()) {
      syncLog.status = 'FAILED';
      syncLog.errorLogs.push({ message: err.message, details: err.stack });
      await syncLog.save();
    }
    res.status(500).json({ success: false, message: 'Place synchronization failed', error: err.message });
  } finally {
    isSyncInProgress = false;
  }
}

/**
 * 5. POST /api/places/:id/report
 * Traveler crowdsourced report for outdated/incorrect info
 */
async function reportPlace(req, res) {
  try {
    const { id } = req.params;
    const { issueType, description, suggestedCorrection, reportedBy, reporterContact } = req.body;

    if (!issueType || !description) {
      return res.status(400).json({ success: false, message: 'issueType and description are required' });
    }

    let place = null;
    if (isMongoConnected()) {
      place = await Place.findById(id);
      if (!place) {
        return res.status(404).json({ success: false, message: 'Place not found' });
      }

      const report = new PlaceReport({
        placeId: place._id,
        placeName: place.name,
        issueType,
        description,
        suggestedCorrection: suggestedCorrection || '',
        reportedBy: reportedBy || 'Anonymous Traveler',
        reporterContact: reporterContact || '',
        status: 'PENDING'
      });
      await report.save();

      // Flag place as USER_REPORTED
      place.verificationStatus = 'USER_REPORTED';
      await place.save();

      res.status(201).json({
        success: true,
        message: 'Thank you for reporting! Our moderation team will review the details.',
        reportId: report._id
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Report received and registered in memory queue.'
      });
    }
  } catch (err) {
    console.error('Error reporting place:', err);
    res.status(500).json({ success: false, message: 'Error submitting report', error: err.message });
  }
}

/**
 * 6. GET /api/places/admin/review-queue
 * Admin view: Newly discovered places pending review
 */
async function getAdminReviewQueue(req, res) {
  try {
    if (!isMongoConnected()) {
      return res.json({ success: true, count: fallbackPlaces.length, places: fallbackPlaces });
    }

    const pending = await Place.find({
      verificationStatus: { $in: ['NEEDS_REVIEW', 'USER_REPORTED'] }
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: pending.length,
      places: pending
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching review queue', error: err.message });
  }
}

/**
 * 7. PUT /api/places/admin/:id/verify
 * Admin action: Approve, reject, or edit place and verify hidden gem
 */
async function verifyPlace(req, res) {
  try {
    const { id } = req.params;
    const {
      verificationStatus, // 'VERIFIED' | 'NEEDS_REVIEW' | 'UNVERIFIED'
      hiddenGemVerified,
      category,
      description,
      openingHours,
      entryFee,
      adminNotes
    } = req.body;

    if (!isMongoConnected()) {
      return res.json({ success: true, message: 'Verified in memory mode' });
    }

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    if (verificationStatus) place.verificationStatus = verificationStatus;
    if (typeof hiddenGemVerified === 'boolean') {
      place.hiddenGemVerified = hiddenGemVerified;
      if (hiddenGemVerified) place.hiddenGemCandidate = true;
    }
    if (category) place.category = category;
    if (description) place.description = description;
    if (openingHours) place.openingHours = openingHours;
    if (entryFee) place.entryFee = entryFee;
    if (adminNotes !== undefined) place.adminNotes = adminNotes;

    place.lastVerifiedAt = new Date();
    await place.save();

    res.json({
      success: true,
      message: 'Place status updated successfully',
      place
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error verifying place', error: err.message });
  }
}

/**
 * 8. GET /api/places/admin/reports
 * Admin view: List all crowdsourced issue reports
 */
async function getAdminReports(req, res) {
  try {
    if (!isMongoConnected()) {
      return res.json({ success: true, count: 0, reports: [] });
    }

    const reports = await PlaceReport.find()
      .populate('placeId', 'name category verificationStatus address')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, count: reports.length, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching reports', error: err.message });
  }
}

/**
 * 9. PUT /api/places/admin/reports/:reportId/resolve
 * Resolve or dismiss a user report
 */
async function resolveReport(req, res) {
  try {
    const { reportId } = req.params;
    const { status, adminActionNotes } = req.body;

    if (!isMongoConnected()) {
      return res.json({ success: true, message: 'Report resolved in memory mode' });
    }

    const report = await PlaceReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.status = status || 'RESOLVED';
    report.adminActionNotes = adminActionNotes || '';
    report.resolvedAt = new Date();
    await report.save();

    // If no more pending reports for this place, return place to VERIFIED
    const remainingReports = await PlaceReport.countDocuments({
      placeId: report.placeId,
      status: 'PENDING'
    });

    if (remainingReports === 0) {
      await Place.findByIdAndUpdate(report.placeId, { verificationStatus: 'VERIFIED' });
    }

    res.json({ success: true, message: 'Report status updated', report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error resolving report', error: err.message });
  }
}

module.exports = {
  getPlaces,
  getPlaceById,
  getNearbyPlaces,
  syncDestination,
  reportPlace,
  getAdminReviewQueue,
  verifyPlace,
  getAdminReports,
  resolveReport,
  setFallbackPlaces: (places) => { fallbackPlaces = places; },
  getFallbackPlaces: () => fallbackPlaces
};

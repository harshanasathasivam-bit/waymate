/**
 * External Discovery Service for WayMate
 * Discovers real tourist places dynamically via:
 * 1. OpenStreetMap (Overpass API)
 * 2. Wikipedia / Wikimedia API (Factual extracts, official URLs, and Creative Commons images)
 * 
 * Strict Rule: Never scrape aggressively. Never hallucinate facts or coordinates.
 */

// In-memory cache to respect API rate limits and avoid repeated queries
const discoveryCache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Bounding box and search settings for pilot destinations
const DESTINATION_BOUNDS = {
  chennai: {
    name: 'Chennai',
    state: 'Tamil Nadu',
    south: 12.85,
    west: 80.10,
    north: 13.25,
    east: 80.35,
    centerLat: 13.0827,
    centerLng: 80.2707,
    radiusMeters: 25000
  }
};

/**
 * Calculate distance between two coordinates in kilometers (Haversine formula)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Clean and normalize place name for deduplication
 */
function normalizeName(name = '') {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\b(temple|church|mosque|beach|park|museum|monument|fort|memorial|chennai)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Query OpenStreetMap Overpass API for real geo entities in destination
 */
async function fetchOverpassPlaces(destinationKey = 'chennai') {
  const bounds = DESTINATION_BOUNDS[destinationKey.toLowerCase()] || DESTINATION_BOUNDS.chennai;
  const cacheKey = `osm_${bounds.name.toLowerCase()}`;

  const cached = discoveryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`⚡ Using cached Overpass data for ${bounds.name}`);
    return cached.data;
  }

  // Construct Overpass QL Query with fast bounding box and 12s timeout
  const overpassQuery = `
    [out:json][timeout:12];
    (
      node["tourism"~"attraction|museum|viewpoint|zoo|theme_park"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["historic"~"monument|memorial|castle|fort|ruins"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["natural"="beach"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["leisure"="park"]["name"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out body 35;
  `;

  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
  ];

  let rawData = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`🌐 Querying Overpass API via ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'WayMate-Tourism-Discovery/1.0 (info@waymate.travel)'
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
        signal: AbortSignal.timeout(8000)
      });

      if (response.ok) {
        rawData = await response.json();
        break;
      } else {
        console.warn(`⚠️ Overpass endpoint ${endpoint} returned status ${response.status}`);
      }
    } catch (err) {
      console.warn(`⚠️ Overpass endpoint ${endpoint} failed: ${err.message}`);
    }
  }

  if (!rawData || !rawData.elements || rawData.elements.length === 0) {
    console.warn('⚠️ Overpass public server busy. Utilizing Wikimedia GeoSearch as high-speed verified fallback...');
    try {
      const wikiGeoUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${bounds.centerLat}|${bounds.centerLng}&gsradius=15000&gslimit=30&format=json&origin=*`;
      const wikiRes = await fetch(wikiGeoUrl, {
        headers: { 'User-Agent': 'WayMate-Tourism-Discovery/1.0' },
        signal: AbortSignal.timeout(8000)
      });
      if (wikiRes.ok) {
        const wikiGeoData = await wikiRes.json();
        const items = wikiGeoData.query?.geosearch || [];
        const converted = items.map(it => ({
          id: it.pageid,
          lat: it.lat,
          lon: it.lon,
          tags: {
            name: it.title,
            tourism: 'attraction'
          }
        }));
        console.log(`📍 Discovered ${converted.length} verified places from Wikimedia GeoSearch`);
        discoveryCache.set(cacheKey, { timestamp: Date.now(), data: converted });
        return converted;
      }
    } catch (wikiErr) {
      console.warn('Wikimedia GeoSearch fallback notice:', wikiErr.message);
    }
    return [];
  }

  // Filter elements that have a valid name and coordinates
  const validElements = rawData.elements.filter(
    el => el.tags && el.tags.name && el.lat && el.lon
  );

  console.log(`📍 Discovered ${validElements.length} named geo-entities from OpenStreetMap`);

  discoveryCache.set(cacheKey, { timestamp: Date.now(), data: validElements });
  return validElements;
}

/**
 * Fetch verified Wikipedia information and legal Wikimedia Commons image
 */
async function fetchWikipediaEnrichment(titleOrQuery, lat, lon) {
  try {
    // 1. Try finding nearest Wikipedia article within 800m if coordinates provided
    let articleTitle = titleOrQuery;

    if (lat && lon) {
      const geoUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lon}&gsradius=1000&gslimit=1&format=json&origin=*`;
      const geoRes = await fetch(geoUrl, {
        headers: { 'User-Agent': 'WayMate-Tourism-Discovery/1.0' },
        signal: AbortSignal.timeout(6000)
      });
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        const nearby = geoData.query?.geosearch?.[0];
        if (nearby?.title) {
          articleTitle = nearby.title;
        }
      }
    }

    // 2. Fetch extract, thumbnail, and official URL for the article
    const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=1000&titles=${encodeURIComponent(articleTitle)}&format=json&origin=*`;
    
    const detailsRes = await fetch(detailsUrl, {
      headers: { 'User-Agent': 'WayMate-Tourism-Discovery/1.0' },
      signal: AbortSignal.timeout(7000)
    });

    if (!detailsRes.ok) return null;

    const detailsData = await detailsRes.json();
    const pages = detailsData.query?.pages;
    if (!pages) return null;

    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;

    const page = pages[pageId];

    return {
      title: page.title,
      extract: page.extract ? page.extract.split('\n')[0] : null,
      fullUrl: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
      thumbnail: page.thumbnail?.source || null
    };
  } catch (err) {
    // Graceful fallback on timeout/network issue
    return null;
  }
}

/**
 * Deduplicate places based on name similarity and geospatial proximity (< 150m)
 */
function deduplicatePlaces(rawPlaces = []) {
  const unique = [];

  for (const place of rawPlaces) {
    const norm = normalizeName(place.name);

    const isDuplicate = unique.some(existing => {
      const existingNorm = normalizeName(existing.name);
      const distKm = calculateDistanceKm(
        place.latitude,
        place.longitude,
        existing.latitude,
        existing.longitude
      );

      // Same or almost identical name within 3km, OR any place within 150 meters
      const isNameMatch = norm && existingNorm && (norm.includes(existingNorm) || existingNorm.includes(norm));
      const isCloseProximity = distKm < 0.15; // 150m

      return (isNameMatch && distKm < 3.0) || isCloseProximity;
    });

    if (!isDuplicate) {
      unique.push(place);
    }
  }

  return unique;
}

module.exports = {
  DESTINATION_BOUNDS,
  fetchOverpassPlaces,
  fetchWikipediaEnrichment,
  deduplicatePlaces,
  calculateDistanceKm
};

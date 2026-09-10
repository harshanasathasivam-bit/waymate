/**
 * Personalization & Recommendation Ranking Service
 * Ranks discovered places according to user preferences:
 * - budget (free, budget, moderate, luxury)
 * - travel duration (short <1h, half-day, full-day)
 * - companions (family, solo, friends)
 * - interests / themes (nature, history, religion, food, adventure, photography)
 * - preferred distance (km from destination center or current location)
 */

const { calculateDistanceKm } = require('./externalDiscoveryService');

/**
 * Score a place against user preference criteria (0 to 100)
 */
function computePreferenceScore(place, preferences = {}, centerCoords = null) {
  let score = 50; // base score

  // 1. Confidence baseline
  score += (place.dataConfidenceScore || 50) * 0.2;

  // 2. Budget match
  if (preferences.budget) {
    const prefBudget = preferences.budget.toLowerCase();
    const placeBudget = (place.suitability?.budgetTier || 'Budget').toLowerCase();
    const isFree = (place.entryFee || '').toLowerCase().includes('free');

    if (prefBudget === 'free' && isFree) {
      score += 20;
    } else if (prefBudget === placeBudget) {
      score += 15;
    }
  }

  // 3. Companionship suitability
  if (preferences.companion) {
    const comp = preferences.companion.toLowerCase();
    if (comp === 'family' && place.suitability?.family) score += 15;
    if (comp === 'solo' && place.suitability?.solo) score += 15;
    if (comp === 'friends' && place.suitability?.friends) score += 15;
  }

  // 4. Interest & Theme match
  if (Array.isArray(preferences.interests) && preferences.interests.length > 0) {
    const placeCategory = (place.category || '').toLowerCase();
    const placeThemes = (place.suitability?.themes || []).map(t => t.toLowerCase());

    const hasMatch = preferences.interests.some(interest => {
      const i = interest.toLowerCase();
      return (
        placeCategory.includes(i) ||
        placeThemes.includes(i) ||
        (place.tags || []).some(t => t.toLowerCase().includes(i))
      );
    });

    if (hasMatch) score += 25;
  }

  // 5. Travel Duration match
  if (preferences.duration) {
    const est = (place.estimatedVisitDuration || '').toLowerCase();
    if (preferences.duration === 'short' && (est.includes('1') || est.includes('30 min'))) {
      score += 10;
    } else if (preferences.duration === 'half_day' && (est.includes('2') || est.includes('3'))) {
      score += 10;
    } else if (preferences.duration === 'full_day' && est.includes('full')) {
      score += 10;
    }
  }

  // 6. Proximity penalty if maxDistance specified
  if (preferences.maxDistance && centerCoords && place.latitude && place.longitude) {
    const dist = calculateDistanceKm(
      centerCoords.lat,
      centerCoords.lng,
      place.latitude,
      place.longitude
    );
    if (dist <= preferences.maxDistance) {
      score += 10;
    } else {
      score -= Math.min(30, (dist - preferences.maxDistance) * 2);
    }
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Rank a list of places based on personalization preferences
 */
function rankPlacesByPreferences(places = [], preferences = {}, centerCoords = null) {
  if (!preferences || Object.keys(preferences).length === 0) {
    // Default sorting: Verified first, then confidence score descending
    return [...places].sort((a, b) => {
      if (a.verificationStatus === 'VERIFIED' && b.verificationStatus !== 'VERIFIED') return -1;
      if (b.verificationStatus === 'VERIFIED' && a.verificationStatus !== 'VERIFIED') return 1;
      return (b.dataConfidenceScore || 0) - (a.dataConfidenceScore || 0);
    });
  }

  return [...places]
    .map(p => ({
      ...p,
      matchScore: computePreferenceScore(p, preferences, centerCoords)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  computePreferenceScore,
  rankPlacesByPreferences
};

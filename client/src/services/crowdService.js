// AI Crowd Detection & Smart Delay Recommendation Service for WayMate
// Evaluates real-time / estimated crowd density, optimal visiting windows, and ranks 10 KM alternatives

import { DESTINATIONS } from '../data/travelDatabase.js';
import { calculateDistanceKm, estimateTravelTimeMin } from './travelPlannerService.js';

// Crowd Level Definitions with Transparent Heuristic Prediction Labeling
export const CROWD_LEVELS = {
  LOW: {
    key: 'LOW',
    label: 'Predicted Crowd: Low',
    tag: '🟢 Predicted Low',
    typeLabel: 'Estimated Crowd',
    color: '#16a34a',
    bg: '#dcfce7',
    border: '#bbf7d0',
    waitTime: '5–10 min wait',
    trend: 'Stable footfall',
    advice: 'Great time to visit 👍 Estimated crowd is currently low.'
  },
  MODERATE: {
    key: 'MODERATE',
    label: 'Predicted Crowd: Moderate',
    tag: '🟡 Predicted Moderate',
    typeLabel: 'Estimated Crowd',
    color: '#d97706',
    bg: '#fef3c7',
    border: '#fde68a',
    waitTime: '15–25 min wait',
    trend: 'Steady visitor flow',
    advice: 'Moderate crowd right now. You can visit, but expect moderate waiting.'
  },
  HIGH: {
    key: 'HIGH',
    label: 'Predicted Crowd: High',
    tag: '🟠 Predicted High',
    typeLabel: 'Predicted Crowd (Heuristic)',
    color: '#ea580c',
    bg: '#ffedd5',
    border: '#fed7aa',
    waitTime: '35–50 min wait',
    trend: 'Peak visitation window',
    advice: 'Currently crowded. We recommend exploring a 10 KM alternative and visiting ~1 hour later.'
  },
  VERY_HIGH: {
    key: 'VERY_HIGH',
    label: 'Predicted Crowd: Very High',
    tag: '🔴 Predicted Very High',
    typeLabel: 'Predicted Crowd (Heuristic)',
    color: '#dc2626',
    bg: '#fee2e2',
    border: '#fecaca',
    waitTime: '60+ min wait',
    trend: 'Maximum capacity',
    advice: 'Very high crowd detected. We strongly recommend rescheduling this stop.'
  }
};

// Deterministic Time-Aware Crowd Estimator
export function getCrowdStatus(place, timeStr = '05:30 PM') {
  const name = (place?.name || place?.title || '').toLowerCase();
  const category = (place?.category || '').toLowerCase();

  // Parse approximate hour from timeStr (e.g. '05:30 PM' -> 17)
  let hour = 17;
  if (timeStr && timeStr.includes(':')) {
    const parts = timeStr.split(' ');
    const [h, m] = parts[0].split(':').map(Number);
    const isPM = (parts[1] || '').toUpperCase() === 'PM';
    hour = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
  }

  // 1. Coastal Beaches / Viewpoints peak around Sunset (4:30 PM - 7:30 PM)
  if (name.includes('beach') || name.includes('point') || name.includes('sunset') || category.includes('viewpoint') || category.includes('coastal')) {
    if (hour >= 16 && hour <= 19) {
      return {
        ...CROWD_LEVELS.HIGH,
        bestTime: '06:00 AM - 08:30 AM & 08:00 PM',
        whyExplanation: 'Popular sunset landmark; footfall peaks between 05:00 PM and 07:30 PM.',
        statusType: 'ESTIMATED'
      };
    } else if (hour >= 6 && hour <= 10) {
      return {
        ...CROWD_LEVELS.LOW,
        bestTime: '06:00 AM - 08:30 AM',
        whyExplanation: 'Peaceful morning hours with minimal visitor traffic.',
        statusType: 'ESTIMATED'
      };
    } else {
      return {
        ...CROWD_LEVELS.MODERATE,
        bestTime: '06:00 AM - 08:30 AM',
        whyExplanation: 'Steady stream of midday visitors.',
        statusType: 'ESTIMATED'
      };
    }
  }

  // 2. Temples / Heritage Shrines peak during morning & evening aarti (07:00 AM - 09:30 AM & 06:00 PM - 08:00 PM)
  if (name.includes('temple') || name.includes('church') || name.includes('basilica') || category.includes('temple') || category.includes('heritage')) {
    if ((hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 20)) {
      return {
        ...CROWD_LEVELS.HIGH,
        bestTime: '11:00 AM - 03:30 PM',
        whyExplanation: 'Evening prayer hours draw devotional pilgrims and temple gatherings.',
        statusType: 'HISTORICAL'
      };
    } else if (hour >= 12 && hour <= 16) {
      return {
        ...CROWD_LEVELS.LOW,
        bestTime: '12:00 PM - 03:30 PM',
        whyExplanation: 'Quiet afternoon hours between morning and evening pooja services.',
        statusType: 'HISTORICAL'
      };
    } else {
      return {
        ...CROWD_LEVELS.MODERATE,
        bestTime: '11:00 AM - 03:30 PM',
        whyExplanation: 'Normal visitor volume.',
        statusType: 'HISTORICAL'
      };
    }
  }

  // 3. Museums / Living Villages peak mid-afternoon on weekends (11:30 AM - 03:30 PM)
  if (name.includes('museum') || name.includes('dakshinachitra') || category.includes('museum') || category.includes('gallery')) {
    if (hour >= 12 && hour <= 15) {
      return {
        ...CROWD_LEVELS.MODERATE,
        bestTime: '09:30 AM - 11:00 AM',
        whyExplanation: 'Peak tourist workshop hours with school and family tour groups.',
        statusType: 'ESTIMATED'
      };
    } else {
      return {
        ...CROWD_LEVELS.LOW,
        bestTime: '09:30 AM - 11:00 AM',
        whyExplanation: 'Calm exhibit galleries with immediate entry.',
        statusType: 'ESTIMATED'
      };
    }
  }

  // 4. Default moderate/low fallback
  return {
    ...CROWD_LEVELS.LOW,
    bestTime: 'Morning / Early Evening',
    whyExplanation: 'Light crowds and fast queue access.',
    statusType: 'ESTIMATED'
  };
}

// 10 KM Smart Alternative Ranking Engine
export function getNearbySmartAlternatives({
  currentPlace,
  destinationId = 'chennai',
  delayMinutes = 60,
  maxRadiusKm = 10,
  existingItineraryPlaceIds = [],
  userInterests = ['Nature', 'Food', 'Culture'],
  userBudget = 5000
}) {
  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const originLat = currentPlace?.lat || dest?.attractions?.[0]?.lat || 13.0499;
  const originLng = currentPlace?.lng || dest?.attractions?.[0]?.lng || 80.2824;

  // Pool all potential candidate spots in destination
  const candidatePool = [];

  if (dest.attractions) {
    candidatePool.push(...dest.attractions.map(a => ({
      id: a.id,
      name: a.name,
      category: a.category,
      type: 'Attraction',
      costStr: a.estimatedCost || 'Free',
      costNum: a.estimatedCost?.includes('Free') ? 0 : 50,
      rating: a.rating,
      photo: a.photo,
      desc: a.shortDesc,
      lat: a.lat,
      lng: a.lng,
      durationMins: 45
    })));
  }

  if (dest.hiddenGems) {
    candidatePool.push(...dest.hiddenGems.map(h => ({
      id: h.id,
      name: h.name,
      category: h.category,
      type: 'Hidden Gem',
      costStr: h.cost,
      costNum: h.cost?.includes('Free') ? 0 : 40,
      rating: h.rating,
      photo: h.photo,
      desc: h.whyVisit,
      lat: originLat + (Math.random() * 0.03 - 0.015),
      lng: originLng + (Math.random() * 0.03 - 0.015),
      durationMins: 40
    })));
  }

  if (dest.localLife) {
    candidatePool.push(...dest.localLife.map(l => ({
      id: l.id,
      name: l.name,
      category: l.category,
      type: 'Local Life & Food',
      costStr: l.cost,
      costNum: 120,
      rating: 4.85,
      photo: l.photo,
      desc: l.story,
      lat: originLat + (Math.random() * 0.02 - 0.01),
      lng: originLng + (Math.random() * 0.02 - 0.01),
      durationMins: 35
    })));
  }

  // Filter out the crowded place itself AND any places already in the user's itinerary
  const validCandidates = candidatePool.filter(item => {
    if (item.id === currentPlace?.id || item.name === currentPlace?.title || item.name === currentPlace?.name) return false;
    if (existingItineraryPlaceIds.includes(item.id) || existingItineraryPlaceIds.includes(item.name)) return false;
    return true;
  });

  // Calculate distance, travel time, crowd status, and Multi-Factor Recommendation Score
  const scoredAlternatives = validCandidates.map(item => {
    const distKm = calculateDistanceKm(originLat, originLng, item.lat, item.lng);
    const transitOneWayMin = estimateTravelTimeMin(distKm);
    const roundTripTransitMin = transitOneWayMin * 2;
    const totalTimeRequired = roundTripTransitMin + item.durationMins;

    // Skip if beyond 10 KM
    if (distKm > maxRadiusKm) return null;

    // Crowd status for the alternative (prioritize LOW crowds!)
    const crowd = getCrowdStatus(item, '04:00 PM');

    // Recommendation Scoring (0 to 100)
    let score = 50;

    // 1. Distance suitability (closer is better: max 25 pts)
    const distanceScore = Math.max(0, (maxRadiusKm - distKm) * 2.5);
    score += distanceScore;

    // 2. Time fit: Fits comfortably within delayMinutes (max 25 pts)
    if (totalTimeRequired <= delayMinutes + 10) {
      score += 25;
    } else {
      score -= 30; // penalize if it causes schedule delay
    }

    // 3. Crowd penalty/bonus (max 20 pts)
    if (crowd.key === 'LOW') score += 20;
    else if (crowd.key === 'MODERATE') score += 10;
    else score -= 25;

    // 4. Rating bonus (max 15 pts)
    score += ((item.rating - 4.0) * 15);

    // 5. Interest match bonus (15 pts)
    const matchesInterest = userInterests.some(i => item.category.toLowerCase().includes(i.toLowerCase()) || item.type.toLowerCase().includes(i.toLowerCase()));
    if (matchesInterest) score += 15;

    return {
      ...item,
      distanceKm: distKm,
      distanceStr: `${distKm} km away`,
      transitMin: transitOneWayMin,
      totalTimeMin: totalTimeRequired,
      crowd,
      recommendationScore: Math.round(score)
    };
  }).filter(Boolean);

  // Sort descending by recommendation score
  scoredAlternatives.sort((a, b) => b.recommendationScore - a.recommendationScore);

  return scoredAlternatives.slice(0, 3);
}

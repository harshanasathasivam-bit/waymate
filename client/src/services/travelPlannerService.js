// Intelligent Travel Planner Engine for WayMate
// Handles dynamic Tamil Nadu multi-factor ranking, geographic grouping, temporal scheduling, and budget balancing

import { DESTINATIONS } from '../data/travelDatabase.js';

// Comprehensive Destination Travel Character & Category Profiles
export const DESTINATION_PROFILES = {
  chennai: {
    categories: ['coastal', 'heritage', 'food', 'culture', 'photography', 'shopping'],
    tags: ['beach', 'marina', 'kapaleeshwarar', 'temple', 'museum', 'street food', 'seafood', 'colonial'],
    avgBudgetPerDay: 1500,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 88, natureScore: 72, cultureScore: 98, adventureScore: 50, familyScore: 92, accessibilityScore: 98, ecoScore: 80 }
  },
  ooty: {
    categories: ['hills', 'nature', 'photography', 'adventure', 'culture', 'family'],
    tags: ['botanical garden', 'tea estates', 'lake', 'toy train', 'pine forest', 'doddabetta', 'mist', 'viewpoint'],
    avgBudgetPerDay: 2200,
    idealDurationDays: [3, 4, 5],
    idealDays: '3-5 Days',
    scores: { budgetScore: 82, natureScore: 98, cultureScore: 80, adventureScore: 85, familyScore: 94, accessibilityScore: 88, ecoScore: 94 }
  },
  madurai: {
    categories: ['temples', 'heritage', 'food', 'culture', 'photography', 'spiritual', 'family'],
    tags: ['meenakshi temple', 'jigarthanda', 'nayakkar palace', 'tiffin', 'night market', 'bazaar', 'dravidian'],
    avgBudgetPerDay: 1200,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 95, natureScore: 65, cultureScore: 99, adventureScore: 45, familyScore: 96, accessibilityScore: 95, ecoScore: 82 }
  },
  kodaikanal: {
    categories: ['hills', 'nature', 'photography', 'adventure', 'culture', 'couple'],
    tags: ['kodai lake', 'pillar rocks', 'coakers walk', 'mist', 'pine forest', 'waterfalls', 'boating', 'valley'],
    avgBudgetPerDay: 2100,
    idealDurationDays: [3, 4, 5],
    idealDays: '3-5 Days',
    scores: { budgetScore: 84, natureScore: 97, cultureScore: 75, adventureScore: 88, familyScore: 92, accessibilityScore: 85, ecoScore: 95 }
  },
  kanyakumari: {
    categories: ['coastal', 'nature', 'photography', 'spiritual', 'culture', 'heritage'],
    tags: ['sunset', 'sunrise', 'vivekananda rock', 'thiruvalluvar statue', 'triveni sangam', 'ocean', 'beach'],
    avgBudgetPerDay: 1400,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 92, natureScore: 92, cultureScore: 94, adventureScore: 55, familyScore: 94, accessibilityScore: 90, ecoScore: 88 }
  },
  thanjavur: {
    categories: ['temples', 'heritage', 'culture', 'photography', 'food', 'spiritual'],
    tags: ['brihadeeswarar', 'big temple', 'royal palace', 'bronze art', 'chola architecture', 'unesco'],
    avgBudgetPerDay: 1200,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 95, natureScore: 68, cultureScore: 99, adventureScore: 40, familyScore: 95, accessibilityScore: 92, ecoScore: 84 }
  },
  rameswaram: {
    categories: ['coastal', 'temples', 'spiritual', 'heritage', 'photography', 'nature'],
    tags: ['ramanathaswamy temple', 'pamban bridge', 'dhanushkodi ghost town', 'sea', 'ocean', 'agnitheertham'],
    avgBudgetPerDay: 1350,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 92, natureScore: 85, cultureScore: 97, adventureScore: 60, familyScore: 93, accessibilityScore: 88, ecoScore: 86 }
  },
  coimbatore: {
    categories: ['nature', 'hills', 'food', 'culture', 'temples', 'photography'],
    tags: ['siruvani', 'marudhamalai', 'adiyogi', 'valparai foothills', 'annapoorna tiffin', 'textile'],
    avgBudgetPerDay: 1400,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 92, natureScore: 88, cultureScore: 88, adventureScore: 68, familyScore: 90, accessibilityScore: 95, ecoScore: 86 }
  },
  tiruchirappalli: {
    categories: ['temples', 'heritage', 'food', 'culture', 'spiritual', 'photography'],
    tags: ['rockfort temple', 'srirangam ranganathaswamy', 'kallanai grand anicut', 'cauvery river', 'bazaar'],
    avgBudgetPerDay: 1150,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 96, natureScore: 72, cultureScore: 98, adventureScore: 45, familyScore: 95, accessibilityScore: 94, ecoScore: 84 }
  },
  mahabalipuram: {
    categories: ['coastal', 'heritage', 'photography', 'culture', 'nature', 'adventure'],
    tags: ['shore temple', 'pancha rathas', 'beach', 'rock sculpture', 'butter ball', 'unesco', 'surfing'],
    avgBudgetPerDay: 1450,
    idealDurationDays: [1, 2],
    idealDays: '1-2 Days',
    scores: { budgetScore: 90, natureScore: 88, cultureScore: 98, adventureScore: 65, familyScore: 92, accessibilityScore: 94, ecoScore: 88 }
  },
  tiruvannamalai: {
    categories: ['temples', 'spiritual', 'nature', 'heritage', 'culture', 'photography'],
    tags: ['arunachaleswarar temple', 'girivalam', 'ramana ashram', 'holy hill', 'meditation', 'deepam'],
    avgBudgetPerDay: 1050,
    idealDurationDays: [1, 2],
    idealDays: '1-2 Days',
    scores: { budgetScore: 97, natureScore: 82, cultureScore: 99, adventureScore: 52, familyScore: 92, accessibilityScore: 90, ecoScore: 88 }
  },
  yercaud: {
    categories: ['hills', 'nature', 'photography', 'culture', 'food', 'adventure'],
    tags: ['emerald lake', 'killiyur falls', 'shevaroy hills', 'coffee estates', 'viewpoints', 'mist'],
    avgBudgetPerDay: 1300,
    idealDurationDays: [1, 2],
    idealDays: '1-2 Days',
    scores: { budgetScore: 94, natureScore: 92, cultureScore: 78, adventureScore: 75, familyScore: 93, accessibilityScore: 92, ecoScore: 90 }
  },
  kumbakonam: {
    categories: ['temples', 'heritage', 'food', 'culture', 'spiritual', 'photography'],
    tags: ['mahamaham tank', 'adi kumbeswarar', 'brass vessels', 'degree coffee', 'navagraha circuit'],
    avgBudgetPerDay: 1100,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 96, natureScore: 65, cultureScore: 99, adventureScore: 35, familyScore: 94, accessibilityScore: 91, ecoScore: 82 }
  },
  courtallam: {
    categories: ['nature', 'hills', 'food', 'photography', 'wellness', 'adventure'],
    tags: ['main falls', 'five falls', 'old falls', 'herbal waters', 'western ghats', 'ayurvedic bath'],
    avgBudgetPerDay: 1200,
    idealDurationDays: [1, 2],
    idealDays: '1-2 Days',
    scores: { budgetScore: 95, natureScore: 95, cultureScore: 72, adventureScore: 70, familyScore: 90, accessibilityScore: 88, ecoScore: 92 }
  },
  chettinad: {
    categories: ['heritage', 'food', 'culture', 'photography', 'shopping'],
    tags: ['chettinad mansion', 'spicy cuisine', 'athangudi tiles', 'antique market', 'karaikudi feast'],
    avgBudgetPerDay: 1400,
    idealDurationDays: [2, 3],
    idealDays: '2-3 Days',
    scores: { budgetScore: 91, natureScore: 62, cultureScore: 98, adventureScore: 42, familyScore: 92, accessibilityScore: 90, ecoScore: 85 }
  },
  hogenakkal: {
    categories: ['nature', 'adventure', 'photography', 'food', 'waterfalls'],
    tags: ['waterfalls', 'coracle ride', 'cauvery river', 'fresh fish fry', 'canyon gorge', 'massage'],
    avgBudgetPerDay: 1150,
    idealDurationDays: [1, 2],
    idealDays: '1-2 Days',
    scores: { budgetScore: 95, natureScore: 96, cultureScore: 68, adventureScore: 90, familyScore: 88, accessibilityScore: 86, ecoScore: 90 }
  },
  munnar: {
    categories: ['hills', 'nature', 'photography', 'adventure', 'couple', 'family'],
    tags: ['tea gardens', 'eravikulam national park', 'mattupetty dam', 'anamudi peak', 'misty valleys'],
    avgBudgetPerDay: 2200,
    idealDurationDays: [3, 4, 5],
    idealDays: '3-5 Days',
    scores: { budgetScore: 82, natureScore: 99, cultureScore: 75, adventureScore: 86, familyScore: 93, accessibilityScore: 86, ecoScore: 95 }
  },
  wayanad: {
    categories: ['nature', 'adventure', 'hills', 'photography', 'wildlife', 'family'],
    tags: ['chembra peak heart lake', 'edakkal caves', 'banasura sagar dam', 'bamboo rafting', 'spice plantations'],
    avgBudgetPerDay: 2100,
    idealDurationDays: [3, 4],
    idealDays: '3-4 Days',
    scores: { budgetScore: 83, natureScore: 98, cultureScore: 78, adventureScore: 92, familyScore: 91, accessibilityScore: 85, ecoScore: 95 }
  }
};

// Semantic interest keywords map
export const INTEREST_SYNONYMS = {
  nature: ['nature', 'hills', 'waterfalls', 'falls', 'forest', 'mountains', 'lake', 'scenic', 'wildlife', 'green', 'valley', 'mist', 'stream', 'botanical'],
  heritage: ['heritage', 'history', 'ancient', 'chola', 'palace', 'fort', 'monument', 'unesco', 'architecture', 'historical'],
  temples: ['temples', 'temple', 'spiritual', 'gopuram', 'dravidian', 'deity', 'pooja', 'sacred', 'darshan'],
  coastal: ['coastal', 'beach', 'sea', 'ocean', 'coast', 'shore', 'island', 'lighthouse', 'promenade'],
  food: ['food', 'cuisine', 'tiffin', 'dining', 'culinary', 'biryani', 'seafood', 'mess', 'coffee', 'jigarthanda', 'snack', 'halwa', 'macaroons', 'feast'],
  photography: ['photography', 'viewpoints', 'viewpoint', 'scenic', 'panoramic', 'sunset', 'sunrise', 'hills', 'coastal', 'nature', 'mist', 'valley', 'falls'],
  adventure: ['adventure', 'trekking', 'boating', 'coracle', 'falls', 'trails', 'hiking', 'rafting', 'waterfall', 'canyon'],
  hills: ['hills', 'hill', 'hill station', 'mountains', 'mist', 'valleys', 'tea estates', 'western ghats', 'highlands', 'tea'],
  culture: ['culture', 'art', 'dance', 'handloom', 'tradition', 'craft', 'classical', 'music', 'bronze', 'silk'],
  spiritual: ['spiritual', 'temples', 'temple', 'ashram', 'holy', 'prayer', 'sacred', 'meditation', 'girivalam', 'pilgrimage']
};

// Standardize any destination object into the planner schema
function formatPlannerDestination(d) {
  const profile = DESTINATION_PROFILES[d.id] || {};

  // Format dining options
  const diningList = [];
  if (Array.isArray(d.food) && d.food.length > 0) {
    d.food.forEach(f => {
      const parsedCost = typeof f.cost === 'number' ? f.cost : parseInt(String(f.cost || f.estimatedCost || '150').replace(/[^\d]/g, ''), 10) || 150;
      diningList.push({
        name: f.name,
        cost: parsedCost,
        type: f.subcategory === 'breakfast' ? 'Breakfast' : f.subcategory === 'dinner' ? 'Dinner' : 'Lunch',
        area: f.distance || `${d.name} Center`
      });
    });
  } else if (Array.isArray(d.dining) && d.dining.length > 0) {
    d.dining.forEach(dn => {
      diningList.push({
        name: dn.name,
        cost: dn.cost || 150,
        type: dn.type || 'Meal',
        area: dn.area || `${d.name} Hub`
      });
    });
  }

  // Ensure 3 standard meals exist
  if (diningList.length === 0) {
    diningList.push(
      { name: `${d.name} Traditional Morning Tiffin & Filter Coffee`, cost: 120, type: "Breakfast", area: "Town Center" },
      { name: `${d.name} Authentic Regional Banana Leaf Meals`, cost: 180, type: "Lunch", area: "Market Hub" },
      { name: `${d.name} Classic Heritage Dinner Specialties`, cost: 220, type: "Dinner", area: "Main Promenade" }
    );
  }

  // Standardize stays
  let staysObj = {
    budget: { name: `${d.name} Cozy Heritage Inn`, costPerNight: 950, rating: 4.3 },
    comfort: { name: `${d.name} Comfort Green Villa`, costPerNight: 2400, rating: 4.7 },
    premium: { name: `${d.name} Royal Heritage Resort & Spa`, costPerNight: 5500, rating: 4.9 }
  };

  if (Array.isArray(d.stays) && d.stays.length > 0) {
    const staysArr = d.stays;
    const bStay = staysArr.find(s => (s.pricePerNight && s.pricePerNight < 2000) || s.category?.toLowerCase().includes('budget'));
    const cStay = staysArr.find(s => (s.pricePerNight && s.pricePerNight >= 2000 && s.pricePerNight < 5000) || s.category?.toLowerCase().includes('comfort'));
    const pStay = staysArr.find(s => (s.pricePerNight && s.pricePerNight >= 5000) || s.category?.toLowerCase().includes('luxury') || s.category?.toLowerCase().includes('premium'));

    if (bStay) staysObj.budget = { name: bStay.name, costPerNight: bStay.pricePerNight || 950, rating: bStay.rating || 4.3 };
    if (cStay) staysObj.comfort = { name: cStay.name, costPerNight: cStay.pricePerNight || 2400, rating: cStay.rating || 4.7 };
    if (pStay) staysObj.premium = { name: pStay.name, costPerNight: pStay.pricePerNight || 5500, rating: pStay.rating || 4.9 };
  } else if (d.stays && typeof d.stays === 'object' && d.stays.budget) {
    staysObj = d.stays;
  }

  // Standardize attractions with geographic clustering zones
  const attractionsList = (d.attractions || []).map((a, idx) => {
    const parsedCost = typeof a.cost === 'number' ? a.cost : parseInt(String(a.cost || a.estimatedCost || '0').replace(/[^\d]/g, ''), 10) || 0;
    return {
      id: a.id || `${d.id}-${idx + 1}`,
      name: a.name,
      zone: a.zone || (idx % 2 === 0 ? "North/Central" : "South/East"),
      category: a.category || "Sightseeing & Nature",
      bestTime: a.bestTime || (idx === 0 ? "Morning" : idx === 1 ? "Midday" : "Sunset"),
      openingHours: a.timings || a.openingHours || "06:00 AM - 07:00 PM",
      durationHrs: a.durationHrs || 2,
      cost: parsedCost,
      rating: a.rating || 4.7,
      description: a.shortDesc || a.description || a.whyVisit || "Renowned destination landmark.",
      lat: a.lat || d.coordinates?.lat || 11.0,
      lng: a.lng || d.coordinates?.lng || 78.0,
      photo: a.photo || d.heroImage || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
    };
  });

  const finalCategories = profile.categories || d.categories || [d.category || 'heritage', 'culture'];
  const finalTags = profile.tags || d.tags || [];
  const finalAvgDailyCost = profile.avgBudgetPerDay || d.avgBudgetPerDay || d.avgDailyBudgetBudget || 1500;
  const finalScores = profile.scores || d.scores || {
    budgetScore: 90,
    natureScore: 85,
    cultureScore: 90,
    adventureScore: 60,
    familyScore: 92,
    accessibilityScore: 88,
    ecoScore: 85
  };

  return {
    id: d.id,
    name: d.name,
    state: d.state || "Tamil Nadu",
    tagline: d.tagline || `${d.name} Heritage, Culture & Nature`,
    coordinates: d.coordinates || { lat: 11.0, lng: 78.0 },
    avgBudgetPerDay: finalAvgDailyCost,
    category: d.category || finalCategories[0] || 'heritage',
    categories: finalCategories,
    tags: finalTags,
    idealDurationDays: profile.idealDurationDays || [2, 3],
    idealDays: profile.idealDays || '2-3 Days',
    scores: finalScores,
    heroImage: d.heroImage || (attractionsList[0]?.photo) || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    attractions: attractionsList,
    dining: diningList,
    stays: staysObj
  };
}

// Full Tamil Nadu & South India Destination Catalog
export const PLANNER_DESTINATIONS = (DESTINATIONS || []).map(formatPlannerDestination);

// Helper: Calculate Great Circle Distance in KM
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Estimate travel duration in minutes based on mountain/city speed
export function estimateTravelTimeMin(distanceKm) {
  const avgSpeedKmH = 25; // Mountain / city road average
  const mins = Math.round((distanceKm / avgSpeedKmH) * 60);
  return Math.max(5, mins);
}

/**
 * Dynamic Multi-factor Destination Ranking Engine
 * Evaluates Tamil Nadu destinations based on:
 * - Budget compatibility (daily budget vs destination cost baseline)
 * - Duration suitability (ideal trip duration vs user days)
 * - Travel type (Family / Friends / Solo / Couple)
 * - User interests (Nature, Heritage, Temples, Coastal/Beach, Food, Adventure, Photography, etc.)
 * - General quality & accessibility
 * Returns Top 3 destinations with rank, match score, badges, and why recommended.
 */
export function rankDestinations({
  budget = 10000,
  days = 3,
  travelType = 'Family',
  travelers = 2,
  interests = ['Nature', 'Food', 'Photography'],
  travelStyle = 'Budget',
  startingLocation = 'Salem'
}) {
  const numDays = Math.min(5, Math.max(1, parseInt(days) || 2));
  const totalBudget = Math.max(1500, parseInt(budget) || 5000);
  const numTravelers = Math.max(1, parseInt(travelers) || 2);
  const userInterests = Array.isArray(interests) && interests.length > 0 ? interests : ['Nature', 'Food'];
  const roomsNeeded = travelType === 'Family' || travelType === 'Couple' 
    ? Math.max(1, Math.ceil(numTravelers / 3)) 
    : travelType === 'Solo' ? 1 : Math.max(1, Math.ceil(numTravelers / 2));
  const isStrictBudget = (totalBudget / numDays) < 2800;

  const scored = PLANNER_DESTINATIONS.map(dest => {
    let score = 0;
    const reasons = [];

    // 1. Budget Compatibility (30 pts)
    const baseDailyCost = dest.avgBudgetPerDay || 1400;
    const estRequiredTripCost = baseDailyCost * numDays;
    const budgetRatio = totalBudget / estRequiredTripCost;
    let budgetScoreVal = 0;

    if (budgetRatio >= 0.85 && budgetRatio <= 1.55) {
      budgetScoreVal = 100;
      reasons.push(`Budget of ₹${totalBudget.toLocaleString('en-IN')} fits ${dest.name} comfortably for ${numDays} days`);
    } else if (budgetRatio > 1.55) {
      // Plenty budget: high score with gentle scaling so high budgets prefer richer multi-day destinations
      budgetScoreVal = Math.max(72, Math.round(96 - (budgetRatio - 1.55) * 6));
      reasons.push(`Easily affordable within ₹${totalBudget.toLocaleString('en-IN')}`);
    } else if (budgetRatio >= 0.70) {
      budgetScoreVal = 80;
      reasons.push(`Feasible with value-tier stays & regional dining`);
    } else {
      budgetScoreVal = Math.max(25, Math.round(budgetRatio * 55));
    }
    score += budgetScoreVal * 0.30;

    // 2. Duration Compatibility (20 pts)
    const isHillStation = (dest.categories || []).includes('hills') || (dest.tags || []).includes('mist');
    const isCompact = ['yercaud', 'hogenakkal', 'courtallam', 'mahabalipuram', 'tiruvannamalai'].includes(dest.id);
    const isExtended = ['ooty', 'kodaikanal', 'munnar', 'wayanad'].includes(dest.id);

    let idealMin = isCompact ? 1 : isExtended ? 3 : 2;
    let idealMax = isCompact ? 2 : isExtended ? 5 : 4;

    let durationScoreVal = 60;
    if (numDays >= idealMin && numDays <= idealMax) {
      durationScoreVal = 100;
      reasons.push(`Ideal duration for a ${numDays}-day itinerary`);
    } else if (Math.abs(numDays - idealMin) === 1 || Math.abs(numDays - idealMax) === 1) {
      durationScoreVal = 82;
      reasons.push(`Good fit for a ${numDays}-day visit`);
    } else {
      durationScoreVal = 48;
    }
    score += durationScoreVal * 0.20;

    // 3. Travel Type Fit (20 pts)
    let travelTypeScoreVal = 80;
    const scores = dest.scores || {};
    if (travelType === 'Family') {
      travelTypeScoreVal = scores.familyScore || 90;
      if (travelTypeScoreVal >= 92) reasons.push(`Great family-friendly amenities, safe transit & relaxed sightseeing`);
    } else if (travelType === 'Friends') {
      const advScore = scores.adventureScore || 65;
      const natScore = scores.natureScore || 75;
      travelTypeScoreVal = Math.min(100, Math.round(advScore * 0.55 + natScore * 0.45));
      if (travelTypeScoreVal >= 85) reasons.push(`Exciting outdoor trails, viewpoints & group activities`);
    } else if (travelType === 'Solo') {
      const cultScore = scores.cultureScore || 85;
      const accessScore = scores.accessibilityScore || 85;
      travelTypeScoreVal = Math.min(100, Math.round(cultScore * 0.55 + accessScore * 0.45));
      if (travelTypeScoreVal >= 85) reasons.push(`Safe, culturally enriching & highly walkable for solo explorers`);
    } else if (travelType === 'Couple') {
      const natureScore = scores.natureScore || 85;
      const cultScore = scores.cultureScore || 80;
      travelTypeScoreVal = Math.min(100, Math.round(natureScore * 0.65 + cultScore * 0.35));
      if (travelTypeScoreVal >= 85) reasons.push(`Romantic misty panoramas and scenic heritage stays`);
    }
    score += travelTypeScoreVal * 0.20;

    // 4. Interests Alignment with Synonyms (20 pts)
    let interestScoreVal = 70;
    if (userInterests.length > 0) {
      let matches = 0;
      const destCats = (dest.categories || []).map(c => String(c).toLowerCase());
      const destTags = (dest.tags || []).map(t => String(t).toLowerCase());
      const destText = `${dest.name} ${dest.tagline || ''} ${dest.category || ''}`.toLowerCase();

      userInterests.forEach(interest => {
        const intLower = String(interest).toLowerCase();
        const synonyms = INTEREST_SYNONYMS[intLower] || [intLower];

        const matchCat = destCats.some(c => synonyms.some(syn => c.includes(syn) || syn.includes(c)));
        const matchTag = destTags.some(t => synonyms.some(syn => t.includes(syn) || syn.includes(t)));
        const matchText = synonyms.some(syn => destText.includes(syn));

        if (matchCat || matchTag || matchText) {
          matches++;
        }
      });

      interestScoreVal = Math.min(100, Math.round((matches / userInterests.length) * 100));
      if (matches > 0) {
        reasons.push(`Matches your interest in ${userInterests.slice(0, 2).join(' & ')}`);
      }
    }
    score += interestScoreVal * 0.20;

    // 5. General Quality & Score (10 pts)
    const baseQuality = ((scores.cultureScore || 85) + (scores.natureScore || 85)) / 2;
    score += (baseQuality / 100) * 10;

    const matchPercentage = Math.min(99, Math.max(52, Math.round(score)));
    const explanation = reasons.length > 0 ? reasons.slice(0, 3).join('. ') + '.' : 'Recommended for your travel plan.';

    // Budget range estimation centered on user's target budget and group constraints
    const isBudgetStyle = travelStyle === 'Budget' || isStrictBudget;
    const baseRoom = isBudgetStyle 
      ? (dest.stays?.budget?.costPerNight ? Math.min(850, dest.stays.budget.costPerNight) : 750)
      : (dest.stays?.[travelStyle?.toLowerCase()]?.costPerNight || 1200);
    const stayCostPerNight = baseRoom * roomsNeeded;
    
    const foodDaily = (isBudgetStyle ? 180 : 350) * numTravelers;
    const localDaily = isBudgetStyle ? 200 : (250 * numTravelers);
    const estDaily = stayCostPerNight + foodDaily + localDaily;
    const calculatedTotal = (estDaily * numDays) + (isBudgetStyle ? 100 : 300) + Math.round(totalBudget * 0.05);

    const minEst = Math.round(Math.min(totalBudget * 0.85, Math.max(calculatedTotal * 0.88, totalBudget * 0.75)));
    const maxEst = Math.round(Math.min(totalBudget * 1.08, Math.max(calculatedTotal * 1.08, totalBudget * 1.02)));

    return {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      tagline: dest.tagline,
      description: dest.tagline || dest.name,
      heroImage: dest.heroImage,
      category: dest.category,
      categories: dest.categories || [],
      tags: dest.tags || [],
      matchPercentage,
      explanation,
      reasons: reasons,
      matchReasons: reasons,
      budgetRange: { min: minEst, max: maxEst },
      estimatedBudgetRange: `₹${minEst.toLocaleString('en-IN')} - ₹${maxEst.toLocaleString('en-IN')}`,
      avgBudgetPerDay: dest.avgBudgetPerDay,
      idealDurationDays: dest.idealDurationDays || [2, 3],
      idealDays: dest.idealDays || '2-3 Days',
      suitableTravelTypes: ((scores.familyScore || 90) >= 90 ? ['Family', 'Friends', 'Couple', 'Solo'] : ['Friends', 'Solo', 'Couple']),
      attractionsCount: (dest.attractions || []).length
    };
  });

  // Sort descending by match score
  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return scored.slice(0, 3);
}

// Master Intelligent Itinerary Generator
export function generateSmartItinerary({
  destinationId,
  daysCount = 2,
  budget = 5000,
  travelType = "Family",
  travelStyle = "Budget",
  travelersCount = 2,
  interests = ["Nature", "Food", "Photography"],
  startingLocation = "Salem"
}) {
  const destData = (destinationId && PLANNER_DESTINATIONS.find(d => d.id === destinationId)) || PLANNER_DESTINATIONS[0];
  const numDays = Math.min(5, Math.max(1, parseInt(daysCount) || 2));
  const totalBudget = Math.max(2000, parseInt(budget) || 5000);
  const numTravelers = Math.max(1, parseInt(travelersCount) || 2);

  // Rooms calculation
  const roomsNeeded = travelType === 'Family' || travelType === 'Couple' 
    ? Math.max(1, Math.ceil(numTravelers / 3)) 
    : travelType === 'Solo' ? 1 : Math.max(1, Math.ceil(numTravelers / 2));

  // 1. Determine Tier based on Budget per day per person
  const isStrictBudget = (totalBudget / numDays) < 2800;
  const budgetPerPersonPerDay = (totalBudget / numDays) / numTravelers;
  let computedTier = "budget";
  if (!isStrictBudget && (budgetPerPersonPerDay > 3000 || travelStyle === "Premium")) {
    computedTier = "premium";
  } else if (!isStrictBudget && (budgetPerPersonPerDay > 1500 || travelStyle === "Comfortable")) {
    computedTier = "comfort";
  }

  // 2. Calculate Strict Budget Breakdown (Stay, Food, Transport, Activities, Buffer)
  const baseRoomCost = isStrictBudget
    ? (destData.stays?.budget?.costPerNight ? Math.min(800, destData.stays.budget.costPerNight) : 750)
    : (destData.stays?.[computedTier]?.costPerNight || (computedTier === 'budget' ? 950 : computedTier === 'comfort' ? 2200 : 4500));
  
  const totalStayCost = baseRoomCost * roomsNeeded * Math.max(1, numDays - 1);
  
  const dailyFoodPerPerson = isStrictBudget ? 180 : computedTier === 'budget' ? 280 : computedTier === 'comfort' ? 500 : 850;
  const totalFoodCost = dailyFoodPerPerson * numDays * numTravelers;

  const transportPerDay = isStrictBudget ? 200 : computedTier === 'budget' ? 350 : computedTier === 'comfort' ? 750 : 1500;
  const totalTransportCost = transportPerDay * numDays;

  // Selected attractions costs
  const allAttractions = destData.attractions && destData.attractions.length > 0
    ? [...destData.attractions]
    : [
        {
          id: `${destData.id}-1`,
          name: `${destData.name} Heritage & Scenic Core`,
          zone: "Central",
          category: "Sightseeing",
          cost: 50,
          durationHrs: 2,
          rating: 4.8,
          description: `Prime scenic and cultural attraction of ${destData.name}.`,
          lat: destData.coordinates?.lat || 11.0,
          lng: destData.coordinates?.lng || 78.0,
          photo: destData.heroImage
        }
      ];

  const totalActivityFees = isStrictBudget
    ? Math.min(200, allAttractions.slice(0, numDays * 2).reduce((sum, a) => sum + (a.cost || 0), 0))
    : allAttractions.slice(0, numDays * 3).reduce((sum, a) => sum + (a.cost || 0), 0) * numTravelers;

  const miscellaneousBuffer = Math.round(totalBudget * 0.05);
  const estimatedTotalCost = totalStayCost + totalFoodCost + totalTransportCost + totalActivityFees + miscellaneousBuffer;
  const remainingBudget = totalBudget - estimatedTotalCost;
  const isTightBudget = remainingBudget < 0;

  // 3. Cluster Attractions Geographically by Zone to avoid backtracking
  const zonesMap = {};
  allAttractions.forEach(att => {
    const zoneKey = att.zone || "Central";
    if (!zonesMap[zoneKey]) zonesMap[zoneKey] = [];
    zonesMap[zoneKey].push(att);
  });

  const availableZones = Object.keys(zonesMap);

  // 4. Build Day-by-Day Journey Timelines
  const days = [];
  for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
    const dayNumber = dayIndex + 1;
    const assignedZone = availableZones[dayIndex % availableZones.length] || "Central";
    const zoneAttractions = zonesMap[assignedZone] || allAttractions;
    
    const dayTheme = dayNumber === 1
      ? `${assignedZone} Highlights & Arrival Promenade`
      : dayNumber === 2
      ? `${assignedZone} Heritage, Scenic Views & Culinary Trail`
      : `${assignedZone} Nature Sanctuaries & Artisan Discoveries`;

    const whyThisPlan = dayNumber === 1
      ? `Day 1 concentrates on ${assignedZone} to minimize transit after your arrival from ${startingLocation} and capture sunset.`
      : `Day 2 focuses on ${assignedZone} allowing you to explore local sights and culture without rushing.`;

    const morningPlace = zoneAttractions[0] || allAttractions[0];
    const middayPlace = zoneAttractions[1] || allAttractions[1] || morningPlace;
    const afternoonPlace = zoneAttractions[2] || allAttractions[2] || middayPlace;

    const stops = [
      {
        id: `d${dayNumber}-s1`,
        time: "08:30 AM",
        title: `Breakfast at ${destData.dining[0]?.name || 'Local Tiffin Corner'}`,
        category: "Food",
        cost: `₹${Math.round(destData.dining[0]?.cost || 120)}`,
        costNum: destData.dining[0]?.cost || 120,
        duration: "45 mins",
        desc: `Fresh filter coffee and warm regional breakfast to energize for the morning trail.`,
        lat: destData.coordinates.lat,
        lng: destData.coordinates.lng,
        transition: null
      },
      {
        id: `d${dayNumber}-s2`,
        time: "09:45 AM",
        title: morningPlace.name,
        category: morningPlace.category,
        cost: morningPlace.cost > 0 ? `₹${morningPlace.cost}` : "Free",
        costNum: morningPlace.cost || 0,
        duration: `${morningPlace.durationHrs || 2} hrs`,
        desc: morningPlace.description,
        lat: morningPlace.lat,
        lng: morningPlace.lng,
        photo: morningPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(destData.coordinates.lat, destData.coordinates.lng, morningPlace.lat, morningPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(destData.coordinates.lat, destData.coordinates.lng, morningPlace.lat, morningPlace.lng))} mins`,
          suggestedMode: "Short Cab / Auto Shuttle"
        }
      },
      {
        id: `d${dayNumber}-s3`,
        time: "12:15 PM",
        title: middayPlace.name,
        category: middayPlace.category,
        cost: middayPlace.cost > 0 ? `₹${middayPlace.cost}` : "Free",
        costNum: middayPlace.cost || 0,
        duration: `${middayPlace.durationHrs || 1.5} hrs`,
        desc: middayPlace.description,
        lat: middayPlace.lat,
        lng: middayPlace.lng,
        photo: middayPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(morningPlace.lat, morningPlace.lng, middayPlace.lat, middayPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(morningPlace.lat, morningPlace.lng, middayPlace.lat, middayPlace.lng))} mins`,
          suggestedMode: "Nearby Road Transit"
        }
      },
      {
        id: `d${dayNumber}-s4`,
        time: "01:45 PM",
        title: `Traditional Lunch at ${destData.dining[1]?.name || 'Regional Dining Kitchen'}`,
        category: "Food",
        cost: `₹${Math.round(destData.dining[1]?.cost || 180)}`,
        costNum: destData.dining[1]?.cost || 180,
        duration: "1 hr",
        desc: `Authentic regional thali served over fresh plantain leaf with local cooling drinks.`,
        lat: middayPlace.lat,
        lng: middayPlace.lng,
        transition: {
          distance: "0.8 km",
          travelTime: "5 mins",
          suggestedMode: "Short Stroll"
        }
      },
      {
        id: `d${dayNumber}-s5`,
        time: "03:45 PM",
        title: afternoonPlace.name,
        category: afternoonPlace.category,
        cost: afternoonPlace.cost > 0 ? `₹${afternoonPlace.cost}` : "Free",
        costNum: afternoonPlace.cost || 0,
        duration: `${afternoonPlace.durationHrs || 2} hrs`,
        desc: afternoonPlace.description,
        lat: afternoonPlace.lat,
        lng: afternoonPlace.lng,
        photo: afternoonPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(middayPlace.lat, middayPlace.lng, afternoonPlace.lat, afternoonPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(middayPlace.lat, middayPlace.lng, afternoonPlace.lat, afternoonPlace.lng))} mins`,
          suggestedMode: "Scenic Route Transit"
        }
      },
      {
        id: `d${dayNumber}-s6`,
        time: "06:15 PM",
        title: `Sunset Vista & Evening Tea`,
        category: "Viewpoint & Tea",
        cost: "₹40",
        costNum: 40,
        duration: "1 hr",
        desc: `Golden hour sunset vantage point with freshly roasted snacks and hot tea.`,
        lat: afternoonPlace.lat,
        lng: afternoonPlace.lng,
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        transition: {
          distance: "1.2 km",
          travelTime: "8 mins",
          suggestedMode: "Scenic Walk"
        }
      },
      {
        id: `d${dayNumber}-s7`,
        time: "08:00 PM",
        title: `Dinner at ${destData.dining[2]?.name || 'Heritage Cafe & Restaurant'}`,
        category: "Food",
        cost: `₹${Math.round(destData.dining[2]?.cost || 220)}`,
        costNum: destData.dining[2]?.cost || 220,
        duration: "1.5 hrs",
        desc: `Delightful dining experience featuring regional aromas and tranquil ambiance.`,
        lat: destData.coordinates.lat,
        lng: destData.coordinates.lng,
        transition: {
          distance: "2.1 km",
          travelTime: "10 mins",
          suggestedMode: "Return Cab / Auto"
        }
      }
    ];

    days.push({
      dayNumber,
      dayTitle: `Day ${dayNumber}: ${dayTheme}`,
      assignedZone,
      whyThisPlan,
      estimatedDayCost: Math.round(estimatedTotalCost / numDays),
      stops
    });
  }

  // 5. Intelligent Dynamic Budget Optimization Suggestions
  const optimizationTips = [];
  if (isTightBudget) {
    optimizationTips.push({
      title: "Optimized Homestay Savings",
      type: "Stay",
      savings: Math.abs(remainingBudget),
      text: `Your budget is ₹${Math.abs(remainingBudget).toLocaleString('en-IN')} below standard rates. We selected verified value stays to keep expenses balanced.`
    });
  } else {
    optimizationTips.push({
      title: "Surplus Budget Experience Upgrade",
      type: "Experience",
      savings: remainingBudget,
      text: `You have ₹${remainingBudget.toLocaleString('en-IN')} buffer! You can upgrade your accommodation or add private artisan workshops.`
    });
  }

  return {
    summary: {
      destinationId: destData.id,
      destinationName: destData.name,
      state: destData.state,
      tagline: destData.tagline,
      heroImage: destData.heroImage,
      daysCount: numDays,
      travelersCount: numTravelers,
      travelStyle,
      startingLocation,
      totalBudgetInput: totalBudget,
      estimatedTotalCost,
      perPersonCost: Math.round(estimatedTotalCost / numTravelers),
      remainingBudget,
      remainingBuffer: Math.max(0, remainingBudget),
      isTightBudget,
      stayTier: computedTier,
      selectedHotel: destData.stays[computedTier] || destData.stays.budget
    },
    budgetBreakdown: {
      stay: totalStayCost,
      accommodation: totalStayCost,
      food: totalFoodCost,
      transport: totalTransportCost,
      activities: totalActivityFees,
      activityFees: totalActivityFees,
      miscellaneous: miscellaneousBuffer,
      miscellaneousBuffer,
      remaining: Math.max(0, remainingBudget),
      remainingBuffer: Math.max(0, remainingBudget)
    },
    optimizationTips,
    days
  };
}

// Get smart swap alternatives for an itinerary stop
export function getStopAlternatives(currentStopId, destinationId) {
  const destData = (destinationId && PLANNER_DESTINATIONS.find(d => d.id === destinationId)) || PLANNER_DESTINATIONS[0];
  return (destData.attractions || [])
    .filter(a => a.name !== currentStopId)
    .slice(0, 3)
    .map(a => ({
      title: a.name,
      category: a.category,
      cost: a.cost > 0 ? `₹${a.cost}` : "Free",
      costNum: a.cost || 0,
      duration: `${a.durationHrs || 2} hrs`,
      desc: a.description,
      lat: a.lat,
      lng: a.lng,
      photo: a.photo
    }));
}

// Client-side Natural Language Trip Prompt Parser
export function parseNaturalLanguageClientPrompt(promptText = '') {
  const text = promptText.toLowerCase();

  let destinationId = null;
  if (text.includes('munnar') || text.includes('முன்னார்')) destinationId = 'munnar';
  else if (text.includes('chennai') || text.includes('சென்னை') || text.includes('madras')) destinationId = 'chennai';
  else if (text.includes('ooty') || text.includes('ஊட்டி') || text.includes('udhagamandalam') || text.includes('nilgiri')) destinationId = 'ooty';
  else if (text.includes('kodaikanal') || text.includes('கொடைக்கானல்') || text.includes('kodai')) destinationId = 'kodaikanal';
  else if (text.includes('madurai') || text.includes('மதுரை')) destinationId = 'madurai';
  else if (text.includes('thanjavur') || text.includes('தஞ்சாவூர்') || text.includes('tanjore')) destinationId = 'thanjavur';
  else if (text.includes('trichy') || text.includes('tiruchirappalli') || text.includes('திருச்சி')) destinationId = 'tiruchirappalli';
  else if (text.includes('kanyakumari') || text.includes('கன்யாகுமரி')) destinationId = 'kanyakumari';
  else if (text.includes('mahabalipuram') || text.includes('mamallapuram') || text.includes('மகாபலிபுரம்')) destinationId = 'mahabalipuram';
  else if (text.includes('rameswaram') || text.includes('rameshwaram') || text.includes('ராமேஸ்வரம்')) destinationId = 'rameswaram';
  else if (text.includes('coimbatore') || text.includes('கோயம்புத்தூர்') || text.includes('kovai')) destinationId = 'coimbatore';
  else if (text.includes('tiruvannamalai') || text.includes('திருவண்ணாமலை')) destinationId = 'tiruvannamalai';
  else if (text.includes('courtallam') || text.includes('kourtallam') || text.includes('குற்றாலம்')) destinationId = 'courtallam';
  else if (text.includes('chettinad') || text.includes('karaikudi') || text.includes('செட்டிநாடு')) destinationId = 'chettinad';
  else if (text.includes('hogenakkal') || text.includes('ஒகேனக்கல்')) destinationId = 'hogenakkal';
  else if (text.includes('yercaud') || text.includes('ஏற்காடு')) destinationId = 'yercaud';
  else if (text.includes('wayanad') || text.includes('வயநாடு')) destinationId = 'wayanad';

  let budget = 5000;
  const budgetKMatch = text.match(/(\d+)\s*k\b/i);
  const budgetNumMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d{1,2}(?:,\d{3})+|\d{4,6})/i);
  if (budgetKMatch) {
    budget = parseInt(budgetKMatch[1], 10) * 1000;
  } else if (budgetNumMatch) {
    budget = parseInt(budgetNumMatch[1].replace(/,/g, ''), 10);
  }

  let days = 2;
  const daysMatch = text.match(/(\d+)\s*(?:day|days|night|nights|நாள்|நாட்கள்)/i);
  if (daysMatch) {
    days = Math.min(5, Math.max(1, parseInt(daysMatch[1], 10)));
  } else if (text.includes('weekend') || text.includes('வார இறுதி')) {
    days = 2;
  } else if (text.includes('extended') || text.includes('long')) {
    days = 4;
  }

  let travelers = 2;
  let travelType = 'Couple';
  let travelStyle = 'Budget';
  if (text.includes('solo') || text.includes('alone') || text.includes('1 person') || text.includes('தனி')) {
    travelers = 1;
    travelType = 'Solo';
  } else if (text.includes('family') || text.includes('parents') || text.includes('kids') || text.includes('குடும்பம்')) {
    travelers = 4;
    travelType = 'Family';
  } else if (text.includes('friends') || text.includes('group') || text.includes('நண்பர்கள்')) {
    travelers = 3;
    travelType = 'Friends';
  }

  if (text.includes('luxury') || text.includes('premium') || text.includes('resort')) {
    travelStyle = 'Premium';
  } else if (text.includes('comfort')) {
    travelStyle = 'Comfortable';
  }

  const interests = [];
  if (text.includes('nature') || text.includes('mountain') || text.includes('scenic') || text.includes('இயற்கை')) interests.push('Nature');
  if (text.includes('food') || text.includes('dining') || text.includes('culinary') || text.includes('உணவு')) interests.push('Food');
  if (text.includes('photo') || text.includes('photography') || text.includes('புகைப்படம்')) interests.push('Photography');
  if (text.includes('temple') || text.includes('heritage') || text.includes('culture') || text.includes('history') || text.includes('கோவில்')) interests.push('Heritage');
  if (interests.length === 0) interests.push('Nature', 'Food', 'Photography');

  return {
    destinationId,
    budget,
    daysCount: days,
    travelersCount: travelers,
    travelType,
    travelStyle,
    interests
  };
}

// Smart Itinerary Re-optimization Engine
export function reoptimizeItineraryStops(stops = [], destinationId) {
  if (!stops || stops.length === 0) return stops;

  const destData = (destinationId && PLANNER_DESTINATIONS.find(d => d.id === destinationId)) || PLANNER_DESTINATIONS[0];
  const originLat = destData.coordinates.lat;
  const originLng = destData.coordinates.lng;

  const optimized = stops.map((stop, idx) => {
    const isCustom = stop.id?.startsWith('custom') || stop.id?.startsWith('alt');
    const standardTimes = ["08:30 AM", "09:45 AM", "12:15 PM", "01:45 PM", "03:45 PM", "06:15 PM", "08:00 PM"];
    const slotTime = standardTimes[idx] || stop.time;

    let transition = stop.transition;
    if (idx > 0) {
      const prevStop = stops[idx - 1];
      const dist = calculateDistanceKm(prevStop.lat || originLat, prevStop.lng || originLng, stop.lat || originLat, stop.lng || originLng);
      const timeMin = estimateTravelTimeMin(dist);
      transition = {
        distance: `${dist} km`,
        travelTime: `${timeMin} mins`,
        suggestedMode: dist > 3 ? "Cab / Shuttle" : "Walk / Auto"
      };
    }

    return {
      ...stop,
      time: slotTime,
      transition,
      desc: isCustom ? stop.desc : `${stop.desc} (Optimized for minimal transit & crowd avoidance).`
    };
  });

  return optimized;
}

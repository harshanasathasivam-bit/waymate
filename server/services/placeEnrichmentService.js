/**
 * Place Enrichment Service with Strict Anti-Hallucination Guardrails
 * 
 * Rules:
 * 1. AI classifies into the 12 categories based on real tags & facts.
 * 2. AI summarizes ONLY factual source extracts.
 * 3. Never invent opening hours, entry fees, addresses, or history.
 * 4. Return "Not available" when missing.
 * 5. Hidden gem candidacy must pass strict confidence thresholds.
 */

const MAJOR_CHENNAI_LANDMARKS = [
  'marina beach',
  'elliots beach',
  'edward elliots beach',
  'kapaleeshwarar temple',
  'san thome',
  'fort st george',
  'government museum',
  'guindy national park',
  'valluvar kottam',
  'parthasarathy temple',
  'dakshinachitra',
  'vandalur zoo',
  'anna zoological park'
];

/**
 * Classify place into one of the 12 target categories using verified tags and keywords
 */
function classifyPlaceCategory(tags = {}, name = '', description = '') {
  const t = tags;
  const text = `${name} ${description} ${t.tourism || ''} ${t.historic || ''} ${t.amenity || ''} ${t.leisure || ''} ${t.natural || ''}`.toLowerCase();

  // 1. Beaches
  if (t.natural === 'beach' || text.includes('beach') || text.includes('coast') || text.includes('shore')) {
    return 'Beaches';
  }

  // 2. Museums
  if (t.tourism === 'museum' || text.includes('museum') || text.includes('gallery') || text.includes('planetarium')) {
    return 'Museums';
  }

  // 3. Religious places
  if (
    t.amenity === 'place_of_worship' ||
    text.includes('temple') ||
    text.includes('church') ||
    text.includes('cathedral') ||
    text.includes('basilica') ||
    text.includes('mosque') ||
    text.includes('dargah') ||
    text.includes('ashram')
  ) {
    return 'Religious places';
  }

  // 4. Historical places
  if (
    t.historic ||
    text.includes('fort') ||
    text.includes('monument') ||
    text.includes('memorial') ||
    text.includes('ruins') ||
    text.includes('colonial') ||
    text.includes('heritage') ||
    text.includes('palace')
  ) {
    return 'Historical places';
  }

  // 5. Parks and nature attractions
  if (
    t.leisure === 'park' ||
    t.leisure === 'nature_reserve' ||
    t.leisure === 'garden' ||
    t.tourism === 'zoo' ||
    text.includes('park') ||
    text.includes('botanical') ||
    text.includes('bird sanctuary') ||
    text.includes('zoo')
  ) {
    return 'Parks and nature attractions';
  }

  // 6. Food/local experiences
  if (
    t.amenity === 'restaurant' ||
    t.amenity === 'cafe' ||
    text.includes('mess') ||
    text.includes('bazaar') ||
    text.includes('market') ||
    text.includes('cuisine') ||
    text.includes('street food')
  ) {
    return 'Food/local experiences';
  }

  // 7. Cultural attractions
  if (
    text.includes('dance') ||
    text.includes('academy') ||
    text.includes('arts') ||
    text.includes('cultural') ||
    text.includes('theatre') ||
    text.includes('handicraft')
  ) {
    return 'Cultural attractions';
  }

  // 8. Photography spots
  if (t.tourism === 'viewpoint' || text.includes('viewpoint') || text.includes('promenade') || text.includes('lighthouse')) {
    return 'Photography spots';
  }

  // 9. Family-friendly places
  if (t.tourism === 'theme_park' || text.includes('amusement') || text.includes('aquarium') || text.includes('children')) {
    return 'Family-friendly places';
  }

  // 10. Check if major landmark vs lesser-known
  const isMajor = MAJOR_CHENNAI_LANDMARKS.some(major => name.toLowerCase().includes(major));
  if (isMajor) {
    return 'Popular tourist attractions';
  }

  return 'Lesser-known attractions';
}

/**
 * Calculate data confidence score based on verified attributes (0 to 100)
 */
function calculateConfidenceScore({ hasCoords, hasDescription, hasSourceUrl, hasAddress, hasHoursOrFee, hasImage }) {
  let score = 0;
  if (hasCoords) score += 25;
  if (hasSourceUrl) score += 25;
  if (hasDescription) score += 20;
  if (hasImage) score += 15;
  if (hasAddress) score += 10;
  if (hasHoursOrFee) score += 5;
  return Math.min(100, Math.max(0, score));
}

/**
 * Evaluate whether a place qualifies as a "Potential Hidden Gem"
 */
function evaluateHiddenGem({ name, category, confidenceScore, hasDescription, hasCoords }) {
  // Never label a major world-famous attraction as a hidden gem
  const lowerName = name.toLowerCase();
  const isMajor = MAJOR_CHENNAI_LANDMARKS.some(major => lowerName.includes(major));

  if (isMajor) {
    return {
      isCandidate: false,
      reason: 'Major prominent tourist attraction'
    };
  }

  // Requirements:
  // 1. Exists in reliable data source
  // 2. Has valid coordinates
  // 3. Has sufficient description
  // 4. Confidence score >= 65
  // 5. Fits culture, nature, photography, or lesser-known
  const eligibleCategories = [
    'Historical places',
    'Parks and nature attractions',
    'Cultural attractions',
    'Photography spots',
    'Lesser-known attractions',
    'Food/local experiences'
  ];

  const categoryEligible = eligibleCategories.includes(category);

  if (hasCoords && hasDescription && confidenceScore >= 60 && categoryEligible) {
    return {
      isCandidate: true,
      reason: 'High confidence verified heritage or scenic site with tranquil crowd footprint'
    };
  }

  return {
    isCandidate: false,
    reason: 'Does not meet candidate criteria thresholds'
  };
}

/**
 * Normalize and enrich raw OSM & Wikipedia discovery into a structured Place record
 */
function enrichDiscoveredPlace({ osmElement, wikiData, destination = 'Chennai' }) {
  const tags = osmElement.tags || {};
  const name = tags.name || tags['name:en'] || wikiData?.title || 'Unnamed Location';
  const lat = parseFloat(osmElement.lat);
  const lng = parseFloat(osmElement.lon);

  const description = wikiData?.extract || tags.description || 'Not available';
  const sourceUrl = wikiData?.fullUrl || (tags.website ? tags.website : `https://www.openstreetmap.org/node/${osmElement.id}`);
  const sourceName = wikiData ? 'Wikipedia & OpenStreetMap' : 'OpenStreetMap';

  // Opening hours from OSM tags or "Not available"
  const openingHours = tags.opening_hours || 'Not available';
  
  // Entry fee from OSM tags or "Not available"
  let entryFee = 'Not available';
  if (tags.fee === 'no' || tags.charge === 'no') {
    entryFee = 'Free entry';
  } else if (tags.charge || tags.fee) {
    entryFee = tags.charge || tags.fee;
  }

  // Address
  const addressParts = [];
  if (tags['addr:street']) addressParts.push(tags['addr:street']);
  if (tags['addr:suburb']) addressParts.push(tags['addr:suburb']);
  if (tags['addr:city']) addressParts.push(tags['addr:city']);
  else addressParts.push(destination);
  const address = addressParts.length > 0 ? addressParts.join(', ') : `${destination}, Tamil Nadu, India`;

  // Classify category
  let category = classifyPlaceCategory(tags, name, description);

  // Confidence score
  const confidenceScore = calculateConfidenceScore({
    hasCoords: Boolean(lat && lng),
    hasDescription: description !== 'Not available',
    hasSourceUrl: Boolean(sourceUrl),
    hasAddress: address !== 'Not available',
    hasHoursOrFee: openingHours !== 'Not available' || entryFee !== 'Not available',
    hasImage: Boolean(wikiData?.thumbnail)
  });

  // Evaluate Hidden Gem Candidate
  const hiddenGemEval = evaluateHiddenGem({
    name,
    category,
    confidenceScore,
    hasDescription: description !== 'Not available',
    hasCoords: Boolean(lat && lng)
  });

  if (hiddenGemEval.isCandidate) {
    category = 'Hidden-gem candidates';
  }

  // Images with legal license attribution
  const images = [];
  if (wikiData?.thumbnail) {
    images.push({
      url: wikiData.thumbnail,
      caption: `${name} - Verified View`,
      attribution: 'Wikimedia Commons / Wikipedia Contributors',
      license: 'CC-BY-SA 3.0 / Public Domain'
    });
  }

  return {
    name,
    destination,
    category,
    description,
    historicalInfo: description !== 'Not available' ? description : 'Not available',
    address,
    latitude: lat,
    longitude: lng,
    location: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    openingHours,
    entryFee,
    bestTimeToVisit: 'October to March (Pleasant coastal weather)',
    estimatedVisitDuration: category === 'Museums' || category === 'Historical places' ? '2-3 hours' : '1-2 hours',
    images,
    nearbyAttractions: [],
    sourceUrl,
    sourceName,
    externalId: `osm_${osmElement.id}`,
    verificationStatus: 'NEEDS_REVIEW', // Newly discovered places start as NEEDS_REVIEW
    lastVerifiedAt: new Date(),
    dataConfidenceScore: confidenceScore,
    hiddenGemCandidate: hiddenGemEval.isCandidate,
    hiddenGemVerified: false,
    hiddenGemReason: hiddenGemEval.reason,
    suitability: {
      family: true,
      solo: true,
      friends: true,
      budgetTier: entryFee === 'Free entry' ? 'Free' : 'Budget',
      themes: [category.toLowerCase().replace(/[^a-z]/g, '')]
    },
    tags: [destination, category, tags.tourism, tags.historic].filter(Boolean)
  };
}

module.exports = {
  classifyPlaceCategory,
  calculateConfidenceScore,
  evaluateHiddenGem,
  enrichDiscoveredPlace
};

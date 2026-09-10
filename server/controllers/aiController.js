const { getDb } = require('../config/db');
const { getChatbotResponse, parseNaturalLanguageTripPrompt } = require('../services/llmService');

// Semantic interest keywords map
const INTEREST_SYNONYMS = {
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

// Multi-factor Match Scoring Engine
function calculateMatchScore(destination, userRequirements, weights = {}) {
  let score = 0;
  const reasons = [];

  const defaultWeights = {
    budgetMatch: 30,
    durationMatch: 20,
    travelTypeMatch: 20,
    interestMatch: 20,
    weatherDistanceMatch: 10,
    ...weights
  };

  const days = Math.min(5, Math.max(1, parseInt(userRequirements.days) || 2));
  const budget = Math.max(1500, parseInt(userRequirements.budget) || 5000);
  const travelers = Math.max(1, parseInt(userRequirements.travelers) || 2);
  const travelType = userRequirements.travelType || 'Couple';
  const interests = Array.isArray(userRequirements.interests) && userRequirements.interests.length > 0 ? userRequirements.interests : ['Nature', 'Food'];
  const isLuxury = userRequirements.hotelPreference === 'Luxury' || userRequirements.hotelPreference === 'Premium';

  // 1. Budget Compatibility (30 pts)
  const destAvgCost = isLuxury ? (destination.avgDailyBudgetLuxury || 5500) : (destination.avgDailyBudgetBudget || 1400);
  const estTripCost = destAvgCost * days;
  const budgetRatio = budget / estTripCost;
  let budgetScoreVal = 0;

  if (budgetRatio >= 0.85 && budgetRatio <= 1.55) {
    budgetScoreVal = 100;
    reasons.push(`Budget of ₹${budget.toLocaleString('en-IN')} fits comfortably for ${days} days`);
  } else if (budgetRatio > 1.55) {
    budgetScoreVal = Math.max(72, Math.round(96 - (budgetRatio - 1.55) * 6));
    reasons.push(`Easily affordable within ₹${budget.toLocaleString('en-IN')}`);
  } else if (budgetRatio >= 0.70) {
    budgetScoreVal = 80;
    reasons.push(`Manageable within budget with smart value stays`);
  } else {
    budgetScoreVal = Math.max(25, Math.round(budgetRatio * 55));
  }
  score += (budgetScoreVal * (defaultWeights.budgetMatch / 100));

  // 2. Duration Suitability (20 pts)
  const destCats = (destination.categories || []).map(c => String(c).toLowerCase());
  const isHillStation = destCats.some(c => c.includes('hill') || c.includes('nature'));
  const isCompact = ['yercaud', 'hogenakkal', 'courtallam', 'mahabalipuram', 'tiruvannamalai'].includes(destination.id);
  const isExtended = ['ooty', 'kodaikanal', 'munnar', 'wayanad'].includes(destination.id);
  
  let idealMin = isCompact ? 1 : isExtended ? 3 : 2;
  let idealMax = isCompact ? 2 : isExtended ? 5 : 4;

  let durationScoreVal = 60;
  if (days >= idealMin && days <= idealMax) {
    durationScoreVal = 100;
    reasons.push(`Ideal duration for a ${days}-day itinerary`);
  } else if (Math.abs(days - idealMin) === 1 || Math.abs(days - idealMax) === 1) {
    durationScoreVal = 82;
    reasons.push(`Well-suited for a ${days}-day visit`);
  } else {
    durationScoreVal = 48;
  }
  score += (durationScoreVal * (defaultWeights.durationMatch / 100));

  // 3. Travel Type Suitability (20 pts)
  let travelTypeScoreVal = 80;
  const scores = destination.scores || {};
  if (travelType === 'Family') {
    travelTypeScoreVal = scores.familyScore || 90;
    if (travelTypeScoreVal >= 92) reasons.push(`Exceptional family-friendly amenities & relaxed sightseeing`);
  } else if (travelType === 'Friends') {
    const advScore = scores.adventureScore || 65;
    const natScore = scores.natureScore || 75;
    travelTypeScoreVal = Math.min(100, Math.round((advScore * 0.55 + natScore * 0.45)));
    if (travelTypeScoreVal >= 85) reasons.push(`Great adventure trails & scenic viewpoints for friends`);
  } else if (travelType === 'Solo') {
    const cultScore = scores.cultureScore || 85;
    const accessScore = scores.accessibilityScore || 85;
    travelTypeScoreVal = Math.min(100, Math.round((cultScore * 0.55 + accessScore * 0.45)));
    if (travelTypeScoreVal >= 85) reasons.push(`Safe, culturally enriching & walkable for solo travelers`);
  } else if (travelType === 'Couple') {
    const natureScore = scores.natureScore || 85;
    const cultScore = scores.cultureScore || 80;
    travelTypeScoreVal = Math.min(100, Math.round(natureScore * 0.65 + cultScore * 0.35));
    if (travelTypeScoreVal >= 85) reasons.push(`Romantic misty panoramas and scenic heritage walks`);
  }
  score += (travelTypeScoreVal * (defaultWeights.travelTypeMatch / 100));

  // 4. Interests Alignment with Synonyms (20 pts)
  let interestScoreVal = 70;
  if (interests.length > 0) {
    let matches = 0;
    const destTags = (destination.tags || []).map(t => String(t).toLowerCase());
    const destText = `${destination.name || ''} ${destination.tagline || ''} ${destination.description || ''}`.toLowerCase();

    interests.forEach(interest => {
      const intLower = String(interest).toLowerCase();
      const synonyms = INTEREST_SYNONYMS[intLower] || [intLower];

      const matchCat = destCats.some(c => synonyms.some(syn => c.includes(syn) || syn.includes(c)));
      const matchTag = destTags.some(t => synonyms.some(syn => t.includes(syn) || syn.includes(t)));
      const matchText = synonyms.some(syn => destText.includes(syn));

      if (matchCat || matchTag || matchText) {
        matches++;
      }
    });

    interestScoreVal = Math.min(100, Math.round((matches / interests.length) * 100));
    if (matches > 0) {
      reasons.push(`Matches your passion for ${interests.slice(0, 2).join(' & ')}`);
    }
  }
  score += (interestScoreVal * (defaultWeights.interestMatch / 100));

  // 5. Weather, Accessibility & Distance (10 pts)
  const weatherScoreVal = destination.currentWeather?.rainAlert ? 65 : 95;
  score += (weatherScoreVal * (defaultWeights.weatherDistanceMatch / 100));

  const matchPercentage = Math.min(99, Math.max(50, Math.round(score)));
  const explanation = reasons.length > 0 ? reasons.slice(0, 3).join('. ') + '.' : `Great match for your travel parameters.`;

  return {
    matchPercentage,
    explanation,
    reasons
  };
}

// Top 3 Dynamic Destination Recommendations Endpoint
exports.recommendDestinations = async (req, res) => {
  try {
    const {
      budget = 10000,
      days = 3,
      travelType = 'Family',
      travelers = 2,
      interests = ['Nature', 'Heritage', 'Food'],
      hotelPreference = 'Budget',
      startingLocation = 'Salem'
    } = req.body;

    const db = getDb();
    const weights = db.adminSettings?.weights || {};
    const allDestinations = db.destinations || [];

    const scored = allDestinations.map(dest => {
      const match = calculateMatchScore(dest, {
        budget: Number(budget),
        days: Number(days),
        travelType,
        travelers: Number(travelers),
        interests,
        hotelPreference,
        startingLocation
      }, weights);

      // Estimate realistic budget range based on user's target budget and travel constraints
      const numDays = Math.max(1, Number(days));
      const numTravelers = Math.max(1, Number(travelers));
      const roomsNeeded = travelType === 'Family' || travelType === 'Couple' 
        ? Math.max(1, Math.ceil(numTravelers / 3)) 
        : travelType === 'Solo' ? 1 : Math.max(1, Math.ceil(numTravelers / 2));

      const isStrictBudget = (Number(budget) / numDays) < 2800;
      const baseRoom = isStrictBudget ? 750 : (hotelPreference === 'Luxury' ? 3500 : 1200);
      const foodPerDay = (isStrictBudget ? 180 : 350) * numTravelers;
      const localTransitPerDay = isStrictBudget ? 200 : (250 * numTravelers);
      const calculatedDaily = (baseRoom * roomsNeeded) + foodPerDay + localTransitPerDay;
      const calculatedTotal = calculatedDaily * numDays;

      const targetBudget = Number(budget) || calculatedTotal;
      const minEst = Math.round(Math.min(targetBudget * 0.85, Math.max(calculatedTotal * 0.88, targetBudget * 0.75)));
      const maxEst = Math.round(Math.min(targetBudget * 1.08, Math.max(calculatedTotal * 1.08, targetBudget * 1.02)));

      return {
        id: dest.id,
        name: dest.name,
        state: dest.state,
        tagline: dest.tagline,
        description: dest.description || dest.tagline,
        heroImage: dest.heroImage || (dest.attractions && dest.attractions[0]?.photo) || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
        categories: dest.categories || [],
        matchPercentage: match.matchPercentage,
        explanation: match.explanation,
        matchReasons: match.reasons,
        estimatedBudgetRange: `₹${minEst.toLocaleString('en-IN')} - ₹${maxEst.toLocaleString('en-IN')}`,
        avgDailyBudget: calculatedDaily,
        idealDays: (dest.categories?.some(c => c.toLowerCase().includes('hill')) ? '3-5 Days' : '2-3 Days'),
        suitableTravelTypes: (dest.scores?.familyScore >= 90 ? ['Family', 'Friends', 'Couple', 'Solo'] : ['Friends', 'Solo', 'Couple']),
        currentWeather: dest.currentWeather || { temp: "28°C", condition: "Pleasant" }
      };
    });

    // Sort descending by match score
    scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Return Top 3 recommendations
    const top3 = scored.slice(0, 3);

    res.json({
      success: true,
      count: top3.length,
      recommendations: top3,
      allRanked: scored
    });
  } catch (err) {
    console.error('Destination recommendation error:', err);
    res.status(500).json({ success: false, message: "Error calculating recommendations", error: err.message });
  }
};

// Generate complete AI trip plan
exports.generateTripPlan = async (req, res) => {
  try {
    let {
      prompt,
      startingLocation = "Salem",
      destinationId,
      days = 2,
      travelers = 2,
      budget = 5000,
      travelType = "Couple",
      interests = ["Nature", "Food"],
      hotelPreference = "Budget",
      transportPreference = "Private Cab / Train",
      accessibilityRequirements = [],
      foodPreference = "All"
    } = req.body;

    // If freeform natural language prompt is passed (e.g. "I have ₹5000 and want to visit Yercaud for 2 days. I like nature and food.")
    if (prompt && typeof prompt === 'string' && prompt.trim().length > 0) {
      const parsed = parseNaturalLanguageTripPrompt(prompt);
      destinationId = destinationId || parsed.destinationId;
      budget = parsed.budget || budget;
      days = parsed.days || days;
      travelers = parsed.travelers || travelers;
      travelType = parsed.travelType || travelType;
      startingLocation = parsed.startingLocation || startingLocation;
      interests = parsed.interests?.length > 0 ? parsed.interests : interests;
      hotelPreference = parsed.travelStyle || hotelPreference;
    }

    const db = getDb();
    const weights = db.adminSettings?.weights || {};

    // Pick target destination or select best matching destination from DB
    let selectedDest = null;
    if (destinationId) {
      selectedDest = db.destinations.find(d => d.id === destinationId || d.name.toLowerCase() === destinationId.toLowerCase());
    }

    if (!selectedDest) {
      let bestMatch = null;
      let highestScore = -1;
      db.destinations.forEach(dest => {
        const match = calculateMatchScore(dest, { days, budget, travelType, interests, hotelPreference, accessibilityNeeded: accessibilityRequirements.length > 0 }, weights);
        if (match.matchPercentage > highestScore) {
          highestScore = match.matchPercentage;
          bestMatch = dest;
        }
      });
      selectedDest = bestMatch || db.destinations[0];
    }

    const matchInfo = calculateMatchScore(selectedDest, { days, budget, travelType, interests, hotelPreference, accessibilityNeeded: accessibilityRequirements.length > 0 }, weights);

    // Calculate detailed budget breakdown
    const numDays = Math.min(5, Math.max(1, parseInt(days) || 2));
    const numTravelers = Math.min(8, Math.max(1, parseInt(travelers) || 2));
    const isLuxury = hotelPreference === 'Luxury' || hotelPreference === 'Premium';

    // Hotel selection & cost
    const hotels = selectedDest.hotels || [
      { name: `${selectedDest.name} Cozy Inn`, pricePerNight: isLuxury ? 3500 : 950, category: isLuxury ? 'Luxury' : 'Budget' }
    ];
    const availableHotels = hotels.filter(h => isLuxury ? h.category === 'Luxury' : h.category !== 'Luxury');
    const chosenHotel = availableHotels[0] || hotels[0];
    const accommodationCost = chosenHotel.pricePerNight * Math.max(1, numDays - 1);

    // Intercity & Local Transport
    const distFromOrigin = selectedDest.distanceFromSalem || 220;
    const transportRateKm = transportPreference.includes('Cab') ? 12 : 5;
    const intercityTransportCost = Math.round((distFromOrigin * 2 * transportRateKm) / Math.max(1, numTravelers / 2));
    const localTransportCost = Math.round(350 * numDays * numTravelers);

    // Food Cost
    const dailyFoodPerPerson = isLuxury ? 850 : 400;
    const totalFoodCost = dailyFoodPerPerson * numDays * numTravelers;

    // Entry fees & activities from verified database items
    const attractions = selectedDest.attractions || [];
    const hiddenGems = selectedDest.hiddenGems || [];
    const attractionEntryCost = attractions.slice(0, numDays * 2).reduce((sum, a) => sum + (a.cost || 0), 0) * numTravelers;

    const emergencyBuffer = Math.round((accommodationCost + intercityTransportCost + localTransportCost + totalFoodCost + attractionEntryCost) * 0.07);

    const totalEstimatedCost = accommodationCost + intercityTransportCost + localTransportCost + totalFoodCost + attractionEntryCost + emergencyBuffer;
    const perPersonCost = Math.round(totalEstimatedCost / numTravelers);
    const budgetVariance = parseInt(budget) - totalEstimatedCost;
    const isOverBudget = budgetVariance < 0;

    // Budget optimization suggestions if over budget
    const optimizationTips = [];
    if (isOverBudget) {
      optimizationTips.push({
        title: "Budget Optimization Alert",
        potentialSavings: Math.abs(budgetVariance),
        description: `Your current budget of ₹${parseInt(budget).toLocaleString('en-IN')} is slightly below the estimated ₹${totalEstimatedCost.toLocaleString('en-IN')}. We have auto-selected budget homestays and public walking loops to keep costs down.`
      });
      if (isLuxury) {
        optimizationTips.push({
          title: "Switch to Comfort / Budget Homestay",
          potentialSavings: chosenHotel.pricePerNight * (numDays - 1) * 0.45,
          description: "Choosing a local certified homestay saves ~45% on accommodation."
        });
      }
      optimizationTips.push({
        title: "Use Scenic Local Rail / Bus Transit",
        potentialSavings: Math.round(intercityTransportCost * 0.5),
        description: "Shared rail/bus transport cuts transit expenses by 50%."
      });
    }

    // Day-by-Day Structured Itinerary Construction
    const itineraryDays = [];
    const foodSpecialties = selectedDest.foodSpecialties || [];

    for (let day = 1; day <= numDays; day++) {
      const daySchedule = [];

      if (day === 1) {
        daySchedule.push({
          time: "07:30 AM",
          activity: `Depart from ${startingLocation} via ${transportPreference}`,
          category: "Travel",
          cost: 0,
          description: `Scenic journey to ${selectedDest.name} (${distFromOrigin} km, ~${Math.round(distFromOrigin / 45)} hours).`
        });
        daySchedule.push({
          time: "11:30 AM",
          activity: `Check-in at ${chosenHotel.name}`,
          category: "Hotel",
          cost: chosenHotel.pricePerNight,
          description: `Freshen up and settle in. Verified stay at ${chosenHotel.address || selectedDest.name}.`
        });
        daySchedule.push({
          time: "01:00 PM",
          activity: `Traditional Regional Lunch — ${foodSpecialties[0]?.name || 'Local Meal'}`,
          category: "Food",
          cost: 180,
          description: `Savor authentic local dishes at ${selectedDest.restaurants?.[0]?.name || 'Local Eatery'}.`
        });
        if (attractions[0]) {
          daySchedule.push({
            time: "02:30 PM",
            activity: `Visit ${attractions[0].name}`,
            category: "Attraction",
            cost: attractions[0].cost || 0,
            description: attractions[0].description,
            crowdInfo: "Estimated Crowd: Moderate",
            reasonForRecommendation: `Matches ${selectedDest.name} top attractions with high traveler ratings.`
          });
        }
        daySchedule.push({
          time: "05:45 PM",
          activity: `Sunset & Twilight Viewing at ${selectedDest.name} Viewpoint`,
          category: "Photography",
          cost: 0,
          description: "Capture stunning evening golden-hour views over the valley.",
          crowdInfo: "Estimated Crowd: High during sunset",
          reasonForRecommendation: "Prime sunset window for panoramic mountain photography."
        });
        daySchedule.push({
          time: "08:00 PM",
          activity: "Dinner & Local Spice Market Stroll",
          category: "Food",
          cost: 250,
          description: "Sample fresh treats and support local community craft shops."
        });
      } else if (day === numDays) {
        daySchedule.push({
          time: "08:00 AM",
          activity: "Morning Nature Walk & Breakfast",
          category: "Food",
          cost: 120,
          description: "Enjoy peaceful early morning mountain air before checkout."
        });
        if (hiddenGems[0]) {
          daySchedule.push({
            time: "09:30 AM",
            activity: `Hidden Gem Tour: ${hiddenGems[0].name}`,
            category: "Hidden Gem",
            cost: hiddenGems[0].cost || 0,
            description: hiddenGems[0].description,
            crowdInfo: `Estimated Crowd: ${hiddenGems[0].crowdLevel || 'Low'}`,
            reasonForRecommendation: "Quiet, peaceful hidden gem away from crowded tourist hotspots."
          });
        }
        daySchedule.push({
          time: "12:30 PM",
          activity: `Hotel Check-out & Farewell Lunch`,
          category: "Food",
          cost: 220,
          description: "Enjoy your final regional culinary specialties."
        });
        daySchedule.push({
          time: "03:00 PM",
          activity: `Return Journey to ${startingLocation}`,
          category: "Travel",
          cost: 0,
          description: "Comfortable transit back home with memorable travel experiences."
        });
      } else {
        const attIndex = (day - 1) % Math.max(1, attractions.length);
        daySchedule.push({
          time: "08:30 AM",
          activity: "Hearty Regional Breakfast",
          category: "Food",
          cost: 120,
          description: "Energizing morning meal before full day sightseeing."
        });
        if (attractions[attIndex]) {
          daySchedule.push({
            time: "10:00 AM",
            activity: `Explore ${attractions[attIndex].name}`,
            category: "Attraction",
            cost: attractions[attIndex].cost || 0,
            description: attractions[attIndex].description,
            crowdInfo: "Estimated Crowd: Low–Moderate in morning",
            reasonForRecommendation: "Best visited during morning hours before afternoon peak."
          });
        }
        daySchedule.push({
          time: "01:30 PM",
          activity: "Authentic Regional Lunch",
          category: "Food",
          cost: 200,
          description: "Taste traditional recipes cooked with local spices."
        });
        if (selectedDest.localExperiences?.[0]) {
          const exp = selectedDest.localExperiences[0];
          daySchedule.push({
            time: "03:30 PM",
            activity: `Local Experience: ${exp.title}`,
            category: "Experience",
            cost: exp.price || 0,
            description: exp.description,
            reasonForRecommendation: "Hands-on authentic cultural experience."
          });
        }
        daySchedule.push({
          time: "07:30 PM",
          activity: "Dinner & Evening Leisure",
          category: "Culture",
          cost: 300,
          description: "Relax under cool starry skies."
        });
      }

      itineraryDays.push({
        dayNumber: day,
        title: `Day ${day} — ${day === 1 ? 'Arrival & Panoramic Highlights' : day === numDays ? 'Hidden Discoveries & Departure' : 'Immersive Nature & Local Culture'}`,
        schedule: daySchedule
      });
    }

    const tripPlan = {
      destination: selectedDest,
      matchPercentage: matchInfo.matchPercentage,
      explanation: matchInfo.explanation,
      matchReasons: matchInfo.reasons,
      summary: {
        startingLocation,
        days: numDays,
        travelers: numTravelers,
        travelType,
        budgetInput: parseInt(budget),
        totalEstimatedCost,
        perPersonCost,
        budgetVariance,
        isOverBudget,
        currency: "₹"
      },
      budgetBreakdown: {
        accommodation: accommodationCost,
        intercityTransport: intercityTransportCost,
        localTransport: localTransportCost,
        food: totalFoodCost,
        activities: attractionEntryCost,
        emergencyBuffer,
        total: totalEstimatedCost
      },
      optimizationTips,
      chosenHotel,
      itineraryDays,
      weatherInfo: selectedDest.currentWeather || { condition: 'Pleasant', tempC: 20, rainAlert: false },
      crowdInfo: selectedDest.crowdLevel || 'Moderate',
      safetyInfo: selectedDest.safetyInfo || { generalRating: 4.8, womenSafety: 4.9 },
      ecoScore: selectedDest.scores?.ecoScore || 85
    };

    res.json({ success: true, tripPlan });
  } catch (err) {
    console.error('Trip plan generation error:', err);
    res.status(500).json({ success: false, message: "Error generating trip plan", error: err.message });
  }
};

// AI Tourism Chatbot handler — connects to LLM service abstraction with fail-safe fallback
exports.handleChatbotQuery = async (req, res) => {
  try {
    const {
      message,
      context = {},
      conversationHistory = []
    } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, reply: "Please provide a travel question." });
    }

    const mergedContext = {
      ...context,
      language: req.body.language || context.language || 'en',
      destinationId: req.body.destinationId || context.destinationId,
      currentDestination: req.body.currentDestination || context.currentDestination
    };

    const result = await getChatbotResponse({
      message,
      context: mergedContext,
      conversationHistory
    });

    res.json({
      success: true,
      reply: result.reply,
      language: mergedContext.language,
      provider: result.provider,
      isFallback: result.isFallback
    });
  } catch (err) {
    console.error('[AI Chatbot Controller] Error:', err);
    res.status(500).json({
      success: false,
      reply: "WayMate travel guide is ready to assist. How can I help with your destination, budget, or travel plans?",
      isFallback: true
    });
  }
};


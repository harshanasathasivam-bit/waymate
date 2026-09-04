const { getDb } = require('../config/db');
const { getChatbotResponse, parseNaturalLanguageTripPrompt } = require('../services/llmService');

// Calculate Match Score between user input and a destination
function calculateMatchScore(destination, userRequirements, weights = {}) {
  let score = 0;
  const reasons = [];

  const defaultWeights = {
    budgetMatch: 25,
    interestMatch: 25,
    durationMatch: 15,
    weatherMatch: 10,
    travelDistance: 10,
    familySuitability: 5,
    accessibility: 5,
    sustainability: 5,
    ...weights
  };

  // 1. Budget Match (25%)
  const dailyBudget = userRequirements.budget / (userRequirements.days || 1);
  const destAvgCost = userRequirements.hotelPreference === 'Luxury' ? destination.avgDailyBudgetLuxury : destination.avgDailyBudgetBudget;
  const budgetRatio = dailyBudget / (destAvgCost || 2000);
  let budgetScoreVal = 0;
  if (budgetRatio >= 0.9 && budgetRatio <= 1.5) {
    budgetScoreVal = 100;
    reasons.push(`Perfectly fits your ₹${userRequirements.budget.toLocaleString('en-IN')} budget`);
  } else if (budgetRatio > 1.5) {
    budgetScoreVal = 90;
    reasons.push(`Comfortably within your ₹${userRequirements.budget.toLocaleString('en-IN')} budget`);
  } else if (budgetRatio >= 0.7) {
    budgetScoreVal = 70;
    reasons.push(`Manageable within budget with light optimization`);
  } else {
    budgetScoreVal = 40;
  }
  score += (budgetScoreVal * (defaultWeights.budgetMatch / 100));

  // 2. Interest Match (25%)
  let interestMatches = 0;
  const userInterests = userRequirements.interests || [];
  if (userInterests.length > 0 && destination.categories) {
    userInterests.forEach(interest => {
      if (destination.categories.includes(interest)) {
        interestMatches++;
      }
    });
    const interestScoreVal = Math.min(100, (interestMatches / userInterests.length) * 100);
    score += (interestScoreVal * (defaultWeights.interestMatch / 100));
    if (interestMatches > 0) {
      reasons.push(`Matches your interest in ${userInterests.slice(0, 2).join(' & ')}`);
    }
  } else {
    score += (80 * (defaultWeights.interestMatch / 100));
  }

  // 3. Duration Match (15%)
  let durationScoreVal = 90;
  if (userRequirements.days >= 2 && userRequirements.days <= 5) {
    durationScoreVal = 100;
    reasons.push(`Ideal for a ${userRequirements.days}-day trip`);
  }
  score += (durationScoreVal * (defaultWeights.durationMatch / 100));

  // 4. Weather Match (10%)
  const rainAlert = destination.currentWeather?.rainAlert;
  const weatherScoreVal = rainAlert ? 60 : 95;
  score += (weatherScoreVal * (defaultWeights.weatherMatch / 100));
  if (!rainAlert && destination.currentWeather?.condition) {
    reasons.push(`Favorable weather forecast (${destination.currentWeather.condition})`);
  }

  // 5. Travel Distance (10%)
  let distScoreVal = 85;
  if (destination.distanceFromSalem && destination.distanceFromSalem <= 300) {
    distScoreVal = 100;
    reasons.push(`Convenient distance (${destination.distanceFromSalem} km from starting point)`);
  }
  score += (distScoreVal * (defaultWeights.travelDistance / 100));

  // 6. Family Suitability (5%)
  const familyScoreVal = userRequirements.travelType === 'Family' ? (destination.scores?.familyScore || 85) : 85;
  score += (familyScoreVal * (defaultWeights.familySuitability / 100));

  // 7. Accessibility (5%)
  let accessScoreVal = destination.scores?.accessibilityScore || 80;
  if (userRequirements.accessibilityNeeded) {
    reasons.push(`Includes senior & wheelchair friendly options`);
  }
  score += (accessScoreVal * (defaultWeights.accessibility / 100));

  // 8. Sustainability (5%)
  score += ((destination.scores?.ecoScore || 80) * (defaultWeights.sustainability / 100));

  const matchPercentage = Math.min(99, Math.round(score));
  const explanation = `Recommended because it ${reasons.slice(0, 3).join(', ')}.`;

  return {
    matchPercentage,
    explanation,
    reasons
  };
}

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


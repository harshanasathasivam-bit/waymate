const { getDb } = require('../config/db');

// Calculate Match Score between user input and a destination
function calculateMatchScore(destination, userRequirements, weights) {
  let score = 0;
  const reasons = [];

  // 1. Budget Match (25%)
  const dailyBudget = userRequirements.budget / (userRequirements.days || 1);
  const destAvgCost = userRequirements.hotelPreference === 'Luxury' ? destination.avgDailyBudgetLuxury : destination.avgDailyBudgetBudget;
  const budgetRatio = dailyBudget / destAvgCost;
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
  score += (budgetScoreVal * (weights.budgetMatch / 100));

  // 2. Interest Match (25%)
  let interestMatches = 0;
  const userInterests = userRequirements.interests || [];
  if (userInterests.length > 0) {
    userInterests.forEach(interest => {
      if (destination.categories.includes(interest)) {
        interestMatches++;
      }
    });
    const interestScoreVal = Math.min(100, (interestMatches / userInterests.length) * 100);
    score += (interestScoreVal * (weights.interestMatch / 100));
    if (interestMatches > 0) {
      reasons.push(`Matches your interest in ${userInterests.slice(0, 2).join(' & ')}`);
    }
  } else {
    score += (80 * (weights.interestMatch / 100));
  }

  // 3. Duration Match (15%)
  let durationScoreVal = 90;
  if (userRequirements.days >= 2 && userRequirements.days <= 5) {
    durationScoreVal = 100;
    reasons.push(`Ideal for a ${userRequirements.days}-day trip`);
  }
  score += (durationScoreVal * (weights.durationMatch / 100));

  // 4. Weather Match (10%)
  const weatherScoreVal = destination.currentWeather.rainAlert ? 60 : 95;
  score += (weatherScoreVal * (weights.weatherMatch / 100));
  if (!destination.currentWeather.rainAlert) {
    reasons.push(`Favorable weather forecast (${destination.currentWeather.condition})`);
  }

  // 5. Travel Distance (10%)
  let distScoreVal = 85;
  if (destination.distanceFromSalem <= 300) {
    distScoreVal = 100;
    reasons.push(`Convenient distance (${destination.distanceFromSalem} km from starting point)`);
  }
  score += (distScoreVal * (weights.travelDistance / 100));

  // 6. Family Suitability (5%)
  const familyScoreVal = userRequirements.travelType === 'Family' ? destination.scores.familyScore : 85;
  score += (familyScoreVal * (weights.familySuitability / 100));

  // 7. Accessibility (5%)
  let accessScoreVal = destination.scores.accessibilityScore;
  if (userRequirements.accessibilityNeeded) {
    reasons.push(`Includes senior & wheelchair friendly options`);
  }
  score += (accessScoreVal * (weights.accessibility / 100));

  // 8. Sustainability (5%)
  score += (destination.scores.ecoScore * (weights.sustainability / 100));

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
    const {
      startingLocation = "Salem",
      destinationId,
      days = 3,
      travelers = 2,
      budget = 15000,
      travelType = "Family",
      interests = ["Nature", "Food"],
      hotelPreference = "Budget",
      transportPreference = "Private Cab / Train",
      accessibilityRequirements = [],
      foodPreference = "All"
    } = req.body;

    const db = getDb();
    const weights = db.adminSettings.weights;

    // Pick target destination or select best matching destination
    let selectedDest = null;
    if (destinationId) {
      selectedDest = db.destinations.find(d => d.id === destinationId);
    }

    if (!selectedDest) {
      // Find top match
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
    const numDays = parseInt(days) || 3;
    const numTravelers = parseInt(travelers) || 2;
    const isLuxury = hotelPreference === 'Luxury';

    // Hotel selection & cost
    const availableHotels = selectedDest.hotels.filter(h => isLuxury ? h.category === 'Luxury' : h.category !== 'Luxury');
    const chosenHotel = availableHotels[0] || selectedDest.hotels[0];
    const accommodationCost = chosenHotel.pricePerNight * (numDays - 1);

    // Intercity & Local Transport
    const transportRateKm = transportPreference.includes('Cab') ? 14 : 6;
    const intercityTransportCost = Math.round((selectedDest.distanceFromSalem * 2 * transportRateKm) / Math.max(1, numTravelers / 2));
    const localTransportCost = Math.round(400 * numDays * numTravelers);

    // Food Cost
    const dailyFoodPerPerson = isLuxury ? 900 : 450;
    const totalFoodCost = dailyFoodPerPerson * numDays * numTravelers;

    // Entry fees & activities
    const attractionEntryCost = selectedDest.attractions.reduce((sum, a) => sum + (a.cost || 0), 0) * numTravelers;

    const emergencyBuffer = Math.round((accommodationCost + intercityTransportCost + localTransportCost + totalFoodCost + attractionEntryCost) * 0.08);

    const totalEstimatedCost = accommodationCost + intercityTransportCost + localTransportCost + totalFoodCost + attractionEntryCost + emergencyBuffer;
    const perPersonCost = Math.round(totalEstimatedCost / numTravelers);
    const budgetVariance = budget - totalEstimatedCost;
    const isOverBudget = budgetVariance < 0;

    // Budget optimization suggestions if over budget
    const optimizationTips = [];
    if (isOverBudget) {
      if (isLuxury) {
        optimizationTips.push({
          title: "Switch to Mid-Range / Budget Hotel",
          potentialSavings: chosenHotel.pricePerNight * (numDays - 1) * 0.4,
          description: "Choosing a comfort 3-star hotel saves approx 40% on accommodation."
        });
      }
      optimizationTips.push({
        title: "Use Shared Express Transport / Train",
        potentialSavings: Math.round(intercityTransportCost * 0.5),
        description: "Opting for high-speed train or luxury Volvo bus cuts transport costs significantly."
      });
      optimizationTips.push({
        title: "Combine Local Sightseeing Walks",
        potentialSavings: Math.round(localTransportCost * 0.3),
        description: "Group nearby attractions into pedestrian walking loops."
      });
    }

    // Day-by-Day Itinerary Construction
    const itineraryDays = [];
    const attractions = selectedDest.attractions || [];
    const hiddenGems = selectedDest.hiddenGems || [];
    const foodSpecialties = selectedDest.foodSpecialties || [];

    for (let day = 1; day <= numDays; day++) {
      const daySchedule = [];

      if (day === 1) {
        daySchedule.push({
          time: "07:30 AM",
          activity: `Depart from ${startingLocation} via ${transportPreference}`,
          category: "Travel",
          cost: 0,
          description: `Scenic drive to ${selectedDest.name} (${selectedDest.distanceFromSalem} km, ~${Math.round(selectedDest.distanceFromSalem / 45)} hours)`
        });
        daySchedule.push({
          time: "11:30 AM",
          activity: `Check-in at ${chosenHotel.name}`,
          category: "Hotel",
          cost: chosenHotel.pricePerNight,
          description: `Freshen up and enjoy welcome mountain herbal tea at ${chosenHotel.address}`
        });
        daySchedule.push({
          time: "01:00 PM",
          activity: `Traditional Lunch - ${foodSpecialties[0]?.name || 'Local Cuisine'}`,
          category: "Food",
          cost: 200,
          description: `Savor authentic local dishes at ${selectedDest.restaurants[0]?.name || 'Local Eatery'}`
        });
        if (attractions[0]) {
          daySchedule.push({
            time: "02:30 PM",
            activity: `Visit ${attractions[0].name}`,
            category: "Attraction",
            cost: attractions[0].cost,
            description: attractions[0].description,
            accessibilityNote: attractions[0].accessibility
          });
        }
        daySchedule.push({
          time: "06:00 PM",
          activity: `Sunset & Photography at ${selectedDest.name} Viewpoint`,
          category: "Photography",
          cost: 0,
          description: "Capture stunning evening twilight angles with golden hour lighting."
        });
        daySchedule.push({
          time: "08:00 PM",
          activity: "Dinner & Local Craft Market Stroll",
          category: "Food",
          cost: 300,
          description: "Sample street treats and purchase local spices and souvenirs."
        });
      } else if (day === numDays) {
        daySchedule.push({
          time: "08:00 AM",
          activity: "Breakfast & Morning Nature Walk",
          category: "Food",
          cost: 150,
          description: "Enjoy peaceful early morning air before packing."
        });
        if (hiddenGems[0]) {
          daySchedule.push({
            time: "09:30 AM",
            activity: `Hidden Gem Tour: ${hiddenGems[0].name}`,
            category: "Hidden Gem",
            cost: hiddenGems[0].cost,
            description: hiddenGems[0].description,
            crowdNote: `Estimated Crowd: ${hiddenGems[0].crowdLevel}`
          });
        }
        daySchedule.push({
          time: "12:30 PM",
          activity: `Hotel Check-out & Farewell Lunch`,
          category: "Food",
          cost: 250,
          description: "Wrap up your stay with regional culinary favorites."
        });
        daySchedule.push({
          time: "03:00 PM",
          activity: `Return Journey to ${startingLocation}`,
          category: "Travel",
          cost: 0,
          description: "Comfortable transit back home with memorable travel memories."
        });
      } else {
        // Middle days
        const attIndex = (day - 1) % attractions.length;
        daySchedule.push({
          time: "08:30 AM",
          activity: "Hearty Breakfast at Hotel",
          category: "Food",
          cost: 150,
          description: "Energy booster for a full day of sightseeing."
        });
        if (attractions[attIndex]) {
          daySchedule.push({
            time: "10:00 AM",
            activity: `Explore ${attractions[attIndex].name}`,
            category: "Attraction",
            cost: attractions[attIndex].cost,
            description: attractions[attIndex].description
          });
        }
        daySchedule.push({
          time: "01:30 PM",
          activity: "Authentic Regional Lunch",
          category: "Food",
          cost: 220,
          description: "Try regional specialties and herbal cooling drinks."
        });
        if (selectedDest.localExperiences[0]) {
          const exp = selectedDest.localExperiences[0];
          daySchedule.push({
            time: "03:30 PM",
            activity: `Local Experience: ${exp.title}`,
            category: "Experience",
            cost: exp.price,
            description: exp.description
          });
        }
        daySchedule.push({
          time: "07:30 PM",
          activity: "Dinner & Cultural Performance / Fireside Relaxing",
          category: "Culture",
          cost: 350,
          description: "Relax under starry night skies."
        });
      }

      itineraryDays.push({
        dayNumber: day,
        title: `Day ${day} — ${day === 1 ? 'Arrival & Highlights' : day === numDays ? 'Hidden Discoveries & Departure' : 'Immersion & Local Culture'}`,
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
      weatherInfo: selectedDest.currentWeather,
      crowdInfo: selectedDest.crowdLevel,
      safetyInfo: selectedDest.safetyInfo,
      ecoScore: selectedDest.scores.ecoScore
    };

    res.json({ success: true, tripPlan });
  } catch (err) {
    console.error('Trip plan generation error:', err);
    res.status(500).json({ success: false, message: "Error generating trip plan", error: err.message });
  }
};

// AI Tourism Chatbot handler
exports.handleChatbotQuery = async (req, res) => {
  try {
    const { message } = req.body;
    const db = getDb();
    const destinations = db.destinations;

    const lowerMsg = (message || "").toLowerCase();
    let reply = "";

    if (lowerMsg.includes('5000') || lowerMsg.includes('5,000') || lowerMsg.includes('budget') || lowerMsg.includes('cheap')) {
      reply = `For a budget of ₹5,000, **Yercaud** is an outstanding pick from Salem! It's just 30 km away, keeping transport costs under ₹300. You can enjoy Emerald Lake boating, Pagoda Point views, and stay at cozy budget lodges for ~₹900/night. Alternatively, **Ooty** budget homestays are also doable!`;
    } else if (lowerMsg.includes('family') || lowerMsg.includes('parents') || lowerMsg.includes('senior')) {
      reply = `For family and senior citizen travel, I highly recommend **Munnar** or **Ooty**. They feature paved walkways, accessible shuttle transport at major attractions like Eravikulam and Botanical Gardens, low walking paths, and peaceful, scenic weather!`;
    } else if (lowerMsg.includes('photography') || lowerMsg.includes('photo')) {
      reply = `If you love photography, **Munnar** (for cloud-bed sunrises at Kolukkumalai 7,900 ft), **Kodaikanal** (for Coaker's Walk fog & Poombarai village terraced garlic fields), and **Wayanad** (for prehistoric Edakkal rock petroglyphs) are world-class!`;
    } else if (lowerMsg.includes('food') || lowerMsg.includes('eat')) {
      reply = `Must-try local culinary delights:
1. **Munnar**: Traditional Kerala Banana Leaf Sadhya & Fresh Mountain Trout.
2. **Ooty**: Freshly baked Nilgiri Varkey pastries & handmade artisan dark chocolates.
3. **Wayanad**: Bamboo Shoot curry with red rice & Malabar parotta.`;
    } else if (lowerMsg.includes('weather') || lowerMsg.includes('rain')) {
      reply = `Current Weather Overview:
• **Munnar**: 19°C, Partly Cloudy (Pleasant afternoon walks).
• **Wayanad**: 22°C, Sunny & Breezy (Great for Jeep safari).
• **Ooty**: 17°C, Crisp mountain mist.
• **Yercaud**: 21°C, Clear skies.`;
    } else {
      reply = `Hello traveler! I am **SmartTour AI**, your intelligent travel assistant. You can ask me about dynamic trip creation, budget optimization under ₹10,000, senior-friendly itineraries, secret hidden gems in Kerala & Tamil Nadu, or weather advisories. How can I help plan your next journey?`;
    }

    res.json({ success: true, reply });
  } catch (err) {
    res.status(500).json({ success: false, reply: "SmartTour AI service currently busy. Please try again." });
  }
};

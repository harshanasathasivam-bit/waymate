const express = require('express');
const router = express.Router();
const { getDb, saveStore } = require('../config/db');

// Admin Analytics Dashboard Summary
router.get('/analytics', (req, res) => {
  try {
    const db = getDb();
    const totalUsers = db.users.length;
    const totalDestinations = db.destinations.length;
    const totalTrips = db.itineraries.length;
    const totalEnquiries = db.enquiries.length;
    const totalReviews = db.reviews.length;

    // Destination popularity chart data
    const destPopularity = db.destinations.map(d => ({
      name: d.name,
      score: d.scores.natureScore + d.scores.budgetScore,
      ecoScore: d.scores.ecoScore
    }));

    // User Travel Preferences breakdown
    const categoryCounts = {
      Nature: 14,
      Family: 18,
      Photography: 12,
      Budget: 16,
      Adventure: 8,
      Honeymoon: 6,
      SeniorFriendly: 10
    };

    res.json({
      success: true,
      analytics: {
        totalUsers: totalUsers + 124, // baseline + active
        totalDestinations,
        totalTripsGenerated: totalTrips + 342,
        totalEnquiries,
        totalReviews,
        estimatedRevenue: "₹4,85,000",
        destPopularity,
        categoryCounts,
        weights: db.adminSettings.weights
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching analytics" });
  }
});

// Update recommendation weights
router.put('/weights', (req, res) => {
  try {
    const { weights } = req.body;
    if (!weights) {
      return res.status(400).json({ success: false, message: "Weights object required" });
    }

    const db = getDb();
    db.adminSettings.weights = { ...db.adminSettings.weights, ...weights };
    saveStore();

    res.json({ success: true, weights: db.adminSettings.weights });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating weights" });
  }
});

// Add new destination
router.post('/destinations', (req, res) => {
  try {
    const { name, state, tagline, description, heroImage, distanceFromSalem, avgDailyBudgetBudget } = req.body;
    const db = getDb();

    const newDest = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name,
      state: state || "Tamil Nadu",
      region: "South India",
      tagline: tagline || "Exploration & Natural Wonder",
      description: description || "Detailed tourist destination overview.",
      heroImage: heroImage || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      images: [heroImage || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"],
      coordinates: { lat: 10.5, lng: 77.5 },
      distanceFromSalem: parseInt(distanceFromSalem) || 200,
      distanceFromBangalore: 350,
      distanceFromChennai: 450,
      distanceFromKochi: 250,
      avgDailyBudgetBudget: parseInt(avgDailyBudgetBudget) || 2000,
      avgDailyBudgetLuxury: 6000,
      bestSeason: "October to May",
      categories: ["Nature", "Family", "Budget"],
      scores: {
        budgetScore: 85,
        natureScore: 90,
        cultureScore: 75,
        adventureScore: 70,
        familyScore: 88,
        accessibilityScore: 80,
        ecoScore: 85
      },
      currentWeather: {
        temp: "22°C",
        condition: "Pleasant",
        rainProbability: "10%",
        rainAlert: false
      },
      crowdLevel: { status: "Moderate", badgeColor: "🟡" },
      safetyInfo: { overall: "Safe tourist area.", policeContact: "100", hospitalContact: "108" },
      attractions: [],
      hotels: [],
      hiddenGems: [],
      localExperiences: []
    };

    db.destinations.push(newDest);
    saveStore();

    res.json({ success: true, destination: newDest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding destination" });
  }
});

// Delete destination
router.delete('/destinations/:id', (req, res) => {
  try {
    const db = getDb();
    db.destinations = db.destinations.filter(d => d.id !== req.params.id);
    saveStore();
    res.json({ success: true, message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting destination" });
  }
});

module.exports = router;

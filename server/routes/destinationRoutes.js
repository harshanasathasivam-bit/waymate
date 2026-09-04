const express = require('express');
const router = express.Router();
const { getDb, saveStore } = require('../config/db');

// Get all destinations with filtering
router.get('/', (req, res) => {
  try {
    const { category, search, maxBudget, accessibility } = req.query;
    const db = getDb();
    let result = db.destinations;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.state.toLowerCase().includes(query) ||
        d.tagline.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
      );
    }

    if (category) {
      result = result.filter(d => d.categories.includes(category));
    }

    if (maxBudget) {
      const maxB = parseFloat(maxBudget);
      result = result.filter(d => d.avgDailyBudgetBudget <= maxB);
    }

    if (accessibility === 'true') {
      result = result.filter(d => d.scores.accessibilityScore >= 75);
    }

    res.json({ success: true, count: result.length, destinations: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching destinations" });
  }
});

// Destination details by ID
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const dest = db.destinations.find(d => d.id === req.params.id);
    if (!dest) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }
    const reviews = db.reviews.filter(r => r.destinationId === dest.id);
    res.json({ success: true, destination: dest, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching destination details" });
  }
});

// Compare up to 3 destinations
router.post('/compare', (req, res) => {
  try {
    const { destinationIds = [] } = req.body;
    const db = getDb();
    const selected = db.destinations.filter(d => destinationIds.includes(d.id));
    res.json({ success: true, destinations: selected });
  } catch (err) {
    res.status(500).json({ success: false, message: "Comparison error" });
  }
});

// Get Hidden Gems across destinations
router.get('/meta/hidden-gems', (req, res) => {
  try {
    const db = getDb();
    const hiddenGems = [];
    db.destinations.forEach(dest => {
      if (dest.hiddenGems) {
        dest.hiddenGems.forEach(hg => {
          hiddenGems.push({
            ...hg,
            destinationName: dest.name,
            destinationId: dest.id,
            state: dest.state
          });
        });
      }
    });
    res.json({ success: true, count: hiddenGems.length, hiddenGems });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching hidden gems" });
  }
});

// Get Local Experiences
router.get('/meta/experiences', (req, res) => {
  try {
    const db = getDb();
    const experiences = [];
    db.destinations.forEach(dest => {
      if (dest.localExperiences) {
        dest.localExperiences.forEach(exp => {
          experiences.push({
            ...exp,
            destinationName: dest.name,
            destinationId: dest.id
          });
        });
      }
    });
    res.json({ success: true, count: experiences.length, experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching experiences" });
  }
});

// Add Review
router.post('/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    const { userName, rating, comment, crowded, childFriendly, parkingAvailable } = req.body;

    const db = getDb();
    const newReview = {
      id: 'rev_' + Date.now(),
      destinationId: id,
      userName: userName || "Traveler",
      rating: parseInt(rating) || 5,
      comment: comment || "",
      crowded: crowded || "Moderate",
      childFriendly: childFriendly || "Yes",
      parkingAvailable: parkingAvailable || "Yes",
      travelDate: new Date().toISOString().split('T')[0],
      userPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    };

    db.reviews.push(newReview);
    saveStore();
    res.json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error posting review" });
  }
});

module.exports = router;

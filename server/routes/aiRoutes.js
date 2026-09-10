const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Dynamic Destination Recommendations (Top 3 Ranked)
router.post('/recommend', aiController.recommendDestinations);

// Generate personalized trip plan & day-wise itinerary
router.post('/plan', aiController.generateTripPlan);
router.post('/itinerary', aiController.generateTripPlan);

// AI Chatbot query
router.post('/chatbot', aiController.handleChatbotQuery);

module.exports = router;


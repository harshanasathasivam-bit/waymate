const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Generate personalized trip plan
router.post('/plan', aiController.generateTripPlan);

// AI Chatbot query
router.post('/chatbot', aiController.handleChatbotQuery);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getDb, saveStore } = require('../config/db');

// Save trip plan
router.post('/save', (req, res) => {
  try {
    const { userId = "guest", tripPlan } = req.body;
    if (!tripPlan) {
      return res.status(400).json({ success: false, message: "Trip plan data is required" });
    }

    const db = getDb();
    const savedTrip = {
      id: 'trip_' + Date.now(),
      userId,
      title: `${tripPlan.destination.name} ${tripPlan.summary.days}-Day Personalized Journey`,
      destinationId: tripPlan.destination.id,
      destinationName: tripPlan.destination.name,
      createdAt: new Date().toISOString(),
      status: 'Upcoming',
      tripPlan
    };

    db.itineraries.push(savedTrip);
    saveStore();

    res.json({ success: true, savedTrip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save trip", error: err.message });
  }
});

// Get user trips
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDb();
    const trips = db.itineraries.filter(t => t.userId === userId || userId === 'guest');
    res.json({ success: true, count: trips.length, trips });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching user trips" });
  }
});

// Delete trip
router.delete('/:tripId', (req, res) => {
  try {
    const { tripId } = req.params;
    const db = getDb();
    db.itineraries = db.itineraries.filter(t => t.id !== tripId);
    saveStore();
    res.json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting trip" });
  }
});

// Custom Recalculate trip route
router.post('/recalculate', (req, res) => {
  try {
    const { tripPlan, modifiedItineraryDays, updatedHotelCost } = req.body;
    if (!tripPlan) {
      return res.status(400).json({ success: false, message: "Missing trip plan" });
    }

    const numTravelers = tripPlan.summary.travelers || 2;
    const numDays = tripPlan.summary.days || 3;

    // Recalculate activities cost from modified itinerary
    let newActivitiesCost = 0;
    modifiedItineraryDays.forEach(day => {
      day.schedule.forEach(item => {
        if (item.category === 'Attraction' || item.category === 'Experience' || item.category === 'Hidden Gem') {
          newActivitiesCost += (item.cost || 0) * numTravelers;
        }
      });
    });

    const newHotelCost = updatedHotelCost !== undefined ? updatedHotelCost : tripPlan.budgetBreakdown.accommodation;
    const intercity = tripPlan.budgetBreakdown.intercityTransport;
    const localTrans = tripPlan.budgetBreakdown.localTransport;
    const food = tripPlan.budgetBreakdown.food;

    const newTotal = newHotelCost + intercity + localTrans + food + newActivitiesCost;
    const newEmergency = Math.round(newTotal * 0.08);
    const finalTotal = newTotal + newEmergency;

    const updatedPlan = {
      ...tripPlan,
      itineraryDays: modifiedItineraryDays,
      summary: {
        ...tripPlan.summary,
        totalEstimatedCost: finalTotal,
        perPersonCost: Math.round(finalTotal / numTravelers),
        budgetVariance: tripPlan.summary.budgetInput - finalTotal,
        isOverBudget: (tripPlan.summary.budgetInput - finalTotal) < 0
      },
      budgetBreakdown: {
        ...tripPlan.budgetBreakdown,
        accommodation: newHotelCost,
        activities: newActivitiesCost,
        emergencyBuffer: newEmergency,
        total: finalTotal
      }
    };

    res.json({ success: true, tripPlan: updatedPlan });
  } catch (err) {
    res.status(500).json({ success: false, message: "Recalculation error", error: err.message });
  }
});

module.exports = router;

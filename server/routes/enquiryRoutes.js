const express = require('express');
const router = express.Router();
const { getDb, saveStore } = require('../config/db');

// Submit new enquiry / booking request
router.post('/', (req, res) => {
  try {
    const { name, contact, email, travelDates, numPeople, requirements, budget, destinationName, type = "Custom Trip" } = req.body;
    if (!name || !contact) {
      return res.status(400).json({ success: false, message: "Name and contact info required" });
    }

    const db = getDb();
    const newEnquiry = {
      id: 'enq_' + Date.now(),
      name,
      contact,
      email: email || "",
      travelDates: travelDates || "Flexible",
      numPeople: parseInt(numPeople) || 2,
      requirements: requirements || "",
      budget: budget || "₹15,000",
      destinationName: destinationName || "Custom Tour",
      type,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    db.enquiries.push(newEnquiry);
    saveStore();

    res.json({ success: true, enquiry: newEnquiry, message: "Enquiry submitted successfully. Our travel coordinator will contact you shortly." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error submitting enquiry" });
  }
});

// Get enquiries (Admin / Support)
router.get('/', (req, res) => {
  try {
    const db = getDb();
    res.json({ success: true, count: db.enquiries.length, enquiries: db.enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching enquiries" });
  }
});

// Update enquiry status
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const db = getDb();
    const enquiry = db.enquiries.find(e => e.id === req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    enquiry.status = status;
    saveStore();

    res.json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
});

module.exports = router;

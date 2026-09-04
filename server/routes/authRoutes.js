const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDb, saveStore } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'smarttour_super_secret_key_2026';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, homeLocation = "Salem", preferences = {} } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password required" });
    }

    const db = getDb();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password: hashedPassword,
      role: email.includes('admin') ? 'admin' : 'user',
      homeLocation,
      preferences: {
        budgetRange: "₹10,000 - ₹20,000",
        foodPreference: "All",
        travelStyle: "Cultural Heritage & Scenic",
        accessibilityRequirements: [],
        favoriteDestinations: [],
        ...preferences
      },
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveStore();

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    
    // Omit password from response
    const { password: _, ...userWithoutPass } = newUser;
    res.json({ success: true, token, user: userWithoutPass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const db = getDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userWithoutPass } = user;
    res.json({ success: true, token, user: userWithoutPass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
});

// Get Current User Profile (with JWT verification)
router.get('/profile', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const db = getDb();
    const user = db.users.find(u => u.id === decoded.id || u.email.toLowerCase() === decoded.email?.toLowerCase());
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password: _, ...userWithoutPass } = user;
    res.json({ success: true, user: userWithoutPass });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

// Profile update
router.put('/profile', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let targetUserId = req.body.userId;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        targetUserId = decoded.id;
      } catch (e) {}
    }

    const { name, homeLocation, preferences } = req.body;
    const db = getDb();
    const user = db.users.find(u => u.id === targetUserId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (homeLocation) user.homeLocation = homeLocation;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    saveStore();
    const { password: _, ...userWithoutPass } = user;
    res.json({ success: true, user: userWithoutPass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
});

// Travel Circle: Update Location Sharing Status
router.post('/travel-circle/share', (req, res) => {
  try {
    const { userId = "guest", isSharing = true, destination = "Munnar", approxLocation = "Tea Estate Viewpoint", battery = 88 } = req.body;
    const db = getDb();
    if (!db.travelCircle) {
      db.travelCircle = [];
    }

    const existingIdx = db.travelCircle.findIndex(c => c.userId === userId || c.id === userId);
    const companionRecord = {
      id: userId,
      userId,
      name: req.body.name || "Adventurous Explorer",
      avatar: req.body.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSharing,
      destination,
      currentPlace: isSharing ? approxLocation : "Sharing Paused",
      eta: "35 mins",
      battery,
      status: isSharing ? "Active on Trail" : "Offline",
      lastUpdated: isSharing ? "Just now" : "Recently",
      shareCode: "WAY-" + destination.toUpperCase().slice(0, 4) + "-884"
    };

    if (existingIdx >= 0) {
      db.travelCircle[existingIdx] = companionRecord;
    } else {
      db.travelCircle.push(companionRecord);
    }

    saveStore();
    res.json({ success: true, companionRecord });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update location sharing status" });
  }
});

// Travel Circle: Get Companion Status
router.get('/travel-circle/status', (req, res) => {
  try {
    const db = getDb();
    const defaultCompanions = [
      {
        id: "comp_1",
        name: "Priya Sundaram",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        destination: "Munnar",
        currentPlace: "Eravikulam National Park Entrance",
        eta: "15 mins",
        battery: 84,
        status: "Active on Trail",
        lastUpdated: "3 mins ago"
      },
      {
        id: "comp_2",
        name: "Karthik Raja",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        destination: "Yercaud",
        currentPlace: "Emerald Lake Boating Hub",
        eta: "Arrived",
        battery: 62,
        status: "At Destination",
        lastUpdated: "8 mins ago"
      },
      {
        id: "comp_3",
        name: "Ananya Iyer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        destination: "Chennai",
        currentPlace: "Mylapore Kapaleeshwarar Promenade",
        eta: "45 mins",
        battery: 91,
        status: "En Route",
        lastUpdated: "12 mins ago"
      }
    ];

    const circle = db.travelCircle && db.travelCircle.length > 0 ? db.travelCircle : defaultCompanions;
    res.json({ success: true, count: circle.length, companions: circle });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching travel circle status" });
  }
});

// Travel Circle: Join using Invite Code
router.post('/travel-circle/join', (req, res) => {
  try {
    const { code } = req.body;
    if (!code || code.trim() === '') {
      return res.status(400).json({ success: false, message: "Invite code is required" });
    }

    res.json({
      success: true,
      message: `Successfully connected to Travel Circle via invite code ${code.trim().toUpperCase()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to join travel circle" });
  }
});

module.exports = router;

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

// Profile update
router.put('/profile', (req, res) => {
  try {
    const { userId, name, homeLocation, preferences } = req.body;
    const db = getDb();
    const user = db.users.find(u => u.id === userId);
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

module.exports = router;

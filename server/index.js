const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const placeRoutes = require('./routes/placeRoutes');
const { connectMongoDB } = require('./config/mongodb');
const { seedPlaces } = require('./scripts/seedPlaces');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & initialize seed state
connectMongoDB().then(() => {
  seedPlaces().catch(e => console.warn('Seed places background notice:', e.message));
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'SmartTour Platform API',
    timestamp: new Date().toISOString()
  });
});

// Production client static serving
if (process.env.NODE_ENV === 'production' || require('fs').existsSync(path.join(__dirname, '../client/dist'))) {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SmartTour API Server running on port ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

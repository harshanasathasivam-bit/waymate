const mongoose = require('mongoose');

let isConnected = false;

/**
 * Connect to MongoDB with auto-reconnect and graceful error handling.
 */
async function connectMongoDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/waymate';
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    console.log(`🔌 Attempting MongoDB connection to: ${uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    await mongoose.connect(uri, options);
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB database');
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ MongoDB connection warning: ${err.message}`);
    console.warn('ℹ️ System will run with hybrid memory/store fallback if local MongoDB is not running.');
  }

  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('🟢 MongoDB connection established');
  });

  mongoose.connection.on('error', (err) => {
    isConnected = false;
    console.error(`🔴 MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('🟡 MongoDB disconnected. Retrying in background...');
  });
}

function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = {
  connectMongoDB,
  isMongoConnected,
  mongoose
};

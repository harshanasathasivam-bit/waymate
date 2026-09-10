const mongoose = require('mongoose');

const SyncLogSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      default: 'Chennai'
    },
    status: {
      type: String,
      enum: ['STARTED', 'COMPLETED', 'FAILED'],
      default: 'STARTED'
    },
    discoveredCount: {
      type: Number,
      default: 0
    },
    newlyAddedCount: {
      type: Number,
      default: 0
    },
    updatedCount: {
      type: Number,
      default: 0
    },
    duplicatesFiltered: {
      type: Number,
      default: 0
    },
    durationMs: {
      type: Number,
      default: 0
    },
    errorLogs: [
      {
        timestamp: { type: Date, default: Date.now },
        message: String,
        details: String
      }
    ],
    triggeredBy: {
      type: String,
      default: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SyncLog', SyncLogSchema);

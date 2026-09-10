const mongoose = require('mongoose');

const PlaceReportSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
      index: true
    },
    placeName: {
      type: String,
      required: true
    },
    issueType: {
      type: String,
      required: true,
      enum: [
        'PERMANENTLY_CLOSED',
        'TEMPORARY_CLOSURE',
        'WRONG_LOCATION',
        'WRONG_OPENING_HOURS',
        'WRONG_ENTRY_FEE',
        'INCORRECT_INFORMATION',
        'DUPLICATE_PLACE'
      ]
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    suggestedCorrection: {
      type: String,
      default: ''
    },
    reportedBy: {
      type: String,
      default: 'Anonymous Traveler'
    },
    reporterContact: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['PENDING', 'INVESTIGATING', 'RESOLVED', 'DISMISSED'],
      default: 'PENDING',
      index: true
    },
    adminActionNotes: {
      type: String,
      default: ''
    },
    resolvedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PlaceReport', PlaceReportSchema);

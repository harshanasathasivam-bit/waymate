const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    destination: {
      type: String,
      required: true,
      trim: true,
      index: true,
      default: 'Chennai'
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Popular tourist attractions',
        'Historical places',
        'Religious places',
        'Beaches',
        'Parks and nature attractions',
        'Museums',
        'Cultural attractions',
        'Food/local experiences',
        'Family-friendly places',
        'Photography spots',
        'Lesser-known attractions',
        'Hidden-gem candidates'
      ],
      default: 'Popular tourist attractions',
      index: true
    },
    description: {
      type: String,
      default: 'Not available'
    },
    historicalInfo: {
      type: String,
      default: 'Not available'
    },
    address: {
      type: String,
      default: 'Not available'
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    // GeoJSON point for geospatial queries
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    openingHours: {
      type: String,
      default: 'Not available'
    },
    entryFee: {
      type: String,
      default: 'Not available'
    },
    bestTimeToVisit: {
      type: String,
      default: 'October to March'
    },
    estimatedVisitDuration: {
      type: String,
      default: '1-2 hours'
    },
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
        attribution: { type: String, default: '' },
        license: { type: String, default: 'Public Domain / CC-BY-SA' }
      }
    ],
    nearbyAttractions: [
      {
        name: { type: String, required: true },
        distanceKm: { type: Number, default: 0 },
        category: { type: String, default: '' },
        placeId: { type: String, default: '' }
      }
    ],
    sourceUrl: {
      type: String,
      default: ''
    },
    sourceName: {
      type: String,
      default: 'OpenStreetMap'
    },
    externalId: {
      type: String,
      index: true,
      sparse: true
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'NEEDS_REVIEW', 'USER_REPORTED', 'UNVERIFIED'],
      default: 'NEEDS_REVIEW',
      index: true
    },
    lastVerifiedAt: {
      type: Date,
      default: Date.now
    },
    dataConfidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    // Hidden Gem criteria
    hiddenGemCandidate: {
      type: Boolean,
      default: false,
      index: true
    },
    hiddenGemVerified: {
      type: Boolean,
      default: false
    },
    hiddenGemReason: {
      type: String,
      default: ''
    },
    // Dynamic / real-time operational status
    isTemporarilyClosed: {
      type: Boolean,
      default: false
    },
    temporaryClosureReason: {
      type: String,
      default: ''
    },
    currentStatusNote: {
      type: String,
      default: 'Open to public'
    },
    // Personalization attributes
    suitability: {
      family: { type: Boolean, default: true },
      solo: { type: Boolean, default: true },
      friends: { type: Boolean, default: true },
      budgetTier: {
        type: String,
        enum: ['Free', 'Budget', 'Moderate', 'Luxury'],
        default: 'Budget'
      },
      themes: [{ type: String }] // ['nature', 'history', 'religion', 'food', 'adventure', 'photography']
    },
    adminNotes: {
      type: String,
      default: ''
    },
    tags: [{ type: String }]
  },
  {
    timestamps: true
  }
);

// Geospatial index for nearby queries
PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ destination: 1, category: 1 });
PlaceSchema.index({ destination: 1, verificationStatus: 1 });
PlaceSchema.index({ name: 'text', description: 'text', address: 'text' });

module.exports = mongoose.model('Place', PlaceSchema);

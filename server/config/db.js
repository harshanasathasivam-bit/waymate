const fs = require('fs');
const path = require('path');
const { seedDestinations, seedPackages } = require('../data/seedData');

const DB_FILE = path.join(__dirname, '../data/store.json');

// Memory store initialized with default data
let db = {
  users: [],
  destinations: seedDestinations,
  packages: seedPackages,
  itineraries: [],
  enquiries: [],
  reviews: [
    {
      id: "rev-1",
      destinationId: "munnar",
      userName: "Ramesh Kumar",
      rating: 5,
      comment: "SmartTour generated the perfect 4-day itinerary for my family from Salem! Budget calculation was spot on.",
      travelDate: "2026-06-15",
      userPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      crowded: "Moderate",
      childFriendly: "Yes",
      parkingAvailable: "Yes"
    },
    {
      id: "rev-2",
      destinationId: "yercaud",
      userName: "Priya Sundaram",
      rating: 5,
      comment: "Discovered Killiyur Falls secret path thanks to the Hidden Gems section. Very peaceful!",
      travelDate: "2026-07-20",
      userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      crowded: "Low",
      childFriendly: "Yes",
      parkingAvailable: "Yes"
    }
  ],
  adminSettings: {
    weights: {
      budgetMatch: 25,
      interestMatch: 25,
      durationMatch: 15,
      weatherMatch: 10,
      travelDistance: 10,
      familySuitability: 5,
      accessibility: 5,
      sustainability: 5
    }
  }
};

function loadStore() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const loaded = JSON.parse(raw);
      db = { ...db, ...loaded };
      
      // Ensure seed destinations are synchronized with authentic imagery
      seedDestinations.forEach(sd => {
        const existingIdx = db.destinations.findIndex(d => d.id === sd.id);
        if (existingIdx === -1) {
          db.destinations.unshift(sd);
        } else {
          db.destinations[existingIdx] = {
            ...db.destinations[existingIdx],
            heroImage: sd.heroImage,
            images: sd.images,
            attractions: sd.attractions
          };
        }
      });
      saveStore();
      
      console.log('⚡ Loaded persistent data store from store.json');
    } else {
      saveStore();
    }
  } catch (err) {
    console.error('Error loading JSON store:', err.message);
  }
}

function saveStore() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving JSON store:', err.message);
  }
}

// Initial load
loadStore();

module.exports = {
  getDb: () => db,
  saveStore
};

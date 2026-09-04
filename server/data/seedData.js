// Pre-seeded database for SmartTour platform
const seedDestinations = [
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    region: "South India",
    tagline: "Coastal heritage, ancient Dravidian temples & vibrant culinary streets",
    description: "Chennai is a major cultural and economic hub situated along the Coromandel Coast of Tamil Nadu. Renowned for Marina Beach, centuries-old Kapaleeshwarar temple, vibrant Carnatic music season, and rich South Indian culinary heritage.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 13.0499, lng: 80.2824 },
    distanceFromSalem: 340,
    distanceFromBangalore: 350,
    distanceFromChennai: 0,
    distanceFromKochi: 680,
    avgDailyBudgetBudget: 2200,
    avgDailyBudgetLuxury: 8000,
    bestSeason: "October to March",
    peakSeason: "December to February",
    offSeason: "May to July (Summer)",
    climate: "Tropical Coastal Climate (26°C - 34°C)",
    categories: ["Heritage", "Culture", "Coastal", "Food & Dining", "Family", "Shopping"],
    scores: {
      budgetScore: 90,
      natureScore: 78,
      cultureScore: 98,
      adventureScore: 65,
      familyScore: 95,
      accessibilityScore: 98,
      ecoScore: 82
    },
    currentWeather: {
      temp: "32°C",
      condition: "Warm Coastal Breeze",
      rainProbability: "10%",
      humidity: "72%",
      forecast: "Warm coastal day with pleasant evening sea breeze. Perfect for evening beach walks.",
      rainAlert: false,
      indoorAlternative: "Visit Government Museum Bronze Gallery or DakshinaChitra."
    },
    crowdLevel: {
      status: "Moderate",
      badgeColor: "🟡",
      peakHours: "05:00 PM - 08:30 PM",
      bestVisitingTime: "06:30 AM - 09:30 AM",
      quietAlternative: "Broken Bridge & Adyar Estuary Sunset"
    },
    safetyInfo: {
      overall: "Very safe cosmopolitan destination. 24/7 tourist police on major beaches.",
      policeContact: "+91 44 2844 8000 / 112 (Marina Tourist Police)",
      hospitalContact: "+91 44 2829 0200 (Apollo Main Hospital)",
      touristHelpdesk: "1800-4253-1111",
      safeTips: ["Stay hydrated with fresh tender coconuts.", "Observe modest attire inside ancient temples.", "Prefer metered autos or rideshare apps."]
    },
    attractions: [
      {
        id: "chn-1",
        name: "Marina Beach & Lighthouse",
        category: "Coastal Landmark",
        rating: 4.7,
        reviewsCount: 3840,
        distance: "2.4 km away",
        estimatedCost: "Free Entry (₹50 for Lighthouse)",
        shortDesc: "World's second-longest urban beach. Perfect for cool evening sea breeze, fresh roasted corn, and panoramic coastal views from the vintage lighthouse.",
        bestTime: "Best for sunset (05:00 PM - 07:30 PM)",
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        lat: 13.0499,
        lng: 80.2824,
        tags: ["Sunset", "Beach Walk", "Street Snacks"]
      },
      {
        id: "chn-2",
        name: "Kapaleeshwarar Temple, Mylapore",
        category: "Ancient Dravidian Heritage",
        rating: 4.9,
        reviewsCount: 2950,
        distance: "3.8 km away",
        estimatedCost: "Free Entry",
        shortDesc: "7th-century architectural marvel dedicated to Lord Shiva, featuring an intricately carved 37-meter rainbow Gopuram and traditional sacred temple tank.",
        bestTime: "06:00 AM - 08:30 AM & 05:30 PM - 08:00 PM",
        photo: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
        lat: 13.0336,
        lng: 80.2698,
        tags: ["Temple", "Dravidian Architecture", "Sacred Tank"]
      }
    ]
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "South India",
    tagline: "Rolling Tea Gardens, Mist-covered Hills & Cool Breezes",
    description: "Munnar is a majestic hill station situated in the Western Ghats of Kerala. Famous for sprawling tea plantations, picturesque valleys, rare flora like Neelakurinji, and pristine waterfalls.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    distanceFromSalem: 295, // km
    distanceFromBangalore: 460, // km
    distanceFromChennai: 560, // km
    distanceFromKochi: 125, // km
    avgDailyBudgetBudget: 2500, // INR per person
    avgDailyBudgetLuxury: 7500,
    bestSeason: "September to May",
    peakSeason: "December to February",
    offSeason: "June to August (Monsoon)",
    climate: "Cool Mountain Climate (15°C - 25°C)",
    categories: ["Nature", "Photography", "Family", "Honeymoon", "Spiritual", "Budget"],
    scores: {
      budgetScore: 85, // out of 100
      natureScore: 98,
      cultureScore: 75,
      adventureScore: 70,
      familyScore: 92,
      accessibilityScore: 78,
      ecoScore: 88
    },
    currentWeather: {
      temp: "19°C",
      condition: "Partly Cloudy",
      rainProbability: "20%",
      humidity: "75%",
      forecast: "Pleasant afternoon with cool evening breeze. Ideal for outdoor tea garden walks.",
      rainAlert: false,
      indoorAlternative: "Visit KDHP Tea Museum and Spice Factory tour if rain starts."
    },
    crowdLevel: {
      status: "Moderate",
      badgeColor: "🟡",
      peakHours: "11:00 AM - 03:00 PM",
      bestVisitingTime: "07:30 AM - 10:00 AM",
      quietAlternative: "Lockhart Gap & Chithirapuram tea trails"
    },
    safetyInfo: {
      overall: "Very Safe family destination. Drive carefully on mountain hairpins.",
      policeContact: "+91 4865 230323 (Munnar Police Station)",
      hospitalContact: "+91 4865 230233 (Tata General Hospital, Munnar)",
      touristHelpdesk: "+91 4865 231516",
      safeTips: ["Keep warm attire for evenings.", "Avoid steep trail edges after dusk.", "Carry motion sickness medication for winding roads."]
    },
    attractions: [
      {
        id: "att-1",
        name: "Eravikulam National Park (Rajamalai)",
        type: "National Park / Wildlife",
        duration: "3 hours",
        cost: 200,
        openingHours: "07:30 AM - 04:00 PM",
        accessibility: "Wheelchair accessible electric shuttle bus available to top",
        photoSpot: true,
        description: "Home to the endangered Nilgiri Tahr mountain goat. Features breathtaking high-altitude grasslands and panoramic peak views.",
        lat: 10.1500, lng: 77.0667
      },
      {
        id: "att-2",
        name: "Mattupetty Dam & Boating",
        type: "Lake & Dam",
        duration: "2 hours",
        cost: 150,
        openingHours: "09:30 AM - 05:00 PM",
        accessibility: "Paved lakeside walkways, senior citizen friendly",
        photoSpot: true,
        description: "Serene storage dam surrounded by hill slopes and tea estates. Offers speedboating and pedal boating.",
        lat: 10.1062, lng: 77.1235
      },
      {
        id: "att-3",
        name: "Tea Museum & KDHP Processing Factory",
        type: "Cultural Heritage / Museum",
        duration: "1.5 hours",
        cost: 125,
        openingHours: "09:00 AM - 05:00 PM",
        accessibility: "Fully wheelchair accessible ground floor with ramp access",
        photoSpot: false,
        description: "Demonstrates the century-old history of Munnar tea picking, CTC leaf processing, and tea tasting experiences.",
        lat: 10.0880, lng: 77.0610
      },
      {
        id: "att-4",
        name: "Top Station Viewpoint",
        type: "Panoramic Viewpoint",
        duration: "2 hours",
        cost: 50,
        openingHours: "06:00 AM - 06:00 PM",
        accessibility: "Steep steps at final summit; partial view accessible from upper deck",
        photoSpot: true,
        description: "Highest point in Munnar bordering Tamil Nadu. Offers cloud-bed vistas and historic ropeway railway remains.",
        lat: 10.1250, lng: 77.2450
      }
    ],
    hotels: [
      {
        id: "hot-1",
        name: "Green Valley Budget Resort",
        category: "Budget",
        pricePerNight: 1400,
        rating: 4.3,
        amenities: ["Free WiFi", "Mountain View", "Geyser", "In-house Kitchen"],
        accessible: true,
        address: "Old Munnar, Near KSRTC Bus Stand"
      },
      {
        id: "hot-2",
        name: "Tea County Heritage Hotel",
        category: "Mid-Range",
        pricePerNight: 3500,
        rating: 4.6,
        amenities: ["Breakfast Included", "Garden", "Balcony", "Doctor on Call", "Elevator"],
        accessible: true,
        address: "Devikulam Road, Munnar"
      },
      {
        id: "hot-3",
        name: "Panoramic Grand Resort",
        category: "Luxury",
        pricePerNight: 7200,
        rating: 4.8,
        amenities: ["Infinity Pool", "Spa", "Multi-Cuisine Dining", "Helipad View"],
        accessible: true,
        address: "Chithirapuram, Munnar"
      }
    ],
    foodSpecialties: [
      { name: "Kerala Sadhya (Banana Leaf Meal)", price: 180, veg: true, vegan: true, type: "Local Traditional" },
      { name: "Appam with Vegetable Stew / Malabar Curry", price: 140, veg: true, vegan: false, type: "Breakfast Specialty" },
      { name: "Kerala Spice Tea & Banana Fritters (Pazham Pori)", price: 60, veg: true, vegan: true, type: "Street Snack" },
      { name: "Fresh Mountain Trout Grill", price: 350, veg: false, vegan: false, type: "Local Specialty" }
    ],
    restaurants: [
      { name: "Saravana Bhavan Munnar", category: "Pure Veg Budget", avgCost: 150, rating: 4.4 },
      { name: "Rapsy Restaurant", category: "Local Malabar & Biryani", avgCost: 250, rating: 4.2 },
      { name: "The Tea Room Cafe", category: "Premium Tea & Bakery", avgCost: 350, rating: 4.7 }
    ],
    hiddenGems: [
      {
        id: "hg-1",
        name: "Kolukkumalai Sunrise Tea Estate",
        category: "Secret Viewpoint & Highest Tea Estate",
        description: "The world's highest tea plantation (7,900 ft). Accessible via 4x4 Jeep ride. Watching sunrise above floating cloud ocean is life-changing.",
        cost: 500,
        crowdLevel: "Low",
        bestTime: "04:30 AM (Jeep departure)",
        safetyTip: "Rough off-road terrain. Not suitable for pregnant women or severe back issues.",
        lat: 10.1333, lng: 77.2167
      },
      {
        id: "hg-2",
        name: "Attukad Hidden Waterfalls Trail",
        category: "Nature Walk & Quiet Cascades",
        description: "A lesser-traveled narrow canyon path flanked by wooden bridges leading to secluded mountain pools.",
        cost: 0,
        crowdLevel: "Low",
        bestTime: "08:00 AM - 11:00 AM",
        safetyTip: "Rock surfaces slippery in rainy conditions.",
        lat: 10.0520, lng: 77.0450
      }
    ],
    localExperiences: [
      {
        id: "exp-1",
        title: "Guided Organic Tea Plucking & Master Tasting",
        provider: "Munnar Estate Collective",
        duration: "2 hours",
        price: 450,
        rating: 4.9,
        description: "Dress in traditional estate gear, pluck tea leaves with local estate workers, and sample rare white & green teas."
      },
      {
        id: "exp-2",
        title: "Kathakali & Kalaripayattu Martial Arts Evening",
        provider: "Punarjani Traditional Village",
        duration: "2 hours",
        price: 350,
        rating: 4.8,
        description: "Witness facial makeup demonstration, traditional Kerala classical dance drama, and ancient weapon martial arts."
      }
    ]
  },
  {
    id: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    region: "South India",
    tagline: "Wild Sanctuaries, Ancient Caves & Mystic Waterfalls",
    description: "Wayanad is a green paradise perched among the mountains of the Western Ghats. Known for prehistoric Edakkal rock caves, spice plantations, wildlife reserves, and serene lakes.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 11.6854, lng: 76.1320 },
    distanceFromSalem: 260,
    distanceFromBangalore: 280,
    distanceFromChennai: 590,
    distanceFromKochi: 215,
    avgDailyBudgetBudget: 2200,
    avgDailyBudgetLuxury: 6800,
    bestSeason: "October to May",
    peakSeason: "November to February",
    offSeason: "June to September",
    climate: "Tropical Hill Climate (18°C - 28°C)",
    categories: ["Nature", "Adventure", "Family", "Photography", "Cultural", "Budget"],
    scores: {
      budgetScore: 90,
      natureScore: 96,
      cultureScore: 82,
      adventureScore: 88,
      familyScore: 89,
      accessibilityScore: 72,
      ecoScore: 92
    },
    currentWeather: {
      temp: "22°C",
      condition: "Sunny & Breezy",
      rainProbability: "10%",
      humidity: "65%",
      forecast: "Ideal dry weather for wildlife safari and cave exploration.",
      rainAlert: false,
      indoorAlternative: "Visit Wayanad Heritage Museum at Ambalavayal."
    },
    crowdLevel: {
      status: "Low",
      badgeColor: "🟢",
      peakHours: "01:00 PM - 03:30 PM",
      bestVisitingTime: "08:00 AM - 11:30 AM",
      quietAlternative: "Kuruva Island bamboo raft trail"
    },
    safetyInfo: {
      overall: "Safe wildlife corridor. Follow forest ranger directions on safaris.",
      policeContact: "+91 4936 202227 (Kalpetta Police)",
      hospitalContact: "+91 4936 202422 (Wayanad District Hospital)",
      touristHelpdesk: "+91 4936 204441",
      safeTips: ["Avoid feeding wild elephants during sanctuary transit.", "Wear trekking footwear for slippery rock steps."]
    },
    attractions: [
      {
        id: "att-w1",
        name: "Banasura Sagar Dam (Largest Earth Dam in India)",
        type: "Dam & Boating",
        duration: "2.5 hours",
        cost: 100,
        openingHours: "08:30 AM - 05:00 PM",
        accessibility: "Golf cart transport available for elderly from gate to dam top",
        photoSpot: true,
        description: "Pristine reservoir surrounded by Banasura hills. Features speedboating and zip-lining over water.",
        lat: 11.6705, lng: 75.9580
      },
      {
        id: "att-w2",
        name: "Edakkal Caves Prehistoric Petroglyphs",
        type: "Archaeology / Heritage",
        duration: "2 hours",
        cost: 60,
        openingHours: "09:00 AM - 04:00 PM",
        accessibility: "Uphill step climb required; low walking suiters should take lower deck rest point",
        photoSpot: true,
        description: "Two natural caves featuring Stone Age rock carvings dating back to 6,000 BCE.",
        lat: 11.6284, lng: 76.2346
      },
      {
        id: "att-w3",
        name: "Muthanga Wildlife Sanctuary Jeep Safari",
        type: "Wildlife Reserve",
        duration: "3 hours",
        cost: 600,
        openingHours: "06:30 AM - 10:00 AM, 03:00 PM - 05:00 PM",
        accessibility: "Jeep safari accessible to all ages",
        photoSpot: true,
        description: "Part of Nilgiri Biosphere. Frequent sightings of wild Asian elephants, deer, peacocks, and gaur.",
        lat: 11.6740, lng: 76.3680
      }
    ],
    hotels: [
      {
        id: "hot-w1",
        name: "Bamboo Creek Eco Lodge",
        category: "Budget",
        pricePerNight: 1200,
        rating: 4.4,
        amenities: ["Free Breakfast", "Stream View", "Campfire", "Homestyle Dining"],
        accessible: true,
        address: "Vythiri, Wayanad"
      },
      {
        id: "hot-w2",
        name: "Wayanad Wild Woods Resort",
        category: "Mid-Range",
        pricePerNight: 3200,
        rating: 4.7,
        amenities: ["Pool", "Spice Garden Walk", "Restaurant", "Games Room"],
        accessible: true,
        address: "Kalpetta, Wayanad"
      }
    ],
    foodSpecialties: [
      { name: "Malabar Parotta with Chicken / Mushroom Roast", price: 160, veg: false, vegan: false, type: "Dinner Specialty" },
      { name: "Bamboo Shoot Curry & Red Rice", price: 140, veg: true, vegan: true, type: "Tribal Specialty" },
      { name: "Kumbilappam (Jackfruit Steam Cake)", price: 50, veg: true, vegan: true, type: "Local Snack" }
    ],
    restaurants: [
      { name: "Udupi Pure Veg Restaurant", category: "South Indian Veg", avgCost: 120, rating: 4.3 },
      { name: "1980's A Nostalgic Restaurant", category: "Traditional Kerala Meals", avgCost: 220, rating: 4.8 }
    ],
    hiddenGems: [
      {
        id: "hg-w1",
        name: "Chethalayam Hidden Falls & Forest Trail",
        category: "Secret Waterfall Walk",
        description: "A gentle forest trail leading to a hidden seasonal waterfall untouched by mass tourism crowds.",
        cost: 20,
        crowdLevel: "Low",
        bestTime: "09:00 AM - 12:00 PM",
        safetyTip: "Register at local forest checkpost before walking trail.",
        lat: 11.6880, lng: 76.2420
      }
    ],
    localExperiences: [
      {
        id: "exp-w1",
        title: "Bamboo Crafting & Tribal Heritage Workshop",
        provider: "Uravu Eco Bamboo Village",
        duration: "2.5 hours",
        price: 300,
        rating: 4.9,
        description: "Learn how indigenous artisans craft eco-friendly utensils, lamps, and musical instruments out of Wayanad bamboo."
      }
    ]
  },
  {
    id: "ooty",
    name: "Ooty (Udhagamandalam)",
    state: "Tamil Nadu",
    region: "South India",
    tagline: "Queen of Hill Stations, Heritage Toy Train & Eucalyptus Pine Forests",
    description: "Nestled in the Nilgiri Hills of Tamil Nadu, Ooty is famous for its colonial architecture, UNESCO Nilgiri Mountain Toy Train, fragrant tea estates, and shimmering Ooty Lake.",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 11.4102, lng: 76.6950 },
    distanceFromSalem: 160,
    distanceFromBangalore: 270,
    distanceFromChennai: 540,
    distanceFromKochi: 275,
    avgDailyBudgetBudget: 2000,
    avgDailyBudgetLuxury: 6500,
    bestSeason: "October to June",
    peakSeason: "April to June (Summer) & Dec to Jan",
    offSeason: "July to September",
    climate: "Crisp Mountain Climate (10°C - 20°C)",
    categories: ["Nature", "Family", "Senior-friendly", "Photography", "Budget"],
    scores: {
      budgetScore: 92,
      natureScore: 94,
      cultureScore: 80,
      adventureScore: 65,
      familyScore: 96,
      accessibilityScore: 85,
      ecoScore: 84
    },
    currentWeather: {
      temp: "17°C",
      condition: "Mist & Pleasant Sunshine",
      rainProbability: "15%",
      humidity: "70%",
      forecast: "Chilly mornings giving way to pleasant afternoon walks around the lake.",
      rainAlert: false,
      indoorAlternative: "Visit Government Museum or Homemade Chocolate Factory outlet."
    },
    crowdLevel: {
      status: "High",
      badgeColor: "🔴",
      peakHours: "11:30 AM - 04:30 PM",
      bestVisitingTime: "07:00 AM - 09:30 AM",
      quietAlternative: "Avalanche Lake reserve & Pine Forest entry early morning"
    },
    safetyInfo: {
      overall: "Extremely family friendly. Take care during heavy fog on Coonoor ghat roads.",
      policeContact: "+91 423 2442222 (Ooty Town Police)",
      hospitalContact: "+91 423 2442212 (Government Headquarters Hospital, Ooty)",
      touristHelpdesk: "+91 423 2443977",
      safeTips: ["Buy Toy Train tickets early via IRCTC.", "Wear woolens as temperature drops sharply after dusk."]
    },
    attractions: [
      {
        id: "att-o1",
        name: "Government Botanical Garden",
        type: "Botanical Garden",
        duration: "2 hours",
        cost: 50,
        openingHours: "07:00 AM - 06:30 PM",
        accessibility: "Paved ramps throughout major flower bed terraces",
        photoSpot: true,
        description: "55-acre garden featuring fossil trees 20 million years old, Italian gardens, and vibrant flower displays.",
        lat: 11.4168, lng: 76.7122
      },
      {
        id: "att-o2",
        name: "UNESCO Nilgiri Mountain Railway (Toy Train)",
        type: "Heritage Railway",
        duration: "1.5 hours",
        cost: 200,
        openingHours: "Scheduled train timings",
        accessibility: "Level boarding platforms; wheelchair assistance on request",
        photoSpot: true,
        description: "Chugging vintage steam engine train winding through tunnels, bridges, and mountain cliffs.",
        lat: 11.4060, lng: 76.7020
      },
      {
        id: "att-o3",
        name: "Doddabetta Peak Viewpoint",
        type: "Highest Mountain Peak",
        duration: "1.5 hours",
        cost: 20,
        openingHours: "09:00 AM - 06:00 PM",
        accessibility: "Telescope house accessible via ramp; paved concourse",
        photoSpot: true,
        description: "Highest peak in the Nilgiris (8,650 ft). Features a telescope house providing 360-degree valley views.",
        lat: 11.4014, lng: 76.7356
      }
    ],
    hotels: [
      {
        id: "hot-o1",
        name: "Nilgiri Pine Cottage",
        category: "Budget",
        pricePerNight: 1100,
        rating: 4.2,
        amenities: ["Free Parking", "Hot Water 24/7", "Fireplace"],
        accessible: true,
        address: "Near Ooty Lake, Commercial Road"
      },
      {
        id: "hot-o2",
        name: "Savoy - IHCL SeleQtions Ooty",
        category: "Luxury",
        pricePerNight: 8500,
        rating: 4.9,
        amenities: ["Colonial Heritage Rooms", "Afternoon Tea Garden", "Spa", "Valet"],
        accessible: true,
        address: "Sylks Road, Ooty"
      }
    ],
    foodSpecialties: [
      { name: "Ooty Homemade Dark & Milk Chocolates", price: 200, veg: true, vegan: false, type: "Sweet Specialty" },
      { name: "Nilgiri Fresh Varkey (Crispy Pastry)", price: 80, veg: true, vegan: true, type: "Tea Snack" },
      { name: "Hot Mushroom Soup & Masala Puri", price: 60, veg: true, vegan: true, type: "Street Food" }
    ],
    restaurants: [
      { name: "Nahars Sidewalk Cafe", category: "Italian & Pure Veg", avgCost: 300, rating: 4.5 },
      { name: "Shinkows Chinese Restaurant", category: "Legacy Heritage Chinese", avgCost: 400, rating: 4.6 }
    ],
    hiddenGems: [
      {
        id: "hg-o1",
        name: "Avalanche Lake & Eco Sanctuary Walk",
        category: "Secret Pristine Lake",
        description: "A restricted eco-zone with crystal clear trout lake waters surrounded by magnolia and orchid woods.",
        cost: 250,
        crowdLevel: "Low",
        bestTime: "09:00 AM - 01:00 PM",
        safetyTip: "Forest department bus mandatory for final 12km stretch.",
        lat: 11.3000, lng: 76.5800
      }
    ],
    localExperiences: [
      {
        id: "exp-o1",
        title: "Toda Tribal Village & Cultural Heritage Walk",
        provider: "Nilgiri Tribal Trust",
        duration: "2 hours",
        price: 400,
        rating: 4.8,
        description: "Visit traditional barrel-shaped Toda hut hamlets, observe embroidery art, and learn indigenous pastoral culture."
      }
    ]
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    region: "South India",
    tagline: "Princess of Hill Stations, Star Lakes & Mist Trails",
    description: "Located on the Palani Hills, Kodaikanal is renowned for its star-shaped Kodai Lake, wooded cliffs, waterfalls, and peaceful pine forest walks.",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 10.2381, lng: 77.4892 },
    distanceFromSalem: 215,
    distanceFromBangalore: 460,
    distanceFromChennai: 520,
    distanceFromKochi: 295,
    avgDailyBudgetBudget: 2200,
    avgDailyBudgetLuxury: 7000,
    bestSeason: "September to May",
    peakSeason: "April to June & Dec",
    offSeason: "July to August",
    climate: "Temperate Hill Weather (12°C - 22°C)",
    categories: ["Nature", "Family", "Honeymoon", "Photography", "Senior-friendly"],
    scores: {
      budgetScore: 88,
      natureScore: 97,
      cultureScore: 78,
      adventureScore: 78,
      familyScore: 94,
      accessibilityScore: 82,
      ecoScore: 87
    },
    currentWeather: {
      temp: "18°C",
      condition: "Cool Fog & Clear",
      rainProbability: "10%",
      humidity: "68%",
      forecast: "Mild weather with dense afternoon mist rolling across Coaker's Walk.",
      rainAlert: false,
      indoorAlternative: "Kodaikanal Solar Observatory Museum."
    },
    crowdLevel: {
      status: "Moderate",
      badgeColor: "🟡",
      peakHours: "12:00 PM - 04:00 PM",
      bestVisitingTime: "07:30 AM - 10:00 AM",
      quietAlternative: "Mannavanur Eco Sheep Farm & Lake"
    },
    safetyInfo: {
      overall: "Very safe peaceful town. Beware of monkeys at view points.",
      policeContact: "+91 4542 248100 (Kodai Town Police)",
      hospitalContact: "+91 4542 241252 (Van Allen Hospital)",
      touristHelpdesk: "+91 4542 241675",
      safeTips: ["Do not cross safety fences at Pillar Rocks.", "Rent bicycles for lake perimeter rides."]
    },
    attractions: [
      {
        id: "att-k1",
        name: "Kodai Lake & Perimeter Cycling Track",
        type: "Lake & Recreation",
        duration: "2 hours",
        cost: 100,
        openingHours: "24 Hours (Boating: 09:00 AM - 05:30 PM)",
        accessibility: "Flat 5km paved walkway ideal for wheelchairs & prams",
        photoSpot: true,
        description: "Iconic man-made star lake created in 1863. Rent rowing boats, pedal boats, or tandem bicycles.",
        lat: 10.2330, lng: 77.4850
      },
      {
        id: "att-k2",
        name: "Coaker's Walk Valley View",
        type: "Cliffside Pedestrian Path",
        duration: "1 hour",
        cost: 30,
        openingHours: "07:00 AM - 07:00 PM",
        accessibility: "Paved flat paved path with handrails throughout",
        photoSpot: true,
        description: "1-kilometer pedestrian paved path built along mountain slopes offering cloud-bed valley views.",
        lat: 10.2320, lng: 77.4950
      }
    ],
    hotels: [
      {
        id: "hot-k1",
        name: "Cloud Nine Budget Stay",
        category: "Budget",
        pricePerNight: 1300,
        rating: 4.3,
        amenities: ["Free Hot Water", "Lake View", "Travel Desk"],
        accessible: true,
        address: "Club Road, Kodaikanal"
      }
    ],
    foodSpecialties: [
      { name: "Fresh Garlic & Cheese Toasties", price: 120, veg: true, vegan: false, type: "Cafe Snack" },
      { name: "Hot Homemade Plum & Apple Pie", price: 150, veg: true, vegan: false, type: "Dessert" }
    ],
    restaurants: [
      { name: "Ten Degrees Cafe", category: "Multi-Cuisine & Artisanal Coffee", avgCost: 350, rating: 4.7 }
    ],
    hiddenGems: [
      {
        id: "hg-k1",
        name: "Poombarai Village & Terraced Garlic Fields",
        category: "Picturesque Village & Valley",
        description: "A colorful hillside terraced farming village famous for 3,000-year-old Kuzhanthai Velappar Temple and organic hill garlic.",
        cost: 0,
        crowdLevel: "Low",
        bestTime: "08:00 AM - 01:00 PM",
        safetyTip: "Narrow village roads. Park vehicle at temple plaza.",
        lat: 10.2600, lng: 77.4000
      }
    ],
    localExperiences: [
      {
        id: "exp-k1",
        title: "Organic Farm Walk & Homemade Cheese Workshop",
        provider: "Kodaikanal Organic Farmers Guild",
        duration: "3 hours",
        price: 500,
        rating: 4.9,
        description: "Tour avocado & passion fruit orchards, meet local dairy artisans, and taste hand-crafted hill cheeses."
      }
    ]
  },
  {
    id: "yercaud",
    name: "Yercaud",
    state: "Tamil Nadu",
    region: "South India",
    tagline: "Jewel of the Shevaroys, Coffee Aromas & Budget Bliss",
    description: "Located right near Salem, Yercaud is an affordable, tranquil hill station nestled in the Shevaroy Hills. Known for orange groves, coffee plantations, spice gardens, and Emerald Lake.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
    ],
    coordinates: { lat: 11.7753, lng: 78.2093 },
    distanceFromSalem: 30,
    distanceFromBangalore: 215,
    distanceFromChennai: 360,
    distanceFromKochi: 370,
    avgDailyBudgetBudget: 1500,
    avgDailyBudgetLuxury: 4500,
    bestSeason: "All Year Round (Best: October to June)",
    peakSeason: "May (Summer Festival)",
    offSeason: "Late Monsoons",
    climate: "Pleasant & Mild (16°C - 26°C)",
    categories: ["Budget", "Nature", "Family", "Senior-friendly", "Photography"],
    scores: {
      budgetScore: 98,
      natureScore: 88,
      cultureScore: 74,
      adventureScore: 68,
      familyScore: 95,
      accessibilityScore: 90,
      ecoScore: 89
    },
    currentWeather: {
      temp: "21°C",
      condition: "Clear & Breeze",
      rainProbability: "5%",
      humidity: "60%",
      forecast: "Optimal weather for family picnics and coffee estate walks.",
      rainAlert: false,
      indoorAlternative: "Silk Farm & Orchidarium display center."
    },
    crowdLevel: {
      status: "Low",
      badgeColor: "🟢",
      peakHours: "02:00 PM - 04:30 PM",
      bestVisitingTime: "08:30 AM - 11:30 AM",
      quietAlternative: "Pagoda Point sunrise view"
    },
    safetyInfo: {
      overall: "Extremely safe, fast weekend getaway from Salem.",
      policeContact: "+91 4281 222224 (Yercaud Police Station)",
      hospitalContact: "+91 4281 222218 (Government Hospital Yercaud)",
      touristHelpdesk: "+91 4281 222226",
      safeTips: ["Drive cautious on 20 hairpin bends hill road."]
    },
    attractions: [
      {
        id: "att-y1",
        name: "Yercaud Emerald Lake & Boat House",
        type: "Lake & Park",
        duration: "1.5 hours",
        cost: 80,
        openingHours: "09:00 AM - 05:30 PM",
        accessibility: "Flat paved park, senior & child friendly",
        photoSpot: true,
        description: "Natural lake surrounded by gardens and towering trees. Features motorboat and pedal boat rides.",
        lat: 11.7740, lng: 78.2080
      },
      {
        id: "att-y2",
        name: "Pagoda Point Viewpoint",
        type: "Valley Viewpoint",
        duration: "1 hour",
        cost: 10,
        openingHours: "06:00 AM - 07:00 PM",
        accessibility: "Paved viewing platform",
        photoSpot: true,
        description: "Named after stone structures built by local tribes. Offers expansive views of Salem city below.",
        lat: 11.7820, lng: 78.2250
      }
    ],
    hotels: [
      {
        id: "hot-y1",
        name: "Shevaroys Budget Inn",
        category: "Budget",
        pricePerNight: 900,
        rating: 4.3,
        amenities: ["Free Parking", "Restaurant", "Garden"],
        accessible: true,
        address: "Hospital Road, Yercaud"
      }
    ],
    foodSpecialties: [
      { name: "Yercaud Coffee & Fresh Pepper Fried Snacks", price: 40, veg: true, vegan: true, type: "Snack" },
      { name: "Salem Style South Indian Thali", price: 110, veg: true, vegan: true, type: "Lunch" }
    ],
    restaurants: [
      { name: "Silver Oak Restaurant", category: "Multi-Cuisine Veg & Non-Veg", avgCost: 180, rating: 4.4 }
    ],
    hiddenGems: [
      {
        id: "hg-y1",
        name: "Killiyur Falls Secret Trek Path",
        category: "Cascade Waterfall",
        description: "300-ft waterfall plunging into Raja Rajeshwari valley. Less crowded via early morning steps trail.",
        cost: 0,
        crowdLevel: "Low",
        bestTime: "08:00 AM - 10:30 AM",
        safetyTip: "Wear shoes with good grip for wet rock steps.",
        lat: 11.7900, lng: 78.2000
      }
    ],
    localExperiences: [
      {
        id: "exp-y1",
        title: "Coffee Processing & Pepper Plantation Walk",
        provider: "Shevaroy Agro Estate",
        duration: "1.5 hours",
        price: 200,
        rating: 4.8,
        description: "Stroll beneath shade trees, learn bean roasting, and taste freshly brewed Arabica coffee."
      }
    ]
  }
];

const seedPackages = [
  {
    id: "pkg-kerala-4d",
    title: "Kerala Scenic Bliss 4-Day Customized Experience",
    destinationId: "munnar",
    days: 4,
    nights: 3,
    startingPrice: 13500,
    type: "Family & Nature",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    summary: "Complete personalized tour covering Munnar tea estates, Mattupetty boating, Eravikulam sanctuary, and spice village lunch.",
    includes: ["3-Star / Budget Hotel", "Daily Breakfast", "Sightseeing Cab", "Entry Tickets", "Tea Museum Tour"],
    customizableOptions: ["Change hotel tier", "Add Kathakali show", "Upgrade transportation", "Adjust day count"]
  },
  {
    id: "pkg-nilgiris-3d",
    title: "Nilgiri Mountain Explorer (Ooty & Kodaikanal)",
    destinationId: "ooty",
    days: 3,
    nights: 2,
    startingPrice: 8900,
    type: "Budget & Senior-Friendly",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    summary: "Experience Toy train ride, Botanical Gardens, Doddabetta Peak, and homemade chocolate factory visit.",
    includes: ["Hotel Stay", "Toy Train Ticket Booking", "Local Transport", "24/7 Support"],
    customizableOptions: ["Add Avalanche Lake safari", "Choose pure veg meal plan"]
  }
];

module.exports = {
  seedDestinations,
  seedPackages
};

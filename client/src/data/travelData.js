// Comprehensive Travel Data Store for WayMate Travel Map & Discovery Journal

export const DESTINATIONS_DATA = [
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "Western Ghats, South India",
    tagline: "Rolling tea mist, emerald peaks & cool colonial mountain trails",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    currentWeather: {
      temp: "18°C",
      condition: "Cool Mist & Light Breeze",
      humidity: "78%",
      wind: "12 km/h",
      forecast: "Optimal weather for high-altitude tea trails. Light evening fog expected."
    },
    crowdIndex: "Low to Moderate (Optimal for visiting)",
    elevation: "1,600 m (5,200 ft)",
    bestTime: "September to May",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85",
    atlasCover: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
    editorialQuote: "“Where mountains wake beneath an unbroken sea of tea mist, and quiet mountain streams carve secret trails through ancient shola forests.”",
    editorialStory: "Perched high in the Idukki district where three mountain streams meet—Mudrapuzha, Nallathanni and Kundala—Munnar was once the summer capital of the British government in South India. Today, it remains an untouched biosphere of rolling organic tea gardens, rare Neelakurinji blossoms that bloom once every twelve years, and protected high-altitude Nilgiri Tahr mountain goats.",
    
    // Key Attractions (Sights)
    attractions: [
      {
        id: "mun-att-1",
        name: "Eravikulam National Park",
        category: "Wildlife Sanctuary",
        type: "sight",
        lat: 10.1500,
        lng: 77.0667,
        distance: "7.8 km from center",
        travelTime: "22 mins drive",
        duration: "3 hours",
        cost: 200,
        rating: 4.8,
        reviewsCount: 1420,
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        bestTime: "07:30 AM - 10:30 AM (Active wildlife)",
        crowd: "Moderate",
        description: "Home of the endangered Nilgiri Tahr. Ascend to Anamudi slopes on eco-friendly park shuttles with 360-degree mountain valley vistas.",
        localTip: "Book forest shuttle pass online before 9 AM to avoid peak queues.",
        tags: ["Wildlife", "Panoramic Peaks", "Family Friendly", "Photo Spot"]
      },
      {
        id: "mun-att-2",
        name: "Mattupetty Lake & Dam",
        category: "Lake & Nature",
        type: "sight",
        lat: 10.1062,
        lng: 77.1235,
        distance: "11.2 km from center",
        travelTime: "28 mins drive",
        duration: "2 hours",
        cost: 150,
        rating: 4.6,
        reviewsCount: 980,
        photo: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        bestTime: "03:30 PM - 05:30 PM",
        crowd: "Moderate",
        description: "A tranquil storage reservoir nestled inside verdant tea hills. Famous for silent speedboating and wild elephant sightings on distant banks.",
        localTip: "Walk past the main boating counter to the quiet eastern pine trail for peaceful photography.",
        tags: ["Boating", "Elephants", "Scenic Drive"]
      },
      {
        id: "mun-att-3",
        name: "KDHP Tea Museum & Factory",
        category: "Cultural Heritage",
        type: "sight",
        lat: 10.0880,
        lng: 77.0610,
        distance: "1.4 km from center",
        travelTime: "5 mins walk",
        duration: "1.5 hours",
        cost: 125,
        rating: 4.7,
        reviewsCount: 840,
        photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        bestTime: "10:00 AM - 04:00 PM",
        crowd: "Low",
        description: "Century-old tea estate factory demonstrating CTC processing, vintage roller machines, and artisan tea sommelier tastings.",
        localTip: "Try the freshly milled Silver Needle white tea at the estate outlet.",
        tags: ["Heritage", "Tea Tasting", "Artisan"]
      },
      {
        id: "mun-att-4",
        name: "Top Station Viewpoint",
        category: "High Altitude Ridge",
        type: "sight",
        lat: 10.1250,
        lng: 77.2450,
        distance: "32 km from center",
        travelTime: "1 hour 15 mins drive",
        duration: "2.5 hours",
        cost: 50,
        rating: 4.9,
        reviewsCount: 2100,
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        bestTime: "06:00 AM - 08:30 AM (Sunrise cloud sea)",
        crowd: "Low in early morning",
        description: "The highest point on the Munnar-Kodaikanal border offering sweeping vistas over the lowlands of Theni and sea of morning clouds.",
        localTip: "Arrive at dawn to witness clouds rolling beneath your feet like an ocean.",
        tags: ["Sunrise", "Clouds", "Trek"]
      }
    ],

    // Unseen / Hidden Gems
    hiddenGems: [
      {
        id: "mun-gem-1",
        name: "Kolukkumalai Sunrise Tea Estate",
        category: "Secret Highest Tea Ridge",
        type: "unseen",
        lat: 10.1333,
        lng: 77.2167,
        distance: "35 km via Jeep",
        travelTime: "1.5 hours 4x4 Jeep",
        duration: "4 hours",
        cost: 550,
        rating: 4.95,
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        whyVisit: "The world's highest organic tea plantation (7,900 ft). Zero paved roads, complete silence, and an unforgettable sunrise above clouds.",
        localSecret: "Depart at 4:15 AM from Suryanelli basecamp. The estate uses traditional orthodox 1935 British wood rollers.",
        bestTime: "05:00 AM - 08:00 AM",
        crowd: "Very Low (Restricted 4x4 access only)",
        footwearAlert: "Sturdy hiking boots required. Steep dirt tracks.",
        networkAlert: "No cellular coverage at top ridge.",
        tags: ["World Record", "Jeep Safari", "Secret Sunrise"]
      },
      {
        id: "mun-gem-2",
        name: "Attukad Hidden Cascades Trail",
        category: "Secluded Shola Waterfall",
        type: "unseen",
        lat: 10.0520,
        lng: 77.0450,
        distance: "4.8 km from center",
        travelTime: "14 mins drive",
        duration: "2 hours",
        cost: 0,
        rating: 4.85,
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        whyVisit: "A private mountain stream cutting through wild cardamom bushes. Untouched by tour buses and peaceful all day.",
        localSecret: "Cross the wooden suspension footbridge and follow the fisherman's stone path upstream to reach the natural crystal pool.",
        bestTime: "08:00 AM - 11:30 AM",
        crowd: "Almost Zero",
        footwearAlert: "River rocks can be slippery after morning mist.",
        networkAlert: "Weak 2G only.",
        tags: ["Natural Pool", "Wild Cardamom", "Free Entry"]
      },
      {
        id: "mun-gem-3",
        name: "Chithirapuram Old Spice Hamlet",
        category: "Quiet Colonial Village",
        type: "unseen",
        lat: 10.0380,
        lng: 77.0220,
        distance: "8.2 km from center",
        travelTime: "18 mins drive",
        duration: "2 hours",
        cost: 0,
        rating: 4.75,
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        whyVisit: "Charming stone cottages, sleepy pepper vine trails, and panoramic view of the Pallivasal hydroelectric basin.",
        localSecret: "Stop by the 80-year-old bakery on Church Road for homemade ginger jaggery cookies.",
        bestTime: "04:00 PM - 06:30 PM (Golden Hour)",
        crowd: "Zero tourists",
        footwearAlert: "Comfortable walking shoes.",
        networkAlert: "Good coverage.",
        tags: ["Colonial", "Golden Hour", "Local Bakery"]
      }
    ],

    // Stays & Lodges (Split-screen Stay Explorer)
    stays: [
      {
        id: "mun-stay-1",
        name: "Lockhart Tea Bungalow & Estate",
        category: "Heritage Tea Estate",
        type: "stay",
        lat: 10.0710,
        lng: 77.1020,
        pricePerNight: 4800,
        priceTier: "Luxe Heritage",
        rating: 4.9,
        reviewsCount: 310,
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        distance: "6.2 km from Munnar town",
        amenities: ["Tea Garden Balcony", "Fireplace Lounge", "Farm-to-table Breakfast", "Private Guide", "High-speed WiFi"],
        description: "1920s restored planter's estate bungalow surrounded by 1,200 acres of working tea hills. Private fireplace and organic breakfast included.",
        localArea: "Quiet Lockhart Valley ridge with zero highway noise.",
        ecoScore: 94
      },
      {
        id: "mun-stay-2",
        name: "The Mist Haven Eco Cabins",
        category: "Eco Mountain Lodge",
        type: "stay",
        lat: 10.0450,
        lng: 77.0420,
        pricePerNight: 2800,
        priceTier: "Comfort Eco",
        rating: 4.7,
        reviewsCount: 195,
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        distance: "5.1 km from center",
        amenities: ["Solar Heated Showers", "Organic Orchard", "Valley Deck", "Homemade Kerala Thali"],
        description: "Sustainable pinewood chalets built on stilts overlooking cardamom plantations and cascading brook.",
        localArea: "Direct access to Attukad waterfalls trail.",
        ecoScore: 98
      },
      {
        id: "mun-stay-3",
        name: "Green Valley Backpacker & Trekker House",
        category: "Boutique Hostel & Homestay",
        type: "stay",
        lat: 10.0895,
        lng: 77.0620,
        pricePerNight: 1200,
        priceTier: "Budget Saver",
        rating: 4.5,
        reviewsCount: 420,
        photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        distance: "400m from Munnar Bus Terminal",
        amenities: ["Free High-speed WiFi", "Shared Kitchen", "Trekking Gear Rental", "Hot Water 24/7"],
        description: "Cozy backpacker sanctuary with private and dorm options, communal evening traveler bonfire, and trek route maps.",
        localArea: "Walking distance to local spice markets and traditional diners.",
        ecoScore: 86
      }
    ],

    // Local Pulse (Food, Traditional Shops, Artisan Crafts)
    localPulse: [
      {
        id: "mun-food-1",
        name: "Gurubhavan Traditional Mess",
        category: "Authentic Local Dining",
        type: "food",
        lat: 10.0882,
        lng: 77.0602,
        specialty: "Authentic Kerala Banana Leaf Sadhya & Malabar Parotta",
        avgPrice: "₹160 per meal",
        rating: 4.8,
        timing: "11:30 AM - 04:00 PM & 07:00 PM - 10:00 PM",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        story: "Run by three generations of family chefs serving 14 handmade accompaniments on fresh banana leaves with red Matta rice and freshly pressed coconut oil.",
        mustTry: "Pineapple Pachadi, Kalan & Roasted Coconut Avial",
        isVeg: true
      },
      {
        id: "mun-food-2",
        name: "Rapsy Street Kitchen",
        category: "Street Eats & Spiced Grills",
        type: "food",
        lat: 10.0875,
        lng: 77.0588,
        specialty: "Spanish Omelette, Kerala Beef/Chicken Roast & Hot Spiced Tea",
        avgPrice: "₹220 per person",
        rating: 4.6,
        timing: "07:00 AM - 11:00 PM",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        story: "A legendary backpacker joint in Munnar Bazaar since 1982. The signature spiced chocolate egg pancake and black pepper chicken are regional legends.",
        mustTry: "Kerala Malabar Egg Roast with Flaky Parottas",
        isVeg: false
      },
      {
        id: "mun-shop-1",
        name: "Munnar Spice & Tribal Honey Collective",
        category: "Indigenous Crafts & Organic Spices",
        type: "shop",
        lat: 10.0869,
        lng: 77.0598,
        specialty: "Wild Forest Honey, Fresh Green Cardamom, Clove & Homemade Dark Chocolate",
        avgPrice: "₹200 - ₹900",
        rating: 4.9,
        timing: "09:00 AM - 08:30 PM",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        story: "100% fair-trade cooperative directly sourcing uncut green cardamom pods from Muthuvan tribal families in Chinnar sanctuary.",
        mustTry: "Cold-extracted wild cliff honey & Grade-A Green Cardamom",
        isVeg: true
      }
    ],

    // Safety & Protective Layer (Hospitals, Police, Safe Points)
    safetyPoints: [
      {
        id: "mun-safe-1",
        name: "Tata General Hospital (24/7 Emergency & ICU)",
        type: "hospital",
        lat: 10.0860,
        lng: 77.0645,
        phone: "+91 4865 230233",
        distance: "800m from center",
        services: "Full Emergency Trauma, Ambulance dispatch, Pharmacy, English & Malayalam speaking doctors.",
        status: "Open 24x7"
      },
      {
        id: "mun-safe-2",
        name: "Munnar Tourist Police & Assistance Desk",
        type: "police",
        lat: 10.0890,
        lng: 77.0580,
        phone: "+91 4865 230323",
        distance: "300m from center",
        services: "Lost document assistance, 24/7 highway patrol, emergency SOS dispatch, language translation.",
        status: "24x7 Active Patrol"
      },
      {
        id: "mun-safe-3",
        name: "Munnar Highway Emergency Help Point",
        type: "helpline",
        lat: 10.0750,
        lng: 77.0700,
        phone: "112 / 108",
        distance: "2.1 km from center",
        services: "Roadside mechanical breakdown, fog warning alerts, first-aid station.",
        status: "Verified Safe Zone"
      }
    ],

    // Default Pre-built Curated Itinerary Stops for Journey Builder
    itineraryDays: [
      {
        dayNumber: 1,
        title: "High Mountain Mist & Heritage",
        theme: "Nature, Heritage & Colonial Tea Vistas",
        stops: [
          { time: "07:30 AM", placeId: "mun-att-1", title: "Eravikulam Wildlife Morning Safari", duration: "2.5 hrs", cost: 200, category: "Sanctuary", note: "Watch Nilgiri Tahr against morning mist" },
          { time: "10:30 AM", placeId: "mun-att-3", title: "KDHP Century Tea Museum & Tasting", duration: "1.5 hrs", cost: 125, category: "Heritage", note: "Learn CTC tea processing and taste white tea" },
          { time: "01:00 PM", placeId: "mun-food-1", title: "Gurubhavan Banana Leaf Feast", duration: "1 hr", cost: 160, category: "Local Meal", note: "Authentic 14-dish Kerala sadhya lunch" },
          { time: "03:30 PM", placeId: "mun-att-2", title: "Mattupetty Lake Boat Walk", duration: "2 hrs", cost: 150, category: "Nature", note: "Pine trail walk and lake breeze" },
          { time: "06:30 PM", placeId: "mun-shop-1", title: "Spice Collective & Evening Bazaar", duration: "1.5 hrs", cost: 300, category: "Bazaar", note: "Stock up on single-origin cardamom & tea" }
        ]
      },
      {
        dayNumber: 2,
        title: "Unseen Off-Road & Secret Cascades",
        theme: "Offbeat Adventure & High Altitude Sunrises",
        stops: [
          { time: "04:30 AM", placeId: "mun-gem-1", title: "Kolukkumalai Sunrise 4x4 Jeep Trek", duration: "4 hrs", cost: 550, category: "Secret Spot", note: "World's highest tea plantation sunrise" },
          { time: "10:30 AM", placeId: "mun-stay-1", title: "Lockhart Valley Breakfast & Rest", duration: "2 hrs", cost: 350, category: "Dining", note: "Traditional Appam with vegetable stew" },
          { time: "02:00 PM", placeId: "mun-gem-2", title: "Attukad Hidden Cascades Swim", duration: "2.5 hrs", cost: 0, category: "Secret Spot", note: "Wild cardamom canyon & crystal brook" },
          { time: "05:30 PM", placeId: "mun-gem-3", title: "Chithirapuram Colonial Golden Hour", duration: "1.5 hrs", cost: 0, category: "Scenic Village", note: "Sunset over Pallivasal valley" },
          { time: "08:00 PM", placeId: "mun-food-2", title: "Rapsy Kitchen Stargazing Dinner", duration: "1.5 hrs", cost: 220, category: "Local Eats", note: "Spiced hot tea & pepper chicken" }
        ]
      },
      {
        dayNumber: 3,
        title: "Panoramic Borders & Cloud Sea",
        theme: "High Altitude Ridges & Forest Treks",
        stops: [
          { time: "06:30 AM", placeId: "mun-att-4", title: "Top Station Sunrise & Cliff Edge", duration: "3 hrs", cost: 50, category: "Ridge", note: "Panoramic views of Tamil Nadu lowlands" },
          { time: "11:00 AM", placeId: "mun-att-2", title: "Echo Point & Kundala Dam Kayaking", duration: "2 hrs", cost: 250, category: "Activities", note: "Pedal boating among mountain shadows" },
          { time: "02:30 PM", placeId: "mun-food-1", title: "Hilltop Herbal Cafe", duration: "1.5 hrs", cost: 180, category: "Dining", note: "Fresh mountain mint tea & roasted corn" },
          { time: "05:00 PM", placeId: "mun-stay-2", title: "Mist Haven Sunset Bonfire", duration: "2 hrs", cost: 300, category: "Evening", note: "Acoustic music by the fireplace" }
        ]
      }
    ]
  },

  // 2. Wayanad (Second rich destination)
  {
    id: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    region: "Western Ghats, South India",
    tagline: "Prehistoric rock caves, wild rainforests & misty bamboo rafts",
    coordinates: { lat: 11.6854, lng: 76.1320 },
    currentWeather: {
      temp: "22°C",
      condition: "Crisp & Sunny",
      humidity: "65%",
      wind: "9 km/h",
      forecast: "Clear weather. Ideal for prehistoric cave trek and bamboo rafting."
    },
    crowdIndex: "Low (Uncrowded, peaceful)",
    elevation: "700 - 2,100 m",
    bestTime: "October to May",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85",
    atlasCover: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=85",
    editorialQuote: "“Ancient stone petroglyphs carved thousands of years ago, wrapped in dense teak canopies and echoing with wild elephant calls.”",
    editorialStory: "Wayanad translates literally to 'The Land of Paddy Fields'. Perched along the crest of the Western Ghats, it bridges the mist of Kerala with the wildlife sanctuaries of Karnataka and Tamil Nadu. From 6,000-year-old Neolithic carvings at Edakkal to serene river islands on the Kabini, it is a haven for mindful explorers.",
    
    attractions: [
      {
        id: "way-att-1",
        name: "Edakkal Caves (Neolithic Petroglyphs)",
        category: "Ancient Heritage",
        type: "sight",
        lat: 11.6288,
        lng: 76.2346,
        distance: "12 km from Kalpetta",
        travelTime: "25 mins drive",
        duration: "2.5 hours",
        cost: 150,
        rating: 4.8,
        reviewsCount: 1680,
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        bestTime: "08:30 AM - 11:00 AM (Cool morning trek)",
        crowd: "Moderate",
        description: "Rare stone-age cliff shelters with human and animal petroglyphs dating back to 6,000 BCE. Spectacular panoramic summit view.",
        localTip: "Climb the 300 stone steps early before mid-day heat.",
        tags: ["Neolithic", "UNESCO Candidate", "Trek"]
      },
      {
        id: "way-att-2",
        name: "Banasura Sagar Earth Dam",
        category: "Lake & Island Archipelagos",
        type: "sight",
        lat: 11.6706,
        lng: 75.9575,
        distance: "21 km from center",
        travelTime: "40 mins drive",
        duration: "2.5 hours",
        cost: 110,
        rating: 4.7,
        reviewsCount: 1250,
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        bestTime: "03:00 PM - 05:30 PM",
        crowd: "Moderate",
        description: "The largest earthen dam in India. When the reservoir fills, hill peaks become floating green islands against the Banasura mountains.",
        localTip: "Speedboat ride circles the isolated green islands where migratory herons nest.",
        tags: ["Largest Earth Dam", "Boating", "Islands"]
      }
    ],
    hiddenGems: [
      {
        id: "way-gem-1",
        name: "Kuruvadweep Silent Bamboo Rafting",
        category: "Protected River Island Canopy",
        type: "unseen",
        lat: 11.8214,
        lng: 76.0963,
        distance: "28 km north",
        travelTime: "50 mins drive",
        duration: "3 hours",
        cost: 250,
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        whyVisit: "950 acres of uninhabited river islands on the Kabini river, accessible only via eco-friendly handmade bamboo rafts guided by forest wardens.",
        localSecret: "Closed during heavy monsoon for safety. Best experienced between 8:30 AM and 10:30 AM for rare hornbill bird sightings.",
        bestTime: "08:30 AM - 11:00 AM",
        crowd: "Strictly limited to 400 entries/day",
        footwearAlert: "Water sandals recommended.",
        networkAlert: "No cellular coverage inside forest.",
        tags: ["Bamboo Raft", "Hornbills", "Protected Bio-reserve"]
      }
    ],
    stays: [
      {
        id: "way-stay-1",
        name: "Kabini River Bamboo Estate",
        category: "Rainforest Eco Treehouse",
        type: "stay",
        lat: 11.7500,
        lng: 76.1100,
        pricePerNight: 3900,
        priceTier: "Eco Treehouse",
        rating: 4.85,
        reviewsCount: 220,
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        distance: "14 km from Kalpetta",
        amenities: ["Treehouse Canopy View", "River Kayaking", "Organic Spices Garden", "Campfire"],
        description: "Elevated treehouses built using native bamboo and teak. Wake up to mist rising over the Kabini stream.",
        localArea: "Bordering protected riverine forest.",
        ecoScore: 99
      }
    ],
    localPulse: [
      {
        id: "way-food-1",
        name: "1940s Udupi & Malabar Thali Kitchen",
        category: "Heritage Diners",
        type: "food",
        lat: 11.6850,
        lng: 76.1310,
        specialty: "Bamboo Biryani, Puttu with Kadala Curry, Spiced Sulaimani Tea",
        avgPrice: "₹140 - ₹260",
        rating: 4.7,
        timing: "07:30 AM - 09:30 PM",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        story: "Authentic slow-cooked biryani steamed inside whole raw bamboo segments over wood fire.",
        mustTry: "Bamboo Steamed Dum Biryani & Sulaimani Chai",
        isVeg: false
      }
    ],
    safetyPoints: [
      {
        id: "way-safe-1",
        name: "Wayanad District General Hospital",
        type: "hospital",
        lat: 11.6830,
        lng: 76.1340,
        phone: "+91 4936 202422",
        distance: "600m from Kalpetta Center",
        services: "24/7 Trauma Emergency, Ambulance, Antivenom Center.",
        status: "Open 24x7"
      }
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Prehistoric Stone & Sacred Waters",
        theme: "Ancient History & Earth Dam",
        stops: [
          { time: "08:30 AM", placeId: "way-att-1", title: "Edakkal Caves Neolithic Climb", duration: "3 hrs", cost: 150, category: "Ancient Heritage", note: "Stone carvings from 6000 BCE" },
          { time: "01:00 PM", placeId: "way-food-1", title: "Traditional Bamboo Biryani Lunch", duration: "1.5 hrs", cost: 240, category: "Local Meal", note: "Steamed inside bamboo stalks" },
          { time: "03:30 PM", placeId: "way-att-2", title: "Banasura Sagar Dam Speedboat", duration: "2 hrs", cost: 110, category: "Island Reservoir", note: "Floating islands in mountain shadow" }
        ]
      }
    ]
  },

  // 3. Ooty (Nilgiri Queen)
  {
    id: "ooty",
    name: "Ooty (Udhagamandalam)",
    state: "Tamil Nadu",
    region: "Nilgiri Hills, South India",
    tagline: "Heritage Toy Train, Botanical Blooms & Colonial Pine Woods",
    coordinates: { lat: 11.4102, lng: 76.6950 },
    currentWeather: {
      temp: "15°C",
      condition: "Crisp Mountain Breeze",
      humidity: "70%",
      wind: "14 km/h",
      forecast: "Clear starry night. Chilly morning fog."
    },
    crowdIndex: "Moderate",
    elevation: "2,240 m (7,350 ft)",
    bestTime: "All Year Round",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    atlasCover: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85",
    editorialQuote: "“Riding a century-old steam locomotive through 208 curves and 16 tunnels, into the fragrant blue eucalyptus highlands.”",
    editorialStory: "Known as the Queen of Hill Stations, Ooty sits high on the Nilgiri plateau. Famous for the UNESCO World Heritage Mountain Railway, sprawling Italian botanical gardens, and the indigenous Toda tribal settlements.",
    attractions: [
      {
        id: "oot-att-1",
        name: "Nilgiri UNESCO Heritage Mountain Railway",
        category: "UNESCO Railway Heritage",
        type: "sight",
        lat: 11.4050,
        lng: 76.6970,
        distance: "Central Ooty Station",
        travelTime: "On site",
        duration: "3 hours",
        cost: 205,
        rating: 4.95,
        reviewsCount: 3400,
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        bestTime: "09:00 AM (Early steam train)",
        crowd: "High (Booking required)",
        description: "Built by the British in 1908, this historic rack-and-pinion steam railway offers breathtaking cliffside gorge views.",
        localTip: "Book window seat on the valley side (right side heading to Mettupalayam).",
        tags: ["UNESCO", "Steam Train", "Heritage"]
      },
      {
        id: "oot-att-2",
        name: "Doddabetta Peak & Telescope Observatory",
        category: "Highest Nilgiri Peak",
        type: "sight",
        lat: 11.4005,
        lng: 76.7360,
        distance: "9 km from town",
        travelTime: "25 mins drive",
        duration: "2 hours",
        cost: 40,
        rating: 4.6,
        reviewsCount: 1900,
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        bestTime: "07:00 AM - 09:30 AM",
        crowd: "Moderate",
        description: "Highest point in the Nilgiri Mountains (2,637 m). Offers 360-degree views of Bandipur forests and Chamundi hills on clear days.",
        localTip: "Bring a warm woolen jacket; winds at the summit observatory deck are biting.",
        tags: ["Highest Peak", "Telescope", "Panoramic"]
      }
    ],
    hiddenGems: [
      {
        id: "oot-gem-1",
        name: "Avalanche Lake & Emerald Forest Sanctuary",
        category: "Protected Shola Wilderness",
        type: "unseen",
        lat: 11.3120,
        lng: 76.5850,
        distance: "26 km south-west",
        travelTime: "55 mins drive",
        duration: "4 hours",
        cost: 150,
        rating: 4.95,
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        whyVisit: "Crystal-clear glacier lake surrounded by wild magnolia and trout streams. Strictly regulated forest department zone with zero commercial shops.",
        localSecret: "Requires forest permit at entrance gate. Board the official eco-safari van into the interior trout hatchery.",
        bestTime: "08:00 AM - 12:00 PM",
        crowd: "Strictly limited",
        footwearAlert: "Waterproof walking shoes.",
        networkAlert: "No cellular coverage.",
        tags: ["Crystal Lake", "Trout Sanctuary", "Eco Safari"]
      }
    ],
    stays: [
      {
        id: "oot-stay-1",
        name: "Savoy Nilgiri Heritage Mansion",
        category: "Colonial Heritage Hotel",
        type: "stay",
        lat: 11.4120,
        lng: 76.6990,
        pricePerNight: 5500,
        priceTier: "Luxe Heritage",
        rating: 4.85,
        reviewsCount: 380,
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        distance: "1.2 km from Botanical Garden",
        amenities: ["English Fireplace", "Rose Garden Afternoon Tea", "Vintage Library", "Billiard Room"],
        description: "180-year-old colonial manor house with wood-paneled walls, afternoon English scones, and evening eucalyptus fires.",
        localArea: "Historic Sylks Road quiet residential zone.",
        ecoScore: 92
      }
    ],
    localPulse: [
      {
        id: "oot-food-1",
        name: "Moddy's Artisan Confectionery since 1951",
        category: "Handcrafted Chocolates & Fudge",
        type: "shop",
        lat: 11.4110,
        lng: 76.6980,
        specialty: "Roasted Almond Fudge, Dark Truffles & Nilgiri Spiced Hot Chocolate",
        avgPrice: "₹180 - ₹600",
        rating: 4.9,
        timing: "09:00 AM - 09:30 PM",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        story: "Crafting small-batch dark chocolates and walnut fudges with pure Nilgiri dairy butter for more than 70 years.",
        mustTry: "Rum & Raisin Truffles and Melt-in-mouth Fig Fudge",
        isVeg: true
      }
    ],
    safetyPoints: [
      {
        id: "oot-safe-1",
        name: "Ooty Government General Hospital",
        type: "hospital",
        lat: 11.4080,
        lng: 76.7020,
        phone: "+91 423 2442212",
        distance: "1 km from town center",
        services: "24/7 Emergency, Hypothermia care, Oxygen clinic.",
        status: "Open 24x7"
      }
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Steam Railway & Nilgiri Peaks",
        theme: "Colonial Railway & Summit Observatory",
        stops: [
          { time: "09:00 AM", placeId: "oot-att-1", title: "Nilgiri Mountain Steam Train Ride", duration: "3 hrs", cost: 205, category: "UNESCO Train", note: "Historic mountain gorge route" },
          { time: "01:00 PM", placeId: "oot-food-1", title: "Traditional Nilgiri Bakery & Tea", duration: "1 hr", cost: 180, category: "Snack & Tea", note: "Warm almond fudge and hot spiced chai" },
          { time: "03:00 PM", placeId: "oot-att-2", title: "Doddabetta Summit & Telescope Deck", duration: "2.5 hrs", cost: 40, category: "Peak View", note: "360-degree Nilgiri panorama" }
        ]
      }
    ]
  }
];

// Live Travel Circle Members Data (Live location sharing)
export const INITIAL_TRAVEL_CIRCLE = [
  {
    id: "user-me",
    name: "You (Explorer)",
    status: "Live & Active",
    isSelf: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    currentLocationName: "Near Eravikulam Basecamp, Munnar",
    coordinates: { lat: 10.1450, lng: 77.0650 },
    batteryLevel: 86,
    speed: "24 km/h (In Transit)",
    lastUpdated: "Just now",
    currentDestination: "Mattupetty Lake",
    etaMinutes: 18,
    isSharingLocation: true
  },
  {
    id: "friend-1",
    name: "Aravind Sharma",
    status: "Exploring",
    isSelf: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    currentLocationName: "Tea County Estate Cafe, Munnar",
    coordinates: { lat: 10.0880, lng: 77.0610 },
    batteryLevel: 94,
    speed: "Stationary (Cafe)",
    lastUpdated: "2 mins ago",
    currentDestination: "Gurubhavan Mess for Lunch",
    etaMinutes: 12,
    isSharingLocation: true
  },
  {
    id: "friend-2",
    name: "Priya Nair",
    status: "Trekking",
    isSelf: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    currentLocationName: "Attukad Waterfalls Trail",
    coordinates: { lat: 10.0520, lng: 77.0450 },
    batteryLevel: 68,
    speed: "4 km/h (Walking)",
    lastUpdated: "5 mins ago",
    currentDestination: "Chithirapuram Viewpoint",
    etaMinutes: 35,
    isSharingLocation: true
  }
];

// Helper to calculate distance in KM between two coordinates
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

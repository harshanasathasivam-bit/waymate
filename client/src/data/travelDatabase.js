// Comprehensive Travel Database for WayMate
// Featuring Chennai, Munnar, Ooty, and Wayanad with unified data schema,
// standardized categories, explicit subcategories, GPS coordinates, galleries & verified metadata.

export const DESTINATIONS = [
  // ==========================================
  // 1. CHENNAI (Tamil Nadu)
  // ==========================================
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Coastal heritage, ancient Dravidian temples & vibrant culinary streets",
    currentWeather: {
      temp: "32°C",
      condition: "Warm Coastal Breeze",
      time: "6:30 PM",
      icon: "☀"
    },
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85",
    
    // Core Attractions
    attractions: [
      {
        id: "chn-1",
        name: "Marina Beach & Lighthouse",
        category: "Coastal Landmark",
        subcategory: "lakes_beaches",
        type: "attraction",
        rating: 4.7,
        reviewsCount: 3840,
        distance: "2.4 km from center",
        transitTime: "10 mins by cab",
        estimatedCost: "Free Entry (₹50 for Lighthouse)",
        cost: "₹50",
        shortDesc: "The world's second-longest urban beach. Perfect for cool evening sea breeze, fresh roasted corn, and panoramic coastal views from the vintage lighthouse.",
        description: "Marina Beach stretches over 13 kilometers along the Coromandel Coast of the Bay of Bengal. It is Chennai's primary social hub featuring statues of Tamil scholars, horse rides, kite flyers, seafood stalls, and the Chennai Lighthouse which offers a 360-degree aerial perspective of the city.",
        whyVisit: "Breathtaking coastline sunset, cool evening sea breeze, iconic British-era lighthouse observatory, and fresh crispy sundal snacks.",
        bestTime: "Best for sunset (05:00 PM - 07:30 PM)",
        timings: "05:00 AM - 10:00 PM daily",
        openingHours: "05:00 AM - 10:00 PM daily",
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0499,
        lng: 80.2824,
        tags: ["Sunset", "Beach Walk", "Street Snacks", "Lighthouse", "Sea View"]
      },
      {
        id: "chn-2",
        name: "Kapaleeshwarar Temple, Mylapore",
        category: "Ancient Dravidian Heritage",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.9,
        reviewsCount: 2950,
        distance: "3.8 km from center",
        transitTime: "15 mins by cab",
        estimatedCost: "Free Entry",
        cost: "Free",
        shortDesc: "7th-century architectural marvel dedicated to Lord Shiva, featuring an intricately carved 37-meter rainbow Gopuram and traditional sacred temple tank.",
        description: "Built in classical Dravidian style during the 7th century, the Kapaleeshwarar Temple is the spiritual beating heart of Mylapore. It houses bronze Chola idols, sacred courtyard trees, vibrant flower garland stalls, and a grand sacred rectangular water tank.",
        whyVisit: "Magnificent 37m sculpted Dravidian Gopuram, authentic Carnatic musical heritage, aromatic camphor poojas, and timeless spiritual serenity.",
        bestTime: "06:00 AM - 08:30 AM & 05:30 PM - 08:00 PM",
        timings: "05:30 AM - 12:00 PM, 04:00 PM - 09:00 PM",
        openingHours: "05:30 AM - 12:00 PM, 04:00 PM - 09:00 PM",
        photo: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0336,
        lng: 80.2698,
        tags: ["Temple", "Dravidian Architecture", "Sacred Tank", "Heritage", "Spiritual"]
      },
      {
        id: "chn-3",
        name: "Fort St. George & Clive House",
        category: "Colonial History & Museum",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.6,
        reviewsCount: 1420,
        distance: "5.1 km from center",
        transitTime: "18 mins by cab",
        estimatedCost: "₹25 Entry",
        cost: "₹25",
        shortDesc: "Built in 1644 as the first English fortress in India. Houses St. Mary’s Church (oldest Anglican church in Asia) and rare colonial artifacts.",
        description: "Fort St. George marks the historic founding point of modern Madras. Today it houses the Tamil Nadu Legislative Assembly and the Fort Museum, exhibiting British colonial weaponry, rare coins, oil paintings, and original East India Company charters.",
        whyVisit: "Historic 1644 fortress bastions, Asia's oldest Anglican church, and an exceptional military and colonial history museum.",
        bestTime: "09:30 AM - 04:30 PM (Closed on Fridays)",
        timings: "09:00 AM - 05:00 PM (Closed Fridays)",
        openingHours: "09:00 AM - 05:00 PM (Closed Fridays)",
        photo: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0797,
        lng: 80.2874,
        tags: ["Fortress", "Museum", "Colonial History", "British Heritage"]
      },
      {
        id: "chn-4",
        name: "San Thome Cathedral Basilica",
        category: "Neo-Gothic Architecture",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.75,
        reviewsCount: 1800,
        distance: "3.2 km from center",
        transitTime: "12 mins by cab",
        estimatedCost: "Free Entry",
        cost: "Free",
        shortDesc: "Majestic 16th-century Portuguese pilgrimage cathedral built over the tomb of St. Thomas the Apostle, one of only three in the world built over an apostle's tomb.",
        description: "San Thome Basilica stands proud in soaring white Neo-Gothic spires against the blue Bay of Bengal. Built originally by Portuguese explorers in the 1500s and rebuilt by the British in 1896, it holds the underground crypt of Apostle Thomas.",
        whyVisit: "One of only 3 basilicas globally atop an Apostle tomb, exquisite stained-glass windows, and tranquil coastal prayer gardens.",
        bestTime: "08:00 AM - 06:00 PM",
        timings: "06:00 AM - 08:00 PM daily",
        openingHours: "06:00 AM - 08:00 PM daily",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0334,
        lng: 80.2783,
        tags: ["Cathedral", "Pilgrimage", "Neo-Gothic", "Coastal"]
      },
      {
        id: "chn-5",
        name: "DakshinaChitra Living Heritage Museum",
        category: "Cultural Village",
        subcategory: "family",
        type: "attraction",
        rating: 4.85,
        reviewsCount: 2200,
        distance: "18 km south on ECR",
        transitTime: "35 mins by cab",
        estimatedCost: "₹175 Entry",
        cost: "₹175",
        shortDesc: "An immersive open-air living museum showcasing 18 authentic heritage houses transplanted from Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.",
        description: "DakshinaChitra is a cross-cultural center where traditional architecture, folk dance, glass-blowing, silk-weaving, and pottery flourish. Children and families can participate in hands-on craft sessions with rural master artisans.",
        whyVisit: "Authentic transplanted 18th-century South Indian courtyard homes, live artisan workshops, folk dance performances, and family fun.",
        bestTime: "10:00 AM - 05:00 PM (Closed Tuesdays)",
        timings: "10:00 AM - 06:00 PM (Closed Tuesdays)",
        openingHours: "10:00 AM - 06:00 PM (Closed Tuesdays)",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 12.8183,
        lng: 80.2427,
        tags: ["Artisans", "Heritage Houses", "Workshops", "Family", "Crafts"]
      },
      {
        id: "chn-6",
        name: "St. Thomas Mount & Skyline Viewpoint",
        category: "Panoramic Ridge View",
        subcategory: "viewpoints",
        type: "attraction",
        rating: 4.8,
        reviewsCount: 1650,
        distance: "8.5 km from center",
        transitTime: "25 mins by cab",
        estimatedCost: "Free Entry",
        cost: "Free",
        shortDesc: "300-foot hilltop viewpoint offering 360-degree panoramic sights of the Chennai cityscape, airport runway flights, and coastal horizon.",
        description: "St. Thomas Mount provides the highest vantage point in Chennai. Climbing the 134 stone steps leads to an ancient 1523 Portuguese church surrounded by banyan trees, providing a panoramic sunset viewpoint.",
        whyVisit: "Unmatched 360-degree city skyline vistas, watching airplanes glide into Chennai airport, and peaceful hilltop breeze.",
        bestTime: "05:00 PM - 07:00 PM",
        timings: "06:00 AM - 08:00 PM daily",
        openingHours: "06:00 AM - 08:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0033,
        lng: 80.1930,
        tags: ["Viewpoint", "Sunset", "Skyline", "Hilltop"]
      },
      {
        id: "chn-7",
        name: "Guindy National Park & Deer Sanctuary",
        category: "Urban Wilderness",
        subcategory: "nature",
        type: "attraction",
        rating: 4.65,
        reviewsCount: 2100,
        distance: "6.0 km from center",
        transitTime: "20 mins by cab",
        estimatedCost: "₹30 Entry",
        cost: "₹30",
        shortDesc: "One of the few national parks situated entirely inside an Indian metropolis, harboring spotted deer, blackbucks, and over 150 bird species.",
        description: "Guindy National Park spans 2.7 sq km of dry evergreen scrub forest. It features walking nature trails, butterfly parks, a children's zoo, and towering tropical trees.",
        whyVisit: "Peaceful forest immersion in the heart of the city, spotting free-roaming blackbucks, and shaded canopy walks.",
        bestTime: "09:00 AM - 12:00 PM & 03:00 PM - 05:30 PM",
        timings: "09:00 AM - 05:30 PM (Closed Tuesdays)",
        openingHours: "09:00 AM - 05:30 PM (Closed Tuesdays)",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0067,
        lng: 80.2206,
        tags: ["Nature", "Forest", "Wildlife", "Deer", "Birds"]
      }
    ],

    // Food & Dining
    food: [
      {
        id: "food-chn-1",
        name: "Murugan Idli Shop & Madras Filter Coffee",
        category: "Iconic South Indian Tiffin",
        subcategory: "local_traditional",
        rating: 4.9,
        reviewsCount: 4200,
        distance: "3.1 km from center",
        transitTime: "12 mins",
        estimatedCost: "₹120 for two",
        cost: "₹120 for two",
        shortDesc: "Melt-in-mouth hot steamed idlis served with 4 distinct freshly ground chutneys and signature ghee podi.",
        description: "A culinary pilgrimage for foodies in Chennai. Famous for fluffy, steaming hot idlis drizzled with aromatic ghee and podi, followed by piping hot filter coffee served in brass dabarah cups.",
        whyVisit: "World-famous melt-in-mouth soft idlis, 4 fresh signature chutneys, and classic South Indian brass tumbler filter coffee.",
        timings: "07:00 AM - 11:00 PM daily",
        openingHours: "07:00 AM - 11:00 PM daily",
        bestTime: "Breakfast (07:30 AM - 10:00 AM) or Evening Tiffin",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0382,
        lng: 80.2340,
        tags: ["Idli", "Filter Coffee", "Vegetarian", "Traditional", "Breakfast"]
      },
      {
        id: "food-chn-2",
        name: "Rayar's Mess - 80-Year-Old Mylapore Tiffin",
        category: "Historic Tiffin Room",
        subcategory: "local_traditional",
        rating: 4.95,
        reviewsCount: 2800,
        distance: "3.6 km from center",
        transitTime: "14 mins",
        estimatedCost: "₹90 per meal",
        cost: "₹90",
        shortDesc: "Secret alley joint famous for feather-light Ghee Podi Idlis, crispy Medu Vadas, and warm Mysore Pak.",
        description: "Operating since 1935 in a quaint Mylapore residential lane, Rayar's Mess represents Madras food culture at its purest. Everything is prepared in small batches and served blazing hot.",
        whyVisit: "Crispiest medu vadas in South India, legendary sweet Mysore Pak, and unforgettable communal nostalgia.",
        timings: "07:00 AM - 10:30 AM & 04:30 PM - 07:30 PM",
        openingHours: "07:00 AM - 10:30 AM & 04:30 PM - 07:30 PM",
        bestTime: "07:30 AM or 05:00 PM sharp",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0345,
        lng: 80.2680,
        tags: ["Mylapore", "Heritage Tiffin", "Vada", "Mysore Pak"]
      },
      {
        id: "food-chn-3",
        name: "Ponnusamy Military Hotel (Chettinad Cuisine)",
        category: "Chettinad Non-Veg Kitchen",
        subcategory: "restaurants",
        rating: 4.8,
        reviewsCount: 3100,
        distance: "2.5 km from center",
        transitTime: "10 mins",
        estimatedCost: "₹350 per meal",
        cost: "₹350",
        shortDesc: "Serving fiery Chettinad pepper chicken and seeraga samba mutton biryani over freshly cut banana leaves since 1954.",
        description: "Ponnusamy is the standard for authentic spicy Tamil Chettinad cooking. Their roasted pepper spices, crab masala, and banana leaf meals have satisfied generations of gastronomes.",
        whyVisit: "Fiery black pepper mutton sukka, traditional seeraga samba biryani, and authentic Tamil non-veg feast.",
        timings: "12:00 PM - 04:00 PM & 07:00 PM - 11:00 PM",
        openingHours: "12:00 PM - 04:00 PM & 07:00 PM - 11:00 PM",
        bestTime: "Lunch 01:00 PM - 02:30 PM",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0560,
        lng: 80.2520,
        tags: ["Chettinad", "Biryani", "Pepper Chicken", "Banana Leaf"]
      },
      {
        id: "food-chn-4",
        name: "Amethyst Cafe & Colonial Courtyard",
        category: "Garden Bistro & Patisserie",
        subcategory: "cafes",
        rating: 4.85,
        reviewsCount: 2400,
        distance: "1.5 km from center",
        transitTime: "8 mins",
        estimatedCost: "₹650 for two",
        cost: "₹650",
        shortDesc: "A lush colonial oasis cafe nestled under giant mahogany trees, serving artisan pasta, gourmet coffee, and handcrafted cakes.",
        description: "Set inside a restored 1920s colonial bungalow with chequered tiles, antique armchairs, and tropical foliage, Amethyst is Chennai's premier bohemian cafe and fashion hub.",
        whyVisit: "Verdant garden seating under antique chandeliers, artisanal iced lattes, and peaceful retreat from city bustle.",
        timings: "10:00 AM - 11:00 PM daily",
        openingHours: "10:00 AM - 11:00 PM daily",
        bestTime: "Late afternoon coffee (04:00 PM - 07:00 PM)",
        photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0565,
        lng: 80.2605,
        tags: ["Cafe", "Garden", "Pasta", "Coffee", "Colonial"]
      },
      {
        id: "food-chn-5",
        name: "Sowcarpet Mint Street Chaat & Murukku Sandwich",
        category: "Historic Street Food Hub",
        subcategory: "street_food",
        rating: 4.75,
        reviewsCount: 3600,
        distance: "4.2 km from center",
        transitTime: "15 mins",
        estimatedCost: "₹150 for tasting trail",
        cost: "₹150",
        shortDesc: "Vibrant North-Indian culinary street famous for cheese murukku sandwiches, sizzling kachoris, and rabdi kulfi.",
        description: "Mint Street in Sowcarpet is one of the oldest commercial streets in Chennai. In the evening, the street transforms into a bustling food paradise packed with Gujarathi and Marwari street food gems.",
        whyVisit: "Original cheese murukku sandwich, piping hot rabdi jalebi, and authentic evening street bustle.",
        timings: "04:30 PM - 10:30 PM daily",
        openingHours: "04:30 PM - 10:30 PM daily",
        bestTime: "06:00 PM - 09:00 PM",
        photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0900,
        lng: 80.2780,
        tags: ["Street Food", "Chaat", "Kachori", "Sowcarpet", "Evening"]
      }
    ],

    // Stays & Lodges
    stays: [
      {
        id: "stay-chn-1",
        name: "Taj Connemara Heritage Hotel",
        category: "Colonial Luxury Landmark",
        subcategory: "hotels",
        pricePerNight: 8500,
        rating: 4.9,
        reviewsCount: 1980,
        distance: "1.1 km from center (Binny Road)",
        transitTime: "5 mins",
        estimatedCost: "₹8,500 / night",
        cost: "₹8,500",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Colonial Courtyard", "Outdoor Pool", "Heritage High Tea", "Jiva Spa", "Fine Dining"],
        area: "Anna Salai Heritage District",
        shortDesc: "Chennai's oldest heritage hotel dating back to 1854, combining Victorian colonial grandeur with world-class Taj hospitality.",
        description: "A legend of the Raj era, the Connemara boasts century-old brass fittings, landscaped verandas, lush palm lawns, and refined Anglo-Indian luxury.",
        whyVisit: "Immerse yourself in authentic 19th-century royal heritage with modern 5-star comforts.",
        lat: 13.0605,
        lng: 80.2612,
        tags: ["Luxury", "Heritage", "Taj", "Pool", "Spa"]
      },
      {
        id: "stay-chn-2",
        name: "Mylapore Heritage Homestay & Courtyard",
        category: "Traditional Boutique Stay",
        subcategory: "homestays",
        pricePerNight: 3200,
        rating: 4.8,
        reviewsCount: 650,
        distance: "3.4 km from center",
        transitTime: "14 mins",
        estimatedCost: "₹3,200 / night",
        cost: "₹3,200",
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Traditional Thinnai Verandah", "Home-cooked South Indian Breakfast", "WiFi", "Temple View"],
        area: "Mylapore Temple Quarter",
        shortDesc: "A restored traditional Tamil Brahmin home with terracotta tiled roofs, courtyard thinnai, and genuine local warmth.",
        description: "Steps from Kapaleeshwarar temple, this family-run homestay offers guests authentic homemade dosas, morning suprabhatam chants, and courtyard relaxation.",
        whyVisit: "Authentic cultural immersion in historic Mylapore, peaceful verandah, and traditional home cooked recipes.",
        lat: 13.0330,
        lng: 80.2675,
        tags: ["Homestay", "Heritage", "Mylapore", "Breakfast", "Courtyard"]
      },
      {
        id: "stay-chn-3",
        name: "Boutique Coastal Retreat ECR",
        category: "Beachfront Villa & Resort",
        subcategory: "resorts",
        pricePerNight: 4800,
        rating: 4.75,
        reviewsCount: 890,
        distance: "11 km south on ECR",
        transitTime: "25 mins",
        estimatedCost: "₹4,800 / night",
        cost: "₹4,800",
        photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Direct Beach Access", "Private Lawn", "Sea Breeze Deck", "Infinity Pool", "Kitchenette"],
        area: "East Coast Road Promenade",
        shortDesc: "Quiet coastal resort with private path to the beach, sea-facing balconies, and fresh ocean breezes.",
        description: "Situated along Chennai's scenic East Coast Road, this resort is ideal for weekend retreats, family gatherings, and romantic coastal holidays.",
        whyVisit: "Fall asleep to the sound of crashing waves and enjoy morning sunrise jogs along golden sands.",
        lat: 12.9200,
        lng: 80.2550,
        tags: ["Resort", "Beachfront", "ECR", "Sea View", "Pool"]
      },
      {
        id: "stay-chn-4",
        name: "The Urban Backpacker Nest & Lodge",
        category: "Budget Pods & Hostel",
        subcategory: "lodges",
        pricePerNight: 1100,
        rating: 4.6,
        reviewsCount: 1120,
        distance: "800m from Central Station",
        transitTime: "3 mins",
        estimatedCost: "₹1,100 / night",
        cost: "₹1,100",
        photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["High-speed WiFi", "Shared Workspace", "Air Conditioning", "Community Kitchen", "Lockers"],
        area: "Egmore Hub",
        shortDesc: "Vibrant, clean budget lodge for solo travelers, digital nomads, and backpackers exploring Chennai.",
        description: "Modern AC bunk pods and private budget rooms located near major transit points, featuring common lounge games, city walking tours, and free chai.",
        whyVisit: "Unbeatable budget value, ultra-fast WiFi, friendly travel community, and walking distance to transit.",
        lat: 13.0780,
        lng: 80.2600,
        tags: ["Budget", "Hostel", "Lodge", "Backpacker", "Solo"]
      }
    ],

    // Local Shops & Crafts
    shops: [
      {
        id: "shop-chn-1",
        name: "Kanchipuram Silk Weavers' Collective, T. Nagar",
        category: "Authentic Handloom Textiles",
        subcategory: "textiles",
        rating: 4.9,
        reviewsCount: 1750,
        distance: "3.5 km from center",
        transitTime: "14 mins",
        estimatedCost: "₹2,500 - ₹25,000",
        cost: "₹2,500+",
        shortDesc: "Direct artisan cooperative featuring pure mulberry silk sarees handwoven with genuine silver and gold zari threads.",
        description: "Skip the middlemen and buy pure, Silk Mark-certified Kanchipuram bridal and casual silks directly from master weaver families.",
        whyVisit: "Certified authentic pure silk, intricate temple borders, fair-trade weaver support, and generational craft.",
        timings: "10:00 AM - 08:30 PM (Closed Sundays)",
        openingHours: "10:00 AM - 08:30 PM",
        bestTime: "11:00 AM - 04:00 PM for calm viewing",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0410,
        lng: 80.2330,
        tags: ["Silk", "Sarees", "Handloom", "Textiles", "Kanchipuram"]
      },
      {
        id: "shop-chn-2",
        name: "Mylapore Bronze & Brass Craft Guild",
        category: "Traditional Metal Crafts",
        subcategory: "handicrafts",
        rating: 4.85,
        reviewsCount: 920,
        distance: "3.7 km from center",
        transitTime: "15 mins",
        estimatedCost: "₹300 - ₹8,000",
        cost: "₹300+",
        shortDesc: "Generational bronze casters and metalsmiths crafting handcrafted Vilakku oil lamps, Nataraja statues, and temple bells.",
        description: "Located near South Mada Street, these artisan workshops practice the lost-wax casting technique passed down from Chola dynasty masters.",
        whyVisit: "Authentic hand-cast Chola bronze idols, aromatic pooja lamps, and bespoke brass home decor.",
        timings: "09:30 AM - 08:00 PM daily",
        openingHours: "09:30 AM - 08:00 PM",
        bestTime: "Evening walk (05:00 PM - 07:30 PM)",
        photo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0335,
        lng: 80.2690,
        tags: ["Bronze", "Handicrafts", "Brass", "Temple Lamps", "Artisans"]
      },
      {
        id: "shop-chn-3",
        name: "Giri Trading Temple Souvenirs & Books",
        category: "Spiritual Souvenirs & Incense",
        subcategory: "souvenirs",
        rating: 4.8,
        reviewsCount: 1400,
        distance: "3.8 km from center",
        transitTime: "15 mins",
        estimatedCost: "₹100 - ₹2,000",
        cost: "₹100+",
        shortDesc: "Iconic Mylapore institution stocked with handmade sandalwood incense, Tanjore art replicas, classical Carnatic CDs, and devotional tokens.",
        description: "A treasure trove of South Indian cultural memorabilia, brass figurines, spiritual literature in multiple languages, and pure dhoop resins.",
        whyVisit: "Pure fragrant sandalwood products, Tanjore painting souvenirs, and classical music books.",
        timings: "09:00 AM - 09:00 PM daily",
        openingHours: "09:00 AM - 09:00 PM",
        bestTime: "10:00 AM - 08:00 PM",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0340,
        lng: 80.2705,
        tags: ["Souvenirs", "Incense", "Music", "Mylapore", "Spiritual"]
      },
      {
        id: "shop-chn-4",
        name: "Pondy Bazaar Night Street Market",
        category: "Bustling Open Market",
        subcategory: "local_markets",
        rating: 4.7,
        reviewsCount: 3200,
        distance: "3.2 km from center",
        transitTime: "12 mins",
        estimatedCost: "₹100 - ₹1,500",
        cost: "₹100+",
        shortDesc: "Chennai's liveliest pedestrian shopping boulevard packed with footwear, bangles, cotton kurtas, and street snacks.",
        description: "The newly pedestrianized Pondy Bazaar walking plaza offers endless bargains, colourful glass bangles, cotton nightwear, and vibrant evening energy.",
        whyVisit: "Exciting street bargaining, handmade glass bangles, street momos, and vibrant pedestrian plaza atmosphere.",
        timings: "10:30 AM - 10:00 PM daily",
        openingHours: "10:30 AM - 10:00 PM",
        bestTime: "Evening (06:00 PM - 09:30 PM)",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0425,
        lng: 80.2380,
        tags: ["Market", "Shopping", "Bargain", "Bangles", "Street Market"]
      },
      {
        id: "shop-chn-5",
        name: "Parry's Corner Spices & Herb Guild",
        category: "Heritage Spice Bazaar",
        subcategory: "tea_spices",
        rating: 4.75,
        reviewsCount: 1100,
        distance: "4.8 km from center",
        transitTime: "16 mins",
        estimatedCost: "₹150 - ₹1,200",
        cost: "₹150+",
        shortDesc: "Wholesale spice merchants trading in sun-dried whole spices, organic turmeric roots, Cardamom, and aromatic Madras curry powders.",
        description: "Dating back to East India Company trading days, these historic spice alleys fill the air with aromatic cloves, cinnamon bark, and fresh black peppercorns.",
        whyVisit: "Wholesale prices on highest-grade whole spices, freshly milled sambar powders, and historic trade vibe.",
        timings: "10:00 AM - 07:30 PM (Closed Sundays)",
        openingHours: "10:00 AM - 07:30 PM",
        bestTime: "11:00 AM - 03:00 PM",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0895,
        lng: 80.2850,
        tags: ["Spices", "Cardamom", "Pepper", "Turmeric", "Wholesale"]
      }
    ],

    // Experiences & Workshops
    experiences: [
      {
        id: "exp-chn-1",
        name: "Mylapore Heritage Walking & Kolam Trail",
        category: "Cultural Immersion",
        subcategory: "culture",
        rating: 4.95,
        reviewsCount: 1650,
        distance: "3.5 km from center",
        transitTime: "14 mins",
        estimatedCost: "Free Guided / Self-guided",
        cost: "Free",
        shortDesc: "Evening temple bells, fresh jasmine flower markets, and the aroma of filter coffee from traditional street corners.",
        description: "Stroll with local storytellers through agraharam streets, learn to draw geometric rice-powder Kolam patterns, and explore centuries-old heritage homes.",
        whyVisit: "Authentic living tradition, intricate kolam art demonstrations, and delicious street tiffin stops.",
        timings: "06:30 AM - 08:30 AM or 05:00 PM - 07:30 PM",
        openingHours: "Morning & Evening slots",
        bestTime: "05:00 PM - 07:00 PM",
        photo: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0336,
        lng: 80.2698,
        tags: ["Walking Tour", "Heritage", "Kolam", "Culture", "Storytelling"]
      },
      {
        id: "exp-chn-2",
        name: "Covelong Point Surfing & Catamaran Ride",
        category: "Coastal Adventure",
        subcategory: "adventure",
        rating: 4.85,
        reviewsCount: 1200,
        distance: "24 km south on ECR",
        transitTime: "40 mins",
        estimatedCost: "₹1,200 per session",
        cost: "₹1,200",
        shortDesc: "Learn to catch gentle Bay of Bengal ocean swells with certified local fishermen surfers and ride traditional wooden catamarans.",
        description: "Covelong Point is India's premier surf school village. Experienced surf instructors coach beginners on pristine sands followed by fishing boat rides into the open sea.",
        whyVisit: "Beginner-friendly surf waves, authentic coastal fishing village vibes, and thrilling catamaran sailing.",
        timings: "06:00 AM - 05:30 PM daily",
        openingHours: "06:00 AM - 05:30 PM",
        bestTime: "Early Morning (06:30 AM - 09:30 AM)",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 12.7930,
        lng: 80.2510,
        tags: ["Surfing", "Adventure", "Ocean", "Catamaran", "ECR"]
      },
      {
        id: "exp-chn-3",
        name: "Besant Nagar Sunset & Street Photography Walk",
        category: "Visual Arts & Sunset",
        subcategory: "photography",
        rating: 4.8,
        reviewsCount: 1450,
        distance: "4.1 km from center",
        transitTime: "15 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "Capture golden hour silhouettes by the Karl Schmidt Memorial, crashing sea waves, and candid evening beach culture.",
        description: "Besant Nagar Beach offers the premier photography lighting in Chennai. Walk along the promenade, photograph local fishermen launching wooden boats, and enjoy freshly fried fish.",
        whyVisit: "Sensational golden hour light, iconic memorial architectural lines, and dynamic street life captures.",
        timings: "04:30 PM - 07:30 PM daily",
        openingHours: "Open 24/7",
        bestTime: "05:15 PM - 06:30 PM",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0002,
        lng: 80.2725,
        tags: ["Photography", "Sunset", "Beach", "Golden Hour", "Sea"]
      },
      {
        id: "exp-chn-4",
        name: "Theosophical Society Huddleston Banyan Trail",
        category: "Botanical Forest Walk",
        subcategory: "exp_nature",
        rating: 4.85,
        reviewsCount: 980,
        distance: "5.5 km from center",
        transitTime: "18 mins",
        estimatedCost: "Free Entry",
        cost: "Free",
        shortDesc: "A peaceful 260-acre forest sanctuary home to a 450-year-old giant Banyan tree spread over 40,000 sq ft.",
        description: "Walk beneath towering mahogany canopies, spot kingfishers and fruit bats, and experience complete meditative silence on the banks of the Adyar River.",
        whyVisit: "One of the world's largest living Banyan trees, serene birdwatching, and absolute peaceful forest calm.",
        timings: "08:30 AM - 10:00 AM & 02:00 PM - 04:00 PM (Closed Sundays)",
        openingHours: "08:30 AM - 10:00 AM, 02:00 PM - 04:00 PM",
        bestTime: "02:30 PM - 04:00 PM",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0080,
        lng: 80.2580,
        tags: ["Nature", "Banyan Tree", "Birds", "Sanctuary", "Quiet"]
      },
      {
        id: "exp-chn-5",
        name: "Government Museum Bronze Gallery Masterclass",
        category: "Classical Art & Sculpture",
        subcategory: "local_experiences",
        rating: 4.75,
        reviewsCount: 1100,
        distance: "2.8 km from center",
        transitTime: "10 mins",
        estimatedCost: "₹50 Entry",
        cost: "₹50",
        shortDesc: "Home to the world's most acclaimed collection of 10th-century Chola bronze sculptures including Nataraja.",
        description: "Explore the legendary collection of Pallava and Chola master bronzes with interactive museum curators explaining ancient iconographic lost-wax casting.",
        whyVisit: "Incomparable 1,000-year-old Nataraja cosmic dance bronze and ancient Buddhist and Jain stone antiquities.",
        timings: "09:30 AM - 05:00 PM (Closed Fridays)",
        openingHours: "09:30 AM - 05:00 PM (Closed Fridays)",
        bestTime: "10:30 AM - 01:00 PM",
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0700,
        lng: 80.2560,
        tags: ["Museum", "Bronze", "Chola", "Art", "Heritage"]
      }
    ],

    // Hidden Gems
    hiddenGems: [
      {
        id: "hg-chn-1",
        name: "Cholamandal Artists' Village, Injambakkam",
        category: "Bohemian Art Commune",
        subcategory: "cultural_gems",
        rating: 4.85,
        reviewsCount: 850,
        distance: "14 km from center",
        transitTime: "30 mins",
        estimatedCost: "₹30 Entry",
        cost: "₹30",
        shortDesc: "India's largest self-supporting artists' commune established in 1966. Stroll through open-air sculpture gardens and meet resident sculptors.",
        description: "Founded by K.C.S. Paniker, Cholamandal is a tranquil green enclave where painters and sculptors live and create. Visitors can view contemporary galleries and purchase original artworks.",
        whyVisit: "Original open-air modernist sculpture museum, private artist studios, and serene bohemian vibe.",
        bestTime: "10:00 AM - 05:30 PM",
        timings: "09:30 AM - 06:30 PM daily",
        openingHours: "09:30 AM - 06:30 PM daily",
        photo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 12.9150,
        lng: 80.2520,
        tags: ["Art", "Commune", "Sculpture", "Modern Art", "Quiet"]
      },
      {
        id: "hg-chn-2",
        name: "Broken Bridge & Adyar Estuary Sunset",
        category: "Quiet Coastal Viewpoint",
        subcategory: "secret_viewpoints",
        rating: 4.8,
        reviewsCount: 1100,
        distance: "6.8 km from center",
        transitTime: "20 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "A historic 1967 partially collapsed bridge extending over the Adyar river mouth. The quietest spot in Chennai to watch estuary sunsets.",
        description: "Surrounded by mangrove mudflats and migrating sea terns, Broken Bridge provides an unobstructed horizon view where river meets ocean away from tourist crowds.",
        whyVisit: "Spectacular sunset views over river estuary, birdwatching flamingos in winter, and absolute calm.",
        bestTime: "05:15 PM - 06:30 PM",
        timings: "05:00 AM - 07:00 PM daily",
        openingHours: "05:00 AM - 07:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0030,
        lng: 80.2760,
        tags: ["Secret Viewpoint", "Sunset", "Estuary", "Birds", "Coast"]
      },
      {
        id: "hg-chn-3",
        name: "Triplicane Hand-loom & Traditional Attar Lane",
        category: "Centuries-Old Bazaars",
        subcategory: "local_spots",
        rating: 4.8,
        reviewsCount: 780,
        distance: "2.1 km from center",
        transitTime: "8 mins",
        estimatedCost: "₹100 - ₹500",
        cost: "₹100+",
        shortDesc: "Narrow historic streets behind Big Mosque where traditional sandalwood attars, hand-embroidered textiles, and slow-dum Dum Biryani have been crafted for centuries.",
        description: "An authentic historic neighborhood vibrant with the aroma of rose water, hand-ground spices, pure perfume oils, and evening clay oven rotis.",
        whyVisit: "Hand-blended pure non-alcoholic attars, authentic Arcot nawab recipes, and historic narrow alleys.",
        bestTime: "05:00 PM - 09:30 PM",
        timings: "10:00 AM - 10:00 PM daily",
        openingHours: "10:00 AM - 10:00 PM daily",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 13.0580,
        lng: 80.2730,
        tags: ["Attar", "Triplicane", "Perfume", "Nawabi", "Historic"]
      },
      {
        id: "hg-chn-4",
        name: "Pallikaranai Marsh Wetland Bird Sanctuary",
        category: "Protected Freshwater Wetland",
        subcategory: "nature_gems",
        rating: 4.75,
        reviewsCount: 620,
        distance: "12 km south",
        transitTime: "25 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "A rare urban natural marshland hosting over 115 bird species including spot-billed pelicans, purple moorhens, and painted storks.",
        description: "An ecological gem with elevated walking viewing towers along the 200-hectare marsh, offering tranquil morning wetland photography.",
        whyVisit: "Spectacular spotting of migratory pelicans and storks, fresh morning air, and peaceful biodiversity.",
        bestTime: "06:00 AM - 08:30 AM",
        timings: "06:00 AM - 06:00 PM daily",
        openingHours: "06:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 12.9350,
        lng: 80.2150,
        tags: ["Birds", "Wetland", "Pelican", "Nature Gem", "Marsh"]
      }
    ],

    // Curated Itinerary
    curatedTrip: {
      title: "Chennai Heritage & Coastal Escape",
      duration: "3 Days",
      budget: "₹8,500",
      days: [
        {
          dayNumber: 1,
          theme: "Heritage & Cultural Immersion",
          stops: [
            { time: "09:00 AM", title: "Fort St. George & Colonial Museum", duration: "2 hrs", cost: "₹25", desc: "First British fortress in India and historic St. Mary's Church" },
            { time: "11:30 AM", title: "Government Museum Bronze Gallery", duration: "1.5 hrs", cost: "₹50", desc: "World-renowned Chola bronze masterworks" },
            { time: "01:00 PM", title: "Traditional Banana Leaf Lunch at Murugan Idli", duration: "1 hr", cost: "₹180", desc: "Classic South Indian thali feast with rasam & appalam" },
            { time: "04:00 PM", title: "Kapaleeshwarar Temple & Mylapore Tank", duration: "2 hrs", cost: "Free", desc: "7th-century Dravidian Gopuram and flower bazaar walk" },
            { time: "06:30 PM", title: "Marina Beach Sunset & Roasted Corn Walk", duration: "1.5 hrs", cost: "₹50", desc: "Sunset sea breeze by the lighthouse" }
          ]
        },
        {
          dayNumber: 2,
          theme: "Food Trails & Local Life",
          stops: [
            { time: "08:00 AM", title: "Rayar's Mess Morning Ghee Podi Idlis", duration: "1 hr", cost: "₹90", desc: "Secret 80-year-old hidden alley breakfast" },
            { time: "10:30 AM", title: "San Thome Neo-Gothic Basilica", duration: "1.5 hrs", cost: "Free", desc: "Tomb of St. Thomas the Apostle" },
            { time: "01:00 PM", title: "Ponnusamy Chettinad Pepper Feast", duration: "1.5 hrs", cost: "₹350", desc: "Authentic spicy Chettinad roasted curry" },
            { time: "03:30 PM", title: "T. Nagar Silk & Traditional Crafts Bazaar", duration: "2.5 hrs", cost: "₹500", desc: "Artisan handlooms, bronze lamps, and sandalwood" },
            { time: "06:30 PM", title: "Besant Nagar Beach & Promenade", duration: "2 hrs", cost: "₹100", desc: "Sunset tea and sea promenade" }
          ]
        },
        {
          dayNumber: 3,
          theme: "Artisans & Coastal Scenic Drive",
          stops: [
            { time: "09:30 AM", title: "DakshinaChitra Living Heritage Museum", duration: "3 hrs", cost: "₹175", desc: "Authentic transplanted South Indian village houses" },
            { time: "01:30 PM", title: "Coastal Seafood Lunch on ECR", duration: "1.5 hrs", cost: "₹400", desc: "Fresh catch of the day by the sea" },
            { time: "03:30 PM", title: "Cholamandal Artists' Village & Studio Walk", duration: "2 hrs", cost: "₹30", desc: "Open sculpture garden & private painter studios" },
            { time: "06:00 PM", title: "Broken Bridge Estuary Sunset", duration: "1.5 hrs", cost: "Free", desc: "Watch flamingos at the quiet Adyar estuary" }
          ]
        }
      ]
    },

    budgetOverview: {
      total: 10000,
      spent: 6750,
      remaining: 3250,
      categories: [
        { name: "Stay (2 Nights)", allocated: 4000, percentage: 40, color: "#c2410c" },
        { name: "Food & Dining", allocated: 1500, percentage: 25, color: "#d97706" },
        { name: "Transport & Cabs", allocated: 750, percentage: 18, color: "#0284c7" },
        { name: "Activities & Entries", allocated: 500, percentage: 12, color: "#059669" }
      ]
    },

    safetyDirectory: [
      {
        name: "Apollo Main Hospital (24/7 Emergency & ICU)",
        type: "hospital",
        phone: "+91 44 2829 0200",
        address: "Greams Lane, Thousand Lights, Chennai",
        distance: "1.8 km away",
        services: "Multi-specialty 24x7 trauma care, international patient desk, ambulance."
      },
      {
        name: "Tourist Police Assistance Desk & Station",
        type: "police",
        phone: "+91 44 2844 8000 / 112",
        address: "Marina Beach Road, Triplicane, Chennai",
        distance: "2.2 km away",
        services: "24/7 tourist patrol, document lost assistance, English and Tamil support."
      },
      {
        name: "Tamil Nadu Tourism Emergency Helpline",
        type: "helpline",
        phone: "1800-4253-1111 (Toll Free)",
        address: "Tourism Complex, Wallajah Road, Chennai",
        distance: "2.9 km away",
        services: "Official government tourist assistance, verified cab rates, helpline."
      }
    ]
  },

  // ==========================================
  // 2. MUNNAR (Kerala)
  // ==========================================
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    tagline: "Rolling tea mist, emerald peaks & cool colonial mountain trails",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    currentWeather: {
      temp: "19°C",
      condition: "Cool Mist & Light Breeze",
      time: "6:30 PM",
      icon: "🌤️"
    },
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85",
    
    // Attractions
    attractions: [
      {
        id: "mun-1",
        name: "Eravikulam National Park & Rajamalai",
        category: "High Altitude Wildlife Park",
        subcategory: "nature",
        type: "attraction",
        rating: 4.85,
        reviewsCount: 3100,
        distance: "7.8 km from town",
        transitTime: "20 mins by jeep",
        estimatedCost: "₹200 Entry",
        cost: "₹200",
        shortDesc: "Home to the endangered Nilgiri Tahr mountain goat. Scenic park shuttles ascend to high-altitude tea trails with 360-degree mountain valley vistas.",
        description: "Spread over 97 sq km in the Western Ghats, Eravikulam is Kerala's first national park. Rolling grasslands and shola forests shelter wild Nilgiri Tahrs, atlas moths, and blooming Neelakurinji shrubs.",
        whyVisit: "Spot rare Nilgiri Tahr mountain goats up close, see Anamudi Peak (highest in South India), and walk through cool floating mist.",
        bestTime: "07:30 AM - 10:30 AM",
        timings: "07:30 AM - 04:00 PM daily",
        openingHours: "07:30 AM - 04:00 PM daily",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.1500,
        lng: 77.0667,
        tags: ["Wildlife", "Mountain Views", "Shola Forest", "Nilgiri Tahr"]
      },
      {
        id: "mun-2",
        name: "KDHP Tea Museum & Century Factory",
        category: "Colonial Tea Heritage",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.75,
        reviewsCount: 2200,
        distance: "1.4 km from town center",
        transitTime: "5 mins",
        estimatedCost: "₹125 Entry",
        cost: "₹125",
        shortDesc: "Century-old tea estate factory demonstrating CTC processing, vintage roller machines, and artisan tea sommelier tastings.",
        description: "Step into the history of tea plantation pioneers in Munnar. View century-old machinery, watch live tea leaf processing, and taste artisanal white, green, and black cardamom teas.",
        whyVisit: "Fascinating documentary on Munnar history, live tea processing factory tour, and freshly plucked estate tea tasting.",
        bestTime: "10:00 AM - 04:00 PM (Closed Mondays)",
        timings: "09:00 AM - 05:00 PM (Closed Mondays)",
        openingHours: "09:00 AM - 05:00 PM (Closed Mondays)",
        photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0880,
        lng: 77.0610,
        tags: ["Tea Tasting", "Colonial History", "Factory Tour", "Heritage"]
      },
      {
        id: "mun-3",
        name: "Mattupetty Dam & Echo Point Lake",
        category: "Mountain Reservoir & Boating",
        subcategory: "lakes_beaches",
        type: "attraction",
        rating: 4.7,
        reviewsCount: 2850,
        distance: "13 km from town",
        transitTime: "30 mins",
        estimatedCost: "₹50 Entry + ₹500 Speedboat",
        cost: "₹50",
        shortDesc: "Scenic concrete gravity dam surrounded by rolling tea hills, mist, speedboating, and wild elephant corridors.",
        description: "Mattupetty Dam is nestled among green hills at an altitude of 1,700m. Speedboats cruise past tranquil waters where herds of wild elephants frequently come to drink.",
        whyVisit: "Thrilling speedboat rides, natural acoustic echo phenomenon, and cool mountain lake breeze.",
        bestTime: "09:30 AM - 01:00 PM & 03:00 PM - 05:00 PM",
        timings: "09:00 AM - 05:30 PM daily",
        openingHours: "09:00 AM - 05:30 PM daily",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.1060,
        lng: 77.1240,
        tags: ["Boating", "Dam", "Echo Point", "Lake", "Elephants"]
      },
      {
        id: "mun-4",
        name: "Pothamedu Sunset Viewpoint",
        category: "Valley Sunset Ridge",
        subcategory: "viewpoints",
        type: "attraction",
        rating: 4.9,
        reviewsCount: 1950,
        distance: "3.2 km from town",
        transitTime: "10 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "Spectacular cliffside viewpoint overlooking emerald tea plantations, coffee groves, and dramatic mountain valley sunsets.",
        description: "Perched high on the mountain slope, Pothamedu offers sweeping views of the Muthirappuzha River and surrounding tea carpets bathed in golden evening light.",
        whyVisit: "Most breathtaking sunset in Munnar, steaming hot cardamom tea stalls, and rolling valley mist.",
        bestTime: "05:00 PM - 06:45 PM",
        timings: "Open 24/7",
        openingHours: "Open 24/7",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0750,
        lng: 77.0540,
        tags: ["Sunset", "Viewpoint", "Tea Gardens", "Valley", "Mist"]
      },
      {
        id: "mun-5",
        name: "Carmelagiri Elephant & Spice Park",
        category: "Family Nature Park",
        subcategory: "family",
        type: "attraction",
        rating: 4.6,
        reviewsCount: 1540,
        distance: "9.5 km from town",
        transitTime: "25 mins",
        estimatedCost: "₹400 Safari",
        cost: "₹400",
        shortDesc: "Family-friendly pine forest park offering elephant encounters, organic spice garden tours, and forest trail walks.",
        description: "A lovely ecological park tucked within dense woods where children can learn about Asian elephants, feed gentle tuskers, and explore organic pepper and vanilla vines.",
        whyVisit: "Educational elephant sanctuary, aromatic spice garden walks, and great family memories.",
        bestTime: "10:00 AM - 04:00 PM",
        timings: "09:00 AM - 05:00 PM daily",
        openingHours: "09:00 AM - 05:00 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.1200,
        lng: 77.1000,
        tags: ["Family", "Elephants", "Spice Park", "Pine Woods"]
      }
    ],

    // Food & Dining
    food: [
      {
        id: "food-mun-1",
        name: "Gurubhavan Traditional Kerala Mess",
        category: "Authentic Kerala Dining",
        subcategory: "local_traditional",
        rating: 4.9,
        reviewsCount: 2600,
        distance: "800m from town center",
        transitTime: "3 mins",
        estimatedCost: "₹160 per meal",
        cost: "₹160",
        shortDesc: "Run by three generations serving 14 accompaniments on banana leaves with freshly pressed coconut oil.",
        description: "Famous throughout the high ranges for authentic Kerala vegetarian sadhya, crispy Karimeen pollichathu (pearl spot fish in banana leaf), and soft appams with vegetable stew.",
        whyVisit: "Authentic Kerala Sadhya feast, traditional coconut oil seasoning, and genuine mountain hospitality.",
        timings: "11:30 AM - 04:00 PM & 07:00 PM - 10:00 PM",
        openingHours: "11:30 AM - 04:00 PM, 07:00 PM - 10:00 PM",
        bestTime: "Lunch (12:30 PM - 02:30 PM)",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0890,
        lng: 77.0600,
        tags: ["Kerala Food", "Sadhya", "Fish Fry", "Banana Leaf", "Traditional"]
      },
      {
        id: "food-mun-2",
        name: "Rapsy Restaurant & Spanish Omelette Hub",
        category: "Iconic Mountain Diner",
        subcategory: "restaurants",
        rating: 4.75,
        reviewsCount: 3100,
        distance: "400m from Munnar Market",
        transitTime: "2 mins",
        estimatedCost: "₹220 for two",
        cost: "₹220",
        shortDesc: "Famous backpacker eatery renowned for stuffed parottas, Spanish cheese omelettes, and spiced beef roast.",
        description: "Operating in the main bazaar for decades, Rapsy satisfies trekkers and visitors with hot crispy parottas, chicken biryani, and chocolate fudge.",
        whyVisit: "Legendary spiced beef fry, flaky Malabar parottas, and affordable hearty trekker breakfasts.",
        timings: "06:30 AM - 10:30 PM daily",
        openingHours: "06:30 AM - 10:30 PM daily",
        bestTime: "Breakfast or Evening dinner",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0875,
        lng: 77.0620,
        tags: ["Parotta", "Diner", "Beef Fry", "Breakfast", "Budget"]
      },
      {
        id: "food-mun-3",
        name: "Tea Tales Mountain Cafe & Bakery",
        category: "Artisan Tea & Dessert Lounge",
        subcategory: "cafes",
        rating: 4.85,
        reviewsCount: 1420,
        distance: "1.2 km from town",
        transitTime: "4 mins",
        estimatedCost: "₹380 for two",
        cost: "₹380",
        shortDesc: "Cozy timber-decked cafe serving artisan Nilgiri-Munnar tea blends, homemade cinnamon apple pies, and espresso.",
        description: "Overlooking lush tea slopes, this cafe is the perfect refuge for sipping hot spiced cardamom chai while enjoying freshly baked brownies and listening to rainfall.",
        whyVisit: "Spectacular valley view balcony, cinnamon apple pies, and 12 distinct single-estate tea brews.",
        timings: "08:30 AM - 09:30 PM daily",
        openingHours: "08:30 AM - 09:30 PM daily",
        bestTime: "Afternoon mist (03:30 PM - 06:30 PM)",
        photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0840,
        lng: 77.0580,
        tags: ["Cafe", "Tea", "Bakery", "Apple Pie", "View"]
      },
      {
        id: "food-mun-4",
        name: "Munnar Tea Valley Street Corn & Pazham Pori",
        category: "Highland Street Snacks",
        subcategory: "street_food",
        rating: 4.7,
        reviewsCount: 1890,
        distance: "2.1 km on Mattupetty Road",
        transitTime: "6 mins",
        estimatedCost: "₹80 for snacks",
        cost: "₹80",
        shortDesc: "Roadside tea kiosks frying crispy banana fritters (Pazham Pori) and roasting spiced sweet corn over glowing embers.",
        description: "Nothing beats standing in mountain mist with a newspaper cone of golden Pazham Pori and a glass of steaming ginger tea freshly brewed in copper samovars.",
        whyVisit: "Hot sweet banana fritters in chilly mist, fire-roasted butter corn, and strong cardamom tea.",
        timings: "03:00 PM - 08:30 PM daily",
        openingHours: "03:00 PM - 08:30 PM daily",
        bestTime: "04:30 PM - 07:00 PM",
        photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0950,
        lng: 77.0750,
        tags: ["Street Food", "Pazham Pori", "Chai", "Corn", "Snacks"]
      }
    ],

    // Stays
    stays: [
      {
        id: "stay-mun-1",
        name: "Lockhart Tea Bungalow & Estate",
        category: "Heritage Tea Estate",
        subcategory: "resorts",
        pricePerNight: 4800,
        rating: 4.9,
        reviewsCount: 1350,
        distance: "6.2 km from Munnar town",
        transitTime: "15 mins",
        estimatedCost: "₹4,800 / night",
        cost: "₹4,800",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Tea Garden Balcony", "Fireplace Lounge", "Farm-to-table Breakfast", "Plantation Trek"],
        area: "Lockhart Valley",
        shortDesc: "Authentic British planter bungalow surrounded by rolling organic tea slopes, crackling fireplaces, and morning bird songs.",
        description: "Dating back to 1880, Lockhart offers colonial wooden floors, four-poster beds, evening campfire barbecues, and private plantation walking trails.",
        whyVisit: "Wake up inside endless rolling tea carpets with fresh morning mist and colonial luxury.",
        lat: 10.0650,
        lng: 77.0850,
        tags: ["Tea Estate", "Heritage", "Resort", "Fireplace", "Views"]
      },
      {
        id: "stay-mun-2",
        name: "Fragrant Nature Mountain Resort & Spa",
        category: "Luxury Hillside Resort",
        subcategory: "hotels",
        pricePerNight: 6500,
        rating: 4.85,
        reviewsCount: 980,
        distance: "8.0 km from town",
        transitTime: "20 mins",
        estimatedCost: "₹6,500 / night",
        cost: "₹6,500",
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Panoramic View Glass Balcony", "Ayurvedic Spa", "Infinity Pool", "Multi-cuisine Dining"],
        area: "Pothamedu Ridge",
        shortDesc: "5-star luxury resort perched on high cliffside with private fireplaces in every room and valley-facing balconies.",
        description: "Designed in traditional Tudor architecture, this resort provides panoramic views of deep valleys, signature Ayurvedic treatments, and fine dining.",
        whyVisit: "Cliffside glass balconies overlooking floating clouds and authentic Ayurvedic rejuvenation.",
        lat: 10.0720,
        lng: 77.0490,
        tags: ["Luxury", "Hotel", "Spa", "Ayurveda", "Valley View"]
      },
      {
        id: "stay-mun-3",
        name: "Cloud Valley Homestay & Cardamom Grove",
        category: "Eco Plantation Homestay",
        subcategory: "homestays",
        pricePerNight: 2400,
        rating: 4.8,
        reviewsCount: 720,
        distance: "4.5 km from center",
        transitTime: "12 mins",
        estimatedCost: "₹2,400 / night",
        cost: "₹2,400",
        photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Cardamom Farm Walk", "Homemade Kerala Breakfast", "WiFi", "Balcony"],
        area: "Chithirapuram Slope",
        shortDesc: "Warm, family-run plantation cottage tucked within cardamom and pepper vines, featuring home-cooked Malabar meals.",
        description: "Hosted by a friendly local planter family, guests enjoy guided spice trails, evening campfire storytelling, and fresh organic garden food.",
        whyVisit: "Genuine local Kerala family warmth, fragrant spice garden, and tranquil mountain budget stay.",
        lat: 10.0520,
        lng: 77.0350,
        tags: ["Homestay", "Cardamom", "Family", "Organic", "Budget"]
      },
      {
        id: "stay-mun-4",
        name: "Highland Foresters Lodge",
        category: "Trekker Base Lodge",
        subcategory: "lodges",
        pricePerNight: 1200,
        rating: 4.6,
        reviewsCount: 840,
        distance: "600m from Munnar Bus Terminal",
        transitTime: "2 mins",
        estimatedCost: "₹1,200 / night",
        cost: "₹1,200",
        photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Trekker Gear Storage", "Hot Water 24/7", "WiFi", "Guide Desk"],
        area: "Old Munnar Hub",
        shortDesc: "Reliable, comfortable alpine lodge for backpackers and hikers embarking on Meesapulimala and Anamudi treks.",
        description: "Clean budget rooms with hot water showers, jeep safari coordination, packed trek lunches, and warm mountain hospitality.",
        whyVisit: "Affordable basecamp lodge, friendly trek guides, and prime town center access.",
        lat: 10.0880,
        lng: 77.0640,
        tags: ["Lodge", "Budget", "Backpacker", "Trekker", "Hot Water"]
      }
    ],

    // Local Shops
    shops: [
      {
        id: "shop-mun-1",
        name: "Abbas & Co Century Tea & Spices Emporium",
        category: "Artisan Cardamom & Spices",
        subcategory: "tea_spices",
        rating: 4.9,
        reviewsCount: 1980,
        distance: "300m in Munnar Bazaar",
        transitTime: "2 mins",
        estimatedCost: "₹150 - ₹1,800",
        cost: "₹150+",
        shortDesc: "High-grade Munnar green cardamom (8mm+ bold), sun-dried clove buds, star anise, wild forest honey, and estate tea.",
        description: "Operating since 1958, Abbas & Co is the trusted local authority on authentic high-range spices, offering vacuum-sealed spices that preserve freshness.",
        whyVisit: "Certified Grade-A bold green cardamom, pure mountain bee honey, and direct farm prices.",
        timings: "08:30 AM - 09:30 PM daily",
        openingHours: "08:30 AM - 09:30 PM",
        bestTime: "10:00 AM - 08:00 PM",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0870,
        lng: 77.0615,
        tags: ["Spices", "Cardamom", "Tea", "Honey", "Bazaar"]
      },
      {
        id: "shop-mun-2",
        name: "Srishti DARE Eco Crafts & Handmade Paper Guild",
        category: "Handmade Sustainable Crafts",
        subcategory: "handicrafts",
        rating: 4.95,
        reviewsCount: 1120,
        distance: "1.6 km from town",
        transitTime: "5 mins",
        estimatedCost: "₹100 - ₹2,500",
        cost: "₹100+",
        shortDesc: "Artisanal NGO project where differently-abled youth craft exquisite handmade paper from tea waste, natural dyes, and woven fabrics.",
        description: "An inspiring community venture supported by Tata Consumer Products. Pick up greeting cards, hand-dyed scarves, gift bags, and natural fruit preserves.",
        whyVisit: "Inspiring community empowerment, unique handmade tea-fiber paper, and authentic Kerala crafts.",
        timings: "09:00 AM - 05:30 PM (Closed Sundays)",
        openingHours: "09:00 AM - 05:30 PM",
        bestTime: "11:00 AM - 04:00 PM",
        photo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0910,
        lng: 77.0580,
        tags: ["Handicrafts", "Eco", "Handmade Paper", "NGO", "Crafts"]
      },
      {
        id: "shop-mun-3",
        name: "Munnar Handmade Chocolate & Fudge Studio",
        category: "Artisan Mountain Chocolates",
        subcategory: "souvenirs",
        rating: 4.8,
        reviewsCount: 2200,
        distance: "500m in main market",
        transitTime: "2 mins",
        estimatedCost: "₹120 - ₹850",
        cost: "₹120+",
        shortDesc: "Small-batch dark chocolates infused with roasted cashews, almonds, raisins, chilli, and high-range cardamom.",
        description: "Watch live chocolate tempering and choose from over 20 flavors of freshly made gourmet chocolates packaged in souvenir wooden boxes.",
        whyVisit: "Mouth-watering chocolate tastings, cardamom dark chocolate, and great travel gifts.",
        timings: "09:00 AM - 10:00 PM daily",
        openingHours: "09:00 AM - 10:00 PM",
        bestTime: "Evening walk (05:00 PM - 09:00 PM)",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0885,
        lng: 77.0625,
        tags: ["Chocolate", "Fudge", "Souvenirs", "Dark Chocolate", "Market"]
      },
      {
        id: "shop-mun-4",
        name: "Old Munnar Farmers' Produce & Spices Bazaar",
        category: "Local Mountain Market",
        subcategory: "local_markets",
        rating: 4.7,
        reviewsCount: 1650,
        distance: "400m from Central Bridge",
        transitTime: "2 mins",
        estimatedCost: "₹50 - ₹500",
        cost: "₹50+",
        shortDesc: "Vibrant mountain market packed with fresh passion fruits, tree tomatoes, organic avocados, and eucalyptus essential oils.",
        description: "Local high-range farmers gather daily to sell fresh hill produce, mountain honeycombs, and cold-pressed botanical oils.",
        whyVisit: "Sweet mountain passion fruits, raw honeycomb, fresh avocados, and lively marketplace bustle.",
        timings: "07:00 AM - 08:30 PM daily",
        openingHours: "07:00 AM - 08:30 PM",
        bestTime: "Morning (08:00 AM - 11:30 AM)",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0860,
        lng: 77.0630,
        tags: ["Market", "Produce", "Fruit", "Honey", "Avocado"]
      },
      {
        id: "shop-mun-5",
        name: "Kerala Traditional Handloom & Kasavu Guild",
        category: "Authentic Kerala Textiles",
        subcategory: "textiles",
        rating: 4.75,
        reviewsCount: 890,
        distance: "700m from bazaar",
        transitTime: "3 mins",
        estimatedCost: "₹800 - ₹6,000",
        cost: "₹800+",
        shortDesc: "Traditional off-white Kerala Kasavu cotton sarees, mundu sets, and soft hand-woven shawls with pure golden borders.",
        description: "Handwoven in state weaver cooperatives using breathable organic cotton, perfect for warm summers and festive souvenirs.",
        whyVisit: "Authentic Kerala Kasavu handlooms, direct artisan prices, and lightweight cotton shawls.",
        timings: "09:30 AM - 08:00 PM daily",
        openingHours: "09:30 AM - 08:00 PM",
        bestTime: "11:00 AM - 05:00 PM",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0895,
        lng: 77.0590,
        tags: ["Textiles", "Kasavu", "Sarees", "Handloom", "Cotton"]
      }
    ],

    // Experiences
    experiences: [
      {
        id: "exp-mun-1",
        name: "Meesapulimala Peak Cloud Trek",
        category: "High Altitude Alpine Trek",
        subcategory: "adventure",
        rating: 4.95,
        reviewsCount: 1820,
        distance: "24 km from Munnar town",
        transitTime: "1 hr via 4x4 jeep",
        estimatedCost: "₹1,500 Guided Trek",
        cost: "₹1,500",
        shortDesc: "Trek to South India's second-highest peak (8,661 ft) through rolling pine forests, sholas, and floating ocean clouds.",
        description: "A breathtaking high-altitude trek organized with KFDC forest wardens. Climb through misty rhododendron valleys to a summit that sits high above cloud oceans.",
        whyVisit: "Walk above the clouds, witness wild rhododendron blooms, and conquer South India's most iconic mountain trek.",
        bestTime: "06:00 AM departure",
        timings: "06:00 AM - 03:00 PM",
        openingHours: "Forest permit required",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0980,
        lng: 77.2030,
        tags: ["Trek", "Adventure", "Summit", "Clouds", "Meesapulimala"]
      },
      {
        id: "exp-mun-2",
        name: "Morning Tea Plucking & Tasting Workshop",
        category: "Agrarian Plantation Craft",
        subcategory: "local_experiences",
        rating: 4.85,
        reviewsCount: 1250,
        distance: "3.5 km from town",
        transitTime: "10 mins",
        estimatedCost: "₹350 per person",
        cost: "₹350",
        shortDesc: "Don traditional wicker baskets, learn 'two leaves and a bud' plucking techniques from expert estate pickers, and roll your own tea.",
        description: "An immersive hands-on plantation experience where master tea workers guide you through plucking, withering, and cupping artisanal teas.",
        whyVisit: "Pick your own tea leaves, understand artisan tea science, and taste rare high-grown white teas.",
        timings: "08:00 AM - 11:30 AM daily",
        openingHours: "Morning slot",
        bestTime: "08:30 AM - 10:30 AM",
        photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0820,
        lng: 77.0650,
        tags: ["Tea Plucking", "Workshop", "Tea Estate", "Hands-on"]
      },
      {
        id: "exp-mun-3",
        name: "Anamudi Shola Rainforest Biodiversity Walk",
        category: "Rainforest Nature Trail",
        subcategory: "exp_nature",
        rating: 4.9,
        reviewsCount: 940,
        distance: "28 km north-east",
        transitTime: "50 mins",
        estimatedCost: "₹250 Permit",
        cost: "₹250",
        shortDesc: "Guided trek through dwarf shola rainforest canopies harboring rare orchids, flying squirrels, and endemic laughingthrush birds.",
        description: "One of the most pristine montane evergreen forests in Asia, protected by forest wardens with restricted access to maintain ecological balance.",
        whyVisit: "Ancient dwarf moss-covered trees, spotting endemic birds, and absolute untouched wilderness silence.",
        bestTime: "07:30 AM - 11:00 AM",
        timings: "07:30 AM - 03:00 PM daily",
        openingHours: "07:30 AM - 03:00 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.1800,
        lng: 77.1600,
        tags: ["Nature", "Shola", "Rainforest", "Birds", "Biodiversity"]
      },
      {
        id: "exp-mun-4",
        name: "Lockhart Gap Mountain Mist Photography Trail",
        category: "Landscape Visuals",
        subcategory: "photography",
        rating: 4.8,
        reviewsCount: 1100,
        distance: "8.5 km from town",
        transitTime: "20 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "Famous natural gorge gap through which dramatic evening mist rolls into the valley, creating golden light beams over tea terraces.",
        description: "A favorite spot for professional landscape photographers to capture swirling clouds, emerald terrace lines, and dramatic hill crests.",
        whyVisit: "Unreal cloud formations pouring through mountain gaps, golden sunset rays, and emerald slope contours.",
        bestTime: "05:00 PM - 06:30 PM",
        timings: "Open 24/7",
        openingHours: "Open 24/7",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0550,
        lng: 77.0920,
        tags: ["Photography", "Mist", "Landscape", "Sunset", "Gorge"]
      },
      {
        id: "exp-mun-5",
        name: "Punarjani Traditional Kathakali & Kalaripayattu Theatre",
        category: "Kerala Performing Arts",
        subcategory: "culture",
        rating: 4.9,
        reviewsCount: 2150,
        distance: "5.2 km from town",
        transitTime: "12 mins",
        estimatedCost: "₹350 Show Ticket",
        cost: "₹350",
        shortDesc: "Live cultural evening featuring ancient martial art Kalaripayattu weapon demonstrations and classical Kathakali facial makeup and dance.",
        description: "Experience Kerala's 3,000-year-old martial arts with fiery weapon duels and acrobatics followed by dramatic Kathakali mudras and epic storytelling.",
        whyVisit: "Breathtaking real sword & fire fighting stunts, traditional live chenda drumming, and elaborate face makeup artistry.",
        timings: "05:00 PM - 08:00 PM daily (2 shows)",
        openingHours: "05:00 PM - 08:00 PM daily",
        bestTime: "05:00 PM show (Arrive early to watch makeup)",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0600,
        lng: 77.0420,
        tags: ["Kathakali", "Kalaripayattu", "Martial Arts", "Culture", "Show"]
      }
    ],

    // Hidden Gems
    hiddenGems: [
      {
        id: "hg-mun-1",
        name: "Kolukkumalai Sunrise Tea Estate",
        category: "Highest Organic Tea Ridge",
        subcategory: "secret_viewpoints",
        rating: 4.95,
        reviewsCount: 2400,
        distance: "35 km via 4x4 Jeep",
        transitTime: "1.5 hrs by jeep",
        estimatedCost: "₹550 for Jeep Seat",
        cost: "₹550",
        shortDesc: "The world's highest tea plantation (7,900 ft). Watching sunrise above floating cloud oceans via 4x4 Jeep is unforgettable.",
        description: "Reachable only through rugged mountain boulder tracks, Kolukkumalai produces orthodox wood-fired teas and offers an unobstructed 360-degree panorama of Tamil Nadu plains and Kerala peaks.",
        whyVisit: "Witness the greatest mountain sunrise in India, walk above floating cloud carpets, and taste orthodox century-old estate tea.",
        bestTime: "04:30 AM departure for 06:00 AM sunrise",
        timings: "04:30 AM - 05:00 PM daily",
        openingHours: "04:30 AM - 05:00 PM daily",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0820,
        lng: 77.2180,
        tags: ["Highest Tea", "Sunrise", "Clouds", "4x4 Jeep", "Secret Viewpoint"]
      },
      {
        id: "hg-mun-2",
        name: "Attukal Hidden Cascades & Jungle Pool",
        category: "Secluded Waterfall & Stream",
        subcategory: "nature_gems",
        rating: 4.8,
        reviewsCount: 1100,
        distance: "9.2 km south-west",
        transitTime: "22 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "Cascading multi-tiered mountain falls hidden amidst thick jungle slopes and wooden suspension bridges.",
        description: "A scenic secluded waterfall surrounded by wild cinnamon trees and rolling hills. The natural freshwater stream offers peaceful picnic rocks away from tourist buses.",
        whyVisit: "Crystal mountain stream dipping, secluded jungle scenery, and wooden suspension bridge walks.",
        bestTime: "10:00 AM - 04:30 PM",
        timings: "06:00 AM - 06:00 PM daily",
        openingHours: "06:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.0480,
        lng: 77.0320,
        tags: ["Waterfall", "Nature Gem", "Jungle", "Cascades", "Stream"]
      },
      {
        id: "hg-mun-3",
        name: "Chinnar Wildlife Sanctuary & Ancient Dolmens",
        category: "Dry Rain-Shadow Biosphere",
        subcategory: "cultural_gems",
        rating: 4.85,
        reviewsCount: 880,
        distance: "48 km north on Marayoor Road",
        transitTime: "1 hr 15 mins",
        estimatedCost: "₹200 Permit",
        cost: "₹200",
        shortDesc: "Unique rain-shadow ecosystem harboring grizzled giant squirrels, wild star tortoises, and 2,500-year-old megalithic stone dolmens (Muniyaras).",
        description: "Unlike lush Munnar, Chinnar features dry scrub forest with natural sandalwood groves, ancient prehistoric rock paintings, and riverine watchtowers.",
        whyVisit: "Prehistoric stone burial chambers (Dolmens), wild sandalwood forests, and spotting rare giant squirrels.",
        bestTime: "07:00 AM - 11:00 AM",
        timings: "06:00 AM - 05:00 PM daily",
        openingHours: "06:00 AM - 05:00 PM daily",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.3150,
        lng: 77.1950,
        tags: ["Dolmens", "Prehistoric", "Sandalwood", "Wildlife", "Cultural Gem"]
      },
      {
        id: "hg-mun-4",
        name: "Marayoor Natural Sandalwood Forest & Jaggery Village",
        category: "Traditional Jaggery & Sandalwood",
        subcategory: "local_spots",
        rating: 4.8,
        reviewsCount: 1350,
        distance: "40 km north",
        transitTime: "1 hr",
        estimatedCost: "₹100 for fresh jaggery",
        cost: "₹100",
        shortDesc: "The only natural sandalwood forest in Kerala, surrounded by traditional sugarcane fields producing artisan Marayoor Sharkara (jaggery).",
        description: "Watch local sugarcane farmers boiling fresh cane juice in massive iron cauldrons and shaping organic golden jaggery balls by hand.",
        whyVisit: "Taste warm fresh sugarcane jaggery straight from boiling pans and smell wild natural sandalwood groves.",
        bestTime: "09:00 AM - 04:00 PM",
        timings: "08:00 AM - 06:00 PM daily",
        openingHours: "08:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 10.2780,
        lng: 77.1620,
        tags: ["Jaggery", "Sandalwood", "Marayoor", "Local Spot", "Sugarcane"]
      }
    ],

    // Curated Itinerary
    curatedTrip: {
      title: "Munnar Mountain & Tea Escape",
      duration: "2 Days",
      budget: "₹6,500",
      days: [
        {
          dayNumber: 1,
          theme: "High Mist & Tea Heritage",
          stops: [
            { time: "08:00 AM", title: "Eravikulam Wildlife Morning Safari", duration: "2.5 hrs", cost: "₹200", desc: "Spot the Nilgiri Tahr mountain goat" },
            { time: "11:30 AM", title: "KDHP Tea Museum & Tasting", duration: "1.5 hrs", cost: "₹125", desc: "Tea processing and tastings" },
            { time: "01:30 PM", title: "Gurubhavan Banana Leaf Lunch", duration: "1 hr", cost: "₹160", desc: "Authentic Kerala sadhya" },
            { time: "03:30 PM", title: "Mattupetty Dam Speedboating", duration: "2 hrs", cost: "₹50", desc: "Boating surrounded by mist and tea hills" },
            { time: "05:30 PM", title: "Pothamedu Sunset Tea Walk", duration: "1.5 hrs", cost: "Free", desc: "Spectacular valley sunset with hot tea" }
          ]
        },
        {
          dayNumber: 2,
          theme: "Highest Ridge & Cultural Immersion",
          stops: [
            { time: "04:30 AM", title: "Kolukkumalai 4x4 Jeep Sunrise", duration: "3.5 hrs", cost: "₹550", desc: "Highest organic tea plantation sunrise above clouds" },
            { time: "09:30 AM", title: "Tea Tales Mountain Breakfast & Chai", duration: "1 hr", cost: "₹180", desc: "Cinnamon apple pie and cardamom tea" },
            { time: "11:30 AM", title: "Abbas & Co Spice Sampling Trail", duration: "1.5 hrs", cost: "₹300", desc: "Buy grade-A green cardamom and mountain honey" },
            { time: "02:00 PM", title: "Attukal Waterfalls & Stream Walk", duration: "2 hrs", cost: "Free", desc: "Jungle stream dip and suspension bridge" },
            { time: "05:30 PM", title: "Punarjani Kathakali & Martial Arts Show", duration: "2 hrs", cost: "₹350", desc: "Kerala classical performing arts and fire duel" }
          ]
        }
      ]
    },

    budgetOverview: {
      total: 8000,
      spent: 4500,
      remaining: 3500,
      categories: [
        { name: "Stay (2 Nights)", allocated: 3200, percentage: 40, color: "#c2410c" },
        { name: "Food & Dining", allocated: 1200, percentage: 25, color: "#d97706" },
        { name: "Transport & Jeeps", allocated: 800, percentage: 20, color: "#0284c7" },
        { name: "Activities", allocated: 500, percentage: 15, color: "#059669" }
      ]
    },

    safetyDirectory: [
      {
        name: "Tata General Hospital (24/7 Trauma)",
        type: "hospital",
        phone: "+91 4865 230233",
        address: "Old Munnar, Kerala",
        distance: "800m from center",
        services: "24x7 Emergency, Ambulance, Pharmacy."
      },
      {
        name: "Munnar Tourist Police Station",
        type: "police",
        phone: "+91 4865 230321 / 112",
        address: "Near Post Office, Munnar",
        distance: "500m from center",
        services: "24x7 Tourist patrol and mountain safety assistance."
      }
    ]
  },

  // ==========================================
  // 3. OOTY (Tamil Nadu)
  // ==========================================
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    tagline: "Heritage Toy Train, Botanical Blooms & Colonial Pine Woods",
    coordinates: { lat: 11.4102, lng: 76.6950 },
    currentWeather: {
      temp: "15°C",
      condition: "Crisp Mountain Breeze",
      time: "6:30 PM",
      icon: "🌲"
    },
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    
    // Attractions
    attractions: [
      {
        id: "oot-1",
        name: "Nilgiri UNESCO Mountain Railway",
        category: "UNESCO Railway Heritage",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.95,
        reviewsCount: 3800,
        distance: "Ooty Central Station",
        transitTime: "At station",
        estimatedCost: "₹205 Train Ticket",
        cost: "₹205",
        shortDesc: "Built in 1908, this historic steam locomotive ascends through 208 curves, 16 tunnels, and 250 bridges with sweeping Nilgiri gorge views.",
        description: "The Nilgiri Mountain Railway is a UNESCO World Heritage marvel. Operating on a unique rack-and-pinion system, the vintage blue-and-cream steam train chugs past terraced tea estates and eucalyptus woods.",
        whyVisit: "Historic UNESCO heritage steam train journey, romantic mountain tunnels, and dramatic gorge views.",
        bestTime: "09:00 AM (Early steam train departure)",
        timings: "Departs 09:15 AM & 02:00 PM",
        openingHours: "Daily timetable",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4050,
        lng: 76.6970,
        tags: ["UNESCO", "Steam Train", "Heritage", "Toy Train", "Scenic"]
      },
      {
        id: "oot-2",
        name: "Government Botanical Garden & Glass House",
        category: "Terraced Botanical Blooms",
        subcategory: "nature",
        type: "attraction",
        rating: 4.8,
        reviewsCount: 3200,
        distance: "1.8 km from center",
        transitTime: "6 mins",
        estimatedCost: "₹40 Entry",
        cost: "₹40",
        shortDesc: "Laid out in 1848 over 55 acres of terraced slopes, featuring a 20-million-year-old fossilized tree trunk and exotic orchids.",
        description: "Designed by William Graham McIvor, this garden boasts over 1,000 species of exotic flora, lush Italian lawns, a Victorian glasshouse, and Japanese bonsai gardens.",
        whyVisit: "20-million-year-old fossil tree trunk, vibrant exotic flower beds, and picnic lawns under giant trees.",
        bestTime: "09:00 AM - 12:00 PM & 03:00 PM - 05:30 PM",
        timings: "07:00 AM - 06:30 PM daily",
        openingHours: "07:00 AM - 06:30 PM daily",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4190,
        lng: 76.7110,
        tags: ["Botanical", "Flowers", "Nature", "Gardens", "Orchids"]
      },
      {
        id: "oot-3",
        name: "Doddabetta Peak Observatory",
        category: "Highest Nilgiri Summit",
        subcategory: "viewpoints",
        type: "attraction",
        rating: 4.85,
        reviewsCount: 2900,
        distance: "9.0 km from town",
        transitTime: "25 mins",
        estimatedCost: "₹30 Entry",
        cost: "₹30",
        shortDesc: "Highest mountain peak in the Nilgiri Hills (8,650 ft) featuring a telescope observatory offering views across Tamil Nadu, Kerala, and Karnataka.",
        description: "Doddabetta sits at the junction of Western and Eastern Ghats. On clear days, visitors can view Chamundi Hills of Mysore and Coimbatore plains through the dual-lens observatory telescopes.",
        whyVisit: "Highest peak in the Nilgiris, telescope viewing observatory, and cool 12°C mountain breeze.",
        bestTime: "08:30 AM - 11:00 AM (Before fog rolls in)",
        timings: "07:00 AM - 06:00 PM daily",
        openingHours: "07:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4010,
        lng: 76.7360,
        tags: ["Doddabetta", "Viewpoint", "Highest Peak", "Telescope", "Summit"]
      },
      {
        id: "oot-4",
        name: "Pykara Lake & Cascading Waterfalls",
        category: "Pristine Mountain Lake",
        subcategory: "lakes_beaches",
        type: "attraction",
        rating: 4.75,
        reviewsCount: 2400,
        distance: "21 km north-west",
        transitTime: "35 mins",
        estimatedCost: "₹100 Entry + ₹600 Speedboat",
        cost: "₹100",
        shortDesc: "Sacred Toda river transforming into dramatic multi-tiered cascades and serene lake speedboating amidst pine forests.",
        description: "Pykara is the largest natural river in the district. It flows over twin cascading falls before settling into a peaceful reservoir surrounded by Toda tribal lands.",
        whyVisit: "Thrilling speedboat rides on crystal mountain waters, roaring waterfall viewpoints, and pristine forest picnic spots.",
        bestTime: "10:00 AM - 04:00 PM",
        timings: "09:30 AM - 05:30 PM daily",
        openingHours: "09:30 AM - 05:30 PM daily",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4580,
        lng: 76.6020,
        tags: ["Pykara", "Lake", "Waterfalls", "Boating", "Pine"]
      },
      {
        id: "oot-5",
        name: "Government Rose Garden & Maze",
        category: "Terraced Rose Collection",
        subcategory: "family",
        type: "attraction",
        rating: 4.7,
        reviewsCount: 2100,
        distance: "2.4 km from center",
        transitTime: "8 mins",
        estimatedCost: "₹40 Entry",
        cost: "₹40",
        shortDesc: "India's largest rose garden spanning 10 acres with over 20,000 varieties of blooming hybrid tea roses, floribunda, and miniature bushes.",
        description: "Built on Elk Hill slopes, the garden terracing creates an amphitheater of multi-colored fragrant roses, pergolas, and romantic viewpoints.",
        whyVisit: "Over 20,000 varieties of rare roses including black and green roses, fragrant pergolas, and great family photos.",
        bestTime: "09:00 AM - 05:00 PM",
        timings: "07:30 AM - 06:30 PM daily",
        openingHours: "07:30 AM - 06:30 PM daily",
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4080,
        lng: 76.7120,
        tags: ["Rose Garden", "Family", "Flowers", "Fragrant", "Elk Hill"]
      }
    ],

    // Food & Dining
    food: [
      {
        id: "food-oot-1",
        name: "Moddy's Artisan Chocolate & Fudge Lounge",
        category: "Historic Chocolatier & Cafe",
        subcategory: "cafes",
        rating: 4.9,
        reviewsCount: 4500,
        distance: "600m from town center",
        transitTime: "2 mins",
        estimatedCost: "₹180 for fudge",
        cost: "₹180",
        shortDesc: "Small-batch dark chocolates and roasted almond fudges crafted since 1951, served with steaming thick hot chocolate.",
        description: "An essential Ooty institution. Taste famous dark truffles, roasted hazelnut fudge, marshmallow hot chocolate, and fresh fruit pastries.",
        whyVisit: "Legendary warm roasted almond fudge, rich Belgian hot chocolate, and chocolate making history.",
        timings: "09:00 AM - 10:00 PM daily",
        openingHours: "09:00 AM - 10:00 PM daily",
        bestTime: "Evening (04:30 PM - 08:30 PM)",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4090,
        lng: 76.6980,
        tags: ["Fudge", "Hot Chocolate", "Bakery", "Moddys", "Cafe"]
      },
      {
        id: "food-oot-2",
        name: "Earl's Secret Glasshouse Dining",
        category: "Colonial Fine Dining",
        subcategory: "restaurants",
        rating: 4.85,
        reviewsCount: 1650,
        distance: "2.1 km from center",
        transitTime: "8 mins",
        estimatedCost: "₹950 for two",
        cost: "₹950",
        shortDesc: "Victorian glasshouse restaurant inside King's Cliff heritage mansion, serving roasted lamb chops, shepherd's pie, and sizzling brownies.",
        description: "Surrounded by pine trees and British-era gardens, dine in a romantic glass solarium warmed by stone fireplaces and classical jazz music.",
        whyVisit: "Romantic glasshouse solarium dining, authentic shepherd's pie, and historic British mansion ambiance.",
        timings: "12:30 PM - 03:30 PM & 07:00 PM - 10:30 PM",
        openingHours: "12:30 PM - 03:30 PM, 07:00 PM - 10:30 PM",
        bestTime: "Romantic Dinner (07:30 PM - 09:30 PM)",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4150,
        lng: 76.6870,
        tags: ["Fine Dining", "Colonial", "Glasshouse", "Steak", "Fireplace"]
      },
      {
        id: "food-oot-3",
        name: "Shinkows 1954 Authentic Chinese & Noodle Room",
        category: "Colonial Chinese Diner",
        subcategory: "restaurants",
        rating: 4.75,
        reviewsCount: 2200,
        distance: "800m in Commissioner's Road",
        transitTime: "3 mins",
        estimatedCost: "₹380 for two",
        cost: "₹380",
        shortDesc: "Historic Chinese-Indian kitchen established in 1954 serving handmade pork momos, Cantonese chicken noodles, and sweet corn soup.",
        description: "Run by the original Chinese-Indian family for 70 years, Shinkows is an Ooty landmark for piping hot comfort food after a chilly mountain day.",
        whyVisit: "Handmade authentic pork and chicken momos, sizzling garlic chicken, and 70-year-old colonial charm.",
        timings: "12:00 PM - 03:30 PM & 06:30 PM - 09:30 PM",
        openingHours: "12:00 PM - 03:30 PM, 06:30 PM - 09:30 PM",
        bestTime: "Dinner 07:00 PM",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4110,
        lng: 76.7020,
        tags: ["Chinese", "Momos", "Noodles", "Historic", "Comfort Food"]
      },
      {
        id: "food-oot-4",
        name: "Commercial Road Steaming Momo Stalls",
        category: "Tibetan Street Food Corner",
        subcategory: "street_food",
        rating: 4.7,
        reviewsCount: 3100,
        distance: "400m from Charring Cross",
        transitTime: "2 mins",
        estimatedCost: "₹90 per plate",
        cost: "₹90",
        shortDesc: "Evening street stalls serving steaming bamboo baskets of spicy Tibetan momos, fiery red chilli chutney, and hot Thukpa soup.",
        description: "When temperatures drop in the evening, Commercial Road comes alive with steam rising from tiered aluminum and bamboo momo steamers.",
        whyVisit: "Piping hot chicken and cheese momos in 14°C mountain weather with fiery homemade dipping sauce.",
        timings: "04:30 PM - 09:30 PM daily",
        openingHours: "04:30 PM - 09:30 PM daily",
        bestTime: "06:00 PM - 08:30 PM",
        photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4100,
        lng: 76.7005,
        tags: ["Street Food", "Momos", "Thukpa", "Tibetan", "Chilli"]
      },
      {
        id: "food-oot-5",
        name: "Nilgiri Traditional Bakery & Varkey Oven",
        category: "Historic Anglo-Indian Bakery",
        subcategory: "local_traditional",
        rating: 4.8,
        reviewsCount: 2750,
        distance: "500m near Clock Tower",
        transitTime: "2 mins",
        estimatedCost: "₹80 for box",
        cost: "₹80",
        shortDesc: "Wood-fired brick oven baking signature crispy Ooty Varkey biscuits, plum cakes, and mutton puff pastries since 1912.",
        description: "The Ooty Varkey is a GI-tagged local delicacy with hundreds of crisp buttery layers, best enjoyed dipped into hot Nilgiri tea.",
        whyVisit: "Freshly baked warm GI-tagged Ooty Varkey biscuits straight from wood-fired brick ovens.",
        timings: "07:00 AM - 09:30 PM daily",
        openingHours: "07:00 AM - 09:30 PM daily",
        bestTime: "Morning (08:00 AM - 10:30 AM) or 04:30 PM",
        photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4080,
        lng: 76.6960,
        tags: ["Varkey", "Bakery", "Wood Fired", "Traditional", "Biscuits"]
      }
    ],

    // Stays
    stays: [
      {
        id: "stay-oot-1",
        name: "Savoy Nilgiri Heritage Mansion",
        category: "Colonial Luxury Hotel",
        subcategory: "hotels",
        pricePerNight: 5500,
        rating: 4.85,
        reviewsCount: 1650,
        distance: "1.2 km from Botanical Garden",
        transitTime: "5 mins",
        estimatedCost: "₹5,500 / night",
        cost: "₹5,500",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["English Fireplace", "Rose Garden Afternoon Tea", "Vintage Library", "Billiards Room"],
        area: "Sylks Road",
        shortDesc: "Established in 1841 as the premier British hill station retreat, offering wood-burning fireplaces, afternoon high teas, and Victorian suites.",
        description: "Steeped in 180 years of history, Savoy's manicured gardens, crackling fires, antique four-poster beds, and silver-service dining transport guests back to the golden era of the Raj.",
        whyVisit: "Living colonial history, real wood fireplaces in rooms, and refined British afternoon high tea.",
        lat: 11.4130,
        lng: 76.6930,
        tags: ["Heritage", "Hotel", "Fireplace", "Colonial", "Luxury"]
      },
      {
        id: "stay-oot-2",
        name: "Sterling Ooty Elk Hill Resort",
        category: "Panoramic Mountain Resort",
        subcategory: "resorts",
        pricePerNight: 4200,
        rating: 4.75,
        reviewsCount: 1420,
        distance: "2.8 km from center",
        transitTime: "10 mins",
        estimatedCost: "₹4,200 / night",
        cost: "₹4,200",
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Valley View Terrace", "Campfire Arena", "Spa & Wellness", "Indoor Games", "Buffet Dining"],
        area: "Elk Hill Slopes",
        shortDesc: "Perched atop Elk Hill overlooking the entire Ooty town basin and race course, surrounded by organic vegetable farms.",
        description: "Offering spacious family suites, morning yoga sessions, evening bonfire music, and panoramic hill views from private room balconies.",
        whyVisit: "Spectacular bird's eye view of Ooty valley and family-friendly mountain activities.",
        lat: 11.4020,
        lng: 76.7080,
        tags: ["Resort", "Elk Hill", "Valley View", "Campfire", "Family"]
      },
      {
        id: "stay-oot-3",
        name: "Nilgiri Colonial Tea Cottage Homestay",
        category: "Heritage Planter Homestay",
        subcategory: "homestays",
        pricePerNight: 2800,
        rating: 4.8,
        reviewsCount: 680,
        distance: "3.5 km from town",
        transitTime: "12 mins",
        estimatedCost: "₹2,800 / night",
        cost: "₹2,800",
        photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Tea Garden Lawn", "Home-cooked Roast & Pies", "WiFi", "Fireplace"],
        area: "Fernhill Tea Slope",
        shortDesc: "Charming 1920s planter cottage surrounded by eucalyptus groves and tea bushes, hosted by a local Anglo-Indian family.",
        description: "Warm up beside the brick fireplace while savoring homemade chicken roast, apple pie, and freshly brewed Nilgiri tea.",
        whyVisit: "Cozy home fireplace, authentic home-baked pies, and peaceful hillside setting.",
        lat: 11.3950,
        lng: 76.6850,
        tags: ["Homestay", "Cottage", "Fireplace", "Tea", "Budget"]
      },
      {
        id: "stay-oot-4",
        name: "Fern Hill Foresters Lodge",
        category: "Budget Mountain Lodge",
        subcategory: "lodges",
        pricePerNight: 1300,
        rating: 4.6,
        reviewsCount: 910,
        distance: "1.5 km from Ooty Station",
        transitTime: "5 mins",
        estimatedCost: "₹1,300 / night",
        cost: "₹1,300",
        photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["24/7 Hot Water", "WiFi", "Travel Desk", "Luggage Storage"],
        area: "Fern Hill",
        shortDesc: "Affordable, clean pine-wood paneled rooms with mountain views, reliable heating, and tour bookings.",
        description: "Popular with budget backpackers, solo travelers, and students visiting the Nilgiri hills.",
        whyVisit: "Great budget value, steaming hot water, and close proximity to Ooty railway station.",
        lat: 11.3980,
        lng: 76.6900,
        tags: ["Lodge", "Budget", "Hot Water", "Backpacker", "Station"]
      }
    ],

    // Local Shops
    shops: [
      {
        id: "shop-oot-1",
        name: "Nilgiri Toda Artisan & Embroidery Collective",
        category: "Indigenous Tribal Embroidery",
        subcategory: "handicrafts",
        rating: 4.95,
        reviewsCount: 1450,
        distance: "1.1 km near Botanical Garden",
        transitTime: "4 mins",
        estimatedCost: "₹350 - ₹3,500",
        cost: "₹350+",
        shortDesc: "Authentic Toda Poothkullu shawls hand-embroidered with distinctive black and red geometric patterns on unbleached white cotton.",
        description: "Direct tribal cooperative supporting Toda indigenous artisans. Every shawl, bag, and bookmark is GI-tagged and ethically made.",
        whyVisit: "GI-tagged authentic Toda tribal embroidery, supporting indigenous craftswomen, and heirloom quality.",
        timings: "09:30 AM - 07:30 PM daily",
        openingHours: "09:30 AM - 07:30 PM",
        bestTime: "10:30 AM - 05:00 PM",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4170,
        lng: 76.7090,
        tags: ["Toda", "Tribal", "Embroidery", "Shawls", "Handicrafts"]
      },
      {
        id: "shop-oot-2",
        name: "Highfield Estate Tea & Spices Outlet",
        category: "Estate Tea & Essential Oils",
        subcategory: "tea_spices",
        rating: 4.85,
        reviewsCount: 1890,
        distance: "2.8 km from center",
        transitTime: "10 mins",
        estimatedCost: "₹120 - ₹1,200",
        cost: "₹120+",
        shortDesc: "Factory-direct Nilgiri Frost Tea, green tea, pure distilled Eucalyptus oil, and high-altitude clove and nutmeg.",
        description: "Sample single-estate silver needle white teas and pick up 100% pure steam-distilled eucalyptus oil sourced from local Nilgiri blue gum trees.",
        whyVisit: "Authentic medicinal Nilgiri eucalyptus oil and award-winning mountain frost teas.",
        timings: "09:00 AM - 07:00 PM daily",
        openingHours: "09:00 AM - 07:00 PM",
        bestTime: "10:00 AM - 04:00 PM",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4220,
        lng: 76.7200,
        tags: ["Tea", "Eucalyptus", "Spices", "Estate", "Frost Tea"]
      },
      {
        id: "shop-oot-3",
        name: "Ooty Municipal Market & Green Produce",
        category: "Historic High-Range Bazaar",
        subcategory: "local_markets",
        rating: 4.75,
        reviewsCount: 2600,
        distance: "300m in Main Bazaar",
        transitTime: "2 mins",
        estimatedCost: "₹50 - ₹600",
        cost: "₹50+",
        shortDesc: "Vibrant colonial brick market filled with freshly harvested carrots, garlic, wild strawberries, flowers, and cheeses.",
        description: "Built in 1868, this lively market boasts over 1,500 stalls selling crisp mountain vegetables, homemade chocolates, and freshly picked berries.",
        whyVisit: "Sweet fresh hill strawberries, Ooty crisp carrots, and vibrant mountain market energy.",
        timings: "07:00 AM - 09:00 PM daily",
        openingHours: "07:00 AM - 09:00 PM",
        bestTime: "Morning (08:30 AM - 12:00 PM)",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4070,
        lng: 76.6970,
        tags: ["Market", "Produce", "Strawberries", "Carrots", "Bazaar"]
      },
      {
        id: "shop-oot-4",
        name: "Tibetan Market Woolens & Winterwear",
        category: "Winter Woolens & Knitwear",
        subcategory: "textiles",
        rating: 4.7,
        reviewsCount: 1950,
        distance: "Near Botanical Garden Gate",
        transitTime: "5 mins",
        estimatedCost: "₹250 - ₹1,800",
        cost: "₹250+",
        shortDesc: "Lively line of stalls selling warm woolen ponchos, hand-knitted beanies, fleece jackets, and thermal gloves.",
        description: "Run by Tibetan families in Ooty, this market is the ideal stop to gear up for chilly 10°C evenings with affordable, cozy winterwear.",
        whyVisit: "High-quality soft woolen ponchos, colorful beanies, and great budget winter clothing.",
        timings: "09:00 AM - 09:00 PM daily",
        openingHours: "09:00 AM - 09:00 PM",
        bestTime: "Evening (04:00 PM - 08:30 PM)",
        photo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4180,
        lng: 76.7100,
        tags: ["Woolens", "Winterwear", "Jackets", "Textiles", "Tibetan"]
      },
      {
        id: "shop-oot-5",
        name: "Nilgiri Honey & Botanical Wax Emporium",
        category: "Forest Honey & Natural Products",
        subcategory: "souvenirs",
        rating: 4.8,
        reviewsCount: 1120,
        distance: "600m on Charing Cross",
        transitTime: "2 mins",
        estimatedCost: "₹180 - ₹950",
        cost: "₹180+",
        shortDesc: "Wild rock bee honey harvested from deep Nilgiri gorges, beeswax candles, and natural botanical soaps.",
        description: "Ethically harvested by indigenous Kurumba and Irula honey hunters, free from added sugars and artificial syrups.",
        whyVisit: "Pure unpasteurized wild forest honey and fragrant botanical eucalyptus soaps.",
        timings: "09:30 AM - 08:30 PM daily",
        openingHours: "09:30 AM - 08:30 PM",
        bestTime: "10:00 AM - 07:00 PM",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4095,
        lng: 76.7010,
        tags: ["Honey", "Souvenirs", "Beeswax", "Natural", "Nilgiri"]
      }
    ],

    // Experiences
    experiences: [
      {
        id: "exp-oot-1",
        name: "Toda Indigenous Village & Barrel-Vault Walk",
        category: "Tribal Cultural Heritage",
        subcategory: "culture",
        rating: 4.9,
        reviewsCount: 1280,
        distance: "6.5 km from town",
        transitTime: "18 mins",
        estimatedCost: "₹200 Guided Walk",
        cost: "₹200",
        shortDesc: "Visit authentic Toda tribal munds (villages) featuring traditional barrel-vaulted thatched huts, sacred buffalo temples, and embroidery.",
        description: "Learn about the fascinating pastoral culture of the Toda people, their sacred water buffalo rituals, and unique semi-barrel wooden architecture.",
        whyVisit: "Ancient barrel-vaulted tribal architecture, sacred buffalo culture, and direct interaction with Toda elders.",
        bestTime: "09:30 AM - 01:00 PM",
        timings: "09:00 AM - 04:30 PM daily",
        openingHours: "09:00 AM - 04:30 PM daily",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4320,
        lng: 76.6820,
        tags: ["Toda", "Culture", "Village", "Tribal", "Heritage"]
      },
      {
        id: "exp-oot-2",
        name: "Pine Forest Cinematic Trail & Horse Ride",
        category: "Pine Canopy Trail",
        subcategory: "photography",
        rating: 4.8,
        reviewsCount: 1980,
        distance: "14 km on Gudalur Road",
        transitTime: "25 mins",
        estimatedCost: "Free Entry / ₹250 Horse Ride",
        cost: "Free",
        shortDesc: "Sloping forest of towering Siberian pine trees arranged in orderly lines, famed as a film shooting location with morning mist shafts.",
        description: "Walk down the pine-needle carpeted slope leading to Kamraj Sagar reservoir. Shafts of morning sunlight filter through the tall trees creating enchanting photo frames.",
        whyVisit: "Cinematic shafts of sunlight through tall pines, gentle horse rides, and crisp mountain forest air.",
        bestTime: "08:30 AM - 11:30 AM",
        timings: "08:00 AM - 06:00 PM daily",
        openingHours: "08:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4420,
        lng: 76.6450,
        tags: ["Pine Forest", "Photography", "Cinema", "Horse Ride", "Sunlight"]
      },
      {
        id: "exp-oot-3",
        name: "Pykara Speedboating & Forest Cruise",
        category: "High Altitude Water Sports",
        subcategory: "adventure",
        rating: 4.85,
        reviewsCount: 1650,
        distance: "21 km north-west",
        transitTime: "35 mins",
        estimatedCost: "₹650 per boat",
        cost: "₹650",
        shortDesc: "High-speed modern speedboats cutting across the deep blue sacred waters of Pykara lake surrounded by pine ridges.",
        description: "Feel the rush of cold mountain wind as high-powered speedboats navigate around forested islands and tranquil secluded bays.",
        whyVisit: "High-speed water adrenaline in cool mountain air and spectacular pine reflection views.",
        bestTime: "10:30 AM - 03:30 PM",
        timings: "09:30 AM - 05:30 PM daily",
        openingHours: "09:30 AM - 05:30 PM daily",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4580,
        lng: 76.6020,
        tags: ["Boating", "Speedboat", "Adventure", "Pykara", "Lake"]
      },
      {
        id: "exp-oot-4",
        name: "Cairn Hill Cypress Forest Trek",
        category: "Oldest Protected Reserve",
        subcategory: "exp_nature",
        rating: 4.85,
        reviewsCount: 750,
        distance: "4.2 km on Avalanche Road",
        transitTime: "12 mins",
        estimatedCost: "₹30 Entry",
        cost: "₹30",
        shortDesc: "Planted in 1868, this 168-acre sanctuary holds some of the oldest cypress and pine trees in the Nilgiris with wooden suspension watchtowers.",
        description: "A tranquil walking reserve with hanging suspension bridges, nature trails, bird hides, and historic walking tracks away from crowded spots.",
        whyVisit: "Century-old towering cypress trees, wooden canopy hanging bridge, and birdwatching peace.",
        bestTime: "08:00 AM - 11:00 AM & 03:00 PM - 05:30 PM",
        timings: "08:00 AM - 05:30 PM daily",
        openingHours: "08:00 AM - 05:30 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.3910,
        lng: 76.6810,
        tags: ["Cypress", "Forest", "Nature", "Hanging Bridge", "Quiet"]
      },
      {
        id: "exp-oot-5",
        name: "Ooty Heritage Walking & Colonial Bungalow Trail",
        category: "Historic Architecture Tour",
        subcategory: "local_experiences",
        rating: 4.75,
        reviewsCount: 880,
        distance: "Starts at St. Stephen's Church",
        transitTime: "Town center",
        estimatedCost: "Free Walk",
        cost: "Free",
        shortDesc: "Explore Stone House (1822), St. Stephen's Church (1830), Nilgiri Library, and British colonial stone architecture.",
        description: "Walk past gabled roofs, stained glass windows made from timbers of Tipu Sultan's Srirangapatna palace, and vintage library reading rooms.",
        whyVisit: "Historic 1822 Stone House, Tipu Sultan timber church beams, and Victorian colonial nostalgia.",
        bestTime: "10:00 AM - 01:00 PM or 03:30 PM - 05:30 PM",
        timings: "Daylight hours",
        openingHours: "Daylight hours",
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4120,
        lng: 76.7040,
        tags: ["Colonial", "Walking Tour", "Stone House", "Church", "History"]
      }
    ],

    // Hidden Gems
    hiddenGems: [
      {
        id: "hg-oot-1",
        name: "Avalanche Lake & Emerald Shola Sanctuary",
        category: "Protected Wilderness & Trout Waters",
        subcategory: "nature_gems",
        rating: 4.95,
        reviewsCount: 1850,
        distance: "26 km south-west",
        transitTime: "50 mins",
        estimatedCost: "₹150 Forest Permit",
        cost: "₹150",
        shortDesc: "Crystal-clear mountain lake surrounded by wild magnolia and trout streams with strictly limited forest department safari entries.",
        description: "Formed naturally after an 1823 landslide, Avalanche is a pristine paradise surrounded by shola forests and rolling meadows where wild orchids flourish.",
        whyVisit: "Pristine mountain wilderness, crystal clear lake waters, and complete absence of commercial noise.",
        bestTime: "08:30 AM - 12:00 PM",
        timings: "08:00 AM - 03:00 PM daily (Forest dept safari)",
        openingHours: "08:00 AM - 03:00 PM daily",
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.3000,
        lng: 76.5800,
        tags: ["Avalanche", "Wilderness", "Nature Gem", "Lake", "Trout"]
      },
      {
        id: "hg-oot-2",
        name: "Needlerock (Soochimalai) Secret Ridge",
        category: "360-Degree Valley Precipice",
        subcategory: "secret_viewpoints",
        rating: 4.9,
        reviewsCount: 920,
        distance: "40 km on Gudalur Highway",
        transitTime: "1 hr",
        estimatedCost: "₹20 Entry",
        cost: "₹20",
        shortDesc: "A sharp conical needle-like rock offering a dramatic 360-degree precipice view over Mudumalai rainforests and Kerala border hills.",
        description: "Known locally as Soochimalai, this viewpoint provides an aerial perspective of dense jungle canopies below, frequently blanketed in floating clouds.",
        whyVisit: "Spectacular needle-shaped peak, dramatic sunset over rainforest canopy, and quiet mountain breeze.",
        bestTime: "04:30 PM - 06:15 PM",
        timings: "08:00 AM - 06:00 PM daily",
        openingHours: "08:00 AM - 06:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5120,
        lng: 76.5150,
        tags: ["Needlerock", "Secret Viewpoint", "Sunset", "Precipice", "Gorging"]
      },
      {
        id: "hg-oot-3",
        name: "St. Stephen's Historic 1830 Church & Cemetery",
        category: "Gothic Colonial Church",
        subcategory: "cultural_gems",
        rating: 4.8,
        reviewsCount: 740,
        distance: "1.2 km from town center",
        transitTime: "4 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "One of the oldest churches in the Nilgiris, featuring massive wooden beams hauled from Tipu Sultan's island fortress of Srirangapatna.",
        description: "Built in 1830, St. Stephen's holds beautiful stained-glass windows depicting the Last Supper and a historic cemetery where Ooty founder John Sullivan's family rests.",
        whyVisit: "Historical wooden beams from Tipu Sultan's palace, antique stained glass, and tranquil pine churchyard.",
        bestTime: "10:00 AM - 04:30 PM",
        timings: "09:30 AM - 05:00 PM (Closed during private services)",
        openingHours: "09:30 AM - 05:00 PM",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.4140,
        lng: 76.7025,
        tags: ["Gothic Church", "Cultural Gem", "Tipu Sultan", "Heritage", "Quiet"]
      },
      {
        id: "hg-oot-4",
        name: "Parsons Valley Stream & Shola Basin",
        category: "Restricted Watershed Sanctuary",
        subcategory: "local_spots",
        rating: 4.85,
        reviewsCount: 510,
        distance: "15 km west",
        transitTime: "30 mins",
        estimatedCost: "Forest Permit Required",
        cost: "₹100",
        shortDesc: "The primary high-altitude watershed for Ooty, surrounded by untouched shola woodlands, wild gaur bison, and mountain streams.",
        description: "A secret sanctuary accessible with special forest permission, providing pristine nature walks and birding away from commercial zones.",
        whyVisit: "Completely pristine watershed stream, spotting wild Indian Gaur bison, and serene high-altitude woods.",
        bestTime: "08:30 AM - 12:00 PM",
        timings: "08:00 AM - 04:00 PM daily",
        openingHours: "08:00 AM - 04:00 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.3800,
        lng: 76.6200,
        tags: ["Parsons Valley", "Watershed", "Local Spot", "Bison", "Shola"]
      }
    ],

    // Curated Itinerary
    curatedTrip: {
      title: "Nilgiri Toy Train & Cloud Ridge",
      duration: "2 Days",
      budget: "₹7,200",
      days: [
        {
          dayNumber: 1,
          theme: "Heritage Steam Train & Chocolate",
          stops: [
            { time: "09:00 AM", title: "Nilgiri Mountain Railway Train", duration: "3 hrs", cost: "₹205", desc: "Historic gorge steam train" },
            { time: "01:30 PM", title: "Moddy's Fudge & Hot Chocolate", duration: "1 hr", cost: "₹180", desc: "Warm almond fudge and hot cocoa" },
            { time: "03:00 PM", title: "Botanical Gardens & Glasshouse", duration: "2 hrs", cost: "₹40", desc: "Terraced exotic flower beds and fossil tree" },
            { time: "05:30 PM", title: "Commercial Road Momos & Shopping", duration: "2 hrs", cost: "₹150", desc: "Steaming Tibetan momos and Toda shawls" }
          ]
        },
        {
          dayNumber: 2,
          theme: "Highest Summit & Wild Lake",
          stops: [
            { time: "08:30 AM", title: "Doddabetta Peak Telescope View", duration: "2 hrs", cost: "₹30", desc: "Panoramic view over Western & Eastern Ghats" },
            { time: "11:30 AM", title: "Pine Forest Cinematic Walk", duration: "1.5 hrs", cost: "Free", desc: "Tall Siberian pine woods and sunlight beams" },
            { time: "01:30 PM", title: "Earl's Secret Glasshouse Lunch", duration: "1.5 hrs", cost: "₹450", desc: "Colonial roasted lamb and shepherd's pie" },
            { time: "03:30 PM", title: "Pykara Lake Speedboat Safari", duration: "2 hrs", cost: "₹200", desc: "Boating on sacred blue waters" }
          ]
        }
      ]
    },

    budgetOverview: {
      total: 9000,
      spent: 5200,
      remaining: 3800,
      categories: [
        { name: "Stay", allocated: 3800, percentage: 42, color: "#c2410c" },
        { name: "Food", allocated: 1500, percentage: 25, color: "#d97706" },
        { name: "Travel", allocated: 1200, percentage: 20, color: "#0284c7" },
        { name: "Activities", allocated: 700, percentage: 13, color: "#059669" }
      ]
    },

    safetyDirectory: [
      {
        name: "Ooty Government General Hospital",
        type: "hospital",
        phone: "+91 423 2442212",
        address: "Hospital Road, Ooty",
        distance: "1 km from center",
        services: "24x7 Emergency, Ambulance, Trauma Care."
      },
      {
        name: "Ooty Town Police Station",
        type: "police",
        phone: "+91 423 2442222 / 112",
        address: "Commercial Road, Ooty",
        distance: "400m from center",
        services: "24x7 Tourist assistance and patrol."
      }
    ]
  },

  // ==========================================
  // 4. WAYANAD (Kerala)
  // ==========================================
  {
    id: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    tagline: "Prehistoric rock caves, wild rainforests & misty bamboo rafts",
    coordinates: { lat: 11.6854, lng: 76.1320 },
    currentWeather: {
      temp: "22°C",
      condition: "Crisp & Sunny",
      time: "6:30 PM",
      icon: "🌿"
    },
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85",
    
    // Attractions
    attractions: [
      {
        id: "way-1",
        name: "Edakkal Caves & Ancient Petroglyphs",
        category: "Neolithic Rock Heritage",
        subcategory: "heritage",
        type: "attraction",
        rating: 4.85,
        reviewsCount: 2900,
        distance: "12 km from Kalpetta",
        transitTime: "25 mins",
        estimatedCost: "₹150 Entry",
        cost: "₹150",
        shortDesc: "Rare 6,000-year-old stone age carvings and cliffside caves overlooking panoramic Western Ghats mountain ridges.",
        description: "Perched at 3,900 ft on Ambukuthi Hills, Edakkal is a natural cleft fissure in solid rock. It contains prehistoric Neolithic petroglyph carvings dating back to 6,000 BCE depicting human figures, animals, wheels, and ancient scripts.",
        whyVisit: "Ancient 6,000 BCE stone-age cave carvings, thrilling mountain ridge climb, and panoramic valley viewpoints.",
        bestTime: "08:30 AM - 11:30 AM (Morning climb)",
        timings: "09:00 AM - 04:00 PM (Closed Mondays)",
        openingHours: "09:00 AM - 04:00 PM (Closed Mondays)",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6288,
        lng: 76.2346,
        tags: ["Neolithic", "Ancient Carvings", "Panoramic View", "Heritage", "Caves"]
      },
      {
        id: "way-2",
        name: "Banasura Sagar Dam & Island Archipelago",
        category: "Lake & Island Sanctuary",
        subcategory: "lakes_beaches",
        type: "attraction",
        rating: 4.75,
        reviewsCount: 2450,
        distance: "21 km from Kalpetta",
        transitTime: "40 mins",
        estimatedCost: "₹110 Entry + ₹800 Speedboat",
        cost: "₹110",
        shortDesc: "The largest earth dam in India with speedboating amidst floating emerald mountain islands and mist-covered hills.",
        description: "Constructed using massive boulders and soil, Banasura Sagar impounds the Karamanathodu tributary. When water levels rise, submerged hills transform into an enchanting archipelago of green islands.",
        whyVisit: "Speedboating around floating green mountain islands, zipline over reservoir waters, and sweeping views of Banasura Peak.",
        bestTime: "03:00 PM - 05:30 PM",
        timings: "09:00 AM - 05:30 PM daily",
        openingHours: "09:00 AM - 05:30 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6706,
        lng: 75.9575,
        tags: ["Boating", "Earth Dam", "Islands", "Banasura", "Speedboat"]
      },
      {
        id: "way-3",
        name: "Pookode Natural Mountain Lake",
        category: "Freshwater Forest Lake",
        subcategory: "nature",
        type: "attraction",
        rating: 4.65,
        reviewsCount: 2100,
        distance: "15 km south near Vythiri",
        transitTime: "25 mins",
        estimatedCost: "₹50 Entry",
        cost: "₹50",
        shortDesc: "Serene natural freshwater lake surrounded by evergreen rainforests, pedal boating, blue lotus flowers, and wild monkeys.",
        description: "Nestled among evergreen hills at an altitude of 2,100 ft, Pookode is shaped remarkably like the map of India. A paved walking pathway winds through thick bamboo and lotus ponds.",
        whyVisit: "Pedal boating amidst blue water lilies, scenic forest walking trail, and freshwater aquarium.",
        bestTime: "09:00 AM - 12:00 PM & 03:00 PM - 05:00 PM",
        timings: "09:00 AM - 05:00 PM daily",
        openingHours: "09:00 AM - 05:00 PM daily",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5420,
        lng: 76.0270,
        tags: ["Boating", "Nature Walk", "Lake", "Aquarium", "Forest"]
      },
      {
        id: "way-4",
        name: "Lakkidi Rainforest Viewpoint & Ghat Deck",
        category: "Gateway Viewpoint",
        subcategory: "viewpoints",
        type: "attraction",
        rating: 4.9,
        reviewsCount: 1980,
        distance: "16 km from Kalpetta",
        transitTime: "28 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "One of the highest locations in Wayanad with dramatic gorge views of nine hairpin bends cutting through misty rainforests.",
        description: "Known as the Gateway to Wayanad, Lakkidi registers one of the highest rainfalls in the country. Standing on the observation deck, you watch thick fog sweep across deep jungle ravines.",
        whyVisit: "Dramatic view of 9 winding hairpin bends below, watching monkeys in jungle canopy, and cool mountain breezes.",
        bestTime: "05:00 PM - 06:45 PM for sunset",
        timings: "Open 24/7",
        openingHours: "Open 24/7",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5180,
        lng: 76.0380,
        tags: ["Viewpoint", "Sunset", "Hairpin Bends", "Rainforest", "Mist"]
      },
      {
        id: "way-5",
        name: "Karlad Adventure Lake & Canopy Zipline",
        category: "Adventure Nature Park",
        subcategory: "family",
        type: "attraction",
        rating: 4.7,
        reviewsCount: 1450,
        distance: "16 km from Kalpetta",
        transitTime: "30 mins",
        estimatedCost: "₹50 Entry + ₹300 Activities",
        cost: "₹50",
        shortDesc: "Family adventure park offering South India's longest lake zipline, kayaking, bamboo rafting, and rock climbing walls.",
        description: "Karlad is the second largest lake in Wayanad, specially developed for eco-adventure sports, camping tents, and family leisure.",
        whyVisit: "Thrilling zipline across the lake, peaceful kayaking, and adventure activities for all ages.",
        bestTime: "10:00 AM - 04:30 PM",
        timings: "09:00 AM - 05:00 PM daily",
        openingHours: "09:00 AM - 05:00 PM daily",
        photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6200,
        lng: 75.9800,
        tags: ["Zipline", "Adventure", "Kayaking", "Family", "Lake"]
      }
    ],

    // Food & Dining
    food: [
      {
        id: "food-way-1",
        name: "1940s Bamboo Biryani & Malabar Kitchen",
        category: "Authentic Malabar Dining",
        subcategory: "local_traditional",
        rating: 4.9,
        reviewsCount: 3400,
        distance: "1.2 km from Kalpetta",
        transitTime: "4 mins",
        estimatedCost: "₹220 per meal",
        cost: "₹220",
        shortDesc: "Slow-cooked spiced mutton biryani steamed inside whole raw bamboo hollows over charcoal fires, served with dates pickle.",
        description: "A culinary spectacle. Aromatic seeraga samba rice and tender spiced meat are sealed inside green bamboo stems and roasted over wood embers, infusing the rice with woody sweetness.",
        whyVisit: "Unforgettable piping hot bamboo-steamed mutton biryani, chicken fry, and Malabar pathiri.",
        timings: "11:30 AM - 10:00 PM daily",
        openingHours: "11:30 AM - 10:00 PM daily",
        bestTime: "Lunch (12:30 PM - 03:00 PM)",
        photo: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6080,
        lng: 76.0820,
        tags: ["Bamboo Biryani", "Malabar", "Traditional", "Mutton", "Charcoal"]
      },
      {
        id: "food-way-2",
        name: "1980's A Nostalgic Restaurant",
        category: "Heritage Kerala Diner",
        subcategory: "restaurants",
        rating: 4.85,
        reviewsCount: 2800,
        distance: "3.5 km on Kalpetta Bypass",
        transitTime: "8 mins",
        estimatedCost: "₹350 for two",
        cost: "₹350",
        shortDesc: "Retro Kerala dining space filled with 1980s vinyl records and antique radios, serving banana leaf meals and Neypathiri.",
        description: "Step into an authentic 1980s Kerala ambiance with brass utensils, clay water jugs, delicious fish curry meals, and traditional beef coconut roast.",
        whyVisit: "Retro 80s nostalgia ambiance, spicy fish curry meals, and soft flaky Neypathiris.",
        timings: "11:30 AM - 10:30 PM daily",
        openingHours: "11:30 AM - 10:30 PM daily",
        bestTime: "Lunch or Dinner",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6150,
        lng: 76.0900,
        tags: ["Retro", "Fish Curry", "Nostalgic", "Malabar", "Meals"]
      },
      {
        id: "food-way-3",
        name: "Cafe Robusta & Wayanad Coffee Lounge",
        category: "Artisan Coffee Estate Cafe",
        subcategory: "cafes",
        rating: 4.8,
        reviewsCount: 1350,
        distance: "2.0 km from town",
        transitTime: "6 mins",
        estimatedCost: "₹280 for two",
        cost: "₹280",
        shortDesc: "Single-origin Wayanad Robusta and Arabica pour-overs, cold brews, and cardamom carrot cakes amidst coffee groves.",
        description: "Relax on an open-air wooden deck with views over flowering coffee trees, tasting locally harvested specialty coffees roasted in small batches.",
        whyVisit: "Single-origin estate Robusta pour-overs, cardamom carrot cakes, and serene coffee plantation deck.",
        timings: "09:00 AM - 09:00 PM daily",
        openingHours: "09:00 AM - 09:00 PM daily",
        bestTime: "Morning or Afternoon coffee (03:30 PM - 06:30 PM)",
        photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6100,
        lng: 76.0750,
        tags: ["Coffee", "Cafe", "Robusta", "Cold Brew", "Plantation"]
      },
      {
        id: "food-way-4",
        name: "Sulthan Bathery Night Street Food Hub",
        category: "Late Night Street Kiosks",
        subcategory: "street_food",
        rating: 4.75,
        reviewsCount: 2200,
        distance: "22 km from Kalpetta",
        transitTime: "35 mins",
        estimatedCost: "₹120 per person",
        cost: "₹120",
        shortDesc: "Bustling street stalls preparing layered coin parottas, chicken chukka, unnakaya (stuffed plantain), and Sulaimani spiced tea.",
        description: "A lively night food hub where locals gather for sizzling tawa chicken, hot crispy parottas, and mint-spiced black Sulaimani tea.",
        whyVisit: "Authentic Malabar street delicacies, crispy coin parottas, and aromatic hot Sulaimani tea.",
        timings: "05:00 PM - 11:30 PM daily",
        openingHours: "05:00 PM - 11:30 PM daily",
        bestTime: "07:30 PM - 10:30 PM",
        photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6620,
        lng: 76.2580,
        tags: ["Street Food", "Parotta", "Sulaimani", "Malabar", "Night"]
      }
    ],

    // Stays
    stays: [
      {
        id: "stay-way-1",
        name: "Kabini Rainforest Treehouse & Eco Resort",
        category: "Rainforest Eco Treehouse",
        subcategory: "resorts",
        pricePerNight: 4200,
        rating: 4.85,
        reviewsCount: 1120,
        distance: "14 km from Kalpetta",
        transitTime: "30 mins",
        estimatedCost: "₹4,200 / night",
        cost: "₹4,200",
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Treehouse Balcony", "Stream Walk", "Campfire", "Organic Meals", "Birdwatching"],
        area: "Kabini Riverside",
        shortDesc: "Authentic wooden treehouse built 60 feet above ground in live banyan and teak trees, overlooking mountain streams and jungle canopies.",
        description: "Wake up level with hornbills and giant squirrels. Constructed using eco-friendly bamboo and thatched roofs without harming living trees.",
        whyVisit: "Magical 60ft treehouse experience, morning stream walks, and fresh organic plantation meals.",
        lat: 11.7200,
        lng: 76.1500,
        tags: ["Treehouse", "Resort", "Eco", "Canopy", "Stream"]
      },
      {
        id: "stay-way-2",
        name: "Wayanad Coffee Grove Homestay",
        category: "Budget Coffee Estate Stay",
        subcategory: "homestays",
        pricePerNight: 2100,
        rating: 4.7,
        reviewsCount: 840,
        distance: "3.2 km from Kalpetta",
        transitTime: "8 mins",
        estimatedCost: "₹2,100 / night",
        cost: "₹2,100",
        photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Plantation Walk", "Traditional Kerala Breakfast", "WiFi", "Verandah"],
        area: "Kalpetta Town Perimeter",
        shortDesc: "A peaceful planter homestay surrounded by flowering coffee bushes, pepper vines, and friendly family hosts.",
        description: "Enjoy hot steamed puttu with kadala curry for breakfast, evening bonfire chats, and guided tours through the coffee estate.",
        whyVisit: "Authentic local family warmth, aromatic coffee estate, and affordable comfortable rooms.",
        lat: 11.6180,
        lng: 76.0950,
        tags: ["Homestay", "Coffee", "Budget", "Puttu", "Family"]
      },
      {
        id: "stay-way-3",
        name: "Vythiri Heritage Rainforest Resort & Spa",
        category: "Luxury Rainforest Resort",
        subcategory: "hotels",
        pricePerNight: 6800,
        rating: 4.9,
        reviewsCount: 1540,
        distance: "16 km south in Vythiri",
        transitTime: "25 mins",
        estimatedCost: "₹6,800 / night",
        cost: "₹6,800",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["Natural Stream Pool", "Ayurvedic Spa", "Hanging Bridge", "Multi-cuisine Restaurant"],
        area: "Vythiri Valley",
        shortDesc: "5-star eco luxury resort tucked into tropical rainforests with wooden rope bridges crossing natural mountain streams.",
        description: "Surrounded by misty canopies, Vythiri combines world-class Ayurvedic wellness with private plunge pool villas and nature trails.",
        whyVisit: "Rope suspension bridge over jungle streams, private plunge pools, and authentic Ayurvedic wellness.",
        lat: 11.5350,
        lng: 76.0400,
        tags: ["Luxury", "Hotel", "Vythiri", "Spa", "Stream"]
      },
      {
        id: "stay-way-4",
        name: "Wild Woods Forest Lodge & Dorms",
        category: "Trekker & Backpacker Lodge",
        subcategory: "lodges",
        pricePerNight: 1050,
        rating: 4.6,
        reviewsCount: 780,
        distance: "800m from Kalpetta Bus Stand",
        transitTime: "3 mins",
        estimatedCost: "₹1,050 / night",
        cost: "₹1,050",
        photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85"
        ],
        facilities: ["High-speed WiFi", "Hot Water Showers", "Safari Booking Desk", "Community Kitchen"],
        area: "Main Road Kalpetta",
        shortDesc: "Clean budget rooms and backpacker pods with trek guide arrangements for Chembra and Kuruvadweep.",
        description: "The top budget hub for solo travelers and students looking for affordable basecamp lodging in Wayanad.",
        whyVisit: "Unbeatable budget pricing, fast WiFi, and reliable trek safari booking support.",
        lat: 11.6050,
        lng: 76.0850,
        tags: ["Lodge", "Budget", "Backpacker", "Kalpetta", "Hot Water"]
      }
    ],

    // Local Shops
    shops: [
      {
        id: "shop-way-1",
        name: "Wayanad Tribal Organic Spices & Honey Cooperative",
        category: "Artisan Spices & Forest Honey",
        subcategory: "tea_spices",
        rating: 4.95,
        reviewsCount: 2100,
        distance: "1.0 km in Kalpetta Market",
        transitTime: "3 mins",
        estimatedCost: "₹180 - ₹950",
        cost: "₹180+",
        shortDesc: "Wild forest honey collected by local tribes, sun-dried Tellicherry black pepper, organic green cardamom, and ginger.",
        description: "Official tribal cooperative outlet ensuring ethical wages to indigenous forest gatherers while providing unadulterated high-grade spices.",
        whyVisit: "Raw wild honey, giant Tellicherry black pepper, and supporting tribal gatherer cooperatives.",
        timings: "09:00 AM - 08:00 PM (Closed Sundays)",
        openingHours: "09:00 AM - 08:00 PM",
        bestTime: "10:00 AM - 06:00 PM",
        photo: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6070,
        lng: 76.0840,
        tags: ["Spices", "Honey", "Pepper", "Tribal", "Cardamom"]
      },
      {
        id: "shop-way-2",
        name: "Uravu Indigenous Bamboo Craft Center",
        category: "Eco Bamboo Artisan Guild",
        subcategory: "handicrafts",
        rating: 4.9,
        reviewsCount: 1350,
        distance: "12 km in Thrikkaipetta",
        transitTime: "25 mins",
        estimatedCost: "₹100 - ₹3,000",
        cost: "₹100+",
        shortDesc: "Acclaimed rural craft village where local artisans handcraft lampshades, rainsticks, bamboo pens, and homeware.",
        description: "Uravu promotes sustainable bamboo architecture and livelihood. Watch artisans split raw bamboo and weave intricate lamps and baskets.",
        whyVisit: "Exquisite eco bamboo lamps, acoustic bamboo rainsticks, and direct craft village purchase.",
        timings: "09:30 AM - 05:30 PM (Closed Sundays)",
        openingHours: "09:30 AM - 05:30 PM",
        bestTime: "11:00 AM - 04:00 PM",
        photo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5850,
        lng: 76.1400,
        tags: ["Bamboo", "Handicrafts", "Uravu", "Eco", "Artisans"]
      },
      {
        id: "shop-way-3",
        name: "Wayanad Coffee & Spices Souvenir Hub",
        category: "Single-Estate Coffee & Tea",
        subcategory: "souvenirs",
        rating: 4.8,
        reviewsCount: 1650,
        distance: "600m on Main Road",
        transitTime: "2 mins",
        estimatedCost: "₹150 - ₹800",
        cost: "₹150+",
        shortDesc: "Roasted coffee beans, chocolate-coated coffee beans, vanilla pods, and wooden souvenir artifacts.",
        description: "Pick up freshly ground roasted coffee packs, handmade banana chips fried in pure coconut oil, and wild cinnamon rolls.",
        whyVisit: "Freshly roasted single-estate Robusta coffee, hot crispy coconut oil banana chips, and vanilla pods.",
        timings: "08:30 AM - 09:30 PM daily",
        openingHours: "08:30 AM - 09:30 PM",
        bestTime: "10:00 AM - 08:00 PM",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6090,
        lng: 76.0830,
        tags: ["Coffee", "Souvenirs", "Banana Chips", "Vanilla", "Kalpetta"]
      },
      {
        id: "shop-way-4",
        name: "Kalpetta Friday Farmers' Market",
        category: "Traditional Produce Bazaar",
        subcategory: "local_markets",
        rating: 4.7,
        reviewsCount: 1200,
        distance: "400m from Central Bus Stand",
        transitTime: "2 mins",
        estimatedCost: "₹50 - ₹400",
        cost: "₹50+",
        shortDesc: "Weekly gathering of local plantation growers selling fresh wild arrowroot, plantains, tapioca, and organic country eggs.",
        description: "Experience authentic rural Kerala commerce with colourful mounds of ginger, hill plantains, fresh betel leaves, and hand-rolled jaggery.",
        whyVisit: "Sweet Nendran bananas, organic mountain ginger, and vibrant rural farmer interactions.",
        timings: "07:00 AM - 06:00 PM (Fridays only)",
        openingHours: "07:00 AM - 06:00 PM (Fridays)",
        bestTime: "Morning (08:00 AM - 11:30 AM)",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6060,
        lng: 76.0810,
        tags: ["Market", "Produce", "Bananas", "Bazaar", "Local"]
      },
      {
        id: "shop-way-5",
        name: "Sulthan Bathery Handloom & Khadi Guild",
        category: "Organic Khadi & Cotton Weaves",
        subcategory: "textiles",
        rating: 4.75,
        reviewsCount: 820,
        distance: "23 km in Sulthan Bathery",
        transitTime: "35 mins",
        estimatedCost: "₹350 - ₹2,500",
        cost: "₹350+",
        shortDesc: "Hand-spun organic Khadi shirts, traditional Kerala mundu dhotis, cotton towels, and breathable herbal dyed fabrics.",
        description: "Certified Khadi Gramodyog store supporting village spinners with pure cotton apparel made on traditional wooden handlooms.",
        whyVisit: "Pure organic handloom Khadi cotton shirts and traditional Kerala towels.",
        timings: "09:30 AM - 08:00 PM (Closed Sundays)",
        openingHours: "09:30 AM - 08:00 PM",
        bestTime: "10:30 AM - 06:00 PM",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6600,
        lng: 76.2600,
        tags: ["Khadi", "Handloom", "Textiles", "Cotton", "Mundu"]
      }
    ],

    // Experiences
    experiences: [
      {
        id: "exp-way-1",
        name: "Chembra Peak & Natural Heart Lake Trek",
        category: "High Altitude Mountain Trek",
        subcategory: "adventure",
        rating: 4.95,
        reviewsCount: 2600,
        distance: "17 km from Kalpetta",
        transitTime: "35 mins",
        estimatedCost: "₹750 Guided Forest Permit",
        cost: "₹750",
        shortDesc: "Trek through misty tea terraces to South India's famous perennial heart-shaped lake (Hridaya Saras) perched at 4,900 ft.",
        description: "The highest summit in Wayanad (6,890 ft). The trek passes through rolling green tea slopes into mist-shrouded grasslands where a natural heart-shaped lake never dries up.",
        whyVisit: "Legendary perennial heart-shaped mountain lake, sweeping mist valley vistas, and thrilling mountain hike.",
        bestTime: "07:00 AM - 10:30 AM departure",
        timings: "07:00 AM - 02:00 PM (Permit limited to 200/day)",
        openingHours: "07:00 AM - 02:00 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5510,
        lng: 76.0880,
        tags: ["Chembra", "Heart Lake", "Trek", "Adventure", "Summit"]
      },
      {
        id: "exp-way-2",
        name: "Kuruvadweep Silent Bamboo Rafting Sanctuary",
        category: "Protected River Island Rafting",
        subcategory: "exp_nature",
        rating: 4.9,
        reviewsCount: 1950,
        distance: "28 km north",
        transitTime: "45 mins",
        estimatedCost: "₹250 Raft Entry",
        cost: "₹250",
        shortDesc: "950 acres of uninhabited river islands on the Kabini river, accessible only via eco-friendly handmade bamboo rafts guided by forest wardens.",
        description: "Glide over crystal clear jungle river channels beneath giant evergreen canopies filled with singing birds, river otters, and exotic butterflies.",
        whyVisit: "Silent handmade bamboo rafting, tranquil river island trails, and pure untouched rainforest canopy.",
        bestTime: "08:30 AM - 11:30 AM",
        timings: "09:00 AM - 03:30 PM (Closed during monsoons)",
        openingHours: "09:00 AM - 03:30 PM daily",
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.8200,
        lng: 76.0900,
        tags: ["Bamboo Raft", "River Island", "Nature", "Kuruvadweep", "Sanctuary"]
      },
      {
        id: "exp-way-3",
        name: "Uravu Hands-on Bamboo Weaving Workshop",
        category: "Sustainable Crafting Class",
        subcategory: "culture",
        rating: 4.85,
        reviewsCount: 820,
        distance: "12 km from Kalpetta",
        transitTime: "25 mins",
        estimatedCost: "₹450 Workshop",
        cost: "₹450",
        shortDesc: "Learn ancient tribal bamboo splitting, bending, and weaving techniques to craft your own souvenir bamboo flute or pen holder.",
        description: "Master rural artisans guide participants through selecting natural bamboo, heat treating, and creating handcrafted eco souvenirs.",
        whyVisit: "Hands-on craft learning, make your own bamboo souvenir, and support indigenous village livelihood.",
        timings: "10:00 AM - 01:00 PM & 02:00 PM - 04:30 PM",
        openingHours: "By appointment",
        bestTime: "Morning slot (10:30 AM)",
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5850,
        lng: 76.1400,
        tags: ["Bamboo", "Workshop", "Hands-on", "Culture", "Craft"]
      },
      {
        id: "exp-way-4",
        name: "Lakkidi Ghat Canopy Golden Hour Photography",
        category: "Ghat Rainforest Photography",
        subcategory: "photography",
        rating: 4.8,
        reviewsCount: 1100,
        distance: "16 km from Kalpetta",
        transitTime: "28 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "Capture dramatic golden rays piercing through thick valley fog, sweeping hairpin turns, and wild monkey troops.",
        description: "Perched high on the Western Ghats edge, this viewpoint provides unparalleled golden hour lighting across deep emerald valleys.",
        whyVisit: "Dramatic sunbeams through rainforest mist, sweeping valley curves, and wildlife silhouettes.",
        bestTime: "05:15 PM - 06:30 PM",
        timings: "Open 24/7",
        openingHours: "Open 24/7",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5180,
        lng: 76.0380,
        tags: ["Photography", "Sunset", "Ghat", "Mist", "Landscape"]
      },
      {
        id: "exp-way-5",
        name: "Cardamom & Coffee Plantation Guided Walk",
        category: "Agrarian Spice Trail",
        subcategory: "local_experiences",
        rating: 4.85,
        reviewsCount: 1250,
        distance: "4.0 km from Kalpetta",
        transitTime: "10 mins",
        estimatedCost: "₹250 per person",
        cost: "₹250",
        shortDesc: "Walk with third-generation planter guides tasting raw cardamom pods, learning coffee roasting, and plucking black pepper.",
        description: "Learn how high-range spices are cultivated sustainably beneath shade-tree canopies, followed by fresh plantation-roasted coffee cupping.",
        whyVisit: "Chew fresh aromatic green cardamom, pluck wild black peppercorns, and taste estate-roasted coffee.",
        timings: "08:30 AM - 11:30 AM & 03:30 PM - 05:30 PM",
        openingHours: "Morning and evening slots",
        bestTime: "09:00 AM - 11:00 AM",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6120,
        lng: 76.0900,
        tags: ["Spices", "Coffee", "Plantation", "Cardamom", "Trail"]
      }
    ],

    // Hidden Gems
    hiddenGems: [
      {
        id: "hg-way-1",
        name: "Phantom Rock Skull Viewpoint",
        category: "Natural Monolithic Sculpture",
        subcategory: "secret_viewpoints",
        rating: 4.8,
        reviewsCount: 1450,
        distance: "14 km from Kalpetta",
        transitTime: "25 mins",
        estimatedCost: "Free",
        cost: "Free",
        shortDesc: "A natural skull-shaped metamorphic rock formation perched precariously on a scenic hilltop amidst ginger farms.",
        description: "Known locally as Cheengeri Mala, this geological wonder resembles a human skull silhouette, offering stunning 360-degree viewpoints with minimal crowds.",
        whyVisit: "Unique natural skull rock formation, peaceful trekking trails, and sweeping mountain panoramas.",
        bestTime: "04:30 PM - 06:30 PM for sunset",
        timings: "07:00 AM - 06:30 PM daily",
        openingHours: "07:00 AM - 06:30 PM daily",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.6320,
        lng: 76.2150,
        tags: ["Phantom Rock", "Geology", "Secret Viewpoint", "Skull Rock", "Sunset"]
      },
      {
        id: "hg-way-2",
        name: "Thirunelli Ancient Forest Temple & Papanasini",
        category: "3,000-Year-Old Mountain Temple",
        subcategory: "cultural_gems",
        rating: 4.95,
        reviewsCount: 1650,
        distance: "32 km north on Brahmagiri Base",
        transitTime: "55 mins",
        estimatedCost: "Free Entry",
        cost: "Free",
        shortDesc: "Dedicated to Lord Vishnu, hidden deep in dense Brahmagiri mountain forests, surrounded by 30 granite pillars and the holy Papanasini stream.",
        description: "Known as the Kashi of the South, Thirunelli is nestled in wilderness where mountain streams flow through stone aqueducts dating back centuries.",
        whyVisit: "Ancient 30-pillar stone temple architecture in deep mountain wilderness and crystal cold Papanasini stream.",
        bestTime: "06:00 AM - 09:00 AM & 05:00 PM - 07:30 PM",
        timings: "05:30 AM - 12:30 PM, 05:00 PM - 08:00 PM",
        openingHours: "05:30 AM - 12:30 PM, 05:00 PM - 08:00 PM",
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.9020,
        lng: 75.9980,
        tags: ["Thirunelli", "Ancient Temple", "Brahmagiri", "Cultural Gem", "Stream"]
      },
      {
        id: "hg-way-3",
        name: "En Ooru Tribal Heritage Village",
        category: "Living Indigenous Heritage Center",
        subcategory: "local_spots",
        rating: 4.9,
        reviewsCount: 2200,
        distance: "16 km in Pookode",
        transitTime: "30 mins",
        estimatedCost: "₹50 Entry",
        cost: "₹50",
        shortDesc: "Kerala's first tribal heritage village showcasing traditional mud and thatch huts, indigenous archery, and authentic tribal culinary dishes.",
        description: "Set atop misty hills, En Ooru provides livelihood to local tribal communities. Taste traditional millet dishes and watch tribal craftspeople create bamboo instruments.",
        whyVisit: "Authentic tribal mud huts, traditional wild bamboo food stalls, and tribal archery demonstrations.",
        bestTime: "09:30 AM - 04:30 PM",
        timings: "09:00 AM - 05:00 PM (Closed Mondays)",
        openingHours: "09:00 AM - 05:00 PM (Closed Mondays)",
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5380,
        lng: 76.0190,
        tags: ["En Ooru", "Tribal Village", "Local Spot", "Heritage", "Millet Food"]
      },
      {
        id: "hg-way-4",
        name: "Soochipara (Sentinel Rock) 3-Tier Falls",
        category: "Multi-Tiered Rainforest Cascades",
        subcategory: "nature_gems",
        rating: 4.85,
        reviewsCount: 1980,
        distance: "22 km south in Meppadi",
        transitTime: "40 mins",
        estimatedCost: "₹80 Entry",
        cost: "₹80",
        shortDesc: "Spectacular 200m three-tiered waterfall cascading down sheer cliff rocks into a natural crystal swimming pool surrounded by tea estates.",
        description: "A scenic 1.5km trek through dense tea slopes and evergreen forest leads to the roaring base pool of Sentinel Rock falls.",
        whyVisit: "Thunderous 200m waterfall cascades, natural swimming pool dip, and scenic tea estate trek.",
        bestTime: "09:00 AM - 03:30 PM",
        timings: "09:00 AM - 04:30 PM daily",
        openingHours: "09:00 AM - 04:30 PM daily",
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=85"
        ],
        lat: 11.5120,
        lng: 76.1600,
        tags: ["Soochipara", "Waterfall", "Nature Gem", "Cascades", "Trek"]
      }
    ],

    // Curated Itinerary
    curatedTrip: {
      title: "Wayanad Wild Canopy & Caves",
      duration: "2 Days",
      budget: "₹6,800",
      days: [
        {
          dayNumber: 1,
          theme: "Prehistoric Caves & Earth Dam",
          stops: [
            { time: "08:30 AM", title: "Edakkal Prehistoric Caves Trek", duration: "2.5 hrs", cost: "₹150", desc: "Climb to Neolithic petroglyphs" },
            { time: "01:30 PM", title: "Bamboo Biryani & Malabar Thali", duration: "1 hr", cost: "₹220", desc: "Authentic bamboo steamed lunch" },
            { time: "03:30 PM", title: "Banasura Sagar Dam Speedboat", duration: "2 hrs", cost: "₹110", desc: "Cruise through island archipelago" },
            { time: "06:00 PM", title: "Lakkidi Rainforest Sunset View", duration: "1 hr", cost: "Free", desc: "Watch mist sweep over ghats" }
          ]
        },
        {
          dayNumber: 2,
          theme: "Bamboo Rafting & Sacred Valley",
          stops: [
            { time: "08:30 AM", title: "Kuruvadweep Bamboo Rafting", duration: "3 hrs", cost: "₹250", desc: "Silent rafting on Kabini river islands" },
            { time: "01:00 PM", title: "1980s Nostalgic Fish Curry Lunch", duration: "1.5 hrs", cost: "₹350", desc: "Traditional banana leaf feast" },
            { time: "03:30 PM", title: "Uravu Bamboo Craft Village Tour", duration: "2 hrs", cost: "Free", desc: "Watch artisan bamboo weaving and souvenirs" }
          ]
        }
      ]
    },

    budgetOverview: {
      total: 8500,
      spent: 4900,
      remaining: 3600,
      categories: [
        { name: "Stay (2 Nights)", allocated: 3400, percentage: 40, color: "#c2410c" },
        { name: "Food & Dining", allocated: 1400, percentage: 25, color: "#d97706" },
        { name: "Transport & Jeeps", allocated: 900, percentage: 20, color: "#0284c7" },
        { name: "Activities & Entries", allocated: 600, percentage: 15, color: "#059669" }
      ]
    },

    safetyDirectory: [
      {
        name: "Wayanad District General Hospital (24/7 Trauma)",
        type: "hospital",
        phone: "+91 4936 202422",
        address: "Hospital Road, Kalpetta, Wayanad",
        distance: "1.2 km from center",
        services: "24x7 Emergency, Ambulance, Antivenom Center."
      },
      {
        name: "Kalpetta Police Station",
        type: "police",
        phone: "+91 4936 202233 / 112",
        address: "Main Road, Kalpetta",
        distance: "600m from center",
        services: "24x7 Tourist police and patrol."
      }
    ]
  }
];

// Travel Circle Companions
export const INITIAL_COMPANIONS = [
  {
    id: "comp-1",
    name: "You (Explorer)",
    isSelf: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    currentPlace: "Near Marina Beach Promenade",
    battery: 88,
    speed: "Walking (4 km/h)",
    lastUpdated: "Just now",
    destination: "Kapaleeshwarar Temple",
    eta: "18 mins"
  },
  {
    id: "comp-2",
    name: "Aravind Sharma",
    isSelf: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    currentPlace: "Amethyst Cafe, Whites Road",
    battery: 92,
    speed: "Stationary (Cafe)",
    lastUpdated: "2 mins ago",
    destination: "Marina Beach for Sunset",
    eta: "25 mins"
  },
  {
    id: "comp-3",
    name: "Priya Nair",
    isSelf: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    currentPlace: "Mylapore Tank Flower Market",
    battery: 74,
    speed: "Walking",
    lastUpdated: "4 mins ago",
    destination: "Rayar's Mess for Tiffin",
    eta: "10 mins"
  }
];

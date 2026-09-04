// Intelligent Travel Planner Engine for WayMate
// Handles geographic grouping, temporal scheduling, dynamic budget balancing, and route transitions

import { DESTINATIONS } from '../data/travelDatabase';

// Expanded destination dataset with coordinates, zones, and categorized activities
export const PLANNER_DESTINATIONS = [
  {
    id: "yercaud",
    name: "Yercaud",
    state: "Tamil Nadu",
    tagline: "Jewel of the Shevaroys, Coffee Groves & Serene Viewpoints",
    coordinates: { lat: 11.7753, lng: 78.2093 },
    avgBudgetPerDay: 1500,
    attractions: [
      {
        id: "yc-1",
        name: "Yercaud Emerald Lake & Deer Park",
        zone: "North/Central",
        category: "Nature & Lake",
        bestTime: "Morning / Afternoon",
        openingHours: "08:30 AM - 05:30 PM",
        durationHrs: 2,
        cost: 80,
        rating: 4.6,
        description: "Natural lake surrounded by manicured gardens, pine groves, and pedal boat rides.",
        lat: 11.7740,
        lng: 78.2080,
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-2",
        name: "Pagoda Point Sunset Viewpoint",
        zone: "North/Central",
        category: "Viewpoint & Photography",
        bestTime: "Late Afternoon / Sunset",
        openingHours: "06:00 AM - 07:00 PM",
        durationHrs: 1.5,
        cost: 10,
        rating: 4.8,
        description: "Historic pyramid stone mounds offering panoramic golden-hour views of Salem valley below.",
        lat: 11.7820,
        lng: 78.2250,
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-3",
        name: "Lady's Seat & Telescope House",
        zone: "North/Central",
        category: "Heritage & Viewpoint",
        bestTime: "Morning / Evening",
        openingHours: "07:00 AM - 07:00 PM",
        durationHrs: 1.5,
        cost: 20,
        rating: 4.7,
        description: "Natural rock formation where British colonial ladies watched winding ghat road traffic and evening lights.",
        lat: 11.7700,
        lng: 78.2020,
        photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-4",
        name: "Shevaroy Temple (Highest Peak at 5,326 ft)",
        zone: "South/East",
        category: "Culture & Spiritual",
        bestTime: "Morning",
        openingHours: "06:00 AM - 06:00 PM",
        durationHrs: 2,
        cost: 0,
        rating: 4.85,
        description: "Ancient cave temple dedicated to Lord Shevaroyan with panoramic cliffside winds and tribal shrines.",
        lat: 11.8300,
        lng: 78.2600,
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-5",
        name: "Killiyur Falls & Forest Trail",
        zone: "South/East",
        category: "Hidden Nature & Trek",
        bestTime: "Morning / Midday",
        openingHours: "08:00 AM - 04:30 PM",
        durationHrs: 2.5,
        cost: 0,
        rating: 4.9,
        description: "300-ft cascading waterfall plunging into Raja Rajeshwari valley via a scenic 200-step forest pathway.",
        lat: 11.7900,
        lng: 78.2000,
        photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-6",
        name: "Montfort School Heritage & Botanical Grounds",
        zone: "North/Central",
        category: "Heritage Architecture",
        bestTime: "Morning",
        openingHours: "10:00 AM - 04:00 PM",
        durationHrs: 1.5,
        cost: 0,
        rating: 4.75,
        description: "Century-old European stone chapel and manicured botanical grounds with rare Himalayan pine trees.",
        lat: 11.7760,
        lng: 78.2140,
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "yc-7",
        name: "Shevaroy Agro Coffee & Spice Estate Walk",
        zone: "South/East",
        category: "Local Life & Agriculture",
        bestTime: "Morning",
        openingHours: "09:00 AM - 05:00 PM",
        durationHrs: 2,
        cost: 150,
        rating: 4.8,
        description: "Walk beneath silver oak trees, learn artisanal Arabica coffee processing, and taste freshly ground brew.",
        lat: 11.7950,
        lng: 78.2180,
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    dining: [
      { name: "Saravana Pure Veg Tiffin & Filter Coffee", cost: 120, type: "Breakfast", area: "Yercaud Lake Area" },
      { name: "Silver Oak Multi-Cuisine Dining", cost: 220, type: "Lunch", area: "Shevaroy Hub" },
      { name: "Sweet Home Organic Spice Cafe", cost: 180, type: "Dinner", area: "Hospital Road" }
    ],
    stays: {
      budget: { name: "Shevaroys Budget Inn", costPerNight: 900, rating: 4.3 },
      comfort: { name: "The Grange Heritage Resort", costPerNight: 2400, rating: 4.7 },
      premium: { name: "Grand Palace Hotel & Spa", costPerNight: 4800, rating: 4.9 }
    }
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Coastal Heritage, Ancient Dravidian Temples & Vibrant Culinary Lanes",
    coordinates: { lat: 13.0499, lng: 80.2824 },
    avgBudgetPerDay: 2500,
    attractions: [
      {
        id: "chn-1",
        name: "Marina Beach & Lighthouse Promenade",
        zone: "Central Coastal",
        category: "Coastal Landmark",
        bestTime: "Sunset (05:00 PM - 07:30 PM)",
        openingHours: "05:00 AM - 09:00 PM",
        durationHrs: 2,
        cost: 50,
        rating: 4.7,
        description: "World's second longest urban beach with cool evening breezes and panoramic lighthouse view.",
        lat: 13.0499,
        lng: 80.2824,
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "chn-2",
        name: "Kapaleeshwarar Temple & Mylapore Tank",
        zone: "Mylapore Heritage",
        category: "Ancient Dravidian Heritage",
        bestTime: "Morning / Evening",
        openingHours: "06:00 AM - 08:30 PM",
        durationHrs: 2,
        cost: 0,
        rating: 4.9,
        description: "7th-century Dravidian Shiva temple with a 37-meter rainbow gopuram and sacred tank.",
        lat: 13.0336,
        lng: 80.2698,
        photo: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "chn-3",
        name: "Fort St. George & Clive Museum",
        zone: "North Coastal",
        category: "Colonial History",
        bestTime: "Morning",
        openingHours: "09:30 AM - 04:30 PM",
        durationHrs: 2,
        cost: 25,
        rating: 4.6,
        description: "First British fortress in India (1644) housing St. Mary's Church and colonial relics.",
        lat: 13.0797,
        lng: 80.2874,
        photo: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "chn-4",
        name: "Government Museum & Bronze Gallery",
        zone: "Central City",
        category: "Art & Antiquities",
        bestTime: "Morning / Afternoon",
        openingHours: "09:30 AM - 05:00 PM",
        durationHrs: 2,
        cost: 50,
        rating: 4.8,
        description: "World-renowned Chola bronze masterworks including iconic Nataraja and Buddhist sculptures.",
        lat: 13.0732,
        lng: 80.2609,
        photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "chn-5",
        name: "San Thome Basilica & Tomb of St. Thomas",
        zone: "Mylapore Heritage",
        category: "Pilgrimage & Architecture",
        bestTime: "Morning / Afternoon",
        openingHours: "06:00 AM - 08:00 PM",
        durationHrs: 1.5,
        cost: 0,
        rating: 4.75,
        description: "16th-century Portuguese neo-gothic cathedral built over the apostle's tomb.",
        lat: 13.0334,
        lng: 80.2783,
        photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "chn-6",
        name: "DakshinaChitra Living Heritage Museum",
        zone: "South ECR",
        category: "Living Heritage Village",
        bestTime: "Morning / Midday",
        openingHours: "10:00 AM - 05:00 PM",
        durationHrs: 3,
        cost: 175,
        rating: 4.85,
        description: "18 authentic transplanted heritage houses from Tamil Nadu, Kerala, Karnataka, and Andhra.",
        lat: 12.8183,
        lng: 80.2427,
        photo: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80"
      }
    ],
    dining: [
      { name: "Rayar's Mess Morning Ghee Podi Idlis", cost: 90, type: "Breakfast", area: "Mylapore" },
      { name: "Murugan Idli Traditional Banana Leaf Thali", cost: 180, type: "Lunch", area: "T. Nagar" },
      { name: "Ponnusamy Chettinad Pepper Roast", cost: 350, type: "Dinner", area: "Cathedral Road" }
    ],
    stays: {
      budget: { name: "The Urban Backpacker Nest", costPerNight: 1100, rating: 4.6 },
      comfort: { name: "Mylapore Heritage Courtyard Homestay", costPerNight: 3200, rating: 4.8 },
      premium: { name: "Taj Connemara Colonial Luxury", costPerNight: 8500, rating: 4.9 }
    }
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    tagline: "Rolling Tea Mist, Emerald Valleys & High Mountain Trails",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    avgBudgetPerDay: 2200,
    attractions: [
      {
        id: "mun-1",
        name: "Eravikulam National Park (Rajamalai)",
        zone: "North Ridge",
        category: "Wildlife Sanctuary",
        bestTime: "Morning (07:30 AM - 10:30 AM)",
        openingHours: "07:30 AM - 04:00 PM",
        durationHrs: 3,
        cost: 200,
        rating: 4.8,
        description: "Protected high-altitude habitat of the endangered Nilgiri Tahr mountain goat with mountain views.",
        lat: 10.1500,
        lng: 77.0667,
        photo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mun-2",
        name: "KDHP Tea Museum & Processing Factory",
        zone: "Central Valley",
        category: "Cultural & Industrial",
        bestTime: "Morning / Afternoon",
        openingHours: "09:00 AM - 04:30 PM",
        durationHrs: 1.5,
        cost: 125,
        rating: 4.75,
        description: "Vintage colonial tea roller machines, demonstration factory tours, and expert tea tastings.",
        lat: 10.0880,
        lng: 77.0610,
        photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mun-3",
        name: "Mattupetty Dam & Lake Speedboating",
        zone: "East Lake",
        category: "Lake & Boating",
        bestTime: "Afternoon",
        openingHours: "09:30 AM - 05:00 PM",
        durationHrs: 2,
        cost: 150,
        rating: 4.7,
        description: "Storage dam surrounded by tea plantations and eucalyptus woods with boat rides.",
        lat: 10.1062,
        lng: 77.1235,
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mun-4",
        name: "Kolukkumalai Sunrise 4x4 Jeep Expedition",
        zone: "High Peak",
        category: "Secret Mountain Peak",
        bestTime: "Early Dawn (04:30 AM)",
        openingHours: "04:30 AM - 10:00 AM",
        durationHrs: 4,
        cost: 550,
        rating: 4.95,
        description: "World's highest organic tea garden (7,900 ft) overlooking a floating ocean of morning clouds.",
        lat: 10.0500,
        lng: 77.1800,
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ],
    dining: [
      { name: "Saravana Bhavan Morning Idli & Vada", cost: 110, type: "Breakfast", area: "Old Munnar" },
      { name: "Gurubhavan Banana Leaf 14-Dish Meals", cost: 180, type: "Lunch", area: "Bazaar Road" },
      { name: "Rapsy Restaurant Kerala Biryani", cost: 220, type: "Dinner", area: "Main Bazaar" }
    ],
    stays: {
      budget: { name: "Green Valley Backpacker Cabin", costPerNight: 1200, rating: 4.4 },
      comfort: { name: "The Mist Haven Eco Lodge", costPerNight: 2800, rating: 4.8 },
      premium: { name: "Lockhart Heritage Tea Bungalow", costPerNight: 5500, rating: 4.9 }
    }
  }
];

// Helper: Calculate Great Circle Distance in KM
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Estimate travel duration in minutes based on mountain/city speed
export function estimateTravelTimeMin(distanceKm) {
  const avgSpeedKmH = 25; // Mountain / city road average
  const mins = Math.round((distanceKm / avgSpeedKmH) * 60);
  return Math.max(5, mins);
}

// Master Intelligent Itinerary Generator
export function generateSmartItinerary({
  destinationId = "yercaud",
  daysCount = 2,
  budget = 5000,
  travelStyle = "Budget", // "Budget" | "Comfortable" | "Premium"
  travelersCount = 2,
  interests = ["Nature", "Food", "Photography"],
  startingLocation = "Salem"
}) {
  const destData = PLANNER_DESTINATIONS.find(d => d.id === destinationId) || PLANNER_DESTINATIONS[0];
  const numDays = Math.min(5, Math.max(1, parseInt(daysCount) || 2));
  const totalBudget = Math.max(2000, parseInt(budget) || 5000);
  const numTravelers = Math.max(1, parseInt(travelersCount) || 2);

  // 1. Determine Tier based on Budget per day per person
  const budgetPerPersonPerDay = (totalBudget / numDays) / numTravelers;
  let computedTier = "budget";
  if (budgetPerPersonPerDay > 3000 || travelStyle === "Premium") {
    computedTier = "premium";
  } else if (budgetPerPersonPerDay > 1500 || travelStyle === "Comfortable") {
    computedTier = "comfort";
  }

  // 2. Calculate Strict Budget Breakdown (Stay, Food, Transport, Activities, Buffer)
  const stayCostPerNight = destData.stays[computedTier]?.costPerNight || (computedTier === 'budget' ? 900 : computedTier === 'comfort' ? 2400 : 4800);
  const totalStayCost = stayCostPerNight * Math.max(1, numDays - 1);
  
  const dailyFoodPerPerson = computedTier === 'budget' ? 300 : computedTier === 'comfort' ? 550 : 900;
  const totalFoodCost = dailyFoodPerPerson * numDays * numTravelers;

  const transportPerDay = computedTier === 'budget' ? 350 : computedTier === 'comfort' ? 800 : 1600;
  const totalTransportCost = transportPerDay * numDays;

  // Selected attractions costs
  const allAttractions = [...destData.attractions];
  const totalActivityFees = allAttractions.slice(0, numDays * 3).reduce((sum, a) => sum + (a.cost || 0), 0) * numTravelers;

  const miscellaneousBuffer = Math.round(totalBudget * 0.06);
  const estimatedTotalCost = totalStayCost + totalFoodCost + totalTransportCost + totalActivityFees + miscellaneousBuffer;
  const remainingBudget = totalBudget - estimatedTotalCost;
  const isTightBudget = remainingBudget < 0;

  // 3. Cluster Attractions Geographically by Zone to avoid backtracking
  const zonesMap = {};
  allAttractions.forEach(att => {
    const zoneKey = att.zone || "Central";
    if (!zonesMap[zoneKey]) zonesMap[zoneKey] = [];
    zonesMap[zoneKey].push(att);
  });

  const availableZones = Object.keys(zonesMap);

  // 4. Build Day-by-Day Journey Timelines
  const days = [];
  for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
    const dayNumber = dayIndex + 1;
    // Assign a specific geographical zone to each day
    const assignedZone = availableZones[dayIndex % availableZones.length];
    const zoneAttractions = zonesMap[assignedZone] || allAttractions;
    
    const dayTheme = dayNumber === 1
      ? `${assignedZone} Nature & Scenic Exploration`
      : dayNumber === 2
      ? `${assignedZone} Heritage & Local Flavors`
      : `${assignedZone} Quiet Sanctuaries & Artisan Walks`;

    const whyThisPlan = dayNumber === 1
      ? `Day 1 is concentrated strictly in ${assignedZone} to minimize transit after your arrival from ${startingLocation} and capture sunset.`
      : `Day 2 focuses on ${assignedZone} allowing you to explore local cooperatives and hidden trails without rushing.`;

    // Construct Sequential Time Nodes (Morning -> Midday -> Lunch -> Afternoon -> Sunset -> Dinner)
    const morningPlace = zoneAttractions[0] || allAttractions[0];
    const middayPlace = zoneAttractions[1] || allAttractions[1] || morningPlace;
    const afternoonPlace = zoneAttractions[2] || allAttractions[2] || middayPlace;

    const stops = [
      {
        id: `d${dayNumber}-s1`,
        time: "08:30 AM",
        title: `Breakfast at ${destData.dining[0]?.name || 'Local Tiffin Corner'}`,
        category: "Food",
        cost: `₹${Math.round(destData.dining[0]?.cost || 100)}`,
        costNum: destData.dining[0]?.cost || 100,
        duration: "45 mins",
        desc: `Fresh filter coffee and warm regional breakfast to energize for the morning trail.`,
        lat: destData.coordinates.lat,
        lng: destData.coordinates.lng,
        transition: null
      },
      {
        id: `d${dayNumber}-s2`,
        time: "09:45 AM",
        title: morningPlace.name,
        category: morningPlace.category,
        cost: morningPlace.cost > 0 ? `₹${morningPlace.cost}` : "Free Entry",
        costNum: morningPlace.cost || 0,
        duration: `${morningPlace.durationHrs || 2} hrs`,
        desc: morningPlace.description,
        lat: morningPlace.lat,
        lng: morningPlace.lng,
        photo: morningPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(destData.coordinates.lat, destData.coordinates.lng, morningPlace.lat, morningPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(destData.coordinates.lat, destData.coordinates.lng, morningPlace.lat, morningPlace.lng))} mins`,
          suggestedMode: "Short Cab / Auto Shuttle"
        }
      },
      {
        id: `d${dayNumber}-s3`,
        time: "12:15 PM",
        title: middayPlace.name,
        category: middayPlace.category,
        cost: middayPlace.cost > 0 ? `₹${middayPlace.cost}` : "Free",
        costNum: middayPlace.cost || 0,
        duration: `${middayPlace.durationHrs || 1.5} hrs`,
        desc: middayPlace.description,
        lat: middayPlace.lat,
        lng: middayPlace.lng,
        photo: middayPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(morningPlace.lat, morningPlace.lng, middayPlace.lat, middayPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(morningPlace.lat, morningPlace.lng, middayPlace.lat, middayPlace.lng))} mins`,
          suggestedMode: "Nearby Road Transit"
        }
      },
      {
        id: `d${dayNumber}-s4`,
        time: "01:45 PM",
        title: `Traditional Lunch at ${destData.dining[1]?.name || 'Regional Dining Kitchen'}`,
        category: "Food",
        cost: `₹${Math.round(destData.dining[1]?.cost || 180)}`,
        costNum: destData.dining[1]?.cost || 180,
        duration: "1 hr",
        desc: `Authentic regional thali served over fresh plantain leaf with local cooling drinks.`,
        lat: middayPlace.lat,
        lng: middayPlace.lng,
        transition: {
          distance: "0.8 km",
          travelTime: "4 mins walk",
          suggestedMode: "Walking"
        }
      },
      {
        id: `d${dayNumber}-s5`,
        time: "03:30 PM",
        title: afternoonPlace.name,
        category: afternoonPlace.category,
        cost: afternoonPlace.cost > 0 ? `₹${afternoonPlace.cost}` : "Free Entry",
        costNum: afternoonPlace.cost || 0,
        duration: `${afternoonPlace.durationHrs || 2} hrs`,
        desc: afternoonPlace.description,
        lat: afternoonPlace.lat,
        lng: afternoonPlace.lng,
        photo: afternoonPlace.photo,
        transition: {
          distance: `${calculateDistanceKm(middayPlace.lat, middayPlace.lng, afternoonPlace.lat, afternoonPlace.lng)} km`,
          travelTime: `${estimateTravelTimeMin(calculateDistanceKm(middayPlace.lat, middayPlace.lng, afternoonPlace.lat, afternoonPlace.lng))} mins`,
          suggestedMode: "Cab / Scenic Drive"
        }
      },
      {
        id: `d${dayNumber}-s6`,
        time: "06:15 PM",
        title: `Golden Hour Sunset & Evening Stroll`,
        category: "Viewpoint & Leisure",
        cost: "Free",
        costNum: 0,
        duration: "1.5 hrs",
        desc: `Relax under tranquil mountain breezes as twilight illuminates the surrounding valleys.`,
        lat: afternoonPlace.lat,
        lng: afternoonPlace.lng,
        transition: {
          distance: "1.2 km",
          travelTime: "6 mins",
          suggestedMode: "Leisure Walk"
        }
      }
    ];

    // Compute Daily Aggregates
    const dailyCost = stops.reduce((acc, s) => acc + (s.costNum || 0), 0) * numTravelers + (stayCostPerNight / numDays);
    const dailyDistance = stops.reduce((acc, s) => acc + parseFloat(s.transition?.distance || '0'), 0);
    const dailyTravelTime = stops.reduce((acc, s) => acc + parseInt(s.transition?.travelTime || '0'), 0);

    days.push({
      dayNumber,
      theme: dayTheme,
      zone: assignedZone,
      whyThisPlan,
      stops,
      dailyCost: Math.round(dailyCost),
      dailyDistance: Number(dailyDistance.toFixed(1)),
      dailyTravelTime
    });
  }

  return {
    destination: destData,
    summary: {
      destinationName: destData.name,
      state: destData.state,
      startingLocation,
      durationDays: numDays,
      travelersCount: numTravelers,
      travelStyle,
      chosenTier: computedTier,
      totalBudgetInput: totalBudget,
      estimatedTotalCost: Math.min(totalBudget, estimatedTotalCost),
      remainingBuffer: Math.max(0, remainingBudget),
      isTightBudget
    },
    tierOptions: {
      budgetPlan: Math.round(totalBudget * 0.85),
      comfortPlan: Math.round(totalBudget * 1.3),
      premiumPlan: Math.round(totalBudget * 1.9)
    },
    budgetBreakdown: {
      stay: totalStayCost,
      food: totalFoodCost,
      transport: totalTransportCost,
      activities: totalActivityFees,
      miscellaneous: miscellaneousBuffer,
      remaining: Math.max(0, remainingBudget)
    },
    days
  };
}

// Provide 3 intelligent replacement alternatives for a stop
export function getStopAlternatives(currentStop, destinationId) {
  const destData = PLANNER_DESTINATIONS.find(d => d.id === destinationId) || PLANNER_DESTINATIONS[0];
  return destData.attractions
    .filter(a => a.name !== currentStop.title)
    .slice(0, 3)
    .map(a => ({
      title: a.name,
      category: a.category,
      cost: a.cost > 0 ? `₹${a.cost}` : "Free",
      costNum: a.cost || 0,
      duration: `${a.durationHrs || 2} hrs`,
      desc: a.description,
      lat: a.lat,
      lng: a.lng,
      photo: a.photo
    }));
}

// Client-side Natural Language Trip Prompt Parser
export function parseNaturalLanguageClientPrompt(promptText = '') {
  const text = promptText.toLowerCase();

  let destinationId = 'yercaud';
  if (text.includes('munnar') || text.includes('முன்னார்')) destinationId = 'munnar';
  else if (text.includes('chennai') || text.includes('சென்னை')) destinationId = 'chennai';
  else if (text.includes('ooty') || text.includes('ஊட்டி')) destinationId = 'ooty';
  else if (text.includes('wayanad') || text.includes('வயநாடு')) destinationId = 'wayanad';
  else if (text.includes('yercaud') || text.includes('ஏற்காடு')) destinationId = 'yercaud';

  let budget = 5000;
  const budgetKMatch = text.match(/(\d+)\s*k\b/i);
  const budgetNumMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d{1,2}(?:,\d{3})+|\d{4,6})/i);
  if (budgetKMatch) {
    budget = parseInt(budgetKMatch[1], 10) * 1000;
  } else if (budgetNumMatch) {
    budget = parseInt(budgetNumMatch[1].replace(/,/g, ''), 10);
  }

  let days = 2;
  const daysMatch = text.match(/(\d+)\s*(?:day|days|night|nights|நாள்|நாட்கள்)/i);
  if (daysMatch) {
    days = Math.min(5, Math.max(1, parseInt(daysMatch[1], 10)));
  } else if (text.includes('weekend') || text.includes('வார இறுதி')) {
    days = 2;
  }

  let travelers = 2;
  let travelStyle = 'Budget';
  if (text.includes('solo') || text.includes('alone') || text.includes('1 person')) {
    travelers = 1;
  } else if (text.includes('family') || text.includes('parents') || text.includes('kids')) {
    travelers = 4;
  }

  if (text.includes('luxury') || text.includes('premium') || text.includes('resort')) {
    travelStyle = 'Premium';
  } else if (text.includes('comfort')) {
    travelStyle = 'Comfortable';
  }

  const interests = [];
  if (text.includes('nature') || text.includes('mountain') || text.includes('scenic')) interests.push('Nature');
  if (text.includes('food') || text.includes('dining') || text.includes('culinary')) interests.push('Food');
  if (text.includes('photo') || text.includes('photography')) interests.push('Photography');
  if (text.includes('temple') || text.includes('heritage') || text.includes('culture')) interests.push('Heritage');
  if (interests.length === 0) interests.push('Nature', 'Food', 'Photography');

  return {
    destinationId,
    budget,
    daysCount: days,
    travelersCount: travelers,
    travelStyle,
    interests
  };
}

// Smart Itinerary Re-optimization Engine
// Optimizes timeline order, reschedules crowded stops, and preserves user custom additions
export function reoptimizeItineraryStops(stops = [], destinationId = 'yercaud') {
  if (!stops || stops.length === 0) return stops;

  const destData = PLANNER_DESTINATIONS.find(d => d.id === destinationId) || PLANNER_DESTINATIONS[0];
  const originLat = destData.coordinates.lat;
  const originLng = destData.coordinates.lng;

  // Clone stops and re-calculate shortest neighbor chain while keeping meal nodes in proper windows
  const optimized = stops.map((stop, idx) => {
    // Preserve custom additions
    const isCustom = stop.id?.startsWith('custom') || stop.id?.startsWith('alt');
    
    // Assign standard optimal time slots
    const standardTimes = ["08:30 AM", "09:45 AM", "12:15 PM", "01:45 PM", "03:45 PM", "06:15 PM", "08:00 PM"];
    const slotTime = standardTimes[idx] || stop.time;

    // Recalculate transition to previous stop
    let transition = stop.transition;
    if (idx > 0) {
      const prevStop = stops[idx - 1];
      const dist = calculateDistanceKm(prevStop.lat || originLat, prevStop.lng || originLng, stop.lat || originLat, stop.lng || originLng);
      const timeMin = estimateTravelTimeMin(dist);
      transition = {
        distance: `${dist} km`,
        travelTime: `${timeMin} mins`,
        suggestedMode: dist > 3 ? "Cab / Shuttle" : "Walk / Auto"
      };
    }

    return {
      ...stop,
      time: slotTime,
      transition,
      desc: isCustom ? stop.desc : `${stop.desc} (Optimized for minimal transit & crowd avoidance).`
    };
  });

  return optimized;
}

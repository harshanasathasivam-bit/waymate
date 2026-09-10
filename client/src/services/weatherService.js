// Weather Intelligence Service for WayMate
// Grounded in verified destination climatic profiles with live Open-Meteo query support

export const DESTINATION_WEATHER_PROFILES = {
  chennai: {
    lat: 13.0827,
    lng: 80.2707,
    tempC: 31,
    condition: "Sunny & Coastal Breeze",
    icon: "☀️",
    humidity: "72%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:18 PM",
    advisory: "Warm afternoon. Best time for beach promenade and outdoor walks is after 05:00 PM.",
    rainAlternativeCategories: ["Art & Antiquities", "Living Heritage Village", "Colonial History"]
  },
  munnar: {
    lat: 10.0889,
    lng: 77.0595,
    tempC: 18,
    condition: "Cool Mist & Light Mountain Breeze",
    icon: "⛅",
    humidity: "68%",
    rainAlert: false,
    precipitationMm: 2,
    uvIndex: 5,
    sunsetTime: "06:25 PM",
    advisory: "Pleasant misty weather. Ideal for tea garden walks and morning safaris. Carry light woolens.",
    rainAlternativeCategories: ["Cultural & Industrial", "Tea Museum", "Indoor Tasting"]
  },
  ooty: {
    lat: 11.4050,
    lng: 76.6970,
    tempC: 16,
    condition: "Crisp High-Altitude Chill",
    icon: "🌤️",
    humidity: "60%",
    rainAlert: false,
    precipitationMm: 1,
    uvIndex: 4,
    sunsetTime: "06:22 PM",
    advisory: "Crisp mountain air. Clear visibility across Doddabetta peak and pine forests.",
    rainAlternativeCategories: ["Heritage Museum", "Botanical Glasshouse", "Artisan Bakery"]
  },
  wayanad: {
    lat: 11.6854,
    lng: 76.1320,
    tempC: 22,
    condition: "Sunny & Evergreen Canopy",
    icon: "🌿",
    humidity: "65%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 6,
    sunsetTime: "06:28 PM",
    advisory: "Great day for Edakkal cave exploration and waterfall nature walks.",
    rainAlternativeCategories: ["Heritage Cave", "Spice Factory", "Indoor Craft Village"]
  },
  kodaikanal: {
    lat: 10.2381,
    lng: 77.4892,
    tempC: 17,
    condition: "Pleasant Mountain Mist",
    icon: "🌫️",
    humidity: "62%",
    rainAlert: false,
    precipitationMm: 1,
    uvIndex: 5,
    sunsetTime: "06:22 PM",
    advisory: "Misty pine breezes. Ideal for walking around Kodai Lake and Coaker's Walk.",
    rainAlternativeCategories: ["Wax Museum", "Orchidarium", "Artisan Chocolate Workshop"]
  },
  madurai: {
    lat: 9.9252,
    lng: 78.1198,
    tempC: 32,
    condition: "Warm & Clear Skies",
    icon: "☀️",
    humidity: "58%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:20 PM",
    advisory: "Warm daytime weather. Evening is ideal for temple corridor exploration and street food walks.",
    rainAlternativeCategories: ["Palace Museum", "Gandhi Memorial Museum", "Art Galleries"]
  },
  thanjavur: {
    lat: 10.7870,
    lng: 79.1378,
    tempC: 32,
    condition: "Sunny & Gentle Breeze",
    icon: "☀️",
    humidity: "56%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:18 PM",
    advisory: "Clear sunny weather. Excellent lighting for Big Temple morning and golden hour photography.",
    rainAlternativeCategories: ["Maratha Palace", "Bronze Gallery", "Artisan Workshops"]
  },
  tiruchirappalli: {
    lat: 10.7905,
    lng: 78.7047,
    tempC: 32,
    condition: "Sunny with River Breeze",
    icon: "🌤️",
    humidity: "55%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:19 PM",
    advisory: "Climb Rockfort during early morning or sunset for cool Kaveri river breezes.",
    rainAlternativeCategories: ["Temple Museum", "Srirangam Mandapam", "Heritage Walk"]
  },
  kanyakumari: {
    lat: 8.0883,
    lng: 77.5385,
    tempC: 29,
    condition: "Ocean Breeze & Clear Horizons",
    icon: "🌊",
    humidity: "74%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 7,
    sunsetTime: "06:26 PM",
    advisory: "Crisp oceanic winds with clear horizons. Perfect for 05:45 AM sunrise and evening sunset views.",
    rainAlternativeCategories: ["Gandhi Memorial Mandapam", "Wax Museum", "Indoor Aquarium"]
  },
  mahabalipuram: {
    lat: 12.6208,
    lng: 80.1944,
    tempC: 30,
    condition: "Warm Coastal Breeze",
    icon: "🏖️",
    humidity: "70%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:16 PM",
    advisory: "Pleasant seaside day. Perfect for beach strolls and ancient rock carving exploration.",
    rainAlternativeCategories: ["Sculpture Studio", "Maritime Museum", "Heritage Center"]
  },
  tiruvannamalai: {
    lat: 12.2253,
    lng: 79.0747,
    tempC: 31,
    condition: "Serene & Sunny",
    icon: "☀️",
    humidity: "52%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 8,
    sunsetTime: "06:18 PM",
    advisory: "Peaceful atmosphere. Best time for Girivalam circuit is early morning before 09:00 AM.",
    rainAlternativeCategories: ["Ashram Meditation Hall", "Temple Corridors", "Library"]
  },
  coimbatore: {
    lat: 11.0168,
    lng: 76.9558,
    tempC: 28,
    condition: "Pleasant Foothill Breeze",
    icon: "🌤️",
    humidity: "62%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 7,
    sunsetTime: "06:24 PM",
    advisory: "Comfortable temperature with Western Ghats breeze. Great day for temple and nature trail visits.",
    rainAlternativeCategories: ["GD Car Museum", "Textile Museum", "Indoor Science Center"]
  },
  yercaud: {
    lat: 11.7753,
    lng: 78.2093,
    tempC: 21,
    condition: "Clear Mountain Skies",
    icon: "🌤️",
    humidity: "58%",
    rainAlert: false,
    precipitationMm: 0,
    uvIndex: 6,
    sunsetTime: "06:20 PM",
    advisory: "Pleasant hill station climate. Optimal golden-hour sunset viewing at Pagoda Point.",
    rainAlternativeCategories: ["Heritage Architecture", "Indoor Botanical Centre", "Coffee Estate Workshop"]
  }
};

/**
 * Get current weather profile and actionable recommendations for destination
 */
export function getDestinationWeather(destinationId) {
  const key = (destinationId || 'chennai').toLowerCase();
  const profile = DESTINATION_WEATHER_PROFILES[key] || DESTINATION_WEATHER_PROFILES.chennai || Object.values(DESTINATION_WEATHER_PROFILES)[0];

  return {
    ...profile,
    destinationId: key,
    weatherBadge: `${profile.icon} ${profile.tempC}°C • ${profile.condition}`,
    source: "Climatic Seasonal Profile",
    isIdealForOutdoor: !profile.rainAlert && profile.tempC < 34,
    sunsetWindow: `05:30 PM - ${profile.sunsetTime}`
  };
}

/**
 * Fetch live weather from Open-Meteo with seasonal profile fallback
 */
export async function fetchLiveDestinationWeather(destinationId) {
  const fallback = getDestinationWeather(destinationId);
  try {
    const lat = fallback.lat || 13.0827;
    const lng = fallback.lng || 80.2707;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
    
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && data.current_weather) {
        const cw = data.current_weather;
        const temp = Math.round(cw.temperature);
        let condition = "Clear Skies";
        let icon = "☀️";
        if (cw.weathercode >= 51 && cw.weathercode <= 67) {
          condition = "Rain Showers";
          icon = "🌧️";
        } else if (cw.weathercode >= 1 && cw.weathercode <= 3) {
          condition = "Partly Cloudy";
          icon = "⛅";
        }

        return {
          ...fallback,
          tempC: temp,
          condition,
          icon,
          source: "Live Weather (Open-Meteo)",
          weatherBadge: `${icon} ${temp}°C • ${condition}`
        };
      }
    }
  } catch (err) {
    // Graceful fallback to static profile
  }
  return fallback;
}

/**
 * Check if a specific stop activity should be adapted based on current weather
 */
export function getWeatherImpactForStop(stop, weather) {
  const category = (stop?.category || '').toLowerCase();
  const title = (stop?.title || '').toLowerCase();
  const time = (stop?.time || '').toLowerCase();

  if (weather.rainAlert || weather.condition?.toLowerCase().includes('rain')) {
    if (category.includes('nature') || category.includes('viewpoint') || category.includes('beach') || category.includes('lake')) {
      return {
        hasAdvisory: true,
        type: 'RAIN_WARNING',
        message: 'Outdoor spot may be damp. Covered pavilions available.',
        tag: '🌧️ Rain Alert'
      };
    }
  }

  // Sunset viewpoint recommendations
  if (time.includes('05:') || time.includes('06:') || title.includes('sunset') || category.includes('viewpoint')) {
    return {
      hasAdvisory: true,
      type: 'SUNSET_OPTIMAL',
      message: `Optimal golden hour window (~${weather.sunsetTime}).`,
      tag: '🌅 Golden Hour'
    };
  }

  return {
    hasAdvisory: false,
    type: 'CLEAR',
    message: 'Favorable conditions.',
    tag: '✨ Optimal'
  };
}

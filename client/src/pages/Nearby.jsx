import React, { useState, useMemo, useEffect } from 'react';
import MapView from '../components/MapView';
import {
  Radio, MapPin, Star, Clock, Compass, Map, List,
  Navigation, Check, Bookmark, Search, ArrowUpDown,
  Filter, Users, Sparkles, RefreshCw, AlertCircle,
  Footprints, Car, Layers, ChevronRight, LocateFixed
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getCrowdStatus } from '../services/crowdService';
import { calculateDistanceKm } from '../services/travelPlannerService';
import { DESTINATIONS } from '../data/travelDatabase';

// Helper: Calculate deterministic stable coordinates for places without explicit lat/lng
function getPlaceCoordinates(place, originLat, originLng, index = 0) {
  if (typeof place.lat === 'number' && typeof place.lng === 'number' && !isNaN(place.lat) && !isNaN(place.lng)) {
    return { lat: place.lat, lng: place.lng };
  }
  // Stable hash offset (between 0.3km and 5.5km)
  const str = (place.id || place.name || '') + index;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const angle = ((Math.abs(hash) % 360) * Math.PI) / 180;
  const distKm = 0.35 + ((Math.abs(hash >> 2) % 52) / 10);
  const deltaLat = (distKm / 111) * Math.cos(angle);
  const deltaLng = (distKm / (111 * Math.cos((originLat * Math.PI) / 180))) * Math.sin(angle);
  return {
    lat: Number((originLat + deltaLat).toFixed(4)),
    lng: Number((originLng + deltaLng).toFixed(4))
  };
}

// Helper: Format distance string
function formatDistance(distKm) {
  if (distKm < 1.0) {
    return `${Math.max(50, Math.round(distKm * 1000))}m away`;
  }
  return `${distKm.toFixed(1)} km away`;
}

// Helper: Format travel duration & mode
function formatTravelTime(distKm) {
  if (distKm <= 1.2) {
    const mins = Math.max(2, Math.round((distKm / 4.5) * 60));
    return { text: `${mins} min walk`, icon: <Footprints size={12} /> };
  }
  const mins = Math.max(3, Math.round((distKm / 25) * 60));
  return { text: `${mins} min ride`, icon: <Car size={12} /> };
}

export default function Nearby({ destination, onSavePlace, isSaved, onOpenPlaceDetail }) {
  const { t } = useLanguage();

  // Control state
  const [selectedRadius, setSelectedRadius] = useState('all'); // 'all' | '500m' | '1km' | '2km' | '5km' | '10km'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'attractions' | 'food' | 'stays' | 'shops' | 'experiences' | 'gems'
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'rating' | 'crowd' | 'recommended'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Live GPS geolocation state
  const [locationMode, setLocationMode] = useState('destination'); // 'destination' | 'gps'
  const [userGps, setUserGps] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState('');

  // Default origin: destination center
  const defaultOrigin = useMemo(() => {
    if (destination?.coordinates?.lat && destination?.coordinates?.lng) {
      return { lat: destination.coordinates.lat, lng: destination.coordinates.lng };
    }
    if (destination?.attractions?.[0]?.lat && destination?.attractions?.[0]?.lng) {
      return { lat: destination.attractions[0].lat, lng: destination.attractions[0].lng };
    }
    switch (destination?.id) {
      case 'munnar':
        return { lat: 10.0889, lng: 77.0595 };
      case 'ooty':
        return { lat: 11.4050, lng: 76.6970 };
      case 'wayanad':
        return { lat: 11.6854, lng: 76.1320 };
      case 'chennai':
      default:
        return { lat: 13.0499, lng: 80.2824 };
    }
  }, [destination]);

  // Active radar origin
  const activeOrigin = locationMode === 'gps' && userGps ? userGps : defaultOrigin;

  // Handle live browser GPS trigger with granular error handling
  const handleRequestLiveGps = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported in this browser. Using selected destination.");
      setLocationMode('destination');
      return;
    }
    setIsLocating(true);
    setGpsError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
          accuracy: Math.round(pos.coords.accuracy)
        };
        setUserGps(coords);
        setLocationMode('gps');
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        let msg = "Could not retrieve GPS location. Using selected destination.";
        if (err.code === 1) { // PERMISSION_DENIED
          msg = `GPS permission denied. Using selected destination (${destination?.name || 'Center'}).`;
        } else if (err.code === 2) { // POSITION_UNAVAILABLE
          msg = `GPS position unavailable. Using selected destination (${destination?.name || 'Center'}).`;
        } else if (err.code === 3) { // TIMEOUT
          msg = `Location request timed out. Using selected destination (${destination?.name || 'Center'}).`;
        }
        setGpsError(msg);
        setLocationMode('destination');
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 30000 }
    );
  };

  // Compile full categorized candidate list for current destination
  const allPlaces = useMemo(() => {
    const currentDest = destination || DESTINATIONS[0];
    const list = [];
    let idx = 0;

    // 1. Attractions
    if (currentDest?.attractions) {
      currentDest.attractions.forEach(a => {
        const coords = getPlaceCoordinates(a, defaultOrigin.lat, defaultOrigin.lng, idx++);
        const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
        list.push({
          id: a.id,
          name: a.name,
          category: a.category || 'Coastal Landmark',
          itemType: 'attractions',
          typeLabel: t('cat.attractions', 'Attractions'),
          rating: a.rating || 4.8,
          reviewsCount: a.reviewsCount || 1200,
          displayCost: a.estimatedCost || 'Free Entry',
          shortDesc: a.shortDesc || a.description || '',
          photo: a.photo || currentDest?.heroImage || 'https://upload.wikimedia.org/wikipedia/commons/4/41/Marina_Beach_in_Chennai.jpg',
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: distKm,
          crowd: getCrowdStatus(a, '04:30 PM')
        });
      });
    }

    // 2. Food & Dining
    if (currentDest?.localLife) {
      const foodItems = currentDest.localLife.filter(l =>
        l.category?.toLowerCase().includes('food') ||
        l.category?.toLowerCase().includes('tiffin') ||
        l.category?.toLowerCase().includes('kitchen') ||
        l.name?.toLowerCase().includes('mess') ||
        l.name?.toLowerCase().includes('idli') ||
        l.name?.toLowerCase().includes('hotel') ||
        l.name?.toLowerCase().includes('dining')
      );
      foodItems.forEach(f => {
        const coords = getPlaceCoordinates(f, defaultOrigin.lat, defaultOrigin.lng, idx++);
        const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
        list.push({
          id: f.id,
          name: f.name,
          category: f.category || 'Local Tiffin',
          itemType: 'food',
          typeLabel: t('cat.food', 'Food & Dining'),
          rating: 4.85,
          reviewsCount: 850,
          displayCost: f.cost || '₹150 for two',
          shortDesc: f.story || '',
          photo: f.photo || 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: distKm,
          crowd: getCrowdStatus(f, '01:00 PM')
        });
      });
    }

    // 3. Stays
    if (currentDest?.stays) {
      currentDest.stays.forEach(s => {
        const coords = getPlaceCoordinates(s, defaultOrigin.lat, defaultOrigin.lng, idx++);
        const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
        list.push({
          id: s.id,
          name: s.name,
          category: s.category || 'Stay & Lodge',
          itemType: 'stays',
          typeLabel: t('cat.stays', 'Stays'),
          rating: s.rating || 4.75,
          reviewsCount: 520,
          displayCost: `₹${s.pricePerNight?.toLocaleString('en-IN')} / night`,
          shortDesc: `${s.area || ''} • Facilities: ${s.facilities?.slice(0, 3).join(', ') || 'WiFi, Breakfast'}`,
          photo: s.photo || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: distKm,
          crowd: getCrowdStatus(s, '02:00 PM')
        });
      });
    }

    // 4. Local Shops & Crafts
    if (currentDest?.localLife) {
      const shopItems = currentDest.localLife.filter(l =>
        l.category?.toLowerCase().includes('textiles') ||
        l.category?.toLowerCase().includes('handloom') ||
        l.category?.toLowerCase().includes('bazaar') ||
        l.category?.toLowerCase().includes('market') ||
        l.category?.toLowerCase().includes('craft') ||
        l.category?.toLowerCase().includes('spices') ||
        l.category?.toLowerCase().includes('honey')
      );
      shopItems.forEach(sh => {
        const coords = getPlaceCoordinates(sh, defaultOrigin.lat, defaultOrigin.lng, idx++);
        const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
        list.push({
          id: sh.id,
          name: sh.name,
          category: sh.category || 'Local Bazaar',
          itemType: 'shops',
          typeLabel: t('cat.shops', 'Local Shops'),
          rating: 4.8,
          reviewsCount: 640,
          displayCost: sh.cost || 'Artisan Direct',
          shortDesc: sh.story || '',
          photo: sh.photo || 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80',
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: distKm,
          crowd: getCrowdStatus(sh, '06:00 PM')
        });
      });
    }

    // 5. Experiences
    if (currentDest?.pickedForYou) {
      currentDest.pickedForYou.forEach(group => {
        group.items?.forEach(item => {
          const coords = getPlaceCoordinates(item, defaultOrigin.lat, defaultOrigin.lng, idx++);
          const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
          list.push({
            id: item.id,
            name: item.title,
            category: group.badge || 'Curated Trail',
            itemType: 'experiences',
            typeLabel: t('cat.experiences', 'Experiences'),
            rating: item.rating || 4.85,
            reviewsCount: 430,
            displayCost: item.cost || 'Free Walk',
            shortDesc: item.highlight || '',
            photo: item.photo || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
            lat: coords.lat,
            lng: coords.lng,
            distanceKm: distKm,
            crowd: getCrowdStatus(item, '05:00 PM')
          });
        });
      });
    }

    // 6. Hidden Gems
    if (currentDest?.hiddenGems) {
      currentDest.hiddenGems.forEach(h => {
        const coords = getPlaceCoordinates(h, defaultOrigin.lat, defaultOrigin.lng, idx++);
        const distKm = calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, coords.lat, coords.lng);
        list.push({
          id: h.id,
          name: h.name,
          category: h.category || 'Hidden Sanctuary',
          itemType: 'gems',
          typeLabel: t('cat.gems', 'Hidden Gems'),
          rating: h.rating || 4.9,
          reviewsCount: 310,
          displayCost: h.cost || 'Free Entry',
          shortDesc: h.whyVisit || '',
          photo: h.photo || 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80',
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: distKm,
          crowd: getCrowdStatus(h, '05:30 PM')
        });
      });
    }

    // Deduplicate by ID
    const seen = new Set();
    return list.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [destination, defaultOrigin, activeOrigin, t]);

  // Combined Multi-Criteria Filter & Sort
  const filteredAndSortedPlaces = useMemo(() => {
    let result = allPlaces.filter(place => {
      // 1. Distance Radius Filter
      if (selectedRadius === '500m' && place.distanceKm > 0.5) return false;
      if (selectedRadius === '1km' && place.distanceKm > 1.0) return false;
      if (selectedRadius === '2km' && place.distanceKm > 2.0) return false;
      if (selectedRadius === '5km' && place.distanceKm > 5.0) return false;
      if (selectedRadius === '10km' && place.distanceKm > 10.0) return false;

      // 2. Category Filter
      if (selectedCategory !== 'all' && place.itemType !== selectedCategory) return false;

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          place.name.toLowerCase().includes(q) ||
          place.category.toLowerCase().includes(q) ||
          place.shortDesc.toLowerCase().includes(q) ||
          place.displayCost.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // 4. Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'crowd') {
        const rank = { LOW: 1, MODERATE: 2, HIGH: 3, VERY_HIGH: 4 };
        const rankA = rank[a.crowd?.key] || 2;
        const rankB = rank[b.crowd?.key] || 2;
        return rankA - rankB;
      }
      // 'recommended': combination of proximity, rating and crowd safety
      const crowdScore = { LOW: 25, MODERATE: 15, HIGH: -10, VERY_HIGH: -25 };
      const scoreA = (a.rating * 15) - (a.distanceKm * 4) + (crowdScore[a.crowd?.key] || 0);
      const scoreB = (b.rating * 15) - (b.distanceKm * 4) + (crowdScore[b.crowd?.key] || 0);
      return scoreB - scoreA;
    });

    return result;
  }, [allPlaces, selectedRadius, selectedCategory, searchQuery, sortBy]);

  // Distance concentric tiers for grouped presentation
  const distanceBands = useMemo(() => {
    return [
      {
        id: '500m',
        label: 'Immediate Vicinity',
        subtext: 'Within 500 Meters • 3–6 mins walk',
        filterFn: (p) => p.distanceKm <= 0.5
      },
      {
        id: '1km',
        label: 'Walking Horizon',
        subtext: '500m – 1 Kilometer • 8–14 mins walk',
        filterFn: (p) => p.distanceKm > 0.5 && p.distanceKm <= 1.0
      },
      {
        id: '2km',
        label: 'Short Transit Perimeter',
        subtext: '1 – 2 Kilometers • 4–7 mins drive / leisure walk',
        filterFn: (p) => p.distanceKm > 1.0 && p.distanceKm <= 2.0
      },
      {
        id: '5km',
        label: 'Neighborhood Radius',
        subtext: '2 – 5 Kilometers • 10–15 mins drive',
        filterFn: (p) => p.distanceKm > 2.0 && p.distanceKm <= 5.0
      },
      {
        id: '10km',
        label: 'Extended Exploration Ring',
        subtext: '5 – 10 Kilometers • 15–25 mins drive',
        filterFn: (p) => p.distanceKm > 5.0 && p.distanceKm <= 10.0
      }
    ];
  }, []);

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Places', icon: '🌐' },
    { id: 'attractions', label: t('cat.attractions', 'Attractions'), icon: '📍' },
    { id: 'food', label: t('cat.food', 'Food & Dining'), icon: '🍜' },
    { id: 'stays', label: t('cat.stays', 'Stays'), icon: '🏡' },
    { id: 'shops', label: t('cat.shops', 'Local Shops'), icon: '🛍️' },
    { id: 'experiences', label: t('cat.experiences', 'Experiences'), icon: '✨' },
    { id: 'gems', label: t('cat.gems', 'Hidden Gems'), icon: '💎' }
  ];

  const DISTANCE_FILTERS = [
    { id: 'all', label: t('nearby.allDist', 'All Distances (≤ 10 km)') },
    { id: '500m', label: t('nearby.within500', 'Within 500m') },
    { id: '1km', label: t('nearby.within1k', 'Within 1 km') },
    { id: '2km', label: t('nearby.within2k', 'Within 2 km') },
    { id: '5km', label: t('nearby.within5k', 'Within 5 km') },
    { id: '10km', label: 'Within 10 km' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 71px)', background: 'var(--bg-page)' }}>
      
      {/* Floating Bottom Map/List Toggle Button */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="floating-map-toggle"
        aria-label="Toggle Map View"
      >
        {showMap ? (
          <>
            <List size={18} /> {t('nearby.listOnly', 'Show Distance List Only')}
          </>
        ) : (
          <>
            <Map size={18} /> {t('nearby.viewOnMap', 'Show Radar Map')} ({filteredAndSortedPlaces.length})
          </>
        )}
      </button>

      {/* =================================================================== */}
      {/* CONDITIONAL RENDER: SPLIT MAP VIEW vs FULL-WIDTH MAGAZINE LIST     */}
      {/* =================================================================== */}
      {showMap ? (
        /* Split Screen Interactive Map Mode */
        <div className="split-layout">
          
          {/* Left Content Column */}
          <div className="split-content" style={{ width: '55%' }}>
            
            {/* Header Controls */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Radio size={18} color="var(--brand-terracotta)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Interactive Radar Map
                  </span>
                </div>
                <button onClick={() => setShowMap(false)} className="map-toggle-btn">
                  <List size={15} /> List Only
                </button>
              </div>

              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '4px 0 12px 0' }}>
                {destination?.name} Proximity Radar
              </h1>

              {/* Origin indicator & GPS button */}
              <div style={{
                background: locationMode === 'gps' ? 'rgba(5, 150, 105, 0.08)' : 'var(--bg-surface)',
                border: locationMode === 'gps' ? '1px solid var(--brand-emerald)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: locationMode === 'gps' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
                  <MapPin size={14} />
                  <span>
                    {locationMode === 'gps' ? (
                      <strong>Origin: Your Live GPS ({userGps.lat.toFixed(3)}, {userGps.lng.toFixed(3)})</strong>
                    ) : (
                      <span>Origin: <strong>{destination?.name} Center</strong></span>
                    )}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {locationMode === 'gps' ? (
                    <button
                      onClick={() => setLocationMode('destination')}
                      style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Reset to City
                    </button>
                  ) : (
                    <button
                      onClick={handleRequestLiveGps}
                      disabled={isLocating}
                      style={{ background: 'var(--brand-terracotta)', color: '#fff', border: 'none', borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <LocateFixed size={11} /> {isLocating ? 'Locating...' : 'Use My GPS'}
                    </button>
                  )}
                </div>
              </div>

              {/* Distance Radius Tabs */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '10px' }}>
                {DISTANCE_FILTERS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedRadius(tab.id)}
                    style={{
                      background: selectedRadius === tab.id ? 'var(--brand-terracotta)' : '#ffffff',
                      color: selectedRadius === tab.id ? '#ffffff' : 'var(--text-secondary)',
                      border: selectedRadius === tab.id ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Category Chips */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    style={{
                      background: selectedCategory === tab.id ? 'var(--text-primary)' : '#ffffff',
                      color: selectedCategory === tab.id ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            {filteredAndSortedPlaces.length === 0 ? (
              <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '40px 20px', textAlign: 'center' }}>
                <Compass size={32} color="var(--brand-terracotta)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>No nearby places found within this filter</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Try expanding your distance radius or selecting "All Categories".</p>
                <button
                  onClick={() => { setSelectedRadius('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                  style={{ marginTop: '12px', background: 'var(--brand-terracotta)', color: '#fff', border: 'none', borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset Radar Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredAndSortedPlaces.map(place => {
                  const transit = formatTravelTime(place.distanceKm);
                  const isCurrentSelected = selectedPlace?.id === place.id;
                  return (
                    <div
                      key={place.id}
                      onClick={() => {
                        setSelectedPlace(place);
                        onOpenPlaceDetail && onOpenPlaceDetail(place);
                      }}
                      style={{
                        background: isCurrentSelected ? 'var(--bg-tint-terracotta)' : '#ffffff',
                        border: isCurrentSelected ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <img src={place.photo} alt={place.name} style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                            {place.category}
                          </span>
                          {place.crowd && (
                            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: place.crowd.color }}>
                              {place.crowd.tag}
                            </span>
                          )}
                        </div>

                        <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {place.name}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            📍 {formatDistance(place.distanceKm)} • {transit.text}
                          </span>
                          <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>
                            {place.displayCost}
                          </span>
                        </div>
                      </div>

                      {/* Bookmark Save Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSavePlace && onSavePlace(place);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '6px',
                          color: isSaved && isSaved(place.id) ? 'var(--brand-emerald)' : 'var(--text-muted)'
                        }}
                        title="Save Place"
                      >
                        {isSaved && isSaved(place.id) ? <Check size={16} /> : <Bookmark size={16} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right Map Column */}
          <div className="split-map-container" style={{ width: '45%' }}>
            <MapView
              places={filteredAndSortedPlaces}
              centerCoords={[activeOrigin.lat, activeOrigin.lng]}
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => {
                setSelectedPlace(p);
                onOpenPlaceDetail && onOpenPlaceDetail(p);
              }}
            />
          </div>

        </div>
      ) : (
        /* =================================================================== */
        /* FULL WIDTH CONCENTRIC RADAR MAGAZINE VIEW                          */
        /* =================================================================== */
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 28px 80px 28px' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Radio size={18} color="var(--brand-terracotta)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('nearby.tagline', 'Concentric Proximity Radar')}
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '2px 0 6px 0' }}>
                {t('nearby.title', "What's Around You in")} {destination?.name}
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Real-time distance calculations, walking and driving estimates, and crowd density around your origin.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Origin Switcher Button */}
              {locationMode === 'gps' ? (
                <button
                  onClick={() => setLocationMode('destination')}
                  style={{
                    background: 'rgba(5, 150, 105, 0.1)',
                    border: '1px solid var(--brand-emerald)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--brand-emerald)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <LocateFixed size={14} /> Live GPS Active ({userGps.lat.toFixed(2)}, {userGps.lng.toFixed(2)}) ✕
                </button>
              ) : (
                <button
                  onClick={handleRequestLiveGps}
                  disabled={isLocating}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <LocateFixed size={14} color="var(--brand-terracotta)" />
                  {isLocating ? 'Locating...' : 'Use My Current GPS'}
                </button>
              )}

              {/* Toggle Map Mode Button */}
              <button
                onClick={() => setShowMap(true)}
                className="map-toggle-btn active"
                aria-label="View Radar Map"
              >
                <Map size={16} /> {t('nearby.viewOnMap', 'View Radar Map')} ({filteredAndSortedPlaces.length})
              </button>
            </div>
          </div>

          {/* Location Mode Status Banner */}
          <div style={{
            background: locationMode === 'gps' ? 'rgba(5, 150, 105, 0.08)' : 'var(--bg-surface)',
            border: locationMode === 'gps' ? '1.5px solid var(--brand-emerald)' : '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LocateFixed size={18} color={locationMode === 'gps' ? 'var(--brand-emerald)' : 'var(--brand-terracotta)'} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: locationMode === 'gps' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
                  {locationMode === 'gps' && userGps
                    ? `📍 Using your current location (Live GPS: ${userGps.lat.toFixed(4)}, ${userGps.lng.toFixed(4)})`
                    : `📍 Using selected destination (${destination?.name || 'Munnar'} Center: ${defaultOrigin.lat.toFixed(4)}, ${defaultOrigin.lng.toFixed(4)})`
                  }
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {locationMode === 'gps'
                    ? 'Proximity circles & travel times calculated from your real-time browser location.'
                    : `Showing places relative to ${destination?.name || 'Munnar'} city center.`
                  }
                </div>
              </div>
            </div>

            <div>
              {locationMode === 'gps' ? (
                <button
                  onClick={() => setLocationMode('destination')}
                  style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '5px 14px', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  Switch to {destination?.name || 'City'} Center
                </button>
              ) : (
                <button
                  onClick={handleRequestLiveGps}
                  disabled={isLocating}
                  style={{ background: 'var(--brand-terracotta)', color: '#ffffff', border: 'none', borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <LocateFixed size={13} /> {isLocating ? 'Locating...' : 'Use My Current Location'}
                </button>
              )}
            </div>
          </div>

          {/* GPS Error Alert if any */}
          {gpsError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '10px 16px', color: '#dc2626', fontSize: '0.82rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} /> {gpsError}
            </div>
          )}

          {/* Controls Bar: Distance Rings + Category Tabs + Search + Sorting */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            
            {/* Top Row: Distance Tabs */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Distance Proximity Radius
              </div>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {DISTANCE_FILTERS.map(tab => {
                  const count = allPlaces.filter(p => {
                    if (tab.id === '500m') return p.distanceKm <= 0.5;
                    if (tab.id === '1km') return p.distanceKm <= 1.0;
                    if (tab.id === '2km') return p.distanceKm <= 2.0;
                    if (tab.id === '5km') return p.distanceKm <= 5.0;
                    if (tab.id === '10km') return p.distanceKm <= 10.0;
                    return true;
                  }).length;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedRadius(tab.id)}
                      style={{
                        background: selectedRadius === tab.id ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                        color: selectedRadius === tab.id ? '#ffffff' : 'var(--text-secondary)',
                        border: selectedRadius === tab.id ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{tab.label}</span>
                      <span style={{
                        fontSize: '0.7rem',
                        background: selectedRadius === tab.id ? 'rgba(255,255,255,0.25)' : '#ffffff',
                        color: selectedRadius === tab.id ? '#ffffff' : 'var(--text-muted)',
                        padding: '1px 6px',
                        borderRadius: '999px'
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle Row: Category Filter Chips */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Filter By Category
              </div>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    style={{
                      background: selectedCategory === tab.id ? 'var(--text-primary)' : '#ffffff',
                      color: selectedCategory === tab.id ? '#ffffff' : 'var(--text-secondary)',
                      border: selectedCategory === tab.id ? '1px solid var(--text-primary)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>{tab.icon}</span> <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Row: Real-time Search + Sorting Select */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              
              {/* Search Box */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '6px 14px', flex: '1 1 260px', maxWidth: '400px' }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder={`Search nearby places in ${destination?.name}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.84rem', color: 'var(--text-primary)', width: '100%' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem' }}>✕</button>
                )}
              </div>

              {/* Sorting Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)' }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="distance">📍 Nearest First</option>
                  <option value="rating">★ Highest Rated</option>
                  <option value="crowd">🟢 Lowest Crowd</option>
                  <option value="recommended">✨ Best Match</option>
                </select>
              </div>

            </div>

          </div>

          {/* ================================================================= */}
          {/* RESULTS DISPLAY                                                  */}
          {/* ================================================================= */}
          {filteredAndSortedPlaces.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '60px 24px', textAlign: 'center' }}>
              <Compass size={40} color="var(--brand-terracotta)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                No places found matching your radar criteria
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '480px', margin: '4px auto 16px auto' }}>
                Try adjusting your search query, increasing your distance radius, or clearing category filters.
              </p>
              <button
                onClick={() => { setSelectedRadius('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                style={{
                  background: 'var(--brand-terracotta)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 22px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reset All Radar Filters
              </button>
            </div>
          ) : selectedRadius === 'all' && !searchQuery ? (
            /* CONCENTRIC DISTANCE BANDS (Grouped Hierarchy) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {distanceBands.map(band => {
                const bandPlaces = filteredAndSortedPlaces.filter(band.filterFn);
                if (bandPlaces.length === 0) return null;

                return (
                  <div key={band.id} style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    
                    {/* Band Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                      <div>
                        <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          ● {band.label}
                        </span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {band.subtext}
                        </div>
                      </div>

                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                        {bandPlaces.length} places
                      </span>
                    </div>

                    {/* Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                      {bandPlaces.map(place => {
                        const transit = formatTravelTime(place.distanceKm);
                        return (
                          <div
                            key={place.id}
                            onClick={() => onOpenPlaceDetail && onOpenPlaceDetail(place)}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-light)',
                              borderRadius: 'var(--radius-md)',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              transition: 'all 0.2s ease',
                              boxShadow: 'var(--shadow-sm)',
                              cursor: 'pointer'
                            }}
                          >
                            <div>
                              {/* Photo Header */}
                              <div style={{ position: 'relative', height: '160px' }}>
                                <img src={place.photo} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                
                                {/* Rating Badge */}
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <Star size={12} fill="#f59e0b" color="#f59e0b" /> {place.rating}
                                </div>

                                {/* Crowd Level Badge */}
                                {place.crowd && (
                                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: `1px solid ${place.crowd.border}`, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontWeight: 800, color: place.crowd.color, display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <Users size={11} /> {place.crowd.tag}
                                  </div>
                                )}

                                {/* Save Button */}
                                <button
                                  onClick={() => onSavePlace && onSavePlace(place)}
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#ffffff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: isSaved && isSaved(place.id) ? 'var(--brand-emerald)' : 'var(--text-secondary)',
                                    boxShadow: 'var(--shadow-sm)'
                                  }}
                                  title="Save Place"
                                >
                                  {isSaved && isSaved(place.id) ? <Check size={16} /> : <Bookmark size={16} />}
                                </button>
                              </div>

                              {/* Card Content Body */}
                              <div style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                                    {place.category}
                                  </span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                    {place.crowd?.waitTime}
                                  </span>
                                </div>

                                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 6px 0' }}>
                                  {place.name}
                                </h3>

                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {place.shortDesc}
                                </p>
                              </div>
                            </div>

                            {/* Card Footer with Distance & Cost */}
                            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                                📍 <strong>{formatDistance(place.distanceKm)}</strong> ({transit.text})
                              </span>
                              <span style={{ fontWeight: 800, color: 'var(--brand-terracotta)' }}>
                                {place.displayCost}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* FLAT RANKED GRID (When Filtered by Specific Radius or Search) */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
              {filteredAndSortedPlaces.map(place => {
                const transit = formatTravelTime(place.distanceKm);
                return (
                  <div
                    key={place.id}
                    onClick={() => onOpenPlaceDetail && onOpenPlaceDetail(place)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      {/* Photo Header */}
                      <div style={{ position: 'relative', height: '170px' }}>
                        <img src={place.photo} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Star size={12} fill="#f59e0b" color="#f59e0b" /> {place.rating}
                        </div>

                        {place.crowd && (
                          <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: `1px solid ${place.crowd.border}`, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontWeight: 800, color: place.crowd.color, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Users size={11} /> {place.crowd.tag}
                          </div>
                        )}

                        <button
                          onClick={() => onSavePlace && onSavePlace(place)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isSaved && isSaved(place.id) ? 'var(--brand-emerald)' : 'var(--text-secondary)',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                          title="Save Place"
                        >
                          {isSaved && isSaved(place.id) ? <Check size={16} /> : <Bookmark size={16} />}
                        </button>
                      </div>

                      {/* Content Body */}
                      <div style={{ padding: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                            {place.category}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {place.crowd?.waitTime}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 6px 0' }}>
                          {place.name}
                        </h3>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {place.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                        📍 <strong>{formatDistance(place.distanceKm)}</strong> ({transit.text})
                      </span>
                      <span style={{ fontWeight: 800, color: 'var(--brand-terracotta)' }}>
                        {place.displayCost}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

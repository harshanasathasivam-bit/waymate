import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapView from '../components/MapView';
import { useLanguage } from '../i18n/LanguageContext';
import { getCrowdStatus } from '../services/crowdService';
import { fetchPlaces } from '../services/placesService';
import { CATEGORIES_CONFIG, CATEGORY_TABS } from '../data/categoriesData';
import {
  Compass, MapPin, Star, Bookmark, Check,
  Search, Clock, DollarSign, ChevronRight,
  Map, List, X, Shield, Sparkles, Users, ArrowUpRight, Eye,
  SlidersHorizontal, ShieldCheck, CheckCircle2, Globe, AlertTriangle
} from 'lucide-react';
import DestinationPickerModal from '../components/DestinationPickerModal';

export const WAYMATE_12_CATEGORIES = [
  'All Categories',
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
];

export default function Explore({
  destination,
  destinations = [],
  onSelectDestination,
  onSavePlace,
  isSaved,
  onOpenPlaceDetail
}) {
  const { t } = useLanguage();
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSubcategory = searchParams.get('subcategory') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcategory);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Real-time Dynamic AI Places Discovery State
  const [dynamicPlaces, setDynamicPlaces] = useState([]);
  const [loadingDynamic, setLoadingDynamic] = useState(false);

  // Personalization & Preferences State
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedCompanion, setSelectedCompanion] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);

  // Fetch real external places from backend API
  useEffect(() => {
    let isCancelled = false;
    const loadDynamic = async () => {
      const destName = destination?.name || 'Chennai';
      setLoadingDynamic(true);
      try {
        const queryParams = { destination: destName };
        if (hiddenGemsOnly) queryParams.hiddenGemsOnly = true;
        if (selectedBudget !== 'All') queryParams.budget = selectedBudget;
        if (selectedCompanion !== 'All') queryParams.companion = selectedCompanion;
        if (selectedDuration !== 'All') queryParams.duration = selectedDuration;
        if (selectedTheme !== 'All') queryParams.interests = [selectedTheme];

        const data = await fetchPlaces(queryParams);
        if (!isCancelled && data.success && Array.isArray(data.places)) {
          setDynamicPlaces(data.places);
        }
      } catch (err) {
        console.warn('Notice: Using local destinations database for places:', err.message);
      } finally {
        if (!isCancelled) setLoadingDynamic(false);
      }
    };
    loadDynamic();
    return () => { isCancelled = true; };
  }, [destination?.name, hiddenGemsOnly, selectedBudget, selectedCompanion, selectedDuration, selectedTheme]);

  // Check if search query matches another Tamil Nadu destination
  const matchingOtherDest = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 3) return null;
    const q = searchQuery.toLowerCase().trim();
    if (destination?.name?.toLowerCase().includes(q)) return null;
    return destinations.find(d => d.id !== destination?.id && d.name.toLowerCase().includes(q));
  }, [searchQuery, destination, destinations]);

  // Synchronize when URL search parameters change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const sub = searchParams.get('subcategory') || 'all';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setActiveSubcategory(sub);
    setSearchQuery(q);
  }, [searchParams]);

  // Handle Category Switching
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSubcategory('all'); // Reset subcategory on primary category switch
    
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    newParams.delete('subcategory');
    setSearchParams(newParams);
  };

  // Handle Subcategory Switching
  const handleSubcategoryChange = (subId) => {
    setActiveSubcategory(subId);
    const newParams = new URLSearchParams(searchParams);
    if (subId === 'all') {
      newParams.delete('subcategory');
    } else {
      newParams.set('subcategory', subId);
    }
    setSearchParams(newParams);
  };

  // Compile Comprehensive Category Dataset for active destination
  const allPlaces = useMemo(() => {
    const list = [];
    if (!destination) return list;
    
    // 1. Attractions
    if (destination.attractions) {
      list.push(...destination.attractions.map(a => ({
        ...a,
        itemType: 'attractions',
        typeLabel: t('cat.attractions', 'Attractions'),
        displayCost: a.estimatedCost || a.cost || 'Free Entry',
        shortDesc: a.shortDesc || a.description,
        photo: a.photo || a.image || destination.heroImage,
        crowd: getCrowdStatus(a, '05:30 PM')
      })));
    }

    // 2. Food & Dining
    if (destination.food) {
      list.push(...destination.food.map(f => ({
        ...f,
        itemType: 'food',
        typeLabel: t('cat.food', 'Food & Dining'),
        displayCost: f.estimatedCost || f.cost || '₹200 per meal',
        shortDesc: f.shortDesc || f.description || f.story,
        photo: f.photo || f.image || destination.heroImage,
        crowd: getCrowdStatus(f, '01:00 PM')
      })));
    } else if (destination.localLife) {
      // Fallback extraction
      const foodItems = destination.localLife.filter(l => 
        l.category?.toLowerCase().includes('food') || 
        l.category?.toLowerCase().includes('tiffin') || 
        l.category?.toLowerCase().includes('kitchen') ||
        l.name?.toLowerCase().includes('mess') ||
        l.name?.toLowerCase().includes('idli')
      );
      list.push(...foodItems.map(f => ({
        ...f,
        itemType: 'food',
        subcategory: f.subcategory || 'local_traditional',
        typeLabel: t('cat.food', 'Food & Dining'),
        displayCost: f.cost,
        shortDesc: f.story,
        rating: f.rating || 4.85,
        photo: f.photo || f.image || destination.heroImage,
        crowd: getCrowdStatus(f, '01:00 PM')
      })));
    }

    // 3. Stays & Lodges
    if (destination.stays) {
      list.push(...destination.stays.map(s => ({
        ...s,
        itemType: 'stays',
        typeLabel: t('cat.stays', 'Stays'),
        displayCost: s.estimatedCost || (s.pricePerNight ? `₹${s.pricePerNight?.toLocaleString('en-IN')} / night` : '₹3,000 / night'),
        shortDesc: s.shortDesc || `${s.area || ''} • Facilities: ${s.facilities?.join(', ')}`,
        photo: s.photo || s.image || destination.heroImage,
        crowd: getCrowdStatus(s, '02:00 PM')
      })));
    }

    // 4. Local Shops & Crafts
    if (destination.shops) {
      list.push(...destination.shops.map(sh => ({
        ...sh,
        itemType: 'shops',
        typeLabel: t('cat.shops', 'Local Shops'),
        displayCost: sh.estimatedCost || sh.cost || '₹200+',
        shortDesc: sh.shortDesc || sh.description,
        photo: sh.photo || sh.image || destination.heroImage,
        crowd: getCrowdStatus(sh, '06:00 PM')
      })));
    }

    // 5. Experiences & Workshops
    if (destination.experiences) {
      list.push(...destination.experiences.map(exp => ({
        ...exp,
        itemType: 'experiences',
        typeLabel: t('cat.experiences', 'Experiences'),
        displayCost: exp.estimatedCost || exp.cost || 'Free',
        shortDesc: exp.shortDesc || exp.description,
        photo: exp.photo || exp.image || destination.heroImage,
        crowd: getCrowdStatus(exp, '04:00 PM')
      })));
    }

    // 6. Hidden Gems
    if (destination.hiddenGems) {
      list.push(...destination.hiddenGems.map(h => ({
        ...h,
        itemType: 'gems',
        typeLabel: t('cat.gems', 'Hidden Gems'),
        displayCost: h.estimatedCost || h.cost || 'Free',
        shortDesc: h.shortDesc || h.whyVisit || h.description,
        photo: h.photo || h.image || destination.heroImage,
        crowd: getCrowdStatus(h, '05:00 PM')
      })));
    }

    // 7. Real Dynamically Discovered & Verified Places from MongoDB / OpenStreetMap
    if (Array.isArray(dynamicPlaces) && dynamicPlaces.length > 0) {
      list.unshift(...dynamicPlaces.map(dp => ({
        id: dp._id || dp.id,
        _id: dp._id,
        name: dp.name,
        category: dp.category,
        itemType: dp.category === 'Hidden-gem candidates' ? 'gems' : 'attractions',
        typeLabel: dp.category,
        displayCost: dp.entryFee && dp.entryFee !== 'Not available' ? dp.entryFee : 'Free Entry',
        shortDesc: dp.description && dp.description !== 'Not available' ? dp.description : dp.historicalInfo,
        description: dp.description,
        historicalInfo: dp.historicalInfo,
        address: dp.address,
        photo: dp.images?.[0]?.url || destination?.heroImage || 'https://upload.wikimedia.org/wikipedia/commons/4/41/Marina_Beach_in_Chennai.jpg',
        images: dp.images,
        lat: dp.latitude || dp.lat,
        lng: dp.longitude || dp.lng,
        latitude: dp.latitude || dp.lat,
        longitude: dp.longitude || dp.lng,
        bestTime: dp.bestTimeToVisit,
        timing: dp.openingHours,
        openingHours: dp.openingHours,
        entryFee: dp.entryFee,
        sourceName: dp.sourceName,
        sourceUrl: dp.sourceUrl,
        verificationStatus: dp.verificationStatus,
        lastVerifiedAt: dp.lastVerifiedAt,
        dataConfidenceScore: dp.dataConfidenceScore,
        hiddenGemCandidate: dp.hiddenGemCandidate,
        hiddenGemVerified: dp.hiddenGemVerified,
        matchScore: dp.matchScore,
        crowd: { tag: 'Moderate', color: '#059669', border: '#a7f3d0', bg: 'rgba(5,150,105,0.08)', waitTime: 'Verified Timing' }
      })));
    }

    // Deduplicate by normalized name or ID
    const seen = new Set();
    return list.filter(item => {
      const key = (item.name || item.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [destination, dynamicPlaces, t]);

  // Combined Search + Category + Subcategory Filtering
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter(place => {
      const name = (place.name || place.title || '').toLowerCase();
      const desc = (place.shortDesc || place.description || place.whyVisit || place.story || '').toLowerCase();
      const cat = (place.category || '').toLowerCase();
      const sub = (place.subcategory || '').toLowerCase();
      const cost = (place.displayCost || '').toLowerCase();
      const tags = (place.tags || []).join(' ').toLowerCase();
      const q = searchQuery.trim().toLowerCase();

      // 1. Search Query match
      const matchesSearch = !q || 
        name.includes(q) || 
        desc.includes(q) || 
        cat.includes(q) || 
        sub.includes(q) || 
        cost.includes(q) || 
        tags.includes(q);

      // 2. Category match
      const matchesCategory = activeCategory === 'all' || place.itemType === activeCategory;

      // 3. Subcategory match
      const matchesSubcategory = activeSubcategory === 'all' || 
        place.subcategory === activeSubcategory ||
        (place.subcategory && place.subcategory.toLowerCase().includes(activeSubcategory.replace('_', ' ')));

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [allPlaces, searchQuery, activeCategory, activeSubcategory]);

  // Active Category configuration for subcategories row
  const currentCategoryConfig = CATEGORIES_CONFIG[activeCategory];

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 71px)', background: 'var(--bg-page)' }}>
      
      {/* Floating Bottom Map/List Toggle Pill */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="floating-map-toggle"
        aria-label="Toggle map and list view"
      >
        {showMap ? (
          <>
            <List size={18} /> Hide Map (List View)
          </>
        ) : (
          <>
            <Map size={18} /> View on Map ({filteredPlaces.length})
          </>
        )}
      </button>

      {/* Conditionally Render: Split-Screen when showMap=true, Full-Width Grid when showMap=false */}
      {showMap ? (
        <div className="split-layout">
          
          {/* Left Split List (55%) */}
          <div className="split-content" style={{ width: '55%' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={18} color="var(--brand-terracotta)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Interactive Map Discovery
                  </span>
                </div>

                <button
                  onClick={() => setShowMap(false)}
                  className="map-toggle-btn"
                >
                  <List size={15} /> List Only
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
                  {destination?.name} Map Discovery
                </h1>
                <button
                  onClick={() => setDestModalOpen(true)}
                  style={{
                    background: 'rgba(194, 65, 12, 0.08)',
                    border: '1px solid var(--brand-terracotta)',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--brand-terracotta)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Select another place in Tamil Nadu"
                >
                  <MapPin size={11} /> Change Place
                </button>
              </div>

              {/* Primary Category Filter Pills */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryChange(tab.id)}
                    style={{
                      background: activeCategory === tab.id ? 'var(--text-primary)' : '#ffffff',
                      color: activeCategory === tab.id ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 12px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{tab.icon}</span> <span>{t(tab.labelKey, tab.defaultLabel)}</span>
                  </button>
                ))}
              </div>

              {/* Subcategories in Split View */}
              {currentCategoryConfig && currentCategoryConfig.subcategories && (
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginTop: '8px', paddingBottom: '4px' }}>
                  {currentCategoryConfig.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryChange(sub.id)}
                      style={{
                        background: activeSubcategory === sub.id ? 'rgba(194, 65, 12, 0.12)' : '#ffffff',
                        color: activeSubcategory === sub.id ? 'var(--brand-terracotta)' : 'var(--text-muted)',
                        border: activeSubcategory === sub.id ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 10px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {t(sub.labelKey, sub.defaultLabel)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List Results in Split Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredPlaces.map(place => (
                <div
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    onOpenPlaceDetail && onOpenPlaceDetail(place);
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    display: 'flex',
                    gap: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="picked-card"
                >
                  <img src={place.photo} alt={place.name} style={{ width: '90px', height: '90px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                          {place.category}
                        </span>
                        {place.crowd && (
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: place.crowd.bg, color: place.crowd.color, border: `1px solid ${place.crowd.border}` }}>
                            {place.crowd.tag}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>
                        {place.name}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineClamp: 2 }}>
                        {place.shortDesc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '6px' }}>
                      <span>★ {place.rating || 4.8} ({place.reviewsCount || 45})</span>
                      <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>{place.displayCost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Split Map (45%) */}
          <div className="split-map-container" style={{ width: '45%' }}>
            <MapView
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => {
                setSelectedPlace(p);
                onOpenPlaceDetail && onOpenPlaceDetail(p);
              }}
            />
          </div>
        </div>
      ) : (
        /* Full Width Editorial Explorer View */
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '36px 28px 80px 28px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Compass size={18} color="var(--brand-terracotta)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Category & Subcategory Intelligence
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', margin: 0 }}>
                  Explore {destination?.name}
                </h1>
                <button
                  onClick={() => setDestModalOpen(true)}
                  style={{
                    background: 'rgba(194, 65, 12, 0.08)',
                    border: '1px solid var(--brand-terracotta)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--brand-terracotta)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s'
                  }}
                  title="Select any destination or district in Tamil Nadu"
                >
                  <MapPin size={13} />
                  <span>Change Place</span>
                </button>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredPlaces.length}</strong> {activeCategory !== 'all' ? t(CATEGORY_TABS.find(c => c.id === activeCategory)?.labelKey, CATEGORY_TABS.find(c => c.id === activeCategory)?.defaultLabel) : 'places'} in {destination?.name}, Tamil Nadu
              </p>

              {/* Real-time Discovery & Personalization Quick Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(5, 150, 105, 0.1)',
                  color: '#059669',
                  border: '1px solid rgba(5, 150, 105, 0.25)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px',
                  fontSize: '0.74rem',
                  fontWeight: 700
                }}>
                  <Globe size={12} /> {loadingDynamic ? 'Discovering Places...' : `Live Discovery Active (${dynamicPlaces.length} verified records)`}
                </span>

                {/* Hidden Gems Quick Filter Button */}
                <button
                  onClick={() => setHiddenGemsOnly(!hiddenGemsOnly)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: hiddenGemsOnly ? '#9333ea' : 'rgba(147, 51, 234, 0.08)',
                    color: hiddenGemsOnly ? '#ffffff' : '#9333ea',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 14px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: hiddenGemsOnly ? '0 2px 10px rgba(147, 51, 234, 0.3)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Sparkles size={12} /> {hiddenGemsOnly ? 'Showing Potential Hidden Gems Only' : 'Filter Potential Hidden Gems'}
                </button>

                {/* Personalization Preferences Drawer Toggle */}
                <button
                  onClick={() => setShowPersonalization(!showPersonalization)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: showPersonalization ? 'var(--text-primary)' : 'var(--bg-surface)',
                    color: showPersonalization ? '#ffffff' : 'var(--text-primary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 14px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <SlidersHorizontal size={13} /> {showPersonalization ? 'Hide Personalization' : 'Personalize & Rank Places'}
                </button>
              </div>

              {/* Personalization Ranking Drawer */}
              {showPersonalization && (
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px 22px',
                  margin: '18px 0 20px 0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {/* Budget Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Budget Preference
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['All', 'Free', 'Budget', 'Moderate', 'Luxury'].map(b => (
                        <button
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          style={{
                            background: selectedBudget === b ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                            color: selectedBudget === b ? '#ffffff' : 'var(--text-primary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Companion Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Companionship
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['All', 'Solo', 'Family', 'Friends'].map(c => (
                        <button
                          key={c}
                          onClick={() => setSelectedCompanion(c)}
                          style={{
                            background: selectedCompanion === c ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                            color: selectedCompanion === c ? '#ffffff' : 'var(--text-primary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Travel Duration
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {[
                        { id: 'All', label: 'Any' },
                        { id: 'short', label: 'Short (<1h)' },
                        { id: 'half_day', label: 'Half-Day' },
                        { id: 'full_day', label: 'Full-Day' }
                      ].map(d => (
                        <button
                          key={d.id}
                          onClick={() => setSelectedDuration(d.id)}
                          style={{
                            background: selectedDuration === d.id ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                            color: selectedDuration === d.id ? '#ffffff' : 'var(--text-primary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest Themes */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Primary Theme
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['All', 'nature', 'history', 'religion', 'food', 'photography'].map(th => (
                        <button
                          key={th}
                          onClick={() => setSelectedTheme(th)}
                          style={{
                            background: selectedTheme === th ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                            color: selectedTheme === th ? '#ffffff' : 'var(--text-primary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            cursor: 'pointer'
                          }}
                        >
                          {th}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Input Box */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{
                background: '#ffffff',
                border: '1.5px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '280px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder={`Search ${activeCategory !== 'all' ? activeCategory : 'places, food, stays'}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.84rem',
                    width: '100%',
                    background: 'transparent'
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowMap(true)}
                className="map-toggle-btn"
              >
                <Map size={16} /> View Map
              </button>
            </div>
          </div>

          {/* Quick Switch destination suggestion if user types another Tamil Nadu city */}
          {matchingOtherDest && (
            <div
              onClick={() => {
                onSelectDestination && onSelectDestination(matchingOtherDest);
                setSearchQuery('');
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(194, 65, 12, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)',
                border: '1px solid var(--brand-terracotta)',
                borderRadius: '12px',
                padding: '10px 18px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <Compass size={16} color="var(--brand-terracotta)" />
                <span>Looking for places in <strong>{matchingOtherDest.name}</strong>?</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-terracotta)' }}>
                <span>Switch to {matchingOtherDest.name}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          )}

          {/* Primary Category Filter Bar */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
            {CATEGORY_TABS.map(tab => {
              const count = tab.id === 'all'
                ? allPlaces.length
                : allPlaces.filter(p => p.itemType === tab.id).length;

              const isSelected = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  style={{
                    background: isSelected ? 'var(--brand-terracotta)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 4px 12px rgba(194, 65, 12, 0.25)' : 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{t(tab.labelKey, tab.defaultLabel)}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    background: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-surface)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)',
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontWeight: 800
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Subcategory Filters Row (Dynamically appears for selected category) */}
          {currentCategoryConfig && currentCategoryConfig.subcategories && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              padding: '10px 16px',
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                Subcategories:
              </span>

              {currentCategoryConfig.subcategories.map(sub => {
                const isSubActive = activeSubcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryChange(sub.id)}
                    style={{
                      background: isSubActive ? 'var(--text-primary)' : 'var(--bg-surface)',
                      color: isSubActive ? '#ffffff' : 'var(--text-secondary)',
                      border: isSubActive ? '1px solid var(--text-primary)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 14px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {t(sub.labelKey, sub.defaultLabel)}
                  </button>
                );
              })}
            </div>
          )}

          {/* Places Results Grid */}
          {filteredPlaces.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center' }}>
              <Compass size={36} color="var(--brand-terracotta)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                No places found matching your filters
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Try clearing your search query or selecting "All Places".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveSubcategory('all');
                  setSearchParams({});
                }}
                style={{
                  marginTop: '16px',
                  background: 'var(--brand-terracotta)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="editorial-cards-grid">
              {filteredPlaces.map(item => (
                <div
                  key={item.id}
                  className="editorial-card"
                  onClick={() => onOpenPlaceDetail && onOpenPlaceDetail(item)}
                  style={{ cursor: 'pointer' }}
                >
                  
                  {/* Photo & Overlays */}
                  <div className="editorial-card-photo-box">
                    <img src={item.photo} alt={item.name} className="editorial-card-photo" />
                    
                    {/* Verification / Hidden Gem Tag */}
                    {(item.hiddenGemCandidate || item.verificationStatus) && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: item.hiddenGemCandidate
                          ? 'rgba(147, 51, 234, 0.95)'
                          : item.verificationStatus === 'VERIFIED'
                          ? 'rgba(16, 185, 129, 0.95)'
                          : 'rgba(245, 158, 11, 0.95)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.68rem',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {item.hiddenGemCandidate ? (
                          <>✨ Potential Hidden Gem</>
                        ) : item.verificationStatus === 'VERIFIED' ? (
                          <><CheckCircle2 size={11} /> Verified Source</>
                        ) : (
                          <>Review Pending</>
                        )}
                      </div>
                    )}

                    {/* Rating & Match Score Badge */}
                    <div style={{ position: 'absolute', top: '12px', right: '48px', display: 'flex', gap: '4px' }}>
                      {item.matchScore && (
                        <div style={{
                          background: 'rgba(194, 65, 12, 0.95)',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          {item.matchScore}% Match
                        </div>
                      )}
                      <div className="editorial-card-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" /> {item.rating || 4.8}
                      </div>
                    </div>

                    {/* Confidence or Crowd Level Badge on Card */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}>
                      {item.dataConfidenceScore ? (
                        <>
                          <ShieldCheck size={12} color="#059669" />
                          <span>{item.dataConfidenceScore}% Confidence</span>
                        </>
                      ) : (
                        <>
                          <Users size={12} color={item.crowd?.color || '#059669'} />
                          <span>Crowd: {item.crowd?.tag || 'Moderate'}</span>
                        </>
                      )}
                    </div>

                    {/* Bookmark Save Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSavePlace && onSavePlace(item);
                      }}
                      className="editorial-card-save-btn"
                      title="Save Place"
                      aria-label="Save Place"
                    >
                      {isSaved && isSaved(item.id) ? (
                        <Check size={18} color="var(--brand-emerald)" />
                      ) : (
                        <Bookmark size={18} />
                      )}
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="editorial-card-body">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="editorial-card-category">
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {item.crowd?.waitTime || '5-10m wait'}
                        </span>
                      </div>

                      <h3 className="editorial-card-title">
                        {item.name}
                      </h3>
                      <p className="editorial-card-desc">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="editorial-card-footer">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} color="var(--brand-terracotta)" /> {item.distance || '2.5 km away'}
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>
                        {item.displayCost}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Tamil Nadu Places Selector Modal */}
      <DestinationPickerModal
        isOpen={destModalOpen}
        onClose={() => setDestModalOpen(false)}
        destinations={destinations}
        currentDestination={destination}
        onSelectDestination={onSelectDestination}
      />

    </div>
  );
}

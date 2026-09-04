import React, { useState, useMemo, useEffect } from 'react';
import MapView from '../components/MapView';
import {
  generateSmartItinerary,
  getStopAlternatives,
  parseNaturalLanguageClientPrompt,
  reoptimizeItineraryStops,
  PLANNER_DESTINATIONS
} from '../services/travelPlannerService';
import { getCrowdStatus, getNearbySmartAlternatives } from '../services/crowdService';
import { getDestinationWeather, getWeatherImpactForStop } from '../services/weatherService';
import {
  Map, Calendar, Clock, DollarSign, ArrowUp, ArrowDown,
  Plus, Trash2, CheckCircle2, Share2, Sparkles, Navigation,
  List, Sliders, RefreshCw, AlertCircle, Info, ChevronRight,
  TrendingDown, Compass, Coffee, Check, X, Shield, Users, AlertTriangle,
  Sun, CloudRain, Wind, Bookmark, Save, FolderOpen
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Trips({ destination }) {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Input parameters state (restored from active state if available)
  const [selectedDestId, setSelectedDestId] = useState(destination?.id || 'yercaud');
  const [daysCount, setDaysCount] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [travelStyle, setTravelStyle] = useState('Budget');
  const [travelersCount, setTravelersCount] = useState(2);
  const [startingLocation, setStartingLocation] = useState('Salem');
  const [selectedInterests, setSelectedInterests] = useState(['Nature', 'Food', 'Photography']);

  // Saved Trips Modal State
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const s = localStorage.getItem('waymate_user_trips');
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  });

  // AI Prompt State
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState('');

  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [replacingStop, setReplacingStop] = useState(null); // stop object being replaced
  const [shareSuccess, setShareSuccess] = useState(false);

  // Weather Profile for selected destination
  const weather = useMemo(() => {
    return getDestinationWeather(selectedDestId);
  }, [selectedDestId]);

  // Generate itinerary model based on inputs
  const itinerary = useMemo(() => {
    return generateSmartItinerary({
      destinationId: selectedDestId,
      daysCount,
      budget,
      travelStyle,
      travelersCount,
      interests: selectedInterests,
      startingLocation
    });
  }, [selectedDestId, daysCount, budget, travelStyle, travelersCount, selectedInterests, startingLocation]);

  // Local mutable days state for interactive reordering and replacement
  const [days, setDays] = useState(itinerary.days);

  // Fetch saved trips from backend on mount
  useEffect(() => {
    const fetchBackendTrips = async () => {
      try {
        const userId = user?.id || 'guest';
        const res = await fetch(`/api/itineraries/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.trips && data.trips.length > 0) {
            setSavedTrips(data.trips);
            localStorage.setItem('waymate_user_trips', JSON.stringify(data.trips));
          }
        }
      } catch (e) {}
    };
    fetchBackendTrips();
  }, [user]);

  // Sync days whenever destination or day count fundamentally regenerates
  useEffect(() => {
    setDays(itinerary.days);
    setSelectedDayIdx(0);
  }, [itinerary]);

  // Save current trip to persistent storage & backend
  const handleSaveItinerary = async () => {
    const tripToSave = {
      id: `trip_${Date.now()}`,
      userId: user?.id || 'guest',
      title: `${itinerary.summary.destinationName} ${daysCount}-Day Journey`,
      destination: { id: selectedDestId, name: itinerary.summary.destinationName },
      summary: {
        days: daysCount,
        budgetInput: budget,
        estimatedTotalCost: itinerary.summary.estimatedTotalCost,
        travelers: travelersCount,
        travelStyle,
        startingLocation
      },
      days: days, // preserve all user stop adjustments
      budgetBreakdown: itinerary.budgetBreakdown,
      createdAt: new Date().toISOString()
    };

    const updated = [tripToSave, ...savedTrips.filter(t => t.id !== tripToSave.id)];
    setSavedTrips(updated);
    try {
      localStorage.setItem('waymate_user_trips', JSON.stringify(updated));
      await fetch('/api/itineraries/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || 'guest', tripPlan: tripToSave })
      });
    } catch (e) {}

    setSaveSuccessMsg(`✨ Saved "${tripToSave.title}" to your itineraries!`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Load a previously saved trip into active editor
  const handleLoadTrip = (savedTrip) => {
    if (savedTrip.destination?.id) setSelectedDestId(savedTrip.destination.id);
    if (savedTrip.summary?.days) setDaysCount(savedTrip.summary.days);
    if (savedTrip.summary?.budgetInput) setBudget(savedTrip.summary.budgetInput);
    if (savedTrip.summary?.travelStyle) setTravelStyle(savedTrip.summary.travelStyle);
    if (savedTrip.summary?.travelers) setTravelersCount(savedTrip.summary.travelers);
    if (savedTrip.summary?.startingLocation) setStartingLocation(savedTrip.summary.startingLocation);
    if (savedTrip.days && savedTrip.days.length > 0) {
      setDays(savedTrip.days);
    }
    setSelectedDayIdx(0);
    setShowSavedModal(false);
    setAiSuccessMsg(`📂 Loaded "${savedTrip.title || 'Saved Itinerary'}"!`);
    setTimeout(() => setAiSuccessMsg(''), 3000);
  };

  // Delete saved trip
  const handleDeleteSavedTrip = async (tripId, e) => {
    e.stopPropagation();
    const updated = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem('waymate_user_trips', JSON.stringify(updated));
      await fetch(`/api/itineraries/${tripId}`, { method: 'DELETE' });
    } catch (e) {}
  };

  const currentDay = days[selectedDayIdx] || days[0] || { stops: [] };

  // Calculate crowd status for all current day stops
  const currentStopsWithCrowd = useMemo(() => {
    return (currentDay.stops || []).map(s => ({
      ...s,
      crowd: getCrowdStatus(s, s.time)
    }));
  }, [currentDay]);

  // Find if any stop on the current day has HIGH or VERY_HIGH crowd
  const crowdedStopInfo = useMemo(() => {
    const crowdedIdx = currentStopsWithCrowd.findIndex(s => s.crowd?.key === 'HIGH' || s.crowd?.key === 'VERY_HIGH');
    if (crowdedIdx === -1) return null;

    const crowdedStop = currentStopsWithCrowd[crowdedIdx];
    const existingTitles = currentDay.stops.map(s => s.title);
    const alternatives = getNearbySmartAlternatives({
      currentPlace: crowdedStop,
      destinationId: selectedDestId,
      delayMinutes: 60,
      maxRadiusKm: 10,
      existingItineraryPlaceIds: existingTitles,
      userInterests: selectedInterests,
      userBudget: budget
    });

    return {
      index: crowdedIdx,
      stop: crowdedStop,
      alternatives
    };
  }, [currentStopsWithCrowd, currentDay, selectedDestId, selectedInterests, budget]);

  // Handler: Insert alternative stop during delay window
  const handleAddAlternativeWhileWaiting = (alt) => {
    if (!crowdedStopInfo) return;
    const { index, stop } = crowdedStopInfo;
    const newStop = {
      id: `alt-${Date.now()}`,
      time: stop.time, // take current slot
      title: alt.name,
      category: alt.category,
      cost: alt.costStr,
      costNum: alt.costNum,
      duration: `${alt.durationMins || 45} mins`,
      desc: `${alt.desc} (Explored during ${stop.title} crowd delay).`,
      lat: alt.lat,
      lng: alt.lng,
      photo: alt.photo,
      transition: {
        distance: alt.distanceStr,
        travelTime: `${alt.transitMin} mins`,
        suggestedMode: "Short Ride / Walk"
      }
    };

    // Shift crowded stop time by approx 1 hour
    const updatedStops = [...currentDay.stops];
    const delayedStop = {
      ...updatedStops[index],
      time: "06:30 PM",
      desc: `${updatedStops[index].desc} (Rescheduled for low evening crowds).`
    };

    // Insert alternative before delayed stop
    updatedStops.splice(index, 1, newStop, delayedStop);

    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
    alert(`Added "${alt.name}" to itinerary! "${stop.title}" has been safely rescheduled to 06:30 PM.`);
  };

  // Handler: Replace crowded stop directly with alternative
  const handleReplaceWithCrowdAlternative = (alt) => {
    if (!crowdedStopInfo) return;
    const { index } = crowdedStopInfo;
    const newStop = {
      id: `rep-${Date.now()}`,
      time: currentDay.stops[index].time,
      title: alt.name,
      category: alt.category,
      cost: alt.costStr,
      costNum: alt.costNum,
      duration: `${alt.durationMins || 45} mins`,
      desc: alt.desc,
      lat: alt.lat,
      lng: alt.lng,
      photo: alt.photo,
      transition: {
        distance: alt.distanceStr,
        travelTime: `${alt.transitMin} mins`,
        suggestedMode: "Short Transit"
      }
    };

    const updatedStops = [...currentDay.stops];
    updatedStops[index] = newStop;

    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
    alert(`Crowded stop replaced with "${alt.name}"!`);
  };

  // Reorder stop
  const handleMove = (idx, dir) => {
    const updatedStops = [...currentDay.stops];
    const target = idx + dir;
    if (target < 0 || target >= updatedStops.length) return;
    const temp = updatedStops[idx];
    updatedStops[idx] = updatedStops[target];
    updatedStops[target] = temp;

    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
  };

  // Remove stop
  const handleDelete = (idx) => {
    const updatedStops = currentDay.stops.filter((_, i) => i !== idx);
    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
  };

  // Replace stop with chosen alternative
  const handleSelectAlternative = (alt) => {
    if (!replacingStop) return;
    const updatedStops = currentDay.stops.map(s => {
      if (s.id === replacingStop.id) {
        return {
          ...s,
          title: alt.title,
          category: alt.category,
          cost: alt.cost,
          costNum: alt.costNum,
          duration: alt.duration,
          desc: alt.desc,
          lat: alt.lat,
          lng: alt.lng,
          photo: alt.photo
        };
      }
      return s;
    });

    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
    setReplacingStop(null);
  };

  // AI Natural Language Prompt Handler (Backend AI -> Client Fail-safe Fallback)
  const handleGenerateWithAI = async (customPrompt) => {
    const promptToUse = (customPrompt || aiPromptInput || '').trim();
    if (!promptToUse) return;

    setIsAiGenerating(true);
    setAiSuccessMsg('');

    try {
      const response = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.tripPlan?.summary) {
          const sum = data.tripPlan.summary;
          if (data.tripPlan.destination?.id) setSelectedDestId(data.tripPlan.destination.id);
          if (sum.budgetInput) setBudget(sum.budgetInput);
          if (sum.days) setDaysCount(sum.days);
          if (sum.travelers) setTravelersCount(sum.travelers);
          if (sum.startingLocation) setStartingLocation(sum.startingLocation);
          setAiSuccessMsg(`✨ AI Plan created for ${data.tripPlan.destination?.name || 'your trip'}!`);
          setIsAiGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('[AI Plan] Backend extraction failed, using client parser fallback:', err);
    }

    // Client-side grounded parser fallback
    const parsed = parseNaturalLanguageClientPrompt(promptToUse);
    setSelectedDestId(parsed.destinationId);
    setBudget(parsed.budget);
    setDaysCount(parsed.daysCount);
    setTravelersCount(parsed.travelersCount);
    setTravelStyle(parsed.travelStyle);
    setSelectedInterests(parsed.interests);
    setAiSuccessMsg(`✨ Plan created from: "${promptToUse.slice(0, 45)}..."`);
    setIsAiGenerating(false);
  };

  // Smart Action: 1-Click Itinerary Re-optimization
  const handleSmartReoptimize = () => {
    const reordered = reoptimizeItineraryStops(currentDay.stops, selectedDestId);
    const newDays = [...days];
    newDays[selectedDayIdx].stops = reordered;
    setDays(newDays);
    alert('✨ Itinerary re-optimized! Crowded slots rescheduled and transit connections streamlined.');
  };

  // Add custom stop
  const handleAddStop = () => {
    const newStop = {
      id: `custom-${Date.now()}`,
      time: "04:30 PM",
      title: "Local Specialty Craft & Coffee Stroll",
      category: "Local Discovery",
      cost: "Free",
      costNum: 0,
      duration: "1.5 hrs",
      desc: "Added to customized itinerary based on explorer preference.",
      lat: itinerary.destination.coordinates.lat,
      lng: itinerary.destination.coordinates.lng,
      transition: {
        distance: "1.1 km",
        travelTime: "5 mins walk",
        suggestedMode: "Walking"
      }
    };
    const newDays = [...days];
    newDays[selectedDayIdx].stops.push(newStop);
    setDays(newDays);
  };

  // Smart Action: Reduce Cost (convert paid activities to free nature scenic spots)
  const handleReduceCost = () => {
    const updatedStops = currentDay.stops.map(s => {
      if (s.costNum > 100 && !s.category.includes('Food')) {
        return {
          ...s,
          title: `${s.title} (Scenic Viewpoint Access)`,
          cost: "Free",
          costNum: 0,
          desc: `${s.desc} — Free public viewing concourse without paid guide.`
        };
      }
      return s;
    });
    const newDays = [...days];
    newDays[selectedDayIdx].stops = updatedStops;
    setDays(newDays);
    alert('Plan optimized for cost savings! Paid entries reduced.');
  };

  // Smart Action: Make it Relaxed
  const handleRelaxedPace = () => {
    if (currentDay.stops.length > 3) {
      const relaxedStops = currentDay.stops.slice(0, 4);
      const newDays = [...days];
      newDays[selectedDayIdx].stops = relaxedStops;
      setDays(newDays);
      alert('Pace adjusted! Extra stops removed to give you 3+ hours of relaxed leisure time.');
    }
  };

  // Share Plan
  const handleShareTrip = () => {
    navigator.clipboard?.writeText(`WayMate Smart Trip: ${daysCount} Days in ${itinerary.summary.destinationName} (Budget ₹${budget})`);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const routePolyline = currentDay.stops
    ?.map(s => [s.lat, s.lng])
    ?.filter(coord => coord[0] && coord[1]) || [];

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 71px)', background: 'var(--bg-page)' }}>
      
      {/* Floating Map/List Toggle */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="floating-map-toggle"
      >
        {showMap ? (
          <>
            <List size={18} /> Show Itinerary Only
          </>
        ) : (
          <>
            <Map size={18} /> View Route on Map ({currentDay.stops?.length || 0} stops)
          </>
        )}
      </button>

      {/* Main Container */}
      <div style={{ maxWidth: showMap ? '100%' : '1100px', margin: '0 auto', padding: showMap ? '0' : '36px 28px 80px 28px' }}>

        {showMap ? (
          /* Split Screen Route Map Mode */
          <div className="split-layout">
            <div className="split-content" style={{ width: '55%' }}>
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                    Route Trail View
                  </span>
                  <button onClick={() => setShowMap(false)} className="map-toggle-btn">
                    <List size={15} /> Itinerary View
                  </button>
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Day 0{currentDay.dayNumber} Connected Route
                </h2>
              </div>

              {/* Day Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' }}>
                {days.map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIdx(idx)}
                    style={{
                      background: selectedDayIdx === idx ? 'var(--text-primary)' : '#ffffff',
                      color: selectedDayIdx === idx ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Day {d.dayNumber}
                  </button>
                ))}
              </div>

              {/* Timeline list in split mode */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentDay.stops.map((stop, i) => (
                  <div key={stop.id || i} style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '14px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--brand-terracotta)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.76rem', fontWeight: 800, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--brand-terracotta)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>⏰ {stop.time}</span>
                      <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0' }}>{stop.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="split-map-container" style={{ width: '45%' }}>
              <MapView
                places={currentDay.stops}
                routePolyline={routePolyline}
              />
            </div>
          </div>
        ) : (
          /* Full Width Smart Trip Planner (Clean & Editorial) */
          <div>
            
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Sparkles size={18} color="var(--brand-terracotta)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {t('planner.budgetEngine', 'Smart Itinerary & Budget Engine')}
                  </span>
                </div>
                <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {t('planner.title', 'Trip Planner for')} {itinerary.summary.destinationName}
                </h1>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  {t('planner.subtitle', 'Intelligent, clustered daily travel plans crafted around your exact budget and travel style.')}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={() => setShowMap(true)}
                  className="map-toggle-btn"
                  aria-label="View Route Map"
                >
                  <Map size={16} /> {t('planner.viewRouteMap', 'View Route Map')}
                </button>

                <button
                  onClick={() => setShowSavedModal(true)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  aria-label="Open Saved Itineraries"
                >
                  <FolderOpen size={16} color="var(--brand-azure)" />
                  <span>My Saved Trips ({savedTrips.length})</span>
                </button>

                <button
                  onClick={handleSaveItinerary}
                  style={{
                    background: 'var(--brand-emerald)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
                  }}
                  aria-label="Save Itinerary"
                >
                  <Save size={16} />
                  <span>Save Plan</span>
                </button>

                <button
                  onClick={handleShareTrip}
                  style={{
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(194, 65, 12, 0.2)'
                  }}
                  aria-label="Share Itinerary"
                >
                  {shareSuccess ? <Check size={16} /> : <Share2 size={16} />}
                  {shareSuccess ? t('planner.linkCopied', 'Link Copied!') : t('planner.shareTrip', 'Share Itinerary')}
                </button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
                marginBottom: '20px',
                color: '#059669',
                fontSize: '0.86rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} /> {saveSuccessMsg}
              </div>
            )}

            {/* AI Natural Language Travel Prompt Bar */}
            <div style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
              border: '1.5px solid #fed7aa',
              borderRadius: 'var(--radius-xl)',
              padding: '24px 28px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={18} color="var(--brand-terracotta)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  AI Itinerary Creator
                </span>
              </div>
              
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Describe your dream getaway in plain natural language (destination, days, budget, interests):
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder='e.g. "I have ₹5000 and want to visit Yercaud for 2 days. I like nature and food."'
                  value={aiPromptInput}
                  onChange={e => setAiPromptInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerateWithAI()}
                  style={{
                    flex: 1,
                    minWidth: '280px',
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border-light)',
                    fontSize: '0.9rem',
                    background: '#ffffff',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)'
                  }}
                  aria-label="Natural language travel request"
                />

                <button
                  onClick={() => handleGenerateWithAI()}
                  disabled={isAiGenerating}
                  style={{
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '12px 24px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: isAiGenerating ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(194, 65, 12, 0.25)',
                    opacity: isAiGenerating ? 0.7 : 1
                  }}
                >
                  <Sparkles size={16} />
                  {isAiGenerating ? 'Generating...' : 'Generate Plan'}
                </button>
              </div>

              {/* Quick AI Prompt Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>Quick Examples:</span>
                {[
                  { label: "🌿 ₹5,000 • 2 Days in Yercaud", prompt: "I have ₹5000 and want to visit Yercaud for 2 days. I like nature and food." },
                  { label: "⛰️ ₹7,500 • 3 Days in Munnar", prompt: "I have ₹7500 and want a 3 day nature and photography trip to Munnar." },
                  { label: "🏛️ ₹4,500 • 2 Days in Chennai", prompt: "I have ₹4500 and want a 2 day heritage and coastal food trip to Chennai." },
                  { label: "🌲 ₹6,000 • 2 Days in Ooty", prompt: "I have ₹6000 and want to visit Ooty for 2 days for pine forests and lake walks." }
                ].map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiPromptInput(pill.prompt);
                      handleGenerateWithAI(pill.prompt);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #fed7aa',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 12px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {aiSuccessMsg && (
                <div style={{ marginTop: '12px', fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> {aiSuccessMsg}
                </div>
              )}
            </div>

            {/* 1. Trip Parameter Control Box */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Destination Selector */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {t('planner.destination', 'Destination')}
                  </label>
                  <select
                    value={selectedDestId}
                    onChange={e => setSelectedDestId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-light)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  >
                    {PLANNER_DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.state})</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {t('planner.duration', 'Duration')}
                  </label>
                  <select
                    value={daysCount}
                    onChange={e => setDaysCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-light)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  >
                    <option value={1}>1 Day Express</option>
                    <option value={2}>2 Days Weekend</option>
                    <option value={3}>3 Days Full Escape</option>
                    <option value={4}>4 Days Deep Dive</option>
                    <option value={5}>5 Days Extended</option>
                  </select>
                </div>

                {/* Travel Style */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {t('planner.style', 'Travel Style')}
                  </label>
                  <select
                    value={travelStyle}
                    onChange={e => setTravelStyle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-light)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  >
                    <option value="Budget">Budget Explorer</option>
                    <option value="Comfortable">Comfort Explorer</option>
                    <option value="Premium">Luxe / Premium</option>
                  </select>
                </div>

                {/* Travelers */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {t('planner.travelers', 'Travelers Count')}
                  </label>
                  <select
                    value={travelersCount}
                    onChange={e => setTravelersCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-light)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  >
                    <option value={1}>Solo (1 Person)</option>
                    <option value={2}>Duo (2 People)</option>
                    <option value={3}>Small Group (3 People)</option>
                    <option value={4}>Family (4 People)</option>
                  </select>
                </div>

              </div>

              {/* 2. Dynamic Budget Slider */}
              <div style={{
                background: 'var(--bg-tint-warm)',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sliders size={16} color="#d97706" /> {t('planner.budgetControl', 'Dynamic Budget Control')}:
                  </span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--brand-terracotta)', fontFamily: 'var(--font-display)' }}>
                    ₹{budget.toLocaleString('en-IN')}
                    <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)' }}> {t('planner.totalTrip', '(Total Trip)')}</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--brand-terracotta)',
                    cursor: 'pointer',
                    height: '6px'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#92400e', marginTop: '6px', fontWeight: 600 }}>
                  <span>₹2,000 (Backpacker Tier)</span>
                  <span>₹8,000 (Comfort Tier)</span>
                  <span>₹25,000+ (Premium Tier)</span>
                </div>
              </div>
            </div>

            {/* 3. Budget Engine Calculation Summary Box */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                    Budget Balancer Engine
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                    Estimated Trip Expense: ₹{itinerary.summary.estimatedTotalCost.toLocaleString('en-IN')}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-emerald)', textTransform: 'uppercase' }}>Remaining Buffer</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-emerald)' }}>
                      ₹{itinerary.summary.remainingBuffer.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="budget-progress-bar">
                <div style={{ width: '38%', background: '#7c3aed' }} title="Stay" />
                <div style={{ width: '28%', background: '#d97706' }} title="Food" />
                <div style={{ width: '18%', background: '#0284c7' }} title="Transport" />
                <div style={{ width: '10%', background: '#059669' }} title="Activities" />
                <div style={{ width: '6%', background: '#64748b' }} title="Misc" />
              </div>

              {/* Category Breakdown Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed' }}>🏡 STAY ({daysCount - 1} Nights)</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    ₹{itinerary.budgetBreakdown.stay.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706' }}>🍜 FOOD & DINING</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    ₹{itinerary.budgetBreakdown.food.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0284c7' }}>🚖 LOCAL TRANSIT</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    ₹{itinerary.budgetBreakdown.transport.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669' }}>🎟️ SIGHTS & PASSES</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    ₹{itinerary.budgetBreakdown.activities.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b' }}>🛡️ BUFFER & MISC</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    ₹{itinerary.budgetBreakdown.miscellaneous.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Tight Budget Advisory Tier Picker if tight */}
              {itinerary.summary.isTightBudget && (
                <div style={{
                  marginTop: '18px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={20} color="#dc2626" />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#dc2626' }}>
                        Your ₹{budget} budget may be tight for {daysCount} days.
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        Select a recommended plan tier to adjust:
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setBudget(itinerary.tierOptions.budgetPlan)}
                      style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Budget Plan: ₹{itinerary.tierOptions.budgetPlan}
                    </button>
                    <button
                      onClick={() => setBudget(itinerary.tierOptions.comfortPlan)}
                      style={{ background: 'var(--brand-terracotta)', color: '#fff', border: 'none', borderRadius: 'var(--radius-full)', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Comfort Plan: ₹{itinerary.tierOptions.comfortPlan}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Weather Intelligence Banner */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>{weather.icon}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {weather.weatherBadge}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    {weather.advisory}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <span>💧 Humidity: {weather.humidity}</span>
                <span>☀️ UV: {weather.uvIndex}</span>
                <span>🌅 Golden Hour: {weather.sunsetWindow}</span>
              </div>
            </div>

            {/* 4. Day Tabs & Smart Actions Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              
              {/* Day Selection Tabs */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {days.map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIdx(idx)}
                    style={{
                      background: selectedDayIdx === idx ? 'var(--brand-terracotta)' : '#ffffff',
                      color: selectedDayIdx === idx ? '#ffffff' : 'var(--text-secondary)',
                      border: selectedDayIdx === idx ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 20px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    DAY 0{d.dayNumber} — {d.zone}
                  </button>
                ))}
              </div>

              {/* Smart Actions Toolbar */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSmartReoptimize}
                  style={{ background: 'var(--brand-terracotta)', border: 'none', borderRadius: 'var(--radius-full)', padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)' }}
                >
                  <Sparkles size={14} color="#ffffff" /> Re-Optimize Schedule
                </button>
                <button
                  onClick={handleReduceCost}
                  style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <TrendingDown size={14} color="var(--brand-emerald)" /> Reduce Cost
                </button>
                <button
                  onClick={handleRelaxedPace}
                  style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Coffee size={14} color="var(--brand-amber)" /> Relaxed Pace
                </button>
                <button
                  onClick={handleSmartReoptimize}
                  style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Navigation size={14} color="var(--brand-azure)" /> Optimize Route
                </button>
              </div>
            </div>

            {/* 5. "Why This Plan?" Plain-English Insight Box */}
            <div style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
              border: '1px solid #fed7aa',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Info size={20} color="var(--brand-terracotta)" />
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                  Why this plan?
                </span>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 500 }}>
                  {currentDay.whyThisPlan}
                </p>
              </div>
            </div>

            {/* 5.5 AI Smart Delay & Crowd Alert Card */}
            {crowdedStopInfo && (
              <div style={{
                background: '#fff7ed',
                border: '2px solid #fdba74',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                marginBottom: '24px',
                boxShadow: '0 4px 16px rgba(234, 88, 12, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#ea580c', color: '#fff', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={13} /> CROWD ALERT
                    </div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#9a3412' }}>
                      {crowdedStopInfo.stop.title} is currently crowded ({crowdedStopInfo.stop.crowd.waitTime})
                    </span>
                  </div>

                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#c2410c', background: '#ffedd5', padding: '3px 10px', borderRadius: '999px', border: '1px solid #fed7aa' }}>
                    Recommended Visit: 06:30 PM • Suggested Delay: 1 hr
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#7c2d12', marginBottom: '12px', lineHeight: 1.5 }}>
                  <strong>Why:</strong> {crowdedStopInfo.stop.crowd.whyExplanation}
                </p>

                {/* 10 KM Alternative Recommendations */}
                {crowdedStopInfo.alternatives.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#9a3412', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      🌿 While you wait, explore nearby (Within 10 KM):
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                      {crowdedStopInfo.alternatives.map((alt) => (
                        <div
                          key={alt.id}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #fed7aa',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                                {alt.category}
                              </span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: alt.crowd.color, background: alt.crowd.bg, padding: '1px 6px', borderRadius: '999px', border: `1px solid ${alt.crowd.border}` }}>
                                {alt.crowd.tag}
                              </span>
                            </div>

                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                              {alt.name}
                            </h4>

                            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '6px', lineClamp: 2 }}>
                              {alt.desc}
                            </p>

                            <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px', flexWrap: 'wrap' }}>
                              <span>📍 {alt.distanceStr}</span>
                              <span>⏱️ ~{alt.transitMin}m transit</span>
                              <span>★ {alt.rating}</span>
                              <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>{alt.costStr}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => handleAddAlternativeWhileWaiting(alt)}
                              style={{
                                flex: 1,
                                background: 'var(--brand-terracotta)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                padding: '6px 10px',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              + Add While Waiting
                            </button>

                            <button
                              onClick={() => handleReplaceWithCrowdAlternative(alt)}
                              style={{
                                background: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '6px 8px',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                              title="Replace crowded stop with this alternative"
                            >
                              Replace Stop
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. Vertical Journey Timeline with Distance & Time Transitions */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {currentDay.theme}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Est. Daily Cost: ₹{currentDay.dailyCost} • Approx Transit: {currentDay.dailyTravelTime} mins
                  </span>
                </div>

                <button
                  onClick={handleAddStop}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={15} /> Add Custom Stop
                </button>
              </div>

              {/* Timeline Items */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {currentDay.stops?.map((stop, i) => (
                  <div key={stop.id || i} className="day-timeline-node">
                    
                    <div className="day-timeline-bullet">
                      {i + 1}
                    </div>

                    <div className="day-timeline-content">
                      
                      {/* Transition Route Indicator (Place A ↓ 2.4 km • 8 min ↓ Place B) */}
                      {stop.transition && (
                        <div style={{
                          background: 'var(--bg-surface)',
                          border: '1px dashed var(--border-light)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '0.74rem',
                          color: 'var(--text-muted)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Navigation size={13} color="var(--brand-terracotta)" />
                          <span><strong>{stop.transition.distance}</strong> • ~{stop.transition.travelTime} ({stop.transition.suggestedMode})</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-terracotta)', fontFamily: 'var(--font-mono)' }}>
                            ⏰ {stop.time}
                          </span>

                          {/* Stop Crowd Level Indicator */}
                          {(() => {
                            const crowd = getCrowdStatus(stop, stop.time);
                            return (
                              <span style={{
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                color: crowd.color,
                                background: crowd.bg,
                                border: `1px solid ${crowd.border}`,
                                borderRadius: '999px',
                                padding: '1px 8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}>
                                <Users size={10} color={crowd.color} />
                                {crowd.tag}
                              </span>
                            );
                          })()}

                          {/* Weather Impact Badge */}
                          {(() => {
                            const impact = getWeatherImpactForStop(stop, weather);
                            if (!impact.hasAdvisory) return null;
                            return (
                              <span style={{
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                color: impact.type === 'RAIN_WARNING' ? '#dc2626' : '#c2410c',
                                background: impact.type === 'RAIN_WARNING' ? '#fee2e2' : '#ffedd5',
                                border: `1px solid ${impact.type === 'RAIN_WARNING' ? '#fecaca' : '#fed7aa'}`,
                                borderRadius: '999px',
                                padding: '1px 8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}>
                                {impact.tag}
                              </span>
                            );
                          })()}
                        </div>

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          
                          {/* Replace Stop Button */}
                          <button
                            onClick={() => setReplacingStop(stop)}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-light)',
                              borderRadius: 'var(--radius-full)',
                              padding: '2px 8px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: 'var(--brand-azure)',
                              cursor: 'pointer'
                            }}
                          >
                            Replace Stop
                          </button>

                          {/* Reorder Buttons */}
                          <button
                            onClick={() => handleMove(i, -1)}
                            disabled={i === 0}
                            style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--text-faint)' : 'var(--text-secondary)', cursor: i === 0 ? 'default' : 'pointer' }}
                            title="Move Up"
                          >
                            <ArrowUp size={15} />
                          </button>
                          <button
                            onClick={() => handleMove(i, 1)}
                            disabled={i === currentDay.stops.length - 1}
                            style={{ background: 'none', border: 'none', color: i === currentDay.stops.length - 1 ? 'var(--text-faint)' : 'var(--text-secondary)', cursor: i === currentDay.stops.length - 1 ? 'default' : 'pointer' }}
                            title="Move Down"
                          >
                            <ArrowDown size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', paddingLeft: '4px' }}
                            title="Remove"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {stop.title}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                        {stop.desc}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                        <span>⏳ Est. Duration: {stop.duration}</span>
                        <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>Cost: {stop.cost}</span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 7. Replace Stop Alternative Modal */}
      {replacingStop && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(24, 24, 27, 0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2500,
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-floating)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  Replace "{replacingStop.title}"
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Choose from 3 nearby curated alternatives in {itinerary.summary.destinationName}
                </span>
              </div>
              <button
                onClick={() => setReplacingStop(null)}
                style={{ background: 'var(--bg-surface)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
              {getStopAlternatives(replacingStop, selectedDestId).map((alt, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectAlternative(alt)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  className="picked-card"
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                      {alt.category}
                    </span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0' }}>
                      {alt.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineClamp: 2 }}>
                      {alt.desc}
                    </p>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Duration: {alt.duration} • Cost: {alt.cost}
                    </div>
                  </div>

                  <button
                    style={{
                      background: 'var(--brand-terracotta)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 14px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Saved Trips Modal */}
      {showSavedModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(24, 24, 27, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2600,
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '640px',
            width: '100%',
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            boxShadow: 'var(--shadow-floating)',
            border: '1px solid var(--border-light)',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderOpen size={20} color="var(--brand-azure)" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    My Saved Custom Trips ({savedTrips.length})
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Saved itineraries with custom stops, budget settings, and crowd adjustments.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSavedModal(false)}
                style={{ background: 'var(--bg-surface)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
              {savedTrips.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                  <Calendar size={32} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>No saved trips yet</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Click "Save Plan" above to store your custom multi-day schedules.
                  </p>
                </div>
              ) : (
                savedTrips.map(trip => (
                  <div
                    key={trip.id}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                        {trip.destination?.name || 'Custom Trip'} • {trip.summary?.days || 2} Days
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px 0' }}>
                        {trip.title || 'Personalized Schedule'}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Budget: ₹{trip.summary?.budgetInput?.toLocaleString('en-IN') || 5000} • Style: {trip.summary?.travelStyle || 'Budget'} • {trip.days?.reduce((acc, d) => acc + (d.stops?.length || 0), 0) || 0} stops
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleLoadTrip(trip)}
                        style={{
                          background: 'var(--brand-terracotta)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 'var(--radius-full)',
                          padding: '6px 14px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Load Plan
                      </button>
                      <button
                        onClick={(e) => handleDeleteSavedTrip(trip.id, e)}
                        style={{
                          background: 'transparent',
                          color: '#ef4444',
                          border: '1px solid #fecaca',
                          borderRadius: 'var(--radius-full)',
                          padding: '6px 10px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="Delete Trip"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

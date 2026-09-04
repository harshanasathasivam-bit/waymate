import React, { useMemo } from 'react';
import {
  Compass, MapPin, Clock, CloudSun, Sparkles, Navigation,
  Star, ChevronRight, Bookmark, ArrowRight, Check, X, Shield, Share2
} from 'lucide-react';

export default function ContextualDiscoverPanel({
  destination,
  selectedPlace,
  onSelectPlace,
  onClearSelectedPlace,
  onSavePlace,
  isSaved,
  onOpenSOS
}) {
  // Determine time-of-day greeting & context recommendations
  const timeContext = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: "Good morning around you",
        subtitle: "Best sunrise viewpoints, morning mist trails & local breakfast spots",
        icon: "🌅",
        filterTag: "morning"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: "Good afternoon in the hills",
        subtitle: "Shaded tea factory tours, cave explorations & authentic thali diners",
        icon: "☀️",
        filterTag: "afternoon"
      };
    } else {
      return {
        greeting: "Good evening around you",
        subtitle: "Golden hour ridgelines, quiet waterfalls & authentic night bazaars",
        icon: "🌙",
        filterTag: "evening"
      };
    }
  }, []);

  const allRecommendations = useMemo(() => {
    const list = [];
    if (destination?.attractions) list.push(...destination.attractions.map(a => ({ ...a, section: 'Must-See Attraction' })));
    if (destination?.hiddenGems) list.push(...destination.hiddenGems.map(h => ({ ...h, section: '✨ Secret Unseen Spot' })));
    if (destination?.localPulse) list.push(...destination.localPulse.map(l => ({ ...l, section: 'Local Food & Craft' })));
    return list;
  }, [destination]);

  return (
    <div className="contextual-panel">
      {/* Panel Header */}
      <div className="panel-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>{timeContext.icon}</span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              {selectedPlace ? 'Place Journal' : timeContext.greeting}
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
            {selectedPlace ? `${selectedPlace.name} • ${destination?.name}` : `${destination?.name}, ${destination?.state}`}
          </span>
        </div>

        {selectedPlace && (
          <button
            onClick={onClearSelectedPlace}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '8px',
              color: '#cbd5e1',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Back to Recommendations"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Panel Body */}
      <div className="panel-body">
        {selectedPlace ? (
          /* ==========================================================================
             DETAILED PLACE JOURNAL INSPECTOR (When a place is clicked)
             ========================================================================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Main Photo */}
            <div style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img
                src={selectedPlace.photo || destination?.heroImage}
                alt={selectedPlace.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(8, 12, 22, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Star size={12} fill="#f59e0b" color="#f59e0b" /> {selectedPlace.rating || '4.8'}
              </div>
            </div>

            {/* Title & Metadata */}
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--terracotta-500)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {selectedPlace.category || 'Curated Spot'}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 8px 0', fontFamily: 'Outfit, sans-serif' }}>
                {selectedPlace.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="var(--terracotta-500)" /> {selectedPlace.distance || 'Near Center'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="var(--azure-500)" /> {selectedPlace.duration || selectedPlace.travelTime || '2 hrs'}
                </span>
              </div>
            </div>

            {/* Description / Why Visit */}
            <div style={{
              background: 'var(--ink-850)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px'
            }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {selectedPlace.type === 'unseen' ? 'Why Visit This Secret Spot' : 'About this Destination'}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {selectedPlace.whyVisit || selectedPlace.description || selectedPlace.story}
              </p>
            </div>

            {/* Local Tip Box */}
            {(selectedPlace.localTip || selectedPlace.localSecret) && (
              <div style={{
                background: 'rgba(234, 88, 12, 0.08)',
                border: '1px solid rgba(234, 88, 12, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--terracotta-500)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  💡 Local Secret & Insider Advice
                </div>
                <p style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                  {selectedPlace.localTip || selectedPlace.localSecret}
                </p>
              </div>
            )}

            {/* Safety / Terrain Alerts */}
            {selectedPlace.footwearAlert && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontSize: '0.8rem',
                color: '#fca5a5'
              }}>
                ⚠️ <strong>Trail Alert:</strong> {selectedPlace.footwearAlert} {selectedPlace.networkAlert && `(${selectedPlace.networkAlert})`}
              </div>
            )}

            {/* Cost & Best Time */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              <div style={{ background: 'var(--ink-850)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Approx. Cost</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  {selectedPlace.cost !== undefined ? (selectedPlace.cost === 0 ? 'Free Entry' : `₹${selectedPlace.cost}`) : (selectedPlace.pricePerNight ? `₹${selectedPlace.pricePerNight}/night` : selectedPlace.avgPrice || 'Standard')}
                </div>
              </div>

              <div style={{ background: 'var(--ink-850)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Best Timing</span>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8', marginTop: '4px' }}>
                  {selectedPlace.bestTime || selectedPlace.timing || 'Daylight Hours'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => onSavePlace && onSavePlace(selectedPlace)}
                style={{
                  flex: 1,
                  background: isSaved(selectedPlace.id) ? 'rgba(16, 185, 129, 0.2)' : 'var(--ink-850)',
                  border: isSaved(selectedPlace.id) ? '1px solid var(--pine-500)' : '1px solid var(--border-subtle)',
                  color: isSaved(selectedPlace.id) ? 'var(--pine-500)' : '#ffffff',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSaved(selectedPlace.id) ? <Check size={16} /> : <Bookmark size={16} />}
                {isSaved(selectedPlace.id) ? 'Saved in Journal' : 'Save to Journal'}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`${selectedPlace.name} - ${destination?.name} (${selectedPlace.distance})`);
                  alert('Copied location coordinates & details to clipboard!');
                }}
                style={{
                  background: 'var(--terracotta-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================================================
             DYNAMIC CONTEXTUAL DISCOVERY LIST (Time-of-day + Distance Radar)
             ========================================================================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Context Header Banner */}
            <div style={{
              background: 'var(--ink-850)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--terracotta-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Live Environmental Radar
                </span>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>
                  🌤️ {destination?.currentWeather?.temp} • {destination?.currentWeather?.condition}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {timeContext.subtitle}
              </p>
            </div>

            {/* List of Contextual Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allRecommendations.slice(0, 6).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="journal-card"
                  onClick={() => onSelectPlace && onSelectPlace(item)}
                  style={{ display: 'flex', gap: '14px', padding: '12px' }}
                >
                  <div style={{ width: '84px', height: '84px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={item.photo || destination?.heroImage}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.66rem', fontWeight: 700, color: item.type === 'unseen' ? 'var(--terracotta-500)' : 'var(--azure-500)', textTransform: 'uppercase' }}>
                          {item.type === 'unseen' ? '✨ Secret Spot' : item.category}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>
                          ⭐ {item.rating || '4.8'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', margin: '2px 0' }}>
                        {item.name}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      <span>📍 {item.distance || '1.4 km'}</span>
                      <span style={{ color: 'var(--terracotta-500)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        Explore <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Emergency Assistance Pill */}
            <div
              onClick={onOpenSOS}
              style={{
                marginTop: '10px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={18} color="#f87171" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>24/7 Verified Tourist Safety Guard</div>
                  <div style={{ fontSize: '0.72rem', color: '#f87171' }}>Instant hospital & police connection</div>
                </div>
              </div>
              <ChevronRight size={16} color="#f87171" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

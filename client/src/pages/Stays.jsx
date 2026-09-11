import React, { useState } from 'react';
import MapView from '../components/MapView';
import {
  Home, Star, Bookmark, Check, MapPin,
  Wifi, Coffee, Sparkles, Filter, ChevronRight,
  Map, List
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export default function Stays({
  destination,
  onSavePlace,
  isSaved,
  onOpenPlaceDetail
}) {
  const { t } = useLanguage();
  const stays = destination?.stays || [];
  const [selectedStay, setSelectedStay] = useState(null);
  const [filterPrice, setFilterPrice] = useState('all');
  const [showMap, setShowMap] = useState(false);

  const filteredStays = stays.filter(stay => {
    if (filterPrice === 'budget') return stay.pricePerNight < 3000;
    if (filterPrice === 'luxury') return stay.pricePerNight >= 5000;
    return true;
  });

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 71px)', background: 'var(--bg-page)' }}>
      
      {/* Floating Map/List Toggle */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="floating-map-toggle"
      >
        {showMap ? (
          <>
            <List size={18} /> {t('stays.listOnly', 'Show Stays List Only')}
          </>
        ) : (
          <>
            <Map size={18} /> {t('stays.viewOnMap', 'View Stays on Map')} ({filteredStays.length})
          </>
        )}
      </button>

      {showMap ? (
        /* Split Screen Mode */
        <div className="split-layout">
          <div className="split-content">
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Home size={18} color="var(--brand-terracotta)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Stays Map Discovery
                  </span>
                </div>
                <button onClick={() => setShowMap(false)} className="map-toggle-btn">
                  <List size={15} /> List Only
                </button>
              </div>

              <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
                {t('stays.title', 'Where to Stay in')} {destination?.name}
              </h1>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'all', label: t('stays.allStays', 'All Stays') },
                  { id: 'budget', label: t('stays.under3000', 'Under ₹3,000') },
                  { id: 'luxury', label: t('stays.luxury', 'Luxury (₹5,000+)') }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterPrice(tab.id)}
                    style={{
                      background: filterPrice === tab.id ? 'var(--text-primary)' : '#ffffff',
                      color: filterPrice === tab.id ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 12px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredStays.map(stay => (
                <div
                  key={stay.id}
                  onClick={() => {
                    setSelectedStay(stay);
                    onOpenPlaceDetail && onOpenPlaceDetail({
                      ...stay,
                      destination: destination?.name || stay.destination || 'Destination',
                      itemType: 'stays',
                      displayCost: `₹${stay.pricePerNight?.toLocaleString('en-IN')} / night`
                    });
                  }}
                  style={{
                    background: selectedStay?.id === stay.id ? 'var(--bg-tint-terracotta)' : '#ffffff',
                    border: selectedStay?.id === stay.id ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    gap: '16px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <img src={stay.photo} alt={stay.name} style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                        {stay.category}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#f59e0b', fontWeight: 700 }}>
                        ★ {stay.rating}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px 0' }}>
                      {stay.name}
                    </h4>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      📍 {stay.distance} • {stay.area}
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{stay.pricePerNight.toLocaleString('en-IN')} <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="split-map-container">
            <MapView
              places={filteredStays.map(s => ({
                ...s,
                lat: s.lat || destination?.attractions?.[0]?.lat || 13.0499,
                lng: s.lng || destination?.attractions?.[0]?.lng || 80.2824
              }))}
              selectedPlace={selectedStay}
              onSelectPlace={(s) => {
                setSelectedStay(s);
                onOpenPlaceDetail && onOpenPlaceDetail({
                  ...s,
                  destination: destination?.name || s.destination || 'Destination',
                  itemType: 'stays',
                  displayCost: `₹${s.pricePerNight?.toLocaleString('en-IN')} / night`
                });
              }}
            />
          </div>
        </div>
      ) : (
        /* Full Grid Mode */
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '36px 28px 80px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Home size={18} color="var(--brand-terracotta)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('stays.tagline', 'Handpicked Stays & Lodges')}
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                {t('stays.title', 'Where to Stay in')} {destination?.name}
              </h1>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: t('stays.allStays', 'All Stays') },
                { id: 'budget', label: t('stays.under3000', 'Under ₹3,000 / night') },
                { id: 'luxury', label: t('stays.luxury', 'Heritage & Luxury (₹5,000+)') }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterPrice(tab.id)}
                  style={{
                    background: filterPrice === tab.id ? 'var(--brand-terracotta)' : '#ffffff',
                    color: filterPrice === tab.id ? '#ffffff' : 'var(--text-secondary)',
                    border: filterPrice === tab.id ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {filteredStays.map(stay => (
              <div
                key={stay.id}
                onClick={() => onOpenPlaceDetail && onOpenPlaceDetail({
                  ...stay,
                  destination: destination?.name || stay.destination || 'Destination',
                  itemType: 'stays',
                  displayCost: `₹${stay.pricePerNight?.toLocaleString('en-IN')} / night`
                })}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  <div style={{ height: '220px', position: 'relative' }}>
                    <img src={stay.photo} alt={stay.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Star size={12} fill="#f59e0b" color="#f59e0b" /> {stay.rating}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSavePlace && onSavePlace(stay);
                      }}
                      className="editorial-card-save-btn"
                      title="Save Stay"
                      aria-label="Save Stay"
                    >
                      {isSaved && isSaved(stay.id) ? <Check size={16} color="var(--brand-emerald)" /> : <Bookmark size={16} />}
                    </button>
                  </div>

                  <div style={{ padding: '22px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                      {stay.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px 0' }}>
                      {stay.name}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      📍 {stay.distance} • {stay.area}
                    </div>

                    {/* Facilities */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {stay.facilities?.map((f, i) => (
                        <span key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '3px 8px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px 22px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('stays.from', 'From')}</span>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{stay.pricePerNight.toLocaleString('en-IN')}<span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}> {t('stays.night', '/ night')}</span>
                    </div>
                  </div>

                  <button
                    id="stay-card-book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPlaceDetail && onOpenPlaceDetail({
                        ...stay,
                        destination: destination?.name || stay.destination || 'Destination',
                        itemType: 'stays',
                        displayCost: `₹${stay.pricePerNight?.toLocaleString('en-IN')} / night`
                      });
                    }}
                    style={{
                      background: 'var(--brand-terracotta)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '10px 20px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {t('stays.bookStay', 'Book Stay')}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

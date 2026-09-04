import React from 'react';
import { Bookmark, Trash2, MapPin, Star, ArrowRight, Compass, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Saved({ savedPlaces = [], onRemoveSaved, onOpenPlaceDetail }) {
  const { t } = useLanguage();
  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 28px', minHeight: '60vh' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Bookmark size={18} color="var(--brand-terracotta)" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('saved.tagline', 'Personal Travel Journal')}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          {t('saved.title', 'Saved Places & Stays')} ({savedPlaces.length})
        </h1>
      </div>

      {savedPlaces.length === 0 ? (
        <div style={{
          background: '#ffffff',
          border: '1px dashed var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '60px 24px',
          textAlign: 'center'
        }}>
          <Bookmark size={36} color="var(--brand-terracotta)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {t('saved.emptyTitle', 'No Saved Places Yet')}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 20px auto' }}>
            {t('saved.emptyDesc', 'Tap the bookmark icon on any destination, stay, or hidden gem to save it to your personal travel pocket guide.')}
          </p>
          <Link
            to="/explore"
            style={{
              background: 'var(--brand-terracotta)',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.86rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Compass size={16} /> {t('saved.startExploring', 'Start Exploring Places')}
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {savedPlaces.map(place => (
            <div
              key={place.id}
              onClick={() => onOpenPlaceDetail && onOpenPlaceDetail(place)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ height: '160px', position: 'relative' }}>
                  <img
                    src={place.photo || place.image || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'}
                    alt={place.name || place.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(place.id);
                    }}
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
                      color: '#ef4444',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    title="Remove"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                    {place.category}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px 0' }}>
                    {place.name || place.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineClamp: 2, marginBottom: '10px' }}>
                    {place.shortDesc || place.description || place.whyVisit || place.story}
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                  <MapPin size={13} color="var(--brand-terracotta)" /> {place.distance || 'Central Area'}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={13} /> View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import React from 'react';
import {
  Compass, MapPin, Star, Clock, DollarSign, Leaf,
  Shield, BookOpen, ArrowRight, Sparkles, Navigation
} from 'lucide-react';

export default function AtlasView({ destination, onSelectPlace, onStartJourney }) {
  if (!destination) return null;

  return (
    <div className="atlas-container">
      {/* Editorial Spread Hero */}
      <div className="atlas-hero">
        <img
          src={destination.atlasCover || destination.heroImage}
          alt={destination.name}
          className="atlas-hero-img"
        />
        <div className="atlas-hero-overlay">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(234, 88, 12, 0.25)',
            border: '1px solid rgba(234, 88, 12, 0.5)',
            borderRadius: '999px',
            padding: '4px 14px',
            marginBottom: '14px',
            width: 'fit-content'
          }}>
            <Compass size={14} color="#f97316" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fed7aa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Atlas Dossier No. 04 • {destination.region}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'Outfit, var(--font-body)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '12px'
          }}>
            {destination.name}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#e2e8f0',
            maxWidth: '740px',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            {destination.tagline}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>

        {/* Editorial Pull Quote & Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
          <div>
            <blockquote className="atlas-quote">
              {destination.editorialQuote}
            </blockquote>
            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.8 }}>
              {destination.editorialStory}
            </p>
          </div>

          {/* Dossier Quick Facts Card */}
          <div style={{
            background: 'var(--ink-900)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-journal)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              Field Dossier & Climate
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Elevation</span>
                <strong style={{ color: '#ffffff' }}>{destination.elevation}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Best Exploration Season</span>
                <strong style={{ color: '#f59e0b' }}>{destination.bestTime}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Climate</span>
                <strong style={{ color: '#38bdf8' }}>{destination.currentWeather?.temp} • {destination.currentWeather?.condition}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Visitor Density</span>
                <strong style={{ color: '#10b981' }}>{destination.crowdIndex}</strong>
              </div>
            </div>

            <button
              onClick={onStartJourney}
              style={{
                width: '100%',
                marginTop: '22px',
                background: 'var(--terracotta-gradient)',
                border: 'none',
                color: '#ffffff',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} /> Open Visual Journey Builder
            </button>
          </div>
        </div>

        {/* Section: Must-See Landmarks Showcase */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--azure-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Curated Highlights
              </span>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginTop: '4px' }}>
                Iconic Sights & Sanctuaries
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {destination.attractions?.map(sight => (
              <div
                key={sight.id}
                className="journal-card"
                onClick={() => onSelectPlace && onSelectPlace(sight)}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ height: '200px', position: 'relative' }}>
                  <img src={sight.photo} alt={sight.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(8, 12, 22, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {sight.rating}
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--azure-500)', textTransform: 'uppercase' }}>
                    {sight.category}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '4px 0 8px 0', fontWeight: 700 }}>
                    {sight.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {sight.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                    <span>📍 {sight.distance}</span>
                    <span style={{ color: 'var(--terracotta-500)', fontWeight: 600 }}>Inspect Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Unseen & Hidden Treasures */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(20, 28, 48, 0.7) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.25)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--terracotta-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Secret Trails & Ridge Lines
            </span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginTop: '4px' }}>
              Unseen Gems: Beyond Tourist Routes
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {destination.hiddenGems?.map(gem => (
              <div
                key={gem.id}
                onClick={() => onSelectPlace && onSelectPlace(gem)}
                style={{
                  background: 'var(--ink-900)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--terracotta-500)', textTransform: 'uppercase' }}>
                  ✨ {gem.category}
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: '4px 0 8px 0' }}>
                  {gem.name}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {gem.whyVisit}
                </p>
                <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 600 }}>
                  Best Time: {gem.bestTime} • {gem.crowd}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

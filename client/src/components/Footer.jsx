import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onOpenSOS }) {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid var(--border-light)',
      padding: '50px 28px 30px 28px',
      color: 'var(--text-secondary)',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidht: '1360px',
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px'
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--brand-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Compass size={18} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              WAYMATE
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Your personalized destination companion. Discover verified attractions, secret neighborhood spots, authentic local kitchens, and smart multi-day journeys.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Discovery
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
            <li><Link to="/explore" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Explore Destinations</Link></li>
            <li><Link to="/trips" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Journey Timeline Builder</Link></li>
            <li><Link to="/nearby" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Around You Radar</Link></li>
            <li><Link to="/stays" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Curated Stays & Lodges</Link></li>
          </ul>
        </div>

        {/* Safety & Care */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Safety & Assistance
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
            <li><Link to="/safety" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Tourist Police & Hospital Directory</Link></li>
            <li><button onClick={onOpenSOS} style={{ background: 'none', border: 'none', padding: 0, color: '#dc2626', fontWeight: 600, fontSize: '0.86rem', cursor: 'pointer', textAlign: 'left' }}>24/7 Emergency SOS</button></li>
            <li><Link to="/profile" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Travel Circle Live Sharing</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Concierge Support
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <div>📍 Tamil Nadu & Kerala, South India</div>
            <div>📞 1800-WAY-MATE (Toll Free)</div>
            <div>✉️ concierge@waymate.travel</div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1360px',
        margin: '36px auto 0 auto',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div>© 2026 WayMate. Built with care for curious, mindful travelers.</div>
        <div style={{ display: 'flex', gap: '18px' }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}

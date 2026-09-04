import React from 'react';
import { Sparkles, Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenSOS }) {
  return (
    <footer style={{
      background: '#090d16',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '48px 24px 24px 24px',
      color: '#94a3b8',
      marginTop: '80px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
        {/* Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>SmartTour</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>
            Personalized Trip Creation Instead of Simple Package Selection. AI-driven recommendations based on budget, weather, demographics, and accessibility.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onOpenSOS} className="badge badge-rose" style={{ cursor: 'pointer', border: 'none' }}>
              <Shield size={14} /> Emergency SOS Hub
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '0.95rem' }}>Platform Features</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><Link to="/planner" style={linkStyle}>AI Multi-step Trip Planner</Link></li>
            <li><Link to="/destinations" style={linkStyle}>Smart Recommendation Engine</Link></li>
            <li><Link to="/hidden-gems" style={linkStyle}>Hidden Gems Explorer</Link></li>
            <li><Link to="/compare" style={linkStyle}>Destination Comparison Matrix</Link></li>
            <li><Link to="/experiences" style={linkStyle}>Local Experiences Marketplace</Link></li>
          </ul>
        </div>

        {/* Safety & Sustainable */}
        <div>
          <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '0.95rem' }}>Safety & Sustainability</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><Link to="/safety" style={linkStyle}>Destination Safety Reports</Link></li>
            <li><Link to="/safety" style={linkStyle}>Tourist Helpline & Hospitals</Link></li>
            <li><Link to="/destinations" style={linkStyle}>Eco Score & Sustainable Travel</Link></li>
            <li><Link to="/packages" style={linkStyle}>Customizable Tour Packages</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '0.95rem' }}>Contact & Assistance</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="#10b981" /> Salem, Tamil Nadu, India</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} color="#10b981" /> 1800-SMART-TOUR (24x7 Helpline)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="#10b981" /> support@smarttour.ai</div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '32px auto 0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        © 2026 SmartTour AI Platform. Built with intelligence for next-generation personalized travel.
      </div>
    </footer>
  );
}

const linkStyle = {
  color: '#94a3b8',
  textDecoration: 'none',
  transition: 'color 0.2s'
};

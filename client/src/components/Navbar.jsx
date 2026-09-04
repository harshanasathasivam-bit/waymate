import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Map, Shield, Heart, User, Menu, X, Bell, LayoutDashboard, Layers, Bookmark } from 'lucide-react';

export default function Navbar({ user, onLogout, onOpenSOS }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }} className="gradient-text">
              SmartTour
            </span>
            <span style={{ fontSize: '0.65rem', display: 'block', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '-4px' }}>
              AI Personal Tourism
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-menu">
          <Link to="/destinations" style={linkStyle}>
            <Compass size={18} /> Destinations
          </Link>
          <Link to="/planner" style={linkStyleHighlight}>
            <Sparkles size={18} /> AI Trip Planner
          </Link>
          <Link to="/hidden-gems" style={linkStyle}>
            <Map size={18} /> Hidden Gems
          </Link>
          <Link to="/compare" style={linkStyle}>
            <Layers size={18} /> Compare
          </Link>
          <Link to="/experiences" style={linkStyle}>
            <Heart size={18} /> Experiences
          </Link>
          <Link to="/safety" style={linkStyle}>
            <Shield size={18} /> Safety & SOS
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ ...linkStyle, color: '#fbbf24' }}>
              <LayoutDashboard size={18} /> Admin
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Emergency SOS Button */}
          <button 
            onClick={onOpenSOS}
            className="badge badge-rose"
            style={{ cursor: 'pointer', padding: '8px 14px', border: 'none' }}
          >
            <Shield size={16} /> SOS
          </button>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
            >
              <Bell size={20} />
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }} />
            </button>
            {notificationsOpen && (
              <div className="glass-panel" style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                width: '280px',
                padding: '16px',
                zIndex: 100
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#f8fafc' }}>Notifications</h4>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  🌤️ <strong>Munnar Weather Alert:</strong> Mild evening mist expected. Great for tea garden walks.
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', padding: '8px 0' }}>
                  💡 <strong>Budget Tip:</strong> Save 15% on Ooty trips by booking local toy train early.
                </div>
              </div>
            )}
          </div>

          {/* Dashboard / User Profile */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/dashboard" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                <User size={16} /> {user.name.split(' ')[0]}
              </Link>
              <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'none' }}
            className="mobile-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'color 0.2s ease'
};

const linkStyleHighlight = {
  ...linkStyle,
  color: '#34d399',
  fontWeight: 600
};

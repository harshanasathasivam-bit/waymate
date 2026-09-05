import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Compass, Map, Bookmark, Radio, Home as HomeIcon,
  User, Shield, ChevronDown, MapPin, Globe
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import DestinationPickerModal from './DestinationPickerModal';

export default function Navbar({
  destinations = [],
  currentDestination,
  onSelectDestination,
  onOpenSOS,
  savedCount = 0
}) {
  const location = useLocation();
  const { currentLang, setLanguage, t, currentLangMeta, supportedLangs } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-navbar">
      <div className="nav-container">
        
        {/* Brand & Quick Destination Picker */}
        <div className="nav-brand-group">
          <Link to="/" className="nav-brand">
            <div className="nav-brand-icon">
              <Compass size={20} />
            </div>
            <span className="nav-brand-title">{t('nav.brand', 'WAYMATE')}</span>
          </Link>

          {/* Quick Destination Switcher for Tamil Nadu */}
          <div>
            <button
              onClick={() => setDestModalOpen(true)}
              style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-terracotta)';
                e.currentTarget.style.background = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.background = 'var(--bg-surface)';
              }}
              title="Click to search and select places in Tamil Nadu"
            >
              <MapPin size={14} color="var(--brand-terracotta)" />
              <span>{currentDestination?.name || 'Chennai'}</span>
              <span style={{
                fontSize: '0.68rem',
                color: 'var(--brand-terracotta)',
                background: 'rgba(194, 65, 12, 0.08)',
                padding: '1px 6px',
                borderRadius: '4px',
                fontWeight: 700
              }}>
                TN
              </span>
              <ChevronDown size={13} color="var(--text-muted)" />
            </button>

            {/* Comprehensive Tamil Nadu Destination & District Picker Modal */}
            <DestinationPickerModal
              isOpen={destModalOpen}
              onClose={() => setDestModalOpen(false)}
              destinations={destinations}
              currentDestination={currentDestination}
              onSelectDestination={onSelectDestination}
            />
          </div>
        </div>

        {/* Clean Top Navigation */}
        <nav className="nav-links">
          <Link
            to="/explore"
            className={`nav-link-btn ${isActive('/explore') ? 'active' : ''}`}
          >
            <Compass size={16} /> {t('nav.explore', 'Explore')}
          </Link>

          <Link
            to="/trips"
            className={`nav-link-btn ${isActive('/trips') || isActive('/trip-planner') ? 'active' : ''}`}
          >
            <Map size={16} /> {t('nav.trips', 'Trips')}
          </Link>

          <Link
            to="/saved"
            className={`nav-link-btn ${isActive('/saved') ? 'active' : ''}`}
          >
            <Bookmark size={16} /> {t('nav.saved', 'Saved')} {savedCount > 0 && `(${savedCount})`}
          </Link>

          <Link
            to="/nearby"
            className={`nav-link-btn ${isActive('/nearby') ? 'active' : ''}`}
          >
            <Radio size={16} /> {t('nav.nearby', 'Nearby')}
          </Link>

          <Link
            to="/stays"
            className={`nav-link-btn ${isActive('/stays') ? 'active' : ''}`}
          >
            <HomeIcon size={16} /> {t('nav.stays', 'Stays')}
          </Link>

          <Link
            to="/profile"
            className={`nav-link-btn ${isActive('/profile') ? 'active' : ''}`}
          >
            <User size={16} /> {t('nav.profile', 'Profile')}
          </Link>
        </nav>

        {/* Right Action Area: Global Language Selector + Emergency SOS */}
        <div className="nav-actions-group">
          
          {/* Global Website Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
              title="Change Website Language"
            >
              <Globe size={14} color="var(--brand-terracotta)" />
              <span>{currentLangMeta.native}</span>
              <ChevronDown size={12} color="var(--text-muted)" />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '36px',
                right: 0,
                width: '160px',
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-floating)',
                zIndex: 2100,
                display: 'flex',
                flexDirection: 'column',
                padding: '5px',
                gap: '2px'
              }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '4px 8px' }}>
                  Select Language
                </span>
                {supportedLangs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      background: l.code === currentLang ? 'var(--bg-surface)' : 'transparent',
                      border: 'none',
                      padding: '7px 9px',
                      fontSize: '0.82rem',
                      fontWeight: l.code === currentLang ? 800 : 500,
                      color: l.code === currentLang ? 'var(--brand-terracotta)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{l.native}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Link */}
          {isAuthenticated && user ? (
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px 3px 4px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 700
              }}
              title="My Account"
            >
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"}
                alt={user.name}
                style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span>{user.name?.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 12px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}
            >
              <User size={13} color="var(--brand-terracotta)" />
              <span>{t('auth.signIn', 'Sign In')}</span>
            </Link>
          )}

          {/* SOS Trigger */}
          <button
            onClick={onOpenSOS}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#dc2626',
              borderRadius: 'var(--radius-full)',
              padding: '5px 12px',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap'
            }}
          >
            <Shield size={13} /> {t('nav.safety', 'Safety & SOS')}
          </button>
        </div>

      </div>
    </header>
  );
}

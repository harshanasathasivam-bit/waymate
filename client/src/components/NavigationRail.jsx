import React from 'react';
import {
  Compass, Map, Radio, Home as HomeIcon, UtensilsCrossed,
  Sparkles, Users, Wallet, Shield, Bookmark, AlertCircle
} from 'lucide-react';

export default function NavigationRail({ activeTab, onSelectTab, onOpenSOS, savedCount = 0 }) {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'trips', label: 'Trips', icon: Map },
    { id: 'nearby', label: 'Nearby', icon: Radio },
    { id: 'stays', label: 'Stays', icon: HomeIcon },
    { id: 'local', label: 'Local', icon: UtensilsCrossed },
    { id: 'unseen', label: 'Unseen', icon: Sparkles },
    { id: 'circle', label: 'Circle', icon: Users },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount > 0 ? savedCount : null }
  ];

  return (
    <aside className="nav-rail">
      {/* Brand Icon Emblem */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        marginBottom: '12px'
      }} onClick={() => onSelectTab('explore')}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--terracotta-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Compass size={22} color="#ffffff" />
        </div>
        <span style={{
          fontSize: '0.62rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ffffff',
          fontFamily: 'Outfit, sans-serif'
        }}>
          WayMate
        </span>
      </div>

      {/* Navigation Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', alignItems: 'center' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`nav-rail-item ${isActive ? 'active' : ''}`}
              title={item.label}
              style={{ position: 'relative' }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '6px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--terracotta-500)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SOS Quick Button at Bottom */}
      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <button
          onClick={onOpenSOS}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Emergency Tourist SOS"
        >
          <AlertCircle size={20} />
        </button>
      </div>
    </aside>
  );
}

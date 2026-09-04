import React, { useState, useEffect } from 'react';
import {
  Users, Shield, MapPin, Share2, CheckCircle, Battery,
  Bookmark, Calendar, Settings, LogOut, User, Sparkles,
  Globe, Heart, ArrowRight, Compass, Edit3, Check, Plus, AlertCircle
} from 'lucide-react';
import { INITIAL_COMPANIONS } from '../data/travelDatabase';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, isAuthenticated, logout, updateProfile, plannedTrips } = useAuth();
  const { currentLang, setLanguage, t, supportedLangs } = useLanguage();
  const navigate = useNavigate();

  const [sharing, setSharing] = useState(true);
  const [companions, setCompanions] = useState(INITIAL_COMPANIONS);
  const [inviteCode] = useState('WAY-CHENNAI-884');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinMsg, setJoinMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Preference edit states
  const [travelStyle, setTravelStyle] = useState(user?.preferences?.travelStyle || 'Comfortable');
  const [budgetRange, setBudgetRange] = useState(user?.preferences?.budgetRange || '₹5,000 - ₹15,000');
  const [prefSaved, setPrefSaved] = useState(false);

  // Fetch companion status from backend with polling
  const fetchCompanionStatus = async () => {
    try {
      const res = await fetch('/api/auth/travel-circle/status');
      if (res.ok) {
        const data = await res.json();
        if (data.companions && data.companions.length > 0) {
          setCompanions(data.companions);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchCompanionStatus();
    const interval = setInterval(fetchCompanionStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Toggle location sharing
  const handleToggleSharing = async () => {
    const nextState = !sharing;
    setSharing(nextState);
    try {
      await fetch('/api/auth/travel-circle/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          name: user?.name || 'Explorer',
          isSharing: nextState,
          destination: user?.homeLocation?.split(',')[0] || 'Munnar',
          approxLocation: nextState ? 'Near City Center' : 'Sharing Paused',
          battery: 88
        })
      });
      fetchCompanionStatus();
    } catch (e) {}
  };

  // Join Travel Circle with code
  const handleJoinCircle = async (e) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    try {
      const res = await fetch('/api/auth/travel-circle/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinCodeInput.trim() })
      });
      const data = await res.json();
      setJoinMsg(data.message || 'Connected to Travel Circle!');
      setJoinCodeInput('');
      setTimeout(() => setJoinMsg(''), 4000);
    } catch (e) {
      setJoinMsg('Connected locally to Circle (Offline Mode)');
      setJoinCodeInput('');
      setTimeout(() => setJoinMsg(''), 4000);
    }
  };

  // Saved places count from localStorage
  const savedPlaces = (() => {
    try {
      const s = localStorage.getItem('waymate_user_saved');
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  })();

  const handleCopyInvite = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Join my WayMate Travel Circle: Code ${inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    updateProfile({
      preferences: {
        travelStyle,
        budgetRange
      }
    });
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '40px auto 80px auto', padding: '0 28px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <User size={18} color="var(--brand-terracotta)" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('profile.tagline', 'Traveler Account')}
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
          {t('profile.title', 'Profile & Travel Circle')}
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t('profile.subtitle', 'Manage your account, travel circle companion live ETA sharing, and personal preferences.')}
        </p>
      </div>

      {/* User Account Overview Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
            alt="User"
            style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {user ? user.name : 'Adventurous Explorer'}
              </h2>
              <span style={{ fontSize: '0.7rem', background: 'var(--bg-tint-terracotta)', color: 'var(--brand-terracotta)', fontWeight: 800, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {user?.role === 'admin' ? 'Verified Admin' : 'WayMate Explorer'}
              </span>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
              {user ? user.email : 'Guest Session • Personal Pocket Guide'} • {user?.homeLocation || 'Salem, Tamil Nadu'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Location Sharing Toggle */}
          <button
            onClick={handleToggleSharing}
            style={{
              background: sharing ? 'rgba(5, 150, 105, 0.1)' : 'var(--bg-surface)',
              border: sharing ? '1px solid var(--brand-emerald)' : '1px solid var(--border-light)',
              color: sharing ? 'var(--brand-emerald)' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 18px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {sharing ? '● Location Sharing Active' : '○ Sharing Paused'}
          </button>

          {/* Login or Logout Button */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#dc2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              style={{
                background: 'var(--brand-terracotta)',
                color: '#ffffff',
                borderRadius: 'var(--radius-full)',
                padding: '8px 20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 4px 12px rgba(194, 65, 12, 0.25)'
              }}
            >
              <Sparkles size={14} /> Sign In / Register
            </Link>
          )}
        </div>
      </div>

      {/* Grid: Saved Places & Planned Trips Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        
        {/* Saved Places Metric Card */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} color="var(--brand-terracotta)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Saved Pocket Guide
              </h3>
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-terracotta)' }}>
              {savedPlaces.length}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
            {savedPlaces.length > 0
              ? `You have bookmarked ${savedPlaces.length} destinations, stays, and culinary spots.`
              : 'You have not saved any places yet. Tap the bookmark icon while exploring.'
            }
          </p>
          <Link
            to="/saved"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--brand-terracotta)',
              textDecoration: 'none'
            }}
          >
            <span>View All Saved Places</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Planned Trips Metric Card */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--brand-azure)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Custom Itineraries
              </h3>
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-azure)' }}>
              {plannedTrips.length || 1}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
            Dynamic, budget-balanced multi-day travel schedules crafted with WayMate AI Planner.
          </p>
          <Link
            to="/trips"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--brand-azure)',
              textDecoration: 'none'
            }}
          >
            <span>Open Trip Planner</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Travel Preferences Section */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
              Travel Preferences & Language
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Personalize recommendations and platform behavior.
            </p>
          </div>

          {prefSaved && (
            <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.78rem', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={14} /> Preferences Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSavePreferences} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          
          {/* Travel Style */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Travel Style
            </label>
            <select
              value={travelStyle}
              onChange={e => setTravelStyle(e.target.value)}
              style={selectStyle}
            >
              <option value="Budget">Budget Backpacker</option>
              <option value="Comfortable">Comfortable / Family Leisure</option>
              <option value="Premium">Heritage & Luxury</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Typical Trip Budget
            </label>
            <select
              value={budgetRange}
              onChange={e => setBudgetRange(e.target.value)}
              style={selectStyle}
            >
              <option value="Under ₹5,000">Under ₹5,000 (Weekend Getaway)</option>
              <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000 (Standard)</option>
              <option value="₹15,000+">₹15,000+ (Extended Holiday)</option>
            </select>
          </div>

          {/* Global Language */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Website Language
            </label>
            <select
              value={currentLang}
              onChange={e => setLanguage(e.target.value)}
              style={selectStyle}
            >
              {supportedLangs.map(l => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              type="submit"
              style={{
                background: 'var(--text-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 20px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Save Preferences
            </button>
          </div>

        </form>
      </div>

      {/* Travel Circle Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--brand-azure)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
                {t('profile.circleTitle', 'Active Travel Circle')}
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {t('profile.circleSubtitle', 'Live location coordinates and destination ETAs shared with trusted companions.')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleToggleSharing}
              style={{
                background: sharing ? 'rgba(5, 150, 105, 0.1)' : 'var(--bg-surface)',
                border: sharing ? '1px solid var(--brand-emerald)' : '1px solid var(--border-light)',
                color: sharing ? 'var(--brand-emerald)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {sharing ? '● Location Sharing ON' : '○ Sharing Paused'}
            </button>

            <button
              onClick={handleCopyInvite}
              style={{
                background: 'var(--brand-terracotta)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(194, 65, 12, 0.25)'
              }}
            >
              {copied ? <CheckCircle size={14} /> : <Share2 size={14} />}
              {copied ? 'Code Copied!' : `Invite Code (${inviteCode})`}
            </button>
          </div>
        </div>

        {/* Join Circle Form */}
        <form onSubmit={handleJoinCircle} style={{
          background: 'var(--bg-surface)',
          border: '1px dashed var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Join Companion Circle:
          </span>
          <input
            type="text"
            placeholder="Enter Circle Code (e.g. WAY-CHENNAI-884)"
            value={joinCodeInput}
            onChange={e => setJoinCodeInput(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              background: '#ffffff',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--text-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Connect
          </button>
          {joinMsg && (
            <span style={{ fontSize: '0.76rem', color: 'var(--brand-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={13} /> {joinMsg}
            </span>
          )}
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {companions.map(comp => (
            <div
              key={comp.id}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={comp.avatar} alt={comp.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {comp.name}
                    </h4>
                    <span style={{ fontSize: '0.66rem', background: comp.status === 'Active' ? '#ecfdf5' : '#f3f4f6', color: comp.status === 'Active' ? '#059669' : '#6b7280', fontWeight: 700, padding: '1px 6px', borderRadius: '999px' }}>
                      {comp.status || 'Active'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    📍 {comp.currentPlace}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--brand-azure)', fontWeight: 600, marginTop: '2px' }}>
                    Heading to: {comp.destination} (ETA {comp.eta})
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                <span>🔋 {comp.battery}%</span>
                <span>•</span>
                <span>Updated: {comp.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const selectStyle = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-sm)',
  padding: '10px 14px',
  color: 'var(--text-primary)',
  fontSize: '0.86rem',
  fontWeight: 600,
  outline: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer'
};

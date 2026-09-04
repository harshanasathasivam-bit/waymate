import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, MapPin, ArrowRight, CheckCircle2, Shield, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register';

  const { login, register, isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  const [isRegister, setIsRegister] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeLocation, setHomeLocation] = useState('Salem, Tamil Nadu');
  const [travelStyle, setTravelStyle] = useState('Comfortable');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to profile
  if (isAuthenticated && user) {
    navigate('/profile');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      let result;
      if (isRegister) {
        result = await register({
          name: name.trim(),
          email: email.trim(),
          password,
          homeLocation,
          preferences: { travelStyle }
        });
      } else {
        result = await login(email.trim(), password);
      }

      if (result.success) {
        navigate('/profile');
      } else {
        setErrorMsg(result.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 71px)', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      
      <div style={{
        maxWidth: '460px',
        width: '100%',
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        padding: '36px 32px',
        position: 'relative'
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--bg-tint-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            color: 'var(--brand-terracotta)',
            border: '1px solid #fed7aa'
          }}>
            <Compass size={24} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '0 0 6px 0' }}>
            {isRegister ? t('auth.createAccount', 'Create WayMate Account') : t('auth.welcomeBack', 'Welcome Back')}
          </h2>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
            {isRegister
              ? t('auth.createSubtitle', 'Save custom itineraries, travel circles & personal preferences.')
              : t('auth.loginSubtitle', 'Sign in to access your saved places and trip plans.')
            }
          </p>
        </div>

        {/* Toggle Mode Tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
            style={{
              flex: 1,
              background: !isRegister ? '#ffffff' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '8px 0',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: !isRegister ? 'var(--brand-terracotta)' : 'var(--text-secondary)',
              cursor: 'pointer',
              boxShadow: !isRegister ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            {t('auth.signIn', 'Sign In')}
          </button>

          <button
            type="button"
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
            style={{
              flex: 1,
              background: isRegister ? '#ffffff' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '8px 0',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: isRegister ? 'var(--brand-terracotta)' : 'var(--text-secondary)',
              cursor: 'pointer',
              boxShadow: isRegister ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            {t('auth.register', 'Register')}
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', marginBottom: '18px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {isRegister && (
            <div>
              <label style={labelStyle}>
                <User size={13} color="var(--brand-terracotta)" /> {t('auth.fullName', 'Full Name')}
              </label>
              <input
                type="text"
                required
                placeholder="Ramesh Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>
              <Mail size={13} color="var(--brand-terracotta)" /> {t('auth.email', 'Email Address')}
            </label>
            <input
              type="email"
              required
              placeholder="explorer@waymate.travel"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              <Lock size={13} color="var(--brand-terracotta)" /> {t('auth.password', 'Password')}
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {isRegister && (
            <>
              <div>
                <label style={labelStyle}>
                  <MapPin size={13} color="var(--brand-terracotta)" /> {t('auth.homeCity', 'Home City / Starting Point')}
                </label>
                <input
                  type="text"
                  placeholder="Salem, Tamil Nadu"
                  value={homeLocation}
                  onChange={e => setHomeLocation(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  <Sparkles size={13} color="var(--brand-terracotta)" /> Preferred Travel Style
                </label>
                <select
                  value={travelStyle}
                  onChange={e => setTravelStyle(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="Budget">Budget Traveler</option>
                  <option value="Comfortable">Comfortable / Family</option>
                  <option value="Premium">Heritage & Luxury</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '8px',
              background: 'var(--brand-terracotta)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(194, 65, 12, 0.25)',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <span>{isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In to WayMate')}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Quick Login Helper */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Quick demo credentials: <strong>demo@waymate.travel</strong> (Password: <strong>demo123</strong>)
          </span>
        </div>

      </div>

    </div>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '0.78rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-sm)',
  padding: '10px 14px',
  color: 'var(--text-primary)',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

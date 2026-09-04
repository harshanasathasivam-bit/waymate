import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeLocation, setHomeLocation] = useState('Salem');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    const payload = isRegister ? { name, email, password, homeLocation } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        onLoginSuccess(data.user, data.token);
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Authentication failed');
      }
    } catch (err) {
      setErrorMsg('Server connection error.');
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '80px auto', padding: '0 24px' }}>
      <div className="glass-panel" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <Sparkles size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif' }}>
            {isRegister ? 'Create SmartTour Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            {isRegister ? 'Save your custom itineraries & preferences' : 'Access your saved trips and personalized plans'}
          </p>
        </div>

        {errorMsg && (
          <div className="badge badge-rose" style={{ width: '100%', padding: '10px', marginBottom: '16px', justifyContent: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={labelStyle}>Full Name</label>
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
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              required
              placeholder="user@smarttour.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
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
            <div>
              <label style={labelStyle}>Home City / Starting Point</label>
              <input
                type="text"
                placeholder="Salem, Tamil Nadu"
                value={homeLocation}
                onChange={e => setHomeLocation(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center', padding: '14px' }}>
            {isRegister ? 'Sign Up & Start Planning' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            style={{ background: 'transparent', border: 'none', color: '#34d399', fontWeight: 600, cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  color: '#cbd5e1',
  marginBottom: '4px'
};

const inputStyle = {
  width: '100%',
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.9rem'
};

import React, { useState } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, X, CheckCircle, Share2 } from 'lucide-react';

export default function SOSModal({ isOpen, onClose }) {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCoords = "Lat: 10.0889, Lng: 77.0595 (Munnar Hill District)";

  const handleTrigger = () => {
    setSosTriggered(true);
  };

  const handleShareLocation = () => {
    navigator.clipboard?.writeText(`EMERGENCY SOS! I am located at ${currentCoords}. Please contact tourist helpline immediately.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '24px',
        border: '1px solid rgba(244, 63, 94, 0.4)',
        boxShadow: '0 0 40px rgba(244, 63, 94, 0.3)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={22} color="#f43f5e" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>Tourist Emergency SOS System</h3>
              <span style={{ fontSize: '0.75rem', color: '#fb7185' }}>24x7 Safety Assistance</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {!sosTriggered ? (
          <div>
            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <AlertTriangle size={36} color="#f43f5e" style={{ marginBottom: '8px' }} />
              <h4 style={{ color: '#f8fafc', marginBottom: '4px' }}>Need Immediate Help?</h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Pressing the SOS button will display direct tourist helplines and share your real-time coordinates with saved emergency contacts.
              </p>
            </div>

            {/* Current Coordinates preview */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <MapPin size={18} color="#10b981" />
              <span>Current GPS Location: <strong>{currentCoords}</strong></span>
            </div>

            {/* SOS Trigger Button */}
            <button
              onClick={handleTrigger}
              className="btn-danger"
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem', fontWeight: 700, borderRadius: '12px' }}
            >
              🚨 TRIGGER EMERGENCY SOS NOW
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="badge badge-rose" style={{ padding: '8px 16px', fontSize: '0.9rem', marginBottom: '16px' }}>
              <CheckCircle size={18} /> SOS DISPATCH ACTIVATED
            </div>
            <h4 style={{ color: '#f8fafc', marginBottom: '12px' }}>Emergency Contacts & Helplines</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={contactBoxStyle}>
                <Phone size={18} color="#f43f5e" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>National Emergency Helpline</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fb7185' }}>112 / 108 (Ambulance)</div>
                </div>
              </div>
              <div style={contactBoxStyle}>
                <Shield size={18} color="#38bdf8" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Tourist Police Station</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>+91 4865 230323</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShareLocation}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
            >
              <Share2 size={16} /> {copied ? "Location Copied to Clipboard!" : "Share GPS Location"}
            </button>

            <button
              onClick={() => setSosTriggered(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Reset SOS Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const contactBoxStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

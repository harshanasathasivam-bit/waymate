import React, { useState } from 'react';
import { Shield, Phone, MapPin, X, Check, Share2, AlertCircle } from 'lucide-react';

export default function SOSModal({ isOpen, onClose, destination }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCoords = destination?.name ? `${destination.name}, ${destination.state}` : "Chennai, Tamil Nadu";

  const handleShare = () => {
    navigator.clipboard?.writeText(`EMERGENCY ASSISTANCE NEEDED: Current location is ${currentCoords}. Please contact tourist helpline.`);
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
      background: 'rgba(24, 24, 27, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        boxShadow: 'var(--shadow-floating)',
        border: '1px solid var(--border-light)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Tourist Safety & Emergency
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Verified Emergency Hotlines</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--bg-surface)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Current Location */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.84rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <MapPin size={16} color="var(--brand-terracotta)" />
          <span>Current Location: <strong>{currentCoords}</strong></span>
        </div>

        {/* Hotlines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>National Emergency</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#dc2626' }}>112 / 108 (Ambulance)</div>
            </div>
            <a href="tel:112" style={{ background: '#dc2626', color: '#fff', borderRadius: 'var(--radius-full)', padding: '6px 14px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700 }}>
              Call Now
            </a>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Tourist Police Desk</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>1800-4253-1111</div>
            </div>
            <a href="tel:180042531111" style={{ background: 'var(--text-primary)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '6px 14px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700 }}>
              Call Desk
            </a>
          </div>
        </div>

        {/* Share Location Button */}
        <button
          onClick={handleShare}
          style={{
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {copied ? <Check size={16} color="var(--brand-emerald)" /> : <Share2 size={16} />}
          {copied ? 'Coordinates Copied to Clipboard!' : 'Copy Real-Time Coordinates to Share'}
        </button>
      </div>
    </div>
  );
}

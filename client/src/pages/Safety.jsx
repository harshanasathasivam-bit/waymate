import React from 'react';
import { Shield, Phone, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Safety({ destination, onOpenSOS }) {
  const safetyList = destination?.safetyDirectory || [];

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 28px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Shield size={18} color="#dc2626" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Traveler Protection
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          Safety & Emergency Support in {destination?.name}
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Verified 24/7 hospitals, tourist police assistance, and regional travel guidelines.
        </p>
      </div>

      {/* Safety Score Banner */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-emerald)' }}>
            <CheckCircle2 size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Destination Safety Index: 98.4 / 100
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Very safe destination for solo travelers, families, and evening walks.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSOS}
          style={{
            background: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '10px 20px',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🚨 Trigger Emergency SOS
        </button>
      </div>

      {/* Verified Directory List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          Verified Helplines & Medical Posts
        </h3>

        {safetyList.map((item, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: item.type === 'hospital' ? '#dc2626' : 'var(--brand-azure)', textTransform: 'uppercase' }}>
                {item.type === 'hospital' ? '🏥 24/7 Hospital' : '🛡️ Tourist Police'}
              </span>
              <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px 0' }}>
                {item.name}
              </h4>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                📍 {item.address} ({item.distance})
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {item.services}
              </p>
            </div>

            <div>
              <a
                href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 18px',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={14} color="var(--brand-terracotta)" /> {item.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

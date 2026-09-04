import React from 'react';
import { Shield, Phone, MapPin, AlertTriangle, Hospital, CheckCircle2 } from 'lucide-react';

export default function Safety({ onOpenSOS }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-rose" style={{ marginBottom: '12px' }}>
          <Shield size={16} /> Tourist Safety System
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Safety, Emergency & Location Hub
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Verified emergency contacts, district tourist police desks, hospital coordinates, and instant SOS location sharing.
        </p>
      </div>

      {/* Instant SOS Banner */}
      <div className="glass-panel" style={{ padding: '32px', border: '1px solid rgba(244, 63, 94, 0.4)', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(225, 29, 72, 0.1) 100%)', marginBottom: '40px', textAlign: 'center' }}>
        <Shield size={48} color="#f43f5e" style={{ marginBottom: '12px' }} />
        <h2 style={{ fontSize: '1.8rem', color: '#f8fafc', marginBottom: '8px' }}>
          Interactive Emergency SOS Trigger
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '0.95rem' }}>
          If you encounter any emergency during transit or at a destination, tap the SOS button to instantly access verified emergency call lines and broadcast your GPS coordinates.
        </p>
        <button onClick={onOpenSOS} className="btn-danger" style={{ padding: '16px 36px', fontSize: '1.1rem', fontWeight: 700 }}>
          🚨 Launch Emergency SOS Dispatch
        </button>
      </div>

      {/* Emergency Phone Directory */}
      <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '20px' }}>Verified Tourist Helpline Directory</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <Phone size={24} color="#f43f5e" />
            <div>
              <h4 style={{ color: '#f8fafc' }}>National Emergency Response</h4>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fb7185' }}>112 / 108</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>24x7 Universal emergency response for police, fire, and ambulance across India.</p>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <Shield size={24} color="#38bdf8" />
            <div>
              <h4 style={{ color: '#f8fafc' }}>Tourist Helpline (MoT)</h4>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>1363 / 1800-11-1363</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Multi-lingual tourist assistance helpline operated by Ministry of Tourism.</p>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <Hospital size={24} color="#10b981" />
            <div>
              <h4 style={{ color: '#f8fafc' }}>Medical Emergency Services</h4>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>108 (Free Ambulance)</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Immediate medical dispatch with GPS tracking.</p>
        </div>
      </div>

      {/* Safe Travel Guidelines */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '16px' }}>Hill Station & Ghat Safety Tips</h3>
        <ul style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Always verify fog conditions before starting ghat road driving after 06:00 PM.</li>
          <li>Carry warm layer clothing for evening temperature drops in Munnar, Ooty, and Kodaikanal.</li>
          <li>Adhere to forest ranger checkpost registration requirements for offbeat waterfall trails.</li>
          <li>Keep digital offline copies of saved SmartTour itineraries on your phone.</li>
        </ul>
      </div>
    </div>
  );
}

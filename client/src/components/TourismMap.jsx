import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Shield, Compass, Star } from 'lucide-react';

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

export default function TourismMap({ destination, center, height = '450px' }) {
  const [filter, setFilter] = useState('All');

  const defaultCenter = center || (destination?.coordinates ? [destination.coordinates.lat, destination.coordinates.lng] : [10.0889, 77.0595]);

  const attractions = destination?.attractions || [];
  const hiddenGems = destination?.hiddenGems || [];
  const hotels = destination?.hotels || [];

  return (
    <div style={{ position: 'relative', height, width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      {/* Map Filter Controls */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 999,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '8px 12px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap'
      }}>
        {['All', 'Attractions', 'Hidden Gems', 'Hotels', 'Emergency'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? '#10b981' : 'rgba(255,255,255,0.08)',
              color: filter === f ? '#ffffff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <MapContainer center={defaultCenter} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Destination Center Marker */}
        <Marker position={defaultCenter}>
          <Popup>
            <div style={{ padding: '4px' }}>
              <h4 style={{ color: '#10b981', margin: 0 }}>📍 {destination?.name || 'Destination Center'}</h4>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '4px 0 0 0' }}>{destination?.tagline}</p>
            </div>
          </Popup>
        </Marker>

        {/* Attractions */}
        {(filter === 'All' || filter === 'Attractions') && attractions.map((att, i) => (
          <Marker key={`att-${i}`} position={[att.lat || (defaultCenter[0] + 0.02 * (i + 1)), att.lng || (defaultCenter[1] + 0.02 * (i + 1))]}>
            <Popup>
              <div style={{ padding: '6px' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Attraction</span>
                <h4 style={{ margin: '4px 0', color: '#ffffff' }}>{att.name}</h4>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{att.description}</p>
                <div style={{ fontSize: '0.75rem', marginTop: '6px', color: '#fbbf24' }}>
                  Fee: ₹{att.cost} | Duration: {att.duration}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hidden Gems */}
        {(filter === 'All' || filter === 'Hidden Gems') && hiddenGems.map((hg, i) => (
          <Marker key={`hg-${i}`} position={[hg.lat || (defaultCenter[0] - 0.02 * (i + 1)), hg.lng || (defaultCenter[1] - 0.02 * (i + 1))]}>
            <Popup>
              <div style={{ padding: '6px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>Hidden Gem</span>
                <h4 style={{ margin: '4px 0', color: '#a78bfa' }}>✨ {hg.name}</h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{hg.description}</p>
                <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#34d399' }}>
                  Crowd: {hg.crowdLevel} | Best Time: {hg.bestTime}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Emergency Facilities */}
        {(filter === 'All' || filter === 'Emergency') && (
          <Marker position={[defaultCenter[0] + 0.01, defaultCenter[1] - 0.01]}>
            <Popup>
              <div style={{ padding: '6px' }}>
                <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Emergency Hospital & Police</span>
                <h4 style={{ margin: '4px 0', color: '#fb7185' }}>🏥 Regional General Hospital & Police Post</h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>24x7 Emergency Services & Tourist Assistance</p>
                <div style={{ fontSize: '0.75rem', color: '#fb7185', fontWeight: 'bold', marginTop: '4px' }}>
                  Call SOS: {destination?.safetyInfo?.hospitalContact || '108'}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

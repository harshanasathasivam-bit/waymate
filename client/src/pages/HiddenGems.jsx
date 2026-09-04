import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Shield, Users, Compass, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HiddenGems() {
  const [hiddenGems, setHiddenGems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations/meta/hidden-gems')
      .then(res => res.json())
      .then(data => {
        if (data.success) setHiddenGems(data.hiddenGems);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
          <Sparkles size={16} /> Offbeat Tourism Discovery
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Hidden Gems & Secret Viewpoints
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Discover lesser-known waterfalls, ancient trails, and peaceful spots away from commercial tourist crowds.
        </p>
      </div>

      <div className="grid-cards">
        {hiddenGems.map(hg => (
          <div key={hg.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-purple">✨ {hg.category}</span>
                <span className="badge badge-emerald">Crowd: {hg.crowdLevel}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '6px' }}>{hg.name}</h3>
              <div style={{ fontSize: '0.85rem', color: '#10b981', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {hg.destinationName}, {hg.state}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
                {hg.description}
              </p>
            </div>

            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
                <div>⏰ <strong>Best Visiting Time:</strong> {hg.bestTime}</div>
                <div>🛡️ <strong>Safety Advisory:</strong> {hg.safetyTip}</div>
              </div>
              <Link to={`/planner?dest=${hg.destinationId}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Add to Itinerary <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

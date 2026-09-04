import React, { useState, useEffect } from 'react';
import { Heart, Star, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Experiences() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations/meta/experiences')
      .then(res => res.json())
      .then(data => {
        if (data.success) setExperiences(data.experiences);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          <Heart size={16} /> Authentic Local Tourism
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Local Experiences Marketplace
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Connect with certified local guides, tribal artisans, coffee roasters, and culinary hosts.
        </p>
      </div>

      <div className="grid-cards">
        {experiences.map(exp => (
          <div key={exp.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-emerald">★ {exp.rating} Rating</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>₹{exp.price}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '6px' }}>{exp.title}</h3>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#10b981" /> {exp.destinationName} • Hosted by <strong>{exp.provider}</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
                {exp.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '16px' }}>
                <Clock size={16} color="#38bdf8" /> Duration: {exp.duration}
              </div>
              <Link to={`/planner?dest=${exp.destinationId}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book / Add to Trip <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

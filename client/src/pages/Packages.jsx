import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Sliders, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Packages() {
  const [packages, setPackages] = useState([
    {
      id: "pkg-kerala-4d",
      title: "Kerala Scenic Bliss 4-Day Customized Experience",
      destinationId: "munnar",
      days: 4,
      nights: 3,
      startingPrice: 13500,
      type: "Family & Nature",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Munnar_tea_plantations.jpg",
      summary: "Complete personalized tour covering Munnar tea estates, Mattupetty boating, Eravikulam sanctuary, and spice village lunch.",
      includes: ["3-Star / Budget Hotel", "Daily Breakfast", "Sightseeing Cab", "Entry Tickets", "Tea Museum Tour"],
      customizableOptions: ["Change hotel tier", "Add Kathakali show", "Upgrade transportation", "Adjust day count"]
    },
    {
      id: "pkg-nilgiris-3d",
      title: "Nilgiri Mountain Explorer (Ooty & Kodaikanal)",
      destinationId: "ooty",
      days: 3,
      nights: 2,
      startingPrice: 8900,
      type: "Budget & Senior-Friendly",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Nilgiri_Mountain_Railway.jpg",
      summary: "Experience Toy train ride, Botanical Gardens, Doddabetta Peak, and homemade chocolate factory visit.",
      includes: ["Hotel Stay", "Toy Train Ticket Booking", "Local Transport", "24/7 Support"],
      customizableOptions: ["Add Avalanche Lake safari", "Choose pure veg meal plan"]
    }
  ]);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
          <Sliders size={16} /> 100% Customizable Tour Packages
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Personalized Tourism Packages
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Traditional packages enhanced with total flexibility. Swap hotels, change activity count, or adjust budget instantly.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {packages.map(pkg => (
          <div key={pkg.id} className="glass-panel" style={{ padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'center' }}>
            <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px' }} />

            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <span className="badge badge-emerald">{pkg.days} Days / {pkg.nights} Nights</span>
                <span className="badge badge-purple">{pkg.type}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '8px' }}>{pkg.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}>{pkg.summary}</p>

              <div style={{ fontSize: '0.85rem', color: '#34d399', marginBottom: '16px' }}>
                <strong>Personalization Options:</strong> {pkg.customizableOptions.join(' • ')}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Starting From</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>₹{pkg.startingPrice.toLocaleString('en-IN')}</div>
                </div>

                <Link to={`/planner?dest=${pkg.destinationId}`} className="btn-primary" style={{ padding: '12px 24px' }}>
                  Customize & Book <Sparkles size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

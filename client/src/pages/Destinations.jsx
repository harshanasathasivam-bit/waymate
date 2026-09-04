import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Compass, MapPin, DollarSign, Filter, ArrowRight, Star } from 'lucide-react';

export default function Destinations() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxBudget, setMaxBudget] = useState(10000);
  const [accessibilityOnly, setAccessibilityOnly] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDestinations(data.destinations);
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = destinations.filter(d => {
    const matchesQuery = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.categories.includes(selectedCategory);
    const matchesBudget = d.avgDailyBudgetBudget <= maxBudget;
    const matchesAccess = !accessibilityOnly || d.scores.accessibilityScore >= 75;
    return matchesQuery && matchesCat && matchesBudget && matchesAccess;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>
          Explore Travel Destinations
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Filtered by real budget estimates, weather forecasts, and crowd indicators.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
            <Search size={18} color="#10b981" />
            <input
              type="text"
              placeholder="Search by city or state..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px 14px', borderRadius: '8px', outline: 'none', fontSize: '0.9rem' }}
          >
            <option value="All">All Travel Types</option>
            <option value="Nature">Nature & Hills</option>
            <option value="Family">Family Friendly</option>
            <option value="Budget">Budget Getaway</option>
            <option value="Photography">Photography Spots</option>
            <option value="Adventure">Trekking & Adventure</option>
          </select>

          {/* Max Budget Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>
              <span>Max Budget:</span>
              <strong style={{ color: '#10b981' }}>₹{maxBudget.toLocaleString('en-IN')}/day</strong>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxBudget}
              onChange={e => setMaxBudget(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#10b981' }}
            />
          </div>

          {/* Accessibility Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <input
              type="checkbox"
              checked={accessibilityOnly}
              onChange={e => setAccessibilityOnly(e.target.checked)}
              style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
            />
            Wheelchair & Senior Accessible Only
          </label>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid-cards">
        {filtered.map(d => (
          <div key={d.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '220px' }}>
              <img src={d.heroImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px' }} className="badge badge-emerald">
                Eco Score {d.scores.ecoScore}/100
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px' }} className="badge badge-purple">
                {d.crowdLevel.badgeColor} {d.crowdLevel.status} Crowd
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>{d.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{d.state}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.5' }}>
                  {d.tagline}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {d.categories.map(c => (
                    <span key={c} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: '#cbd5e1' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                  <span>Daily Est: <strong style={{ color: '#10b981' }}>₹{d.avgDailyBudgetBudget.toLocaleString('en-IN')}</strong></span>
                  <span>Dist: <strong>{d.distanceFromSalem} km</strong></span>
                </div>
                <Link to={`/destinations/${d.id}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                  View Destination <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

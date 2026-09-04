import React, { useState, useEffect } from 'react';
import { Layers, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Compare() {
  const [destinations, setDestinations] = useState([]);
  const [selectedIds, setSelectedIds] = useState(['munnar', 'yercaud', 'kodaikanal']);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDestinations(data.destinations);
      })
      .catch(err => console.error(err));
  }, []);

  const selectedDests = destinations.filter(d => selectedIds.includes(d.id));

  const handleSelectChange = (index, newId) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
          <Layers size={16} /> Intelligent Comparison Engine
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Destination Comparison Matrix
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Compare up to 3 destinations side-by-side on cost, distance, crowd levels, eco score, and family suitability.
        </p>
      </div>

      {/* Selectors Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[0, 1, 2].map(idx => (
          <select
            key={idx}
            value={selectedIds[idx] || ''}
            onChange={e => handleSelectChange(idx, e.target.value)}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid #10b981',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.state})</option>
            ))}
          </select>
        ))}
      </div>

      {/* Comparison Table Card */}
      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#f8fafc', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '16px', color: '#94a3b8', width: '220px' }}>Parameters</th>
              {selectedDests.map(d => (
                <th key={d.id} style={{ padding: '16px', textTransform: 'uppercase', color: '#34d399' }}>
                  {d.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={rowStyle}>
              <td style={paramLabel}>Est. Daily Budget</td>
              {selectedDests.map(d => (
                <td key={d.id} style={{ fontWeight: 700, color: '#10b981' }}>₹{d.avgDailyBudgetBudget.toLocaleString('en-IN')}/day</td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Dist. from Salem</td>
              {selectedDests.map(d => (
                <td key={d.id}>{d.distanceFromSalem} km</td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Weather Forecast</td>
              {selectedDests.map(d => (
                <td key={d.id}>🌤️ {d.currentWeather.temp} ({d.currentWeather.condition})</td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Crowd Density</td>
              {selectedDests.map(d => (
                <td key={d.id}>
                  <span className="badge badge-amber">{d.crowdLevel.badgeColor} {d.crowdLevel.status}</span>
                </td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Eco Score</td>
              {selectedDests.map(d => (
                <td key={d.id} style={{ fontWeight: 700, color: '#34d399' }}>🌱 {d.scores.ecoScore}/100</td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Family Suitability</td>
              {selectedDests.map(d => (
                <td key={d.id} style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(d.scores.familyScore / 20))} ({d.scores.familyScore}%)</td>
              ))}
            </tr>

            <tr style={rowStyle}>
              <td style={paramLabel}>Accessibility Score</td>
              {selectedDests.map(d => (
                <td key={d.id}>{d.scores.accessibilityScore}% Accessible</td>
              ))}
            </tr>

            <tr style={{ borderBottom: 'none' }}>
              <td style={paramLabel}>Action</td>
              {selectedDests.map(d => (
                <td key={d.id} style={{ padding: '16px' }}>
                  <Link to={`/planner?dest=${d.id}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Plan {d.name} <ArrowRight size={14} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const rowStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  padding: '16px'
};

const paramLabel = {
  padding: '16px',
  color: '#cbd5e1',
  fontWeight: 600
};

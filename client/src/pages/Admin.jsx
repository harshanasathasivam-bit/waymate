import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MapPin, Sparkles, Sliders, Plus, Trash2, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function Admin() {
  const [analytics, setAnalytics] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [weights, setWeights] = useState({
    budgetMatch: 25,
    interestMatch: 25,
    durationMatch: 15,
    weatherMatch: 10,
    travelDistance: 10,
    familySuitability: 5,
    accessibility: 5,
    sustainability: 5
  });

  const [newDestName, setNewDestName] = useState('');
  const [newDestState, setNewDestState] = useState('Tamil Nadu');
  const [newDestBudget, setNewDestBudget] = useState(2000);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalytics(data.analytics);
          if (data.analytics.weights) setWeights(data.analytics.weights);
        }
      })
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/enquiries')
      .then(res => res.json())
      .then(data => {
        if (data.success) setEnquiries(data.enquiries);
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdateWeights = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/weights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weights })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Algorithm weights updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    if (!newDestName.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDestName,
          state: newDestState,
          avgDailyBudgetBudget: newDestBudget
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Destination ${newDestName} added successfully!`);
        setNewDestName('');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <LayoutDashboard size={14} /> System Administrator Portal
          </div>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit, sans-serif' }}>
            SmartTour Control Center & Analytics
          </h1>
        </div>
      </div>

      {successMsg && (
        <div className="badge badge-emerald" style={{ padding: '12px 20px', fontSize: '0.9rem', width: '100%', marginBottom: '24px', justifyContent: 'center' }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {/* Analytics KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Users</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', margin: '6px 0' }}>
            {analytics?.totalUsers || 128}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>● Active Platform Accounts</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Trips Generated</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399', margin: '6px 0' }}>
            {analytics?.totalTripsGenerated || 342}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Personalized Day-by-Day Plans</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Destinations Catalog</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24', margin: '6px 0' }}>
            {analytics?.totalDestinations || 5}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Published Locations</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Est. Revenue Generated</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a78bfa', margin: '6px 0' }}>
            {analytics?.estimatedRevenue || '₹4,85,000'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a78bfa' }}>Enquiry & Booking Pipeline</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* Recommendation Engine Weights Configurator */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#10b981" /> Algorithm Weighting Configurator
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
            Adjust the weight percentage assigned to each parameter during destination match scoring.
          </p>

          <form onSubmit={handleUpdateWeights} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.keys(weights).map(key => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    value={weights[key]}
                    onChange={e => setWeights({ ...weights, [key]: parseInt(e.target.value) || 0 })}
                    style={{ width: '70px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#34d399', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>%</span>
                </div>
              </div>
            ))}

            <button type="submit" className="btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }}>
              Save Weight Configuration
            </button>
          </form>
        </div>

        {/* Destination Management CRUD */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="#34d399" /> Add New Destination
          </h3>

          <form onSubmit={handleAddDestination} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Destination Name</label>
              <input
                type="text"
                placeholder="e.g. Coorg, Goa, Manali..."
                value={newDestName}
                onChange={e => setNewDestName(e.target.value)}
                style={adminInputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>State</label>
              <input
                type="text"
                value={newDestState}
                onChange={e => setNewDestState(e.target.value)}
                style={adminInputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Est. Daily Budget (₹)</label>
              <input
                type="number"
                value={newDestBudget}
                onChange={e => setNewDestBudget(parseInt(e.target.value) || 1000)}
                style={adminInputStyle}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>
              Publish Destination
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const adminInputStyle = {
  width: '100%',
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.9rem'
};

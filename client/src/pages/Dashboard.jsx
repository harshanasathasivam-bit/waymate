import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, DollarSign, Trash2, ArrowRight, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming');

  useEffect(() => {
    fetch(`http://localhost:5000/api/itineraries/user/${user?.id || 'guest'}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setTrips(data.trips);
      })
      .catch(err => console.error(err));
  }, [user]);

  const handleDeleteTrip = async (tripId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/itineraries/${tripId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setTrips(trips.filter(t => t.id !== tripId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      {/* Profile Header */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#fff'
          }}>
            {user?.name ? user.name[0].toUpperCase() : 'G'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#f8fafc' }}>{user?.name || 'Guest Traveler'}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Home Location: {user?.homeLocation || 'Salem'} • Preferred Budget: ₹10,000 - ₹20,000
            </p>
          </div>
        </div>

        <Link to="/planner" className="btn-primary">
          <Sparkles size={16} /> Plan New Trip
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['Upcoming', 'Saved Plans', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? '#10b981' : 'rgba(255,255,255,0.08)',
              color: activeTab === tab ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {tab} ({trips.length})
          </button>
        ))}
      </div>

      {/* Trips list */}
      {trips.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
          <p style={{ marginBottom: '16px' }}>No saved trips found in your account dashboard.</p>
          <Link to="/planner" className="btn-primary">
            Plan Your First AI Trip Now
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {trips.map(trip => (
            <div key={trip.id} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-emerald">{trip.tripPlan?.summary?.days} Days</span>
                  <span className="badge badge-purple">{trip.tripPlan?.summary?.travelType}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '4px' }}>{trip.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  From {trip.tripPlan?.summary?.startingLocation} • Created on {new Date(trip.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Est.</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
                    ₹{trip.tripPlan?.summary?.totalEstimatedCost?.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/itinerary', { state: { tripPlan: trip.tripPlan } })}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  View Itinerary <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Sparkles, Sun, CloudRain, Users, Shield, Utensils, Heart, Star, ArrowRight, Phone, CheckCircle, AlertTriangle } from 'lucide-react';
import TourismMap from '../components/TourismMap';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDestination(data.destination);
          setReviews(data.reviews || []);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/destinations/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: "Traveler",
          rating: newRating,
          comment: newComment,
          crowded: destination?.crowdLevel?.status || "Moderate",
          childFriendly: "Yes",
          parkingAvailable: "Yes"
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.review, ...reviews]);
        setNewComment('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!destination) {
    return <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>Loading destination overview...</div>;
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <div style={{
        height: '420px',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.95)), url("${destination.heroImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '40px 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">{destination.state}</span>
            <span className="badge badge-purple">Eco Score: {destination.scores.ecoScore}/100</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginBottom: '8px' }}>
            {destination.name}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '700px', marginBottom: '20px' }}>
            {destination.tagline}
          </p>

          <Link to={`/planner?dest=${destination.id}`} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
            <Sparkles size={18} /> Plan Custom Trip to {destination.name}
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Description */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '12px' }}>About Destination</h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>
                {destination.description}
              </p>
            </div>

            {/* Weather & Crowd Real-time Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {/* Weather Card */}
              <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #38bdf8' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sun size={18} color="#38bdf8" /> Weather Intelligence
                  </h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{destination.currentWeather.temp}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px' }}>
                  <strong>Condition:</strong> {destination.currentWeather.condition} (Rain Risk: {destination.currentWeather.rainProbability})
                </p>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {destination.currentWeather.forecast}
                </div>
              </div>

              {/* Crowd Card */}
              <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={18} color="#f59e0b" /> Crowd Level
                  </h4>
                  <span className="badge badge-amber">{destination.crowdLevel.badgeColor} {destination.crowdLevel.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  <strong>Peak Hours:</strong> {destination.crowdLevel.peakHours}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  💡 Best visiting time: {destination.crowdLevel.bestVisitingTime}
                </p>
              </div>
            </div>

            {/* Interactive Tourism Map */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '16px' }}>
                Interactive Tourism Map & Places
              </h3>
              <TourismMap destination={destination} height="420px" />
            </div>

            {/* Local Food Specialties */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Utensils size={20} color="#10b981" /> Famous Local Food & Dishes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {destination.foodSpecialties?.map((food, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{food.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>₹{food.price} • {food.type}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Reviews & QA */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '20px' }}>
                Traveler Reviews & Community Q&A
              </h3>

              {/* Add Review Form */}
              <form onSubmit={handlePostReview} style={{ marginBottom: '28px', background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                <textarea
                  placeholder="Share your experience (Was it crowded? Is parking available? Suitable for children?)..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  style={{ width: '100%', height: '80px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', marginBottom: '12px' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  Post Review
                </button>
              </form>

              {/* Review list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map(r => (
                  <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: '#f8fafc', fontSize: '0.95rem' }}>{r.userName}</strong>
                      <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '8px' }}>{r.comment}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span>Child Friendly: {r.childFriendly}</span>
                      <span>•</span>
                      <span>Parking: {r.parkingAvailable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Stats Box */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '1rem' }}>Destination Key Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={sidebarRow}>
                  <span style={{ color: '#94a3b8' }}>Best Season</span>
                  <strong style={{ color: '#34d399' }}>{destination.bestSeason}</strong>
                </div>
                <div style={sidebarRow}>
                  <span style={{ color: '#94a3b8' }}>Dist. from Salem</span>
                  <strong style={{ color: '#f8fafc' }}>{destination.distanceFromSalem} km</strong>
                </div>
                <div style={sidebarRow}>
                  <span style={{ color: '#94a3b8' }}>Est. Daily Budget</span>
                  <strong style={{ color: '#10b981' }}>₹{destination.avgDailyBudgetBudget.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <Link to={`/planner?dest=${destination.id}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                Generate Custom Itinerary <ArrowRight size={16} />
              </Link>
            </div>

            {/* Safety Helpline Contacts */}
            <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #f43f5e' }}>
              <h4 style={{ color: '#fb7185', marginBottom: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={18} /> Destination Safety & Emergency
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '12px' }}>
                {destination.safetyInfo?.overall}
              </p>
              <div style={{ fontSize: '0.85rem', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Police:</strong> {destination.safetyInfo?.policeContact}</div>
                <div><strong>Hospital:</strong> {destination.safetyInfo?.hospitalContact}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const sidebarRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '8px',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

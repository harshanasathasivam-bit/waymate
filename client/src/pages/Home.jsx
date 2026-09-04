import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Search, ArrowRight, Shield, Heart, Compass, CheckCircle2, Leaf, Star, ChevronRight, Layers } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDestinations(data.destinations);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(searchQuery)}`);
  };

  const filteredDestinations = destinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.categories.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* 1. Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.95)), url("https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }} className="animate-fade-in">
          <div className="badge badge-emerald" style={{ marginBottom: '20px', padding: '8px 16px' }}>
            <Sparkles size={16} /> Dynamic Personalization Platform
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.15,
            marginBottom: '20px'
          }}>
            Plan Your Perfect Journey with <span className="gradient-text">AI Intelligence</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#cbd5e1',
            maxWidth: '720px',
            margin: '0 auto 36px auto',
            fontWeight: 400
          }}>
            Tell us your budget, starting location, interests, and dates. We will dynamically build the optimal day-by-day itinerary tailored specifically for you.
          </p>

          {/* Quick Hero Search Box */}
          <form onSubmit={handleSearchSubmit} className="glass-panel" style={{
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '14px', flex: 1 }}>
              <MapPin size={20} color="#10b981" />
              <input
                type="text"
                placeholder="Where to? (e.g. Munnar, Wayanad, Ooty, Yercaud)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '14px 28px' }}>
              <Search size={18} /> Explore
            </button>
          </form>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/planner" className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              <Sparkles size={20} /> Plan My Custom Trip
            </Link>
            <Link to="/destinations" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              <Compass size={20} /> Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* 2. USP Comparison Section (SmartTour vs Traditional) */}
        <section style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', marginBottom: '12px' }}>
              Why SmartTour Replaces Traditional Package Browsing
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
              Instead of forcing you into fixed predefined packages, SmartTour understands your budget and needs to build a custom trip.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Dynamic AI Personalization</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Calculates a personalized suitability match score (e.g. 94% Match) based on your exact budget, group age, interests, and travel pace.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Smart Budget Optimizer</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Get category-wise breakdown (hotels, transport, food, activities) with automatic warnings and recommendations if your trip exceeds budget.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Hidden Gems Discovery</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Discover secret waterfalls, tribal craft workshops, and quiet view spots missed by generic commercial package operators.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Popular Destinations */}
        <section style={{ marginTop: '90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif' }}>Recommended Destinations</h2>
              <p style={{ color: '#94a3b8' }}>Verified places with real-time weather and crowd scores</p>
            </div>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Nature', 'Family', 'Budget', 'Photography'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#10b981' : 'rgba(255,255,255,0.08)',
                    color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-cards">
            {filteredDestinations.slice(0, 4).map(d => (
              <div key={d.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={d.heroImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }} className="badge badge-emerald">
                    94% Match
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px' }} className="badge badge-purple">
                    {d.crowdLevel.badgeColor} {d.crowdLevel.status} Crowd
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{d.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{d.state}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '14px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {d.tagline}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                      <span>Avg Budget: <strong style={{ color: '#10b981' }}>₹{d.avgDailyBudgetBudget.toLocaleString('en-IN')}/day</strong></span>
                      <span>🌤️ {d.currentWeather.temp}</span>
                    </div>
                    <Link to={`/destinations/${d.id}`} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                      View Details & Plan <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sustainable Tourism & Eco Score Spotlight */}
        <section style={{ marginTop: '90px' }}>
          <div className="glass-panel" style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>
                  <Leaf size={14} /> Responsible Travel Initiative
                </div>
                <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', marginBottom: '14px' }}>
                  Sustainable Tourism & Eco Scores
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Every trip generated by SmartTour includes an <strong>Eco Score (e.g. 🌱 88/100)</strong>. We promote eco-friendly lodges, public transport connectivity, and community-owned local experiences.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>-35%</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Carbon Footprint</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Local Community Support</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80" alt="Eco Travel" style={{ borderRadius: '16px', maxWidth: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Call to Action Banner */}
        <section style={{ marginTop: '90px', textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '60px 24px' }}>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>
              Ready to Create Your Dynamic Itinerary?
            </h2>
            <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 32px auto', fontSize: '1.05rem' }}>
              Enter your budget and travel dates to let SmartTour generate the perfect day-by-day travel plan instantly.
            </p>
            <Link to="/planner" className="btn-primary" style={{ padding: '18px 36px', fontSize: '1.15rem' }}>
              <Sparkles size={22} /> Generate My Personalized Plan
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

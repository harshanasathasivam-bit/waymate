import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass, MapPin, Search, Star, Bookmark, Check,
  Clock, DollarSign, ArrowRight, Shield, Heart,
  UtensilsCrossed, Home as HomeIcon, Sparkles, Navigation,
  ChevronRight, Calendar, Users, Wallet
} from 'lucide-react';
import { INITIAL_COMPANIONS } from '../data/travelDatabase';
import { useLanguage } from '../i18n/LanguageContext';
import { getCrowdStatus } from '../services/crowdService';

export default function Home({
  destination,
  onSelectDestination,
  onSavePlace,
  isSaved,
  onOpenSOS,
  onOpenPlaceDetail
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Attractions');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/explore');
    }
  };

  const attractions = destination?.attractions || [];
  const pickedGroups = destination?.pickedForYou || [];
  const hiddenGems = destination?.hiddenGems || [];
  const food = destination?.food || [];
  const stays = destination?.stays || [];
  const shops = destination?.shops || [];
  const experiences = destination?.experiences || [];
  const localLife = destination?.localLife || [];
  const curatedTrip = destination?.curatedTrip;
  const budget = destination?.budgetOverview;

  // Dynamic Category Items Resolver for Home Discovery
  const displayedCategoryPlaces = React.useMemo(() => {
    if (selectedCategory === 'Food & Dining') {
      if (food && food.length > 0) {
        return food.map(f => ({
          ...f,
          itemType: 'food',
          shortDesc: f.shortDesc || f.description || f.story,
          estimatedCost: f.estimatedCost || f.cost,
          crowd: getCrowdStatus(f, '01:00 PM')
        }));
      }
      return localLife.filter(l => 
        l.category?.toLowerCase().includes('food') || 
        l.category?.toLowerCase().includes('tiffin') || 
        l.category?.toLowerCase().includes('kitchen') ||
        l.name?.toLowerCase().includes('mess') ||
        l.name?.toLowerCase().includes('hotel')
      ).map(f => ({
        ...f,
        id: f.id,
        name: f.name,
        category: f.category,
        rating: 4.85,
        distance: 'Central Hub',
        bestTime: f.timing,
        estimatedCost: f.cost,
        shortDesc: f.story,
        photo: f.photo,
        crowd: getCrowdStatus(f, '01:00 PM')
      }));
    }

    if (selectedCategory === 'Stays') {
      return stays.map(s => ({
        ...s,
        itemType: 'stays',
        rating: s.rating,
        distance: s.distance,
        bestTime: 'Check-in 12:00 PM',
        estimatedCost: s.estimatedCost || `₹${s.pricePerNight?.toLocaleString('en-IN')} / night`,
        shortDesc: s.shortDesc || `${s.area} • ${s.facilities?.slice(0, 2).join(', ')}`,
        photo: s.photo,
        crowd: getCrowdStatus(s, '02:00 PM')
      }));
    }

    if (selectedCategory === 'Local Shops') {
      if (shops && shops.length > 0) {
        return shops.map(sh => ({
          ...sh,
          itemType: 'shops',
          shortDesc: sh.shortDesc || sh.description,
          estimatedCost: sh.estimatedCost || sh.cost,
          crowd: getCrowdStatus(sh, '06:00 PM')
        }));
      }
      return localLife.filter(l => 
        l.category?.toLowerCase().includes('textiles') || 
        l.category?.toLowerCase().includes('handloom') || 
        l.category?.toLowerCase().includes('bazaar') ||
        l.category?.toLowerCase().includes('craft')
      ).map(sh => ({
        ...sh,
        id: sh.id,
        name: sh.name,
        category: sh.category,
        rating: 4.8,
        distance: 'Bazaar Hub',
        bestTime: sh.timing,
        estimatedCost: sh.cost,
        shortDesc: sh.story,
        photo: sh.photo,
        crowd: getCrowdStatus(sh, '06:00 PM')
      }));
    }

    if (selectedCategory === 'Experiences') {
      if (experiences && experiences.length > 0) {
        return experiences.map(exp => ({
          ...exp,
          itemType: 'experiences',
          shortDesc: exp.shortDesc || exp.description,
          estimatedCost: exp.estimatedCost || exp.cost,
          crowd: getCrowdStatus(exp, '04:30 PM')
        }));
      }
      const expList = [];
      pickedGroups.forEach(group => {
        group.items?.forEach(item => {
          expList.push({
            id: item.id,
            name: item.title,
            category: group.badge || 'Experience',
            rating: item.rating,
            distance: item.distance,
            bestTime: 'Morning / Evening',
            estimatedCost: item.cost,
            shortDesc: item.highlight,
            photo: item.photo,
            crowd: getCrowdStatus(item, '04:30 PM')
          });
        });
      });
      return expList;
    }

    if (selectedCategory === 'Hidden Gems') {
      return hiddenGems.map(h => ({
        ...h,
        itemType: 'gems',
        shortDesc: h.shortDesc || h.whyVisit || h.description,
        estimatedCost: h.estimatedCost || h.cost,
        crowd: getCrowdStatus(h, '05:00 PM')
      }));
    }

    // Default: Attractions
    return attractions.map(a => ({
      ...a,
      itemType: 'attractions',
      shortDesc: a.shortDesc || a.description,
      estimatedCost: a.estimatedCost || a.cost,
      crowd: getCrowdStatus(a, '05:30 PM')
    }));
  }, [selectedCategory, attractions, food, stays, shops, experiences, hiddenGems, localLife, pickedGroups]);

  const handlePlaceClick = (item) => {
    if (onOpenPlaceDetail) {
      onOpenPlaceDetail(item);
    } else {
      navigate(`/explore?place=${item.id}`);
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* 1. Hero Atmospheric Header */}
      <section className="hero-editorial" style={{ backgroundImage: `linear-gradient(180deg, rgba(24, 24, 27, 0.45) 0%, rgba(24, 24, 27, 0.88) 100%), url("${destination?.heroImage}")` }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* Greeting Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: 'var(--radius-full)', padding: '6px 14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
              {t('home.goodEvening', 'Good evening 👋')}
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--brand-sand)', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '8px' }}>
              {destination?.currentWeather?.condition} • {destination?.currentWeather?.temp}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            {t('home.readyToDiscover', 'Ready to discover')} <span style={{ color: 'var(--brand-sand)' }}>{destination?.name}</span>?
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '640px', lineHeight: 1.5, marginBottom: '28px' }}>
            {destination?.tagline}
          </p>

          {/* Search Bar Input Container */}
          <form onSubmit={handleSearchSubmit} className="hero-search-container">
            <Search size={20} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={`${t('home.searchPlaceholder', 'Search places, food, stays & experiences in')} ${destination?.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">
              {t('home.searchBtn', 'Search')}
            </button>
          </form>

        </div>
      </section>

      {/* 2. Destination Discovery Main Section */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '40px 28px 0 28px' }}>
        
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Compass size={18} color="var(--brand-terracotta)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('home.destDiscovery', 'Destination Discovery')}
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                {t('home.explorePrefix', 'Explore')} {destination?.name}
              </h2>
            </div>
            
            <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--brand-terracotta)', textDecoration: 'none' }}>
              {t('home.viewAllMap', 'View all on map')} <ChevronRight size={16} />
            </Link>
          </div>

          {/* Category Chips */}
          <div className="category-chips-nav">
            {[
              { id: 'Attractions', label: t('cat.attractions', 'Attractions'), icon: '📍 ' },
              { id: 'Food & Dining', label: t('cat.food', 'Food & Dining'), icon: '🍜 ' },
              { id: 'Stays', label: t('cat.stays', 'Stays'), icon: '🏡 ' },
              { id: 'Local Shops', label: t('cat.shops', 'Local Shops'), icon: '🛍️ ' },
              { id: 'Experiences', label: t('cat.experiences', 'Experiences'), icon: '✨ ' },
              { id: 'Hidden Gems', label: t('cat.gems', 'Hidden Gems'), icon: '💎 ' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.icon}{cat.label}
              </button>
            ))}
          </div>

          {/* Large Editorial Destination Cards Grid */}
          <div className="editorial-cards-grid">
            {displayedCategoryPlaces.map(item => (
              <div
                key={item.id}
                className="editorial-card"
                onClick={() => handlePlaceClick(item)}
                style={{ cursor: 'pointer' }}
              >
                
                {/* Photo & Overlays */}
                <div className="editorial-card-photo-box">
                  <img src={item.photo} alt={item.name} className="editorial-card-photo" />
                  
                  {/* Rating Badge */}
                  <div className="editorial-card-rating">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" /> {item.rating || 4.8}
                  </div>

                  {/* AI Crowd Level Badge */}
                  {item.crowd && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(6px)',
                      border: `1px solid ${item.crowd.border}`,
                      borderRadius: 'var(--radius-full)',
                      padding: '2px 8px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: item.crowd.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Users size={11} color={item.crowd.color} />
                      <span>{item.crowd.tag}</span>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSavePlace && onSavePlace(item);
                    }}
                    className="editorial-card-save-btn"
                    title="Save Place"
                    aria-label="Save Place"
                  >
                    {isSaved && isSaved(item.id) ? (
                      <Check size={18} color="var(--brand-emerald)" />
                    ) : (
                      <Bookmark size={18} />
                    )}
                  </button>
                </div>

                {/* Card Body */}
                <div className="editorial-card-body">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="editorial-card-category">
                        {item.category}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {item.crowd?.waitTime || '5-10m wait'}
                      </span>
                    </div>
                    <h3 className="editorial-card-title">
                      {item.name}
                    </h3>
                    <p className="editorial-card-desc">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="editorial-card-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="var(--brand-terracotta)" /> {item.distance || '2.4 km away'}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-terracotta)' }}>
                      {item.estimatedCost || item.bestTime}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 3. Personalized Context Section ("Picked for You") */}
      <section className="picked-section">
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 28px' }}>
          
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('home.pickedForYou', 'Picked for You')}
            </span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {t('home.pickedForYou', 'Picked for You')}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {t('home.pickedSubtitle', 'Curated suggestions based on current evening timing, weather, and authentic local experiences.')}
            </p>
          </div>

          {pickedGroups.map((group, idx) => (
            <div key={idx} className="picked-group">
              <div className="picked-header">
                <h3 className="picked-title">{group.collection}</h3>
                <span className="picked-badge">{group.badge}</span>
              </div>

              <div className="picked-grid">
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className="picked-card"
                    onClick={() => handlePlaceClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.photo} alt={item.title} className="picked-photo" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {item.title || item.name}
                          </h4>
                          <span style={{ fontSize: '0.76rem', color: '#f59e0b', fontWeight: 700 }}>
                            ★ {item.rating}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '4px 0 8px 0' }}>
                          {item.highlight || item.shortDesc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        <span>📍 {item.distance}</span>
                        <span style={{ color: 'var(--brand-terracotta)', fontWeight: 600 }}>{item.cost || item.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 28px' }}>

        {/* 4. Beyond the Tourist Trail (Hidden Gems Magazine Spread) */}
        <section className="hidden-gems-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t('home.beyondSubtitle', 'Secret Sanctuaries & Artisans')}
              </span>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                {t('home.beyondTrail', 'Beyond the Tourist Trail')}
              </h2>
            </div>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              {t('home.offbeatSubtitle', 'Offbeat temples, art communes & local food alleys')}
            </span>
          </div>

          <div className="magazine-grid">
            {/* Featured Hero Gem Card */}
            {hiddenGems[0] && (
              <div
                className="magazine-feature-card"
                onClick={() => handlePlaceClick(hiddenGems[0])}
                style={{ cursor: 'pointer' }}
              >
                <img src={hiddenGems[0].photo} alt={hiddenGems[0].name} className="magazine-feature-photo" />
                <div className="magazine-feature-body">
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✨ {hiddenGems[0].category}
                  </span>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '4px 0 10px 0' }}>
                    {hiddenGems[0].name}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {hiddenGems[0].whyVisit || hiddenGems[0].shortDesc}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.84rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                    <span>📍 {hiddenGems[0].distance}</span>
                    <span>⏰ Best: {hiddenGems[0].bestTime}</span>
                    <span>💰 {hiddenGems[0].cost || hiddenGems[0].estimatedCost}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Companion Compact Gem Cards */}
            <div className="magazine-sub-grid">
              {hiddenGems.slice(1, 4).map(gem => (
                <div
                  key={gem.id}
                  className="magazine-compact-card"
                  onClick={() => handlePlaceClick(gem)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                      {gem.category}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#f59e0b', fontWeight: 700 }}>
                      ★ {gem.rating}
                    </span>
                  </div>
                  
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {gem.name}
                  </h4>
                  
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {gem.whyVisit || gem.shortDesc}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>📍 {gem.distance}</span>
                    <span style={{ color: 'var(--brand-azure)', fontWeight: 600 }}>{gem.bestTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Trip Planner Preview ("My Journey") */}
        {curatedTrip && (
          <section className="journey-section">
            <div className="journey-card-wrapper">
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {t('home.myJourney', 'Visual Journey Builder')}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                    {curatedTrip.title}
                  </h2>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    {curatedTrip.duration} • {t('home.tripBudget', 'Estimated Budget')}: {curatedTrip.budget}
                  </span>
                </div>

                <Link
                  to="/trips"
                  style={{
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(194, 65, 12, 0.25)'
                  }}
                >
                  <Sparkles size={16} /> {t('home.customizeJourney', 'Customize Full Journey')}
                </Link>
              </div>

              {/* Day 1 Timeline Preview */}
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} color="var(--brand-terracotta)" /> DAY 01 — {curatedTrip.days[0]?.theme}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {curatedTrip.days[0]?.stops.map((stop, i) => (
                    <div key={i} className="day-timeline-node">
                      <div className="day-timeline-bullet">
                        {i + 1}
                      </div>
                      <div className="day-timeline-content">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', fontFamily: 'var(--font-mono)' }}>
                            ⏰ {stop.time}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            {stop.duration} • {stop.cost}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {stop.title}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {stop.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 6. Local Life (Food & Handicrafts) */}
        <section style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t('home.localPulse', 'Authentic Neighborhood Pulse')}
              </span>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                {t('home.localLife', 'Local Life & Culinary Heritage')}
              </h2>
            </div>
            <Link to="/explore?category=food" style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--brand-terracotta)', textDecoration: 'none' }}>
              {t('home.exploreGuilds', 'Explore Local Guilds →')}
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {(food.length > 0 ? food.slice(0, 3) : localLife).map(item => (
              <div
                key={item.id}
                onClick={() => handlePlaceClick(item)}
                style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
              >
                <img src={item.photo} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-amber)', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 8px 0' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {item.shortDesc || item.story}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                    <span>💰 {item.cost || item.estimatedCost}</span>
                    <span>⏰ {item.timing || item.timings || 'Daily'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Trip Budget Section */}
        {budget && (
          <section className="budget-section">
            <div className="budget-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {t('home.financialCompanion', 'Financial Companion')}
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                    {t('home.tripBudget', 'Your Trip Budget')}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('home.totalBudget', 'Total Budget')}</span>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{budget.total.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--brand-emerald)', textTransform: 'uppercase', fontWeight: 700 }}>{t('home.remainingBuffer', 'Remaining')}</span>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-emerald)' }}>₹{budget.remaining.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="budget-progress-bar">
                {budget.categories.map((cat, i) => (
                  <div key={i} style={{ width: `${cat.percentage}%`, background: cat.color }} title={`${cat.name} (${cat.percentage}%)`} />
                ))}
              </div>

              {/* Category Breakdown Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                {budget.categories.map((cat, i) => (
                  <div key={i} style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: cat.color }}>
                      ● {cat.name}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                      ₹{cat.allocated.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. Travel Circle Live Location Preview */}
        <section style={{ padding: '30px 0 60px 0' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} color="var(--brand-azure)" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {t('home.travelCircle', 'Travel Circle')}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('home.travelCircleSubtitle', 'Live trip companion location & ETA sharing')}</span>
                </div>
              </div>
              
              <Link to="/profile" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--brand-azure)', textDecoration: 'none' }}>
                {t('home.manageCircle', 'Manage Circle →')}
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {INITIAL_COMPANIONS.map(comp => (
                <div key={comp.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={comp.avatar} alt={comp.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{comp.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>📍 {comp.currentPlace}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--brand-azure)', fontWeight: 600, marginTop: '2px' }}>Heading to: {comp.destination} ({comp.eta})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

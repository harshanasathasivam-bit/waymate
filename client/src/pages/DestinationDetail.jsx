import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Sparkles, Sun, Users, Shield, Utensils,
  Star, ArrowRight, ArrowLeft, Bookmark, Check,
  Clock, DollarSign, MessageSquare, Compass, Send, CheckCircle
} from 'lucide-react';
import MapView from '../components/MapView';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DESTINATIONS } from '../data/travelDatabase';

export default function DestinationDetail({ onSavePlace, isSaved, onOpenPlaceDetail }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    // Find in local database first for instant rendering
    const local = DESTINATIONS.find(d => d.id === id || d.name.toLowerCase() === id?.toLowerCase()) || DESTINATIONS[0];
    setDestination(local);

    // Fetch live backend reviews
    fetch(`http://localhost:5000/api/destinations/${id || local.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // Fallback default sample reviews
        setReviews([
          {
            id: 'rev-1',
            userName: 'Priya Sundaram',
            rating: 5,
            comment: `Visiting ${local.name} was the highlight of our family trip! The local guides were fantastic.`,
            createdAt: '2 days ago',
            crowded: 'Low Crowd'
          },
          {
            id: 'rev-2',
            userName: 'Rahul Verma',
            rating: 5,
            comment: 'Stunning cultural heritage and delicious food everywhere.',
            createdAt: '1 week ago',
            crowded: 'Moderate'
          }
        ]);
      });
  }, [id]);

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/destinations/${destination?.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user?.name || "Verified Traveler",
          rating: newRating,
          comment: newComment.trim(),
          crowded: "Moderate",
          childFriendly: "Yes",
          parkingAvailable: "Yes"
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setNewComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
      // Local fallback
      const mockRev = {
        id: `rev-${Date.now()}`,
        userName: user?.name || "Traveler",
        rating: newRating,
        comment: newComment.trim(),
        createdAt: 'Just now',
        crowded: 'Moderate'
      };
      setReviews([mockRev, ...reviews]);
      setNewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!destination) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Compass size={40} color="var(--brand-terracotta)" style={{ animation: 'spin 2s linear infinite', marginBottom: '12px' }} />
        <h3>Loading Destination Details...</h3>
      </div>
    );
  }

  // Combine places for Map
  const destinationPlaces = [
    ...(destination.attractions || []),
    ...(destination.food || []),
    ...(destination.stays || []),
    ...(destination.hiddenGems || [])
  ];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: 'calc(100vh - 71px)', paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <div style={{
        height: '420px',
        position: 'relative',
        backgroundImage: `linear-gradient(180deg, rgba(24, 24, 27, 0.4) 0%, rgba(24, 24, 27, 0.88) 100%), url("${destination.heroImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '40px 28px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#ffffff',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: 'var(--brand-terracotta)', color: '#fff', fontSize: '0.74rem', fontWeight: 800, padding: '3px 10px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
              {destination.state}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.74rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
              {destination.currentWeather?.condition} • {destination.currentWeather?.temp}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', fontFamily: 'var(--font-display)', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
            {destination.name}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '720px', lineHeight: 1.5, marginBottom: '24px' }}>
            {destination.tagline}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to={`/trips`}
              style={{
                background: 'var(--brand-terracotta)',
                color: '#ffffff',
                padding: '12px 26px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(194, 65, 12, 0.3)'
              }}
            >
              <Sparkles size={16} /> Plan Custom Trip to {destination.name}
            </Link>

            <Link
              to={`/explore`}
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--text-primary)',
                padding: '12px 22px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Compass size={16} color="var(--brand-terracotta)" /> Explore Places
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Left / Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Highlights Grid */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
                Top Points of Interest in {destination.name}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {(destination.attractions || []).map(att => (
                  <div
                    key={att.id}
                    onClick={() => onOpenPlaceDetail && onOpenPlaceDetail(att)}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={att.photo} alt={att.name} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.66rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                        {att.category}
                      </span>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {att.name}
                      </h4>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        ★ {att.rating} • {att.estimatedCost || 'Free Entry'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Tourism Map */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  Interactive Destination Map
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {destinationPlaces.length} Points of Interest
                </span>
              </div>
              <div style={{ height: '380px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <MapView
                  places={destinationPlaces}
                  onSelectPlace={(p) => onOpenPlaceDetail && onOpenPlaceDetail(p)}
                />
              </div>
            </div>

            {/* Reviews Section */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {t('place.reviewsTitle', 'Traveler Reviews & Ratings')}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {reviews.length} {t('reviews.totalReviews', 'verified traveler reviews')}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontSize: '0.94rem', fontWeight: 800, color: '#b45309' }}>
                    {(reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)).toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              {/* Review Form */}
              <form onSubmit={handlePostReview} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t('place.writeReview', 'Share Your Experience')}
                  </span>
                  
                  {/* Star Selector */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                      >
                        <Star size={18} fill={star <= newRating ? '#f59e0b' : 'none'} color={star <= newRating ? '#f59e0b' : '#cbd5e1'} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows="3"
                  placeholder={`Write your genuine review for ${destination.name}...`}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    fontSize: '0.84rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '12px'
                  }}
                  required
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Posting as: <strong>{user?.name || "Verified Traveler"}</strong>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    style={{
                      background: 'var(--brand-terracotta)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Send size={14} /> {isSubmitting ? t('reviews.submitting', 'Posting...') : t('reviews.postReview', 'Post Review')}
                  </button>
                </div>

                {reviewSuccess && (
                  <div style={{ marginTop: '10px', color: 'var(--brand-emerald)', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} /> {t('reviews.success', 'Thank you! Your review has been recorded.')}
                  </div>
                )}
              </form>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reviews.map(rev => (
                  <div key={rev.id} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-sand)', color: 'var(--brand-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem' }}>
                          {(rev.userName || 'T')[0]}
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {rev.userName}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 4px 40px' }}>
                      {rev.comment}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '40px' }}>
                      <span>{rev.createdAt || 'Recent traveler'}</span>
                      {rev.crowded && <span>• Crowd: {rev.crowded}</span>}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right / Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Live Weather & Timing */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-azure)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Live Conditions
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 14px 0' }}>
                Weather & Optimal Timing
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>{destination.currentWeather?.icon || '🌤️'}</span>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {destination.currentWeather?.temp}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {destination.currentWeather?.condition}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                💡 <strong>Best season:</strong> October through March offers pleasant daytime weather, crisp evenings, and clear mountain/coastal visibility.
              </div>
            </div>

            {/* Quick Trip Budget Breakdown */}
            {destination.budgetOverview && (
              <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Budget Guidance
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 14px 0' }}>
                  Estimated Trip Expense
                </h4>

                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-terracotta)', marginBottom: '12px' }}>
                  ₹{destination.budgetOverview.total?.toLocaleString('en-IN')} <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 3-day itinerary</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {destination.budgetOverview.categories?.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>● {c.name}</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{c.allocated?.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Helplines */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Shield size={18} color="var(--brand-emerald)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Safety & Emergency Helplines
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {destination.safetyDirectory?.map((s, i) => (
                  <div key={i} style={{ borderBottom: i < destination.safetyDirectory.length - 1 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: '8px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--brand-terracotta)', fontWeight: 700 }}>{s.phone}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

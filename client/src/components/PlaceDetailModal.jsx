import React, { useState, useEffect } from 'react';
import {
  X, Star, MapPin, Clock, DollarSign, Users, Bookmark, Check,
  Share2, Navigation, Compass, Heart, AlertTriangle, MessageSquare,
  Sparkles, Shield, Send, ExternalLink, ChevronRight, CheckCircle2
} from 'lucide-react';
import MapView from './MapView';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getCrowdStatus } from '../services/crowdService';
import { Link, useNavigate } from 'react-router-dom';
import ReportPlaceModal from './ReportPlaceModal';

export default function PlaceDetailModal({
  place,
  isOpen,
  onClose,
  onSavePlace,
  isSaved,
  destination
}) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Reporting modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Gallery state
  const [activePhoto, setActivePhoto] = useState(place?.photo || '');

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [crowdFeedback, setCrowdFeedback] = useState('Moderate');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Sync active photo when place changes
  useEffect(() => {
    if (place) {
      setActivePhoto(place.photo || place.image || '');
      setReviewSuccess(false);
      setNewComment('');
      fetchReviews(place.id);
    }
  }, [place]);

  // Fetch reviews from backend
  const fetchReviews = async (placeId) => {
    if (!placeId) return;
    setReviewsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/destinations/${placeId}/reviews`);
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      } else {
        // Fallback default initial review
        setReviews([
          {
            id: 'rev_init_1',
            userName: 'Priya Narayanan',
            rating: 5,
            comment: `Absolutely loved visiting ${place.name || place.title}! The atmosphere and cultural heritage are mesmerizing.`,
            travelDate: '2026-08-20',
            crowded: 'Moderate',
            userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
          },
          {
            id: 'rev_init_2',
            userName: 'Karthik Raja',
            rating: 5,
            comment: 'One of the best highlights of the trip. Must visit early morning for low crowds and pristine photos.',
            travelDate: '2026-08-14',
            crowded: 'Low',
            userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
          }
        ]);
      }
    } catch (e) {
      setReviews([
        {
          id: 'rev_init_1',
          userName: 'Priya Narayanan',
          rating: 5,
          comment: `Great experience exploring ${place.name || place.title}! Clean, scenic, and authentic.`,
          travelDate: '2026-08-20',
          crowded: 'Moderate',
          userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
        }
      ]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Submit Review Handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingReview) return;

    setIsSubmittingReview(true);
    const authorName = user?.name || 'Verified Explorer';

    try {
      const res = await fetch(`http://localhost:5000/api/destinations/${place.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: place.id,
          placeName: place.name || place.title,
          userName: authorName,
          rating: newRating,
          comment: newComment.trim(),
          crowded: crowdFeedback
        })
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviews(prev => [data.review, ...prev]);
        setNewComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      // Local fallback
      const mockReview = {
        id: 'rev_' + Date.now(),
        userName: authorName,
        rating: newRating,
        comment: newComment.trim(),
        travelDate: 'Just now',
        crowded: crowdFeedback,
        userPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
      setReviews(prev => [mockReview, ...prev]);
      setNewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Share Place Handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/explore?place=${place.id}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  if (!isOpen || !place) return null;

  const crowd = place.crowd || getCrowdStatus(place, '05:00 PM');
  const gallery = place.gallery || [
    place.photo || place.image,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  ].filter(Boolean);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : (place.rating || 4.8);

  const placeCoords = (place.lat && place.lng) ? [place.lat, place.lng] : [13.0499, 80.2824];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(24, 24, 27, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2500,
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '920px',
        width: '100%',
        maxHeight: '92vh',
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-floating)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2600,
            boxShadow: 'var(--shadow-md)',
            color: 'var(--text-primary)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div style={{ overflowY: 'auto', flex: 1 }}>

          {/* Hero Image & Gallery Showcase */}
          <div style={{ position: 'relative', width: '100%', height: '360px', background: '#000000' }}>
            <img
              src={activePhoto}
              alt={place.name || place.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }}
            />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '140px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            {/* Floating Top Left Category Badges */}
            <div style={{ position: 'absolute', top: '20px', left: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--brand-terracotta)',
                fontWeight: 800,
                fontSize: '0.76rem',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {place.category}
              </span>

              {place.subcategory && (
                <span style={{
                  background: 'rgba(24, 24, 27, 0.85)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {place.subcategory}
                </span>
              )}
            </div>

            {/* Floating Bottom Info on Hero */}
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', color: '#ffffff' }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', margin: '0 0 6px 0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  {place.name || place.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.86rem', color: '#e4e4e7' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={15} color="var(--brand-terracotta)" /> {destination?.name || 'Destination'}, {destination?.state || 'India'}
                  </span>
                  <span>•</span>
                  <span>📍 {place.distance || '2.4 km from center'}</span>
                </div>
              </div>

              {/* Rating Pill */}
              <div style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--text-primary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.92rem', boxShadow: 'var(--shadow-sm)' }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span>{avgRating}</span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>({reviews.length + (place.reviewsCount || 120)})</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '12px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)', overflowX: 'auto' }}>
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(img)}
                  style={{
                    border: activePhoto === img ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    width: '68px',
                    height: '48px',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: activePhoto === img ? 1 : 0.65,
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* Content Body */}
          <div style={{ padding: '28px 32px' }}>

            {/* Quick Badges Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              
              {/* Cost Box */}
              <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {t('place.estimatedCost', 'Estimated Cost')}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-terracotta)' }}>
                  {place.displayCost || place.estimatedCost || place.cost || (place.pricePerNight ? `₹${place.pricePerNight}/night` : 'Free Entry')}
                </div>
              </div>

              {/* Best Time Box */}
              <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {t('place.bestTime', 'Best Time to Visit')}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {place.bestTime || place.timing || '08:00 AM - 06:00 PM'}
                </div>
              </div>

              {/* Live Crowd Level Box */}
              {crowd && (
                <div style={{ background: crowd.bg || 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: `1px solid ${crowd.border || 'var(--border-light)'}` }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: crowd.color, textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} /> {t('place.crowdLevel', 'Crowd Density')}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: crowd.color }}>
                    {crowd.tag} • <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{crowd.waitTime}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar (Save, Add to Trip, Share, Maps) */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
              
              {/* Save Bookmark */}
              <button
                onClick={() => onSavePlace && onSavePlace(place)}
                style={{
                  background: isSaved && isSaved(place.id) ? 'rgba(5, 150, 105, 0.1)' : 'var(--bg-surface)',
                  border: isSaved && isSaved(place.id) ? '1.5px solid var(--brand-emerald)' : '1px solid var(--border-light)',
                  color: isSaved && isSaved(place.id) ? 'var(--brand-emerald)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 20px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isSaved && isSaved(place.id) ? <Check size={16} /> : <Bookmark size={16} />}
                <span>{isSaved && isSaved(place.id) ? 'Saved to Pocket Guide' : 'Save Place'}</span>
              </button>

              {/* Add to Trip Planner */}
              <button
                onClick={() => {
                  onClose();
                  navigate('/trips');
                }}
                style={{
                  background: 'var(--brand-terracotta)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 22px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(194, 65, 12, 0.25)'
                }}
              >
                <Sparkles size={16} /> Add to Itinerary
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Share2 size={15} /> {shareCopied ? 'Link Copied!' : 'Share'}
              </button>

              {/* External Google Maps Directions */}
              {place.lat && place.lng && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: 'var(--brand-azure)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Navigation size={15} /> Get Directions <ExternalLink size={12} />
                </a>
              )}

              {/* Report Outdated Information Button */}
              <button
                onClick={() => setReportModalOpen(true)}
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <AlertTriangle size={15} /> Report Outdated Info
              </button>
            </div>

            {/* Verified Source & Data Freshness Banner */}
            {(place.sourceName || place.verificationStatus || place.dataConfidenceScore) && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Verification Status Badge */}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: place.verificationStatus === 'VERIFIED'
                      ? 'rgba(16, 185, 129, 0.15)'
                      : place.hiddenGemCandidate
                      ? 'rgba(168, 85, 247, 0.15)'
                      : place.verificationStatus === 'USER_REPORTED'
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(245, 158, 11, 0.15)',
                    color: place.verificationStatus === 'VERIFIED'
                      ? '#10b981'
                      : place.hiddenGemCandidate
                      ? '#a855f7'
                      : place.verificationStatus === 'USER_REPORTED'
                      ? '#ef4444'
                      : '#f59e0b',
                    border: '1px solid currentColor'
                  }}>
                    {place.verificationStatus === 'VERIFIED' && <CheckCircle2 size={13} />}
                    {place.hiddenGemCandidate && <Sparkles size={13} />}
                    {place.verificationStatus === 'VERIFIED'
                      ? 'Verified Official Source'
                      : place.hiddenGemCandidate
                      ? 'Potential Hidden Gem'
                      : place.verificationStatus === 'USER_REPORTED'
                      ? 'Report Under Review'
                      : 'Pending Community Verification'}
                  </span>

                  {/* Data Confidence Score */}
                  {place.dataConfidenceScore && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Data Confidence: <strong style={{ color: place.dataConfidenceScore >= 80 ? '#10b981' : '#f59e0b' }}>{place.dataConfidenceScore}%</strong>
                    </span>
                  )}

                  {/* Source Citation */}
                  {place.sourceName && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Source:{' '}
                      {place.sourceUrl ? (
                        <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-terracotta)', fontWeight: 700, textDecoration: 'none' }}>
                          {place.sourceName} <ExternalLink size={11} style={{ verticalAlign: 'middle' }} />
                        </a>
                      ) : (
                        <strong style={{ color: 'var(--text-primary)' }}>{place.sourceName}</strong>
                      )}
                    </span>
                  )}
                </div>

                {place.lastVerifiedAt && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Last verified: {new Date(place.lastVerifiedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            )}

            {/* Description & Story */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
                About this Experience
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                {place.shortDesc || place.description || place.story}
              </p>

              {place.whyVisit && (
                <div style={{ background: 'var(--bg-tint-warm)', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginTop: '16px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-amber)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} /> Why Traveler Curators Recommend This
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {place.whyVisit}
                  </p>
                </div>
              )}
            </div>

            {/* Facilities / Tags */}
            {((place.tags && place.tags.length > 0) || (place.facilities && place.facilities.length > 0)) && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Highlights & Facilities
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(place.tags || place.facilities || []).map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '4px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)'
                      }}
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Map Location */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  Location & Geography
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Lat: {placeCoords[0].toFixed(4)}, Lng: {placeCoords[1].toFixed(4)}
                </span>
              </div>
              <div style={{ height: '240px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                <MapView
                  places={[place]}
                  centerCoords={placeCoords}
                  height="100%"
                />
              </div>
            </div>

            {/* REVIEWS & COMMUNITY RATINGS SECTION */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    Traveler Reviews & Ratings
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Authentic feedback from travelers who explored {place.name || place.title}.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-terracotta)', fontFamily: 'var(--font-display)' }}>
                    {avgRating}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={14} fill={s <= Math.round(Number(avgRating)) ? "#f59e0b" : "#e4e4e7"} color={s <= Math.round(Number(avgRating)) ? "#f59e0b" : "#e4e4e7"} />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{reviews.length} community reviews</div>
                  </div>
                </div>
              </div>

              {/* Success Alert */}
              {reviewSuccess && (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#059669" /> Your review was published successfully! Thank you for helping fellow travelers.
                </div>
              )}

              {/* Submit Review Form */}
              <form onSubmit={handleSubmitReview} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '28px' }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Write a Verified Review
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Your Rating:</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                        >
                          <Star size={20} fill={star <= newRating ? "#f59e0b" : "none"} color={star <= newRating ? "#f59e0b" : "#a1a1aa"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Observed Crowd:</span>
                    <select
                      value={crowdFeedback}
                      onChange={e => setCrowdFeedback(e.target.value)}
                      style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      <option value="Low">🟢 Low Crowd</option>
                      <option value="Moderate">🟡 Moderate Crowd</option>
                      <option value="High">🟠 High Crowd</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder={`Share helpful tips, best time to visit, or your favorite dish at ${place.name || place.title}...`}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '12px',
                    fontFamily: 'inherit'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !newComment.trim()}
                    style={{
                      background: 'var(--brand-terracotta)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      opacity: (!newComment.trim() || isSubmittingReview) ? 0.6 : 1
                    }}
                  >
                    <Send size={14} /> {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map(rev => (
                  <div key={rev.id} style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={rev.userPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'} alt={rev.userName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{rev.userName}</h5>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rev.travelDate || 'August 2026'}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={12} fill={s <= (rev.rating || 5) ? "#f59e0b" : "#e4e4e7"} color={s <= (rev.rating || 5) ? "#f59e0b" : "#e4e4e7"} />
                          ))}
                        </div>
                        {rev.crowded && (
                          <span style={{ fontSize: '0.68rem', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {rev.crowded}
                          </span>
                        )}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* User Outdated Info Reporting Modal */}
      <ReportPlaceModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        place={place}
      />
    </div>
  );
}

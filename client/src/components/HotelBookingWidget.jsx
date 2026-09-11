import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, BedDouble, CheckCircle2, AlertCircle,
  ExternalLink, Sparkles, ShieldCheck, MapPin, Navigation,
  Info, ArrowRight, RefreshCw, Bookmark, Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getDefaultDates,
  formatDateForDisplay,
  validateBookingInput,
  getDemoRoomTypes,
  calculateStaySummary
} from '../services/hotelBookingService';

export default function HotelBookingWidget({
  hotel,
  destination,
  onSavePlace,
  isSaved
}) {
  const { t } = useLanguage();

  const { todayStr, checkInDefault, checkOutDefault } = getDefaultDates();

  const [checkIn, setCheckIn] = useState(checkInDefault);
  const [checkOut, setCheckOut] = useState(checkOutDefault);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [validationError, setValidationError] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [redirectNotice, setRedirectNotice] = useState(false);

  // Available demo room tiers for this property
  const roomTypes = getDemoRoomTypes(hotel || {});

  // Reset or initialize when hotel changes
  useEffect(() => {
    if (hotel) {
      setValidationError(null);
      setAvailabilityResult(null);
      setRedirectNotice(false);
      if (roomTypes.length > 0) {
        setSelectedRoomId(roomTypes[0].id);
      }
    }
  }, [hotel?.id]);

  const handleCheckAvailability = (e) => {
    if (e) e.preventDefault();
    setValidationError(null);
    setRedirectNotice(false);

    // Validate inputs
    const validation = validateBookingInput({
      checkIn,
      checkOut,
      guests,
      rooms
    });

    if (!validation.isValid) {
      setValidationError(validation.error);
      setAvailabilityResult(null);
      return;
    }

    setIsChecking(true);

    // Realistic smooth check simulation
    setTimeout(() => {
      const activeRoom = roomTypes.find(r => r.id === selectedRoomId) || roomTypes[0];
      const summary = calculateStaySummary({
        pricePerNight: hotel.pricePerNight || 3000,
        nights: validation.nights,
        rooms: validation.rooms,
        roomMultiplier: activeRoom.rateMultiplier
      });

      setAvailabilityResult({
        hotelName: hotel.name,
        destinationName: destination?.name || hotel.destination || 'Destination',
        checkIn,
        checkOut,
        nights: validation.nights,
        guests: validation.guests,
        rooms: validation.rooms,
        roomType: activeRoom,
        pricing: summary
      });

      setIsChecking(false);
    }, 450);
  };

  // Re-calculate when room selection changes while result is open
  const handleSelectRoom = (room) => {
    setSelectedRoomId(room.id);
    if (availabilityResult) {
      const summary = calculateStaySummary({
        pricePerNight: hotel.pricePerNight || 3000,
        nights: availabilityResult.nights,
        rooms: availabilityResult.rooms,
        roomMultiplier: room.rateMultiplier
      });
      setAvailabilityResult(prev => ({
        ...prev,
        roomType: room,
        pricing: summary
      }));
    }
  };

  // Handle verified booking link click
  const handleContinueToBooking = () => {
    if (hotel?.bookingUrl && hotel?.verified) {
      setRedirectNotice(true);
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const hasVerifiedBooking = Boolean(hotel?.bookingUrl && hotel?.verified);

  return (
    <div
      id="hotel-availability-section"
      style={{
        background: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '28px',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Calendar size={18} color="var(--brand-terracotta)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('stays.availabilityEngine', 'Check Stay Availability')}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {t('stays.planYourStay', 'Select Dates & Guest Details')}
          </h3>
        </div>

        {/* Rate badge */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('stays.startingRate', 'Base Rate')}</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-terracotta)' }}>
            ₹{(hotel?.pricePerNight || 3000).toLocaleString('en-IN')} <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ night</span>
          </div>
        </div>
      </div>

      {/* Date & Occupancy Selector Form */}
      <form onSubmit={handleCheckAvailability}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '18px',
          background: 'var(--bg-surface)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          {/* Check-In Date */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              📅 {t('stays.checkIn', 'Check-in Date')}
            </label>
            <input
              type="date"
              id="stay-checkin-date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setValidationError(null);
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: '#ffffff',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Check-Out Date */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              📅 {t('stays.checkOut', 'Check-out Date')}
            </label>
            <input
              type="date"
              id="stay-checkout-date"
              min={checkIn || todayStr}
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setValidationError(null);
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: '#ffffff',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Guests */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              👥 {t('stays.guests', 'Guests')}
            </label>
            <select
              id="stay-guests-count"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              style={{
                width: '100%',
                padding: '9px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t('stays.guestSingle', 'Guest') : t('stays.guestMultiple', 'Guests')}
                </option>
              ))}
            </select>
          </div>

          {/* Rooms */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              🛏️ {t('stays.rooms', 'Rooms')}
            </label>
            <select
              id="stay-rooms-count"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value, 10))}
              style={{
                width: '100%',
                padding: '9px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t('stays.roomSingle', 'Room') : t('stays.roomMultiple', 'Rooms')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inline Validation Error Message */}
        {validationError && (
          <div
            id="stay-validation-error"
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        {/* Check Availability Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="submit"
            id="check-availability-btn"
            disabled={isChecking}
            style={{
              background: 'var(--brand-terracotta)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '11px 26px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(194, 65, 12, 0.28)',
              transition: 'all 0.2s ease',
              opacity: isChecking ? 0.75 : 1
            }}
          >
            {isChecking ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> {t('stays.calculatingAvailability', 'Checking Availability...')}
              </>
            ) : (
              <>
                <Sparkles size={16} /> {t('stays.checkAvailability', 'Check Availability')}
              </>
            )}
          </button>
        </div>
      </form>

      {/* AVAILABILITY RESULTS & DEMO PRICING SUMMARY */}
      {availabilityResult && (
        <div
          id="stay-availability-result"
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1.5px dashed var(--border-light)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {/* Demo Status Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%)',
            border: '1.5px solid #a7f3d0',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#065f46' }}>
                  {t('stays.roomsAvailable', 'Demo Availability Confirmed for Selected Dates')}
                </span>
                <span style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #86efac',
                  textTransform: 'uppercase'
                }}>
                  Demo Estimate
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#047857', margin: 0, lineHeight: 1.45 }}>
                ⚠️ <strong>{t('stays.demoNoticeTitle', 'Data Safety Notice')}:</strong> {t('stays.demoNoticeDesc', 'This is an estimated demo availability simulation based on catalog tariffs. Live inventory verification and confirmed booking occur via the official provider.')}
              </p>
            </div>
          </div>

          {/* Stay Summary Bar */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.82rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('stays.dates', 'Dates')}: </span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {formatDateForDisplay(availabilityResult.checkIn)} → {formatDateForDisplay(availabilityResult.checkOut)}
              </strong>
              <span style={{ marginLeft: '6px', color: 'var(--brand-terracotta)', fontWeight: 700 }}>
                ({availabilityResult.nights} {availabilityResult.nights === 1 ? t('stays.nightSingle', 'Night') : t('stays.nightsMultiple', 'Nights')})
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('stays.occupancy', 'Occupancy')}: </span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {availabilityResult.guests} {availabilityResult.guests === 1 ? t('stays.guestSingle', 'Guest') : t('stays.guestMultiple', 'Guests')} • {availabilityResult.rooms} {availabilityResult.rooms === 1 ? t('stays.roomSingle', 'Room') : t('stays.roomMultiple', 'Rooms')}
              </strong>
            </div>
          </div>

          {/* Available Room Tier Selection */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              {t('stays.availableRoomOptions', 'Available Room Options (Demo Inventory)')}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {roomTypes.map(room => {
                const isSelected = selectedRoomId === room.id;
                const priceForRoom = Math.round((hotel.pricePerNight || 3000) * room.rateMultiplier);

                return (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room)}
                    style={{
                      border: isSelected ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(194, 65, 12, 0.03)' : '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        background: isSelected ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-light)'
                      }}>
                        {room.badge}
                      </span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          ₹{priceForRoom.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}> / night</span>
                      </div>
                    </div>

                    <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
                      {room.name}
                    </h5>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      🛏️ {room.bed} • 👥 {room.capacity}
                    </div>

                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {room.features.slice(0, 3).map((f, i) => (
                        <span key={i} style={{ fontSize: '0.68rem', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transparent Price Breakdown */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '22px'
          }}>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
              {t('stays.estimatedPriceBreakdown', 'Estimated Cost Summary')}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>
                  {availabilityResult.roomType.name} (₹{availabilityResult.pricing.nightlyRate.toLocaleString('en-IN')} × {availabilityResult.nights} nights × {availabilityResult.rooms} room{availabilityResult.rooms > 1 ? 's' : ''})
                </span>
                <span>₹{availabilityResult.pricing.baseTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>{t('stays.taxesAndFees', 'Estimated Govt Taxes & GST')} ({availabilityResult.pricing.taxRatePercent}%)</span>
                <span>₹{availabilityResult.pricing.estimatedTaxes.toLocaleString('en-IN')}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-light)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text-primary)'
              }}>
                <span>{t('stays.estimatedTotal', 'Estimated Total')}</span>
                <span style={{ color: 'var(--brand-terracotta)' }}>₹{availabilityResult.pricing.estimatedTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* EXTERNAL BOOKING / REDIRECTION SECTION */}
          {hasVerifiedBooking ? (
            /* Case A: Verified Booking URL Available */
            <div style={{
              background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.05) 0%, rgba(249, 115, 22, 0.02) 100%)',
              border: '1.5px solid #fed7aa',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={18} color="#ea580c" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('stays.verifiedPartnerLabel', 'Verified Official Booking Provider')}
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {t('stays.redirectInfo', 'Official booking portal:')} <strong style={{ color: 'var(--text-primary)' }}>{hotel.bookingProvider || 'Official Hotel Portal'}</strong>. {t('stays.redirectSafety', 'You will be securely transferred to finalize your dates, room selection, and payment directly with the hotel.')}
              </p>

              {redirectNotice && (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{t('stays.redirectSuccess', 'Opening official booking portal in a new secure tab. Keep WayMate open for offline navigation & itinerary planning.')}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  id="continue-to-booking-btn"
                  onClick={handleContinueToBooking}
                  style={{
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '12px 28px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(194, 65, 12, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{t('stays.continueToBooking', 'Continue to Booking')}</span>
                  <ExternalLink size={16} />
                </button>

                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  🔒 Official external booking partner
                </span>
              </div>
            </div>
          ) : (
            /* Case B: No verified booking URL (Homestay / Offline property) */
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Info size={18} color="var(--brand-azure)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-azure)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('stays.directBookingNotice', 'Offline / Direct Reservation')}
                </span>
              </div>

              <h5 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                {t('stays.noOnlineBooking', 'Online booking link is not available for this property.')}
              </h5>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {t('stays.offlineBookingDesc', 'This boutique property or local homestay accepts direct inquiries and walk-ins. You can navigate directly using Google Maps or save it to your pocket guide.')}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {hotel.lat && hotel.lng && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.lat},${hotel.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hotel-get-directions-btn"
                    style={{
                      background: 'var(--brand-azure)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '10px 20px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Navigation size={14} /> {t('place.getDirections', 'Get Directions')} <ExternalLink size={12} />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onSavePlace && onSavePlace(hotel)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: isSaved && isSaved(hotel.id) ? 'var(--brand-emerald)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isSaved && isSaved(hotel.id) ? <Check size={15} /> : <Bookmark size={15} />}
                  <span>{isSaved && isSaved(hotel.id) ? t('stays.savedToGuide', 'Saved to Guide') : t('stays.saveProperty', 'Save to Guide')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

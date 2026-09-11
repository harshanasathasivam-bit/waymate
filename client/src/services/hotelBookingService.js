/**
 * WayMate Hotel Booking & Availability Service
 * Handles booking inputs validation, demo availability calculations,
 * transparent pricing breakdown, and verified partner redirection.
 * 
 * IMPORTANT: Strictly avoids generating fabricated booking confirmations,
 * unverified real-time claims, or fake URLs.
 */

// Helper to format date as YYYY-MM-DD
export function formatDateISO(date) {
  const d = new Date(date);
  const month = '' + (d.getMonth() + 1);
  const day = '' + d.getDate();
  const year = d.getFullYear();
  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

// Get default check-in (tomorrow) and check-out (2 days from today)
export function getDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  return {
    todayStr: formatDateISO(today),
    checkInDefault: formatDateISO(tomorrow),
    checkOutDefault: formatDateISO(dayAfter)
  };
}

// Format date for human friendly display (e.g., "Fri, 12 Sep 2026")
export function formatDateForDisplay(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Validate booking inputs
export function validateBookingInput({ checkIn, checkOut, guests, rooms }) {
  if (!checkIn) {
    return { isValid: false, error: 'Please select a check-in date.' };
  }
  if (!checkOut) {
    return { isValid: false, error: 'Please select a check-out date.' };
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return { isValid: false, error: 'Please enter valid calendar dates.' };
  }

  if (checkInDate < today) {
    return { isValid: false, error: 'Check-in date cannot be in the past.' };
  }

  if (checkOutDate <= checkInDate) {
    return { isValid: false, error: 'Check-out date must be after check-in date.' };
  }

  const numGuests = parseInt(guests, 10);
  const numRooms = parseInt(rooms, 10);

  if (isNaN(numGuests) || numGuests < 1) {
    return { isValid: false, error: 'Please select at least 1 guest.' };
  }
  if (isNaN(numRooms) || numRooms < 1) {
    return { isValid: false, error: 'Please select at least 1 room.' };
  }

  // Calculate number of nights
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  return {
    isValid: true,
    error: null,
    nights,
    guests: numGuests,
    rooms: numRooms
  };
}

// Generate realistic demo room types tailored to property price & category
export function getDemoRoomTypes(hotel) {
  const baseRate = hotel.pricePerNight || 3000;
  const isHeritageOrLuxury = (hotel.category && (hotel.category.toLowerCase().includes('luxury') || hotel.category.toLowerCase().includes('heritage') || hotel.category.toLowerCase().includes('resort'))) || baseRate >= 5000;
  const isBudgetOrLodge = baseRate <= 2000;

  if (isBudgetOrLodge) {
    return [
      {
        id: 'room-std',
        name: 'Standard AC Double Room',
        rateMultiplier: 1.0,
        pricePerNight: baseRate,
        bed: '1 Queen Bed',
        capacity: '2 Adults',
        features: ['Air Conditioning', 'Free High-Speed WiFi', 'Ensuite Bathroom', 'Daily Housekeeping'],
        badge: 'Best Value'
      },
      {
        id: 'room-deluxe',
        name: 'Deluxe Private Studio',
        rateMultiplier: 1.35,
        pricePerNight: Math.round(baseRate * 1.35),
        bed: '1 King Bed + Work Desk',
        capacity: '2-3 Adults',
        features: ['Workstation Desk', 'High-Speed WiFi', 'Complimentary Morning Chai', 'City View Window'],
        badge: 'Recommended for Work & Travel'
      }
    ];
  }

  if (isHeritageOrLuxury) {
    return [
      {
        id: 'room-heritage-deluxe',
        name: 'Heritage Deluxe Room',
        rateMultiplier: 1.0,
        pricePerNight: baseRate,
        bed: '1 King Four-Poster Bed',
        capacity: '2 Adults, 1 Child',
        features: ['Courtyard View', 'Jiva / Herbal Toiletries', 'Heritage Teak Furnishing', 'Free High-Speed WiFi', 'Complimentary Breakfast'],
        badge: 'Classic Heritage'
      },
      {
        id: 'room-grand-suite',
        name: 'Royal Heritage Executive Suite',
        rateMultiplier: 1.45,
        pricePerNight: Math.round(baseRate * 1.45),
        bed: '1 Master King Bed + Separate Living Lounge',
        capacity: '3 Adults or 2 Adults + 2 Children',
        features: ['Private Verandah / Garden View', 'Deep Soaking Bathtub', 'High Tea Service', 'Express Check-in', 'Buffet Breakfast Included'],
        badge: 'Signature Luxury Experience'
      }
    ];
  }

  // Standard / Boutique / Homestay tier
  return [
    {
      id: 'room-standard',
      name: 'Comfort Deluxe Room',
      rateMultiplier: 1.0,
      pricePerNight: baseRate,
      bed: '1 King Bed or 2 Twin Beds',
      capacity: '2 Adults',
      features: ['Air Conditioning', 'High-Speed WiFi', 'Hot Shower 24/7', 'Complimentary South Indian Breakfast'],
      badge: 'Popular Choice'
    },
    {
      id: 'room-premium',
      name: 'Premium Balcony Room',
      rateMultiplier: 1.3,
      pricePerNight: Math.round(baseRate * 1.3),
      bed: '1 King Bed + Balcony',
      capacity: '2-3 Adults',
      features: ['Scenic Balcony View', 'Coffee / Tea Maker', 'Complimentary Breakfast', 'Free High-Speed WiFi'],
      badge: 'Extra Comfort'
    }
  ];
}

// Calculate transparent price breakdown
export function calculateStaySummary({
  pricePerNight,
  nights = 1,
  rooms = 1,
  roomMultiplier = 1.0,
  taxRate = 0.12 // 12% GST standard
}) {
  const effectiveNightlyRate = Math.round(pricePerNight * roomMultiplier);
  const baseTotal = effectiveNightlyRate * nights * rooms;
  const estimatedTaxes = Math.round(baseTotal * taxRate);
  const estimatedTotal = baseTotal + estimatedTaxes;

  return {
    nightlyRate: effectiveNightlyRate,
    nights,
    rooms,
    baseTotal,
    estimatedTaxes,
    estimatedTotal,
    taxRatePercent: Math.round(taxRate * 100)
  };
}

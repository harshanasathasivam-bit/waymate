import {
  getDefaultDates,
  formatDateForDisplay,
  validateBookingInput,
  getDemoRoomTypes,
  calculateStaySummary
} from '../services/hotelBookingService.js';
import { DESTINATIONS } from '../data/travelDatabase.js';

console.log('====================================================');
console.log('   WAYMATE PHASE 4: HOTEL BOOKING FLOW TEST SUITE   ');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: DATA INTEGRITY & VERIFIED PARTNERS
// -------------------------------------------------------------
console.log('--- Suite 1: Hotel Data Integrity & Verified Partners ---');

const chennai = DESTINATIONS.find(d => d.id === 'chennai');
assert(chennai && chennai.stays && chennai.stays.length > 0, 'Chennai destination has stays configured');

const tajConnemara = chennai.stays.find(s => s.id === 'stay-chn-1');
assert(tajConnemara !== undefined, 'Taj Connemara Heritage Hotel exists in Chennai stays');
assert(tajConnemara.verified === true, 'Taj Connemara is marked as verified: true');
assert(tajConnemara.bookingUrl === 'https://www.tajhotels.com/en-in/taj/taj-connemara-chennai/', 'Taj Connemara has legitimate Taj official booking URL');
assert(tajConnemara.bookingProvider === 'Taj Hotels Official Portal', 'Taj Connemara has correct booking provider name');
assert(tajConnemara.address && tajConnemara.address.includes('Chennai'), 'Taj Connemara has full physical address');
assert(Array.isArray(tajConnemara.facilities) && tajConnemara.facilities.length > 0, 'Taj Connemara has facilities list');

const mylaporeHomestay = chennai.stays.find(s => s.id === 'stay-chn-2');
assert(mylaporeHomestay !== undefined, 'Mylapore Heritage Homestay exists in Chennai stays');
assert(mylaporeHomestay.verified === false, 'Mylapore Heritage Homestay is verified: false (offline property)');
assert(mylaporeHomestay.bookingUrl === null, 'Mylapore Heritage Homestay bookingUrl is strictly null (No fake URLs)');
assert(mylaporeHomestay.bookingProvider === null, 'Mylapore Heritage Homestay bookingProvider is null');

const coastalRetreat = chennai.stays.find(s => s.id === 'stay-chn-3');
assert(coastalRetreat.bookingUrl === null && coastalRetreat.verified === false, 'Coastal Retreat ECR has no fake booking URL');

const backpackerNest = chennai.stays.find(s => s.id === 'stay-chn-4');
assert(backpackerNest.bookingUrl === null && backpackerNest.verified === false, 'Urban Backpacker Nest has no fake booking URL');

// -------------------------------------------------------------
// TEST SUITE 2: DATE & OCCUPANCY INPUT VALIDATION (Case 1 & Case 2)
// -------------------------------------------------------------
console.log('\n--- Suite 2: Date & Occupancy Input Validation ---');

const { checkInDefault, checkOutDefault } = getDefaultDates();

// Valid Inputs
const validResult = validateBookingInput({
  checkIn: checkInDefault,
  checkOut: checkOutDefault,
  guests: 2,
  rooms: 1
});
assert(validResult.isValid === true, 'Valid dates pass validation');
assert(validResult.nights >= 1, `Nights correctly calculated (${validResult.nights} nights)`);
assert(validResult.guests === 2 && validResult.rooms === 1, 'Guests and rooms parsed accurately');

// Case 2: Invalid checkout before check-in
const invalidCheckout = validateBookingInput({
  checkIn: '2026-10-15',
  checkOut: '2026-10-10',
  guests: 2,
  rooms: 1
});
assert(invalidCheckout.isValid === false, 'Checkout before checkin fails validation');
assert(invalidCheckout.error === 'Check-out date must be after check-in date.', 'Error message matches checkout > checkin requirement');

// Invalid checkout same day as check-in
const sameDayCheckout = validateBookingInput({
  checkIn: '2026-10-15',
  checkOut: '2026-10-15',
  guests: 2,
  rooms: 1
});
assert(sameDayCheckout.isValid === false, 'Same-day checkout fails validation');

// Empty check-in
const emptyCheckin = validateBookingInput({
  checkIn: '',
  checkOut: '2026-10-15',
  guests: 2,
  rooms: 1
});
assert(emptyCheckin.isValid === false && emptyCheckin.error.includes('check-in date'), 'Missing check-in returns proper error');

// Empty check-out
const emptyCheckout = validateBookingInput({
  checkIn: '2026-10-15',
  checkOut: '',
  guests: 2,
  rooms: 1
});
assert(emptyCheckout.isValid === false && emptyCheckout.error.includes('check-out date'), 'Missing check-out returns proper error');

// Past check-in date
const pastCheckin = validateBookingInput({
  checkIn: '2020-01-01',
  checkOut: '2020-01-05',
  guests: 2,
  rooms: 1
});
assert(pastCheckin.isValid === false && pastCheckin.error.includes('past'), 'Past check-in date is rejected');

// Invalid guests / rooms count
const invalidGuests = validateBookingInput({
  checkIn: '2026-10-15',
  checkOut: '2026-10-18',
  guests: 0,
  rooms: 1
});
assert(invalidGuests.isValid === false, '0 guests is rejected');

// -------------------------------------------------------------
// TEST SUITE 3: AVAILABILITY PRICING & ROOM TIERS CALCULATION
// -------------------------------------------------------------
console.log('\n--- Suite 3: Availability Pricing & Demo Room Generation ---');

const tajRooms = getDemoRoomTypes(tajConnemara);
assert(Array.isArray(tajRooms) && tajRooms.length >= 2, 'Luxury hotel generates at least 2 demo room tiers');
assert(tajRooms[0].name.includes('Deluxe') || tajRooms[0].name.includes('Heritage'), 'Generated Deluxe room tier');
assert(tajRooms[1].name.includes('Suite'), 'Generated Executive Suite tier');

const backpackerRooms = getDemoRoomTypes(backpackerNest);
assert(backpackerRooms[0].pricePerNight === 1100, 'Budget lodge matches base rate');

// Price calculation for 3 nights, 2 rooms, 12% GST
const priceSummary = calculateStaySummary({
  pricePerNight: 8500,
  nights: 3,
  rooms: 2,
  roomMultiplier: 1.0,
  taxRate: 0.12
});
assert(priceSummary.baseTotal === 8500 * 3 * 2, `Base total calculated correctly (₹${priceSummary.baseTotal})`);
assert(priceSummary.estimatedTaxes === Math.round(51000 * 0.12), `12% GST calculated correctly (₹${priceSummary.estimatedTaxes})`);
assert(priceSummary.estimatedTotal === 51000 + 6120, `Estimated Total is exact (₹${priceSummary.estimatedTotal})`);

console.log('\n====================================================');
console.log(`   TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}

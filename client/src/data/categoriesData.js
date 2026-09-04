// Centralized Category & Subcategory Taxonomy for WayMate Travel Platform

export const CATEGORIES_CONFIG = {
  attractions: {
    id: 'attractions',
    labelKey: 'cat.attractions',
    defaultLabel: 'Attractions',
    icon: '📍',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Attractions' },
      { id: 'nature', labelKey: 'subcat.nature', defaultLabel: 'Nature' },
      { id: 'heritage', labelKey: 'subcat.heritage', defaultLabel: 'Heritage' },
      { id: 'viewpoints', labelKey: 'subcat.viewpoints', defaultLabel: 'Viewpoints' },
      { id: 'lakes_beaches', labelKey: 'subcat.lakes_beaches', defaultLabel: 'Lakes / Beaches' },
      { id: 'family', labelKey: 'subcat.family', defaultLabel: 'Family' }
    ]
  },
  food: {
    id: 'food',
    labelKey: 'cat.food',
    defaultLabel: 'Food & Dining',
    icon: '🍜',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Food' },
      { id: 'restaurants', labelKey: 'subcat.restaurants', defaultLabel: 'Restaurants' },
      { id: 'cafes', labelKey: 'subcat.cafes', defaultLabel: 'Cafes' },
      { id: 'street_food', labelKey: 'subcat.street_food', defaultLabel: 'Street Food' },
      { id: 'local_traditional', labelKey: 'subcat.local_traditional', defaultLabel: 'Local / Traditional Food' }
    ]
  },
  stays: {
    id: 'stays',
    labelKey: 'cat.stays',
    defaultLabel: 'Stays',
    icon: '🏡',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Stays' },
      { id: 'hotels', labelKey: 'subcat.hotels', defaultLabel: 'Hotels' },
      { id: 'resorts', labelKey: 'subcat.resorts', defaultLabel: 'Resorts' },
      { id: 'homestays', labelKey: 'subcat.homestays', defaultLabel: 'Homestays' },
      { id: 'lodges', labelKey: 'subcat.lodges', defaultLabel: 'Lodges' }
    ]
  },
  shops: {
    id: 'shops',
    labelKey: 'cat.shops',
    defaultLabel: 'Local Shops',
    icon: '🛍️',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Shops' },
      { id: 'handicrafts', labelKey: 'subcat.handicrafts', defaultLabel: 'Handicrafts' },
      { id: 'textiles', labelKey: 'subcat.textiles', defaultLabel: 'Textiles' },
      { id: 'tea_spices', labelKey: 'subcat.tea_spices', defaultLabel: 'Tea / Spices' },
      { id: 'souvenirs', labelKey: 'subcat.souvenirs', defaultLabel: 'Souvenirs' },
      { id: 'local_markets', labelKey: 'subcat.local_markets', defaultLabel: 'Local Markets' }
    ]
  },
  experiences: {
    id: 'experiences',
    labelKey: 'cat.experiences',
    defaultLabel: 'Experiences',
    icon: '✨',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Experiences' },
      { id: 'nature', labelKey: 'subcat.exp_nature', defaultLabel: 'Nature' },
      { id: 'adventure', labelKey: 'subcat.adventure', defaultLabel: 'Adventure' },
      { id: 'culture', labelKey: 'subcat.culture', defaultLabel: 'Culture' },
      { id: 'photography', labelKey: 'subcat.photography', defaultLabel: 'Photography' },
      { id: 'local_experiences', labelKey: 'subcat.local_experiences', defaultLabel: 'Local Experiences' }
    ]
  },
  gems: {
    id: 'gems',
    labelKey: 'cat.gems',
    defaultLabel: 'Hidden Gems',
    icon: '💎',
    subcategories: [
      { id: 'all', labelKey: 'subcat.all', defaultLabel: 'All Gems' },
      { id: 'nature_gems', labelKey: 'subcat.nature_gems', defaultLabel: 'Nature Gems' },
      { id: 'cultural_gems', labelKey: 'subcat.cultural_gems', defaultLabel: 'Cultural Gems' },
      { id: 'secret_viewpoints', labelKey: 'subcat.secret_viewpoints', defaultLabel: 'Secret Viewpoints' },
      { id: 'local_spots', labelKey: 'subcat.local_spots', defaultLabel: 'Local Spots' }
    ]
  }
};

export const CATEGORY_TABS = [
  { id: 'all', labelKey: 'cat.all', defaultLabel: 'All Places', icon: '🌐' },
  { id: 'attractions', labelKey: 'cat.attractions', defaultLabel: 'Attractions', icon: '📍' },
  { id: 'food', labelKey: 'cat.food', defaultLabel: 'Food & Dining', icon: '🍜' },
  { id: 'stays', labelKey: 'cat.stays', defaultLabel: 'Stays', icon: '🏡' },
  { id: 'shops', labelKey: 'cat.shops', defaultLabel: 'Local Shops', icon: '🛍️' },
  { id: 'experiences', labelKey: 'cat.experiences', defaultLabel: 'Experiences', icon: '✨' },
  { id: 'gems', labelKey: 'cat.gems', defaultLabel: 'Hidden Gems', icon: '💎' }
];

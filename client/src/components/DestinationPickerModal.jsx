import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search, MapPin, X, Check, Compass, Sparkles,
  Mountain, Landmark, Waves, Trees, Navigation, ArrowRight
} from 'lucide-react';
import { TAMIL_NADU_DISTRICTS, createCustomTNDestination } from '../data/tamilNaduDestinations';

export default function DestinationPickerModal({
  isOpen,
  onClose,
  destinations = [],
  currentDestination,
  onSelectDestination
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const inputRef = useRef(null);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setActiveTab('all');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter Categories
  const CATEGORY_TABS = [
    { id: 'all', label: 'All Tamil Nadu', icon: <Compass size={14} /> },
    { id: 'popular', label: 'Popular', icon: <Sparkles size={14} /> },
    { id: 'hills', label: 'Hill Stations', icon: <Mountain size={14} /> },
    { id: 'temples', label: 'Temples & Heritage', icon: <Landmark size={14} /> },
    { id: 'coastal', label: 'Coastal & Beaches', icon: <Waves size={14} /> },
    { id: 'nature', label: 'Nature & Falls', icon: <Trees size={14} /> },
    { id: 'districts', label: 'All 38 Districts', icon: <MapPin size={14} /> }
  ];

  // Map of district / destination keywords
  const hillStationNames = ['ooty', 'nilgiris', 'kodaikanal', 'yercaud', 'yelagiri', 'valparai', 'kolli', 'megamalai', 'salem', 'dindigul'];
  const templeHeritageNames = ['madurai', 'thanjavur', 'rameswaram', 'tiruchirappalli', 'tiruvannamalai', 'kumbakonam', 'chettinad', 'kanchipuram', 'chidambaram', 'vellore', 'tirunelveli', 'srivilliputhur', 'ariyalur', 'pudukkottai', 'mayiladuthurai', 'tiruvarur'];
  const coastalNames = ['chennai', 'kanyakumari', 'mahabalipuram', 'rameswaram', 'cuddalore', 'nagapattinam', 'thoothukudi', 'chengalpattu', 'ramanathapuram'];
  const natureFallsNames = ['courtallam', 'tenkasi', 'hogenakkal', 'dharmapuri', 'coimbatore', 'theni', 'erode', 'tiruppur'];
  const popularIds = ['chennai', 'madurai', 'coimbatore', 'ooty', 'kodaikanal', 'kanyakumari', 'thanjavur', 'rameswaram', 'tiruchirappalli', 'mahabalipuram', 'tiruvannamalai', 'yercaud', 'courtallam', 'chettinad', 'hogenakkal'];

  // All searchable destinations
  const allDestinationsList = useMemo(() => {
    // Start with curated destinations
    const list = [...destinations.filter(d => d.state === 'Tamil Nadu')];
    const existingIds = new Set(list.map(d => d.id.toLowerCase()));
    const existingNames = new Set(list.map(d => d.name.toLowerCase()));

    // Add district entries that aren't already represented by a curated destination
    TAMIL_NADU_DISTRICTS.forEach(dist => {
      const lowerName = dist.name.toLowerCase();
      const isAlreadyIn = Array.from(existingNames).some(n => n.includes(lowerName) || lowerName.includes(n));
      if (!isAlreadyIn) {
        list.push({
          id: dist.id,
          name: dist.name,
          district: dist.name,
          state: 'Tamil Nadu',
          tagline: dist.tagline,
          currentWeather: {
            temp: dist.temp,
            condition: dist.condition,
            icon: dist.condition.includes('Cool') || dist.condition.includes('Mist') ? '⛅' : '☀️'
          },
          category: dist.category,
          isDistrictEntry: true
        });
      }
    });

    return list;
  }, [destinations]);

  // Filtered destinations based on search query & active category tab
  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allDestinationsList.filter(d => {
      const name = (d.name || '').toLowerCase();
      const district = (d.district || '').toLowerCase();
      const tagline = (d.tagline || '').toLowerCase();
      const tags = (d.tags || []).join(' ').toLowerCase();

      // Search match
      const matchesSearch = !q ||
        name.includes(q) ||
        district.includes(q) ||
        tagline.includes(q) ||
        tags.includes(q);

      if (!matchesSearch) return false;

      // Tab match
      if (activeTab === 'all') return true;
      if (activeTab === 'popular') return popularIds.includes(d.id.toLowerCase());
      if (activeTab === 'hills') return hillStationNames.some(h => name.includes(h) || d.category === 'hills');
      if (activeTab === 'temples') return templeHeritageNames.some(t => name.includes(t) || d.category === 'temples');
      if (activeTab === 'coastal') return coastalNames.some(c => name.includes(c) || d.category === 'coastal');
      if (activeTab === 'nature') return natureFallsNames.some(n => name.includes(n) || d.category === 'nature');
      if (activeTab === 'districts') return d.isDistrictEntry || TAMIL_NADU_DISTRICTS.some(dist => dist.name.toLowerCase() === name);

      return true;
    });
  }, [allDestinationsList, searchQuery, activeTab]);

  // Handle selecting a destination
  const handleSelect = (dest) => {
    // If it's a district entry without full attractions data, synthesize rich data
    if (dest.isDistrictEntry || !dest.attractions) {
      const richDest = createCustomTNDestination(dest.name);
      onSelectDestination({ ...dest, ...richDest });
    } else {
      onSelectDestination(dest);
    }
    onClose();
  };

  // Handle custom query submit
  const handleCustomSubmit = () => {
    if (!searchQuery.trim()) return;
    const customDest = createCustomTNDestination(searchQuery.trim());
    onSelectDestination(customDest);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '1px solid var(--border-light)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px 18px 28px',
          borderBottom: '1px solid var(--border-light)',
          background: 'linear-gradient(180deg, #fff 0%, var(--bg-surface) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(194, 65, 12, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-terracotta)'
              }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Select Place in Tamil Nadu
                  </h2>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    38 Districts
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                  Choose from popular destinations, all 38 districts, or search any town in Tamil Nadu
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '2px solid var(--brand-terracotta)',
            borderRadius: '14px',
            padding: '10px 16px',
            boxShadow: '0 4px 12px rgba(194, 65, 12, 0.08)'
          }}>
            <Search size={18} color="var(--brand-terracotta)" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search places in Tamil Nadu (e.g. Madurai, Kodaikanal, Yercaud, Salem, Srivilliputhur)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (filteredDestinations.length > 0) {
                    handleSelect(filteredDestinations[0]);
                  } else if (searchQuery.trim()) {
                    handleCustomSubmit();
                  }
                }
              }}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '0.92rem',
                fontWeight: 500,
                color: 'var(--text-primary)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '2px',
                  display: 'flex'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingTop: '14px',
            scrollbarWidth: 'none'
          }}>
            {CATEGORY_TABS.map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: isSelected ? '1px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--brand-terracotta)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body - Destinations Grid */}
        <div style={{
          padding: '20px 28px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Custom Place Suggestion Banner when typing */}
          {searchQuery.trim() && (
            <div
              onClick={handleCustomSubmit}
              style={{
                background: 'linear-gradient(135deg, rgba(194, 65, 12, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)',
                border: '1.5px dashed var(--brand-terracotta)',
                borderRadius: '14px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--brand-terracotta)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Navigation size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Can't find your town? Explore &ldquo;<strong>{searchQuery.trim()}</strong>, Tamil Nadu&rdquo;
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Click here to dynamically generate weather, attractions, and travel guide
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--brand-terracotta)', fontWeight: 700, fontSize: '0.82rem' }}>
                <span>Select</span>
                <ArrowRight size={15} />
              </div>
            </div>
          )}

          {/* Results Count Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tamil Nadu Destinations ({filteredDestinations.length})
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Current: <strong style={{ color: 'var(--brand-terracotta)' }}>{currentDestination?.name}</strong>
            </span>
          </div>

          {/* Destinations Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px'
          }}>
            {filteredDestinations.map(d => {
              const isSelected = d.id === currentDestination?.id || d.name.toLowerCase() === currentDestination?.name?.toLowerCase();
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelect(d)}
                  style={{
                    background: isSelected ? 'rgba(194, 65, 12, 0.05)' : '#ffffff',
                    border: isSelected ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-light)',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    transition: 'all 0.18s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(194, 65, 12, 0.12)' : 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--brand-terracotta)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.96rem', fontWeight: 800, color: isSelected ? 'var(--brand-terracotta)' : 'var(--text-primary)' }}>
                          {d.name}
                        </span>
                        {isSelected && (
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'var(--brand-terracotta)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {d.district ? `${d.district} Dist.` : 'Tamil Nadu'}
                      </span>
                    </div>

                    {/* Weather Badge */}
                    {d.currentWeather && (
                      <div style={{
                        background: 'var(--bg-surface)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexShrink: 0
                      }}>
                        <span>{d.currentWeather.icon || '☀️'}</span>
                        <span>{d.currentWeather.temp}</span>
                      </div>
                    )}
                  </div>

                  {/* Tagline / Highlights */}
                  <p style={{
                    fontSize: '0.73rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.35,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {d.tagline || (d.attractions ? `${d.attractions.length} Attractions & Heritage Spots` : 'Scenic Tamil Nadu District')}
                  </p>

                  {/* Highlights Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      background: isSelected ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {d.attractions ? 'Curated Guide' : 'District Hub'}
                    </span>
                    {d.category && (
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'capitalize'
                      }}>
                        • {d.category}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredDestinations.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-muted)'
            }}>
              <Compass size={36} color="var(--brand-terracotta)" style={{ opacity: 0.5, marginBottom: '10px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                No standard places found for &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto 16px auto' }}>
                You can explore any locality, town, or village in Tamil Nadu by creating a custom guide!
              </p>
              <button
                onClick={handleCustomSubmit}
                style={{
                  background: 'var(--brand-terracotta)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(194, 65, 12, 0.25)'
                }}
              >
                Explore &ldquo;{searchQuery.trim()}&rdquo;, Tamil Nadu
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 28px',
          borderTop: '1px solid var(--border-light)',
          background: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Tip: Press <strong>Enter</strong> to instantly select top result or custom place</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

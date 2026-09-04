import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Custom Icon Generator using HTML DivIcons
const createCustomIcon = (type, label = '', emoji = '') => {
  let bgClass = 'pin-sight';
  let iconSvg = '📍';

  if (type === 'unseen') {
    bgClass = 'pin-unseen';
    iconSvg = '✨';
  } else if (type === 'stay') {
    bgClass = 'pin-stay';
    iconSvg = '🏡';
  } else if (type === 'food') {
    bgClass = 'pin-food';
    iconSvg = '🍜';
  } else if (type === 'shop') {
    bgClass = 'pin-shop';
    iconSvg = '🛍️';
  } else if (type === 'hospital' || type === 'police' || type === 'safety') {
    bgClass = 'pin-safe';
    iconSvg = type === 'hospital' ? '🏥' : '🛡️';
  } else if (type === 'circle') {
    bgClass = 'pin-circle';
    iconSvg = '👤';
  }

  return L.divIcon({
    className: 'leaflet-div-icon',
    html: `
      <div class="custom-map-pin ${bgClass}" title="${label}">
        <span style="font-size: 16px;">${emoji || iconSvg}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
};

// Map Recenter Controller
function MapRecenter({ center, zoom = 12 }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveTravelMap({
  destination,
  activeLayer = 'all',
  selectedPlace,
  onSelectPlace,
  travelCircle = [],
  journeyRoute = null,
  centerCoords = null
}) {
  const center = useMemo(() => {
    if (centerCoords) return centerCoords;
    if (selectedPlace?.lat && selectedPlace?.lng) return [selectedPlace.lat, selectedPlace.lng];
    if (destination?.coordinates) return [destination.coordinates.lat, destination.coordinates.lng];
    return [10.0889, 77.0595];
  }, [centerCoords, selectedPlace, destination]);

  const attractions = destination?.attractions || [];
  const hiddenGems = destination?.hiddenGems || [];
  const stays = destination?.stays || [];
  const localPulse = destination?.localPulse || [];
  const safetyPoints = destination?.safetyPoints || [];

  // Determine if a marker matches the active layer
  const showSights = activeLayer === 'all' || activeLayer === 'sights';
  const showUnseen = activeLayer === 'all' || activeLayer === 'unseen';
  const showStays = activeLayer === 'all' || activeLayer === 'stays';
  const showLocal = activeLayer === 'all' || activeLayer === 'local';
  const showSafety = activeLayer === 'all' || activeLayer === 'safety';
  const showCircle = activeLayer === 'all' || activeLayer === 'circle';

  // Build Journey Polyline Coordinates if active
  const routePolyline = useMemo(() => {
    if (!journeyRoute || !journeyRoute.length) return null;
    return journeyRoute.map(node => [node.lat, node.lng]).filter(coord => coord[0] && coord[1]);
  }, [journeyRoute]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}
        style={{ height: '100%', width: '100%', background: '#0b0f19' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapRecenter center={center} zoom={selectedPlace ? 14 : 12} />

        {/* 1. Sights / Attractions */}
        {showSights && attractions.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon('sight', place.name, '📍')}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '240px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                  {place.category}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 6px 0', color: '#0f172a' }}>
                  {place.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                  {place.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                  <span>⭐ {place.rating}</span>
                  <span>₹{place.cost} • {place.duration}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 2. Unseen / Hidden Gems */}
        {showUnseen && hiddenGems.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon('unseen', place.name, '✨')}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '240px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' }}>
                  ✨ Secret Unseen Gem
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 6px 0', color: '#0f172a' }}>
                  {place.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                  {place.whyVisit}
                </p>
                <div style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 600 }}>
                  Crowd: {place.crowd}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 3. Stays & Lodges */}
        {showStays && stays.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon('stay', place.name, '🏡')}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '240px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase' }}>
                  {place.category}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 4px 0', color: '#0f172a' }}>
                  {place.name}
                </h4>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
                  ₹{place.pricePerNight.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#64748b' }}> / night</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  🌱 Eco Score: {place.ecoScore}/100
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 4. Local Pulse (Food & Crafts) */}
        {showLocal && localPulse.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(place.type, place.name, place.type === 'food' ? '🍜' : '🛍️')}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '240px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                  {place.category}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 4px 0', color: '#0f172a' }}>
                  {place.name}
                </h4>
                <p style={{ fontSize: '0.76rem', color: '#475569', margin: '0 0 6px 0' }}>
                  {place.specialty}
                </p>
                <div style={{ fontSize: '0.72rem', color: '#0f172a', fontWeight: 700 }}>
                  {place.avgPrice}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 5. Safety & Medical Points */}
        {showSafety && safetyPoints.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(place.type, place.name, place.type === 'hospital' ? '🏥' : '🛡️')}
            eventHandlers={{
              click: () => onSelectPlace && onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '240px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
                  24/7 Verified Emergency
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 4px 0', color: '#0f172a' }}>
                  {place.name}
                </h4>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626', margin: '4px 0' }}>
                  📞 {place.phone}
                </div>
                <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                  {place.services}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 6. Travel Circle Members */}
        {showCircle && travelCircle.map(member => (
          <Marker
            key={member.id}
            position={[member.coordinates.lat, member.coordinates.lng]}
            icon={createCustomIcon('circle', member.name, '👤')}
          >
            <Popup>
              <div style={{ padding: '6px', maxWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <img src={member.avatar} alt={member.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.88rem', margin: 0, color: '#0f172a' }}>{member.name}</h4>
                    <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>● {member.status}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.4 }}>
                  📍 {member.currentLocationName}<br />
                  🔋 Battery: {member.batteryLevel}% • {member.speed}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 7. Connected Journey Route Polyline */}
        {routePolyline && (
          <Polyline
            positions={routePolyline}
            color="#ea580c"
            weight={4}
            opacity={0.85}
            dashArray="6, 8"
          />
        )}
      </MapContainer>
    </div>
  );
}

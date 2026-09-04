import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const createPin = (color, label = '') => {
  return L.divIcon({
    className: 'leaflet-div-icon',
    html: `
      <div style="
        background: ${color};
        color: #ffffff;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 2px #ffffff;
        cursor: pointer;
      ">
        ${label || '📍'}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

function MapRecenter({ center, zoom = 12 }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom, { duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({
  places = [],
  centerCoords = null,
  selectedPlace = null,
  onSelectPlace,
  height = '100%',
  routePolyline = null
}) {
  const center = useMemo(() => {
    if (centerCoords) return centerCoords;
    if (selectedPlace?.lat && selectedPlace?.lng) return [selectedPlace.lat, selectedPlace.lng];
    if (places.length > 0 && places[0].lat && places[0].lng) return [places[0].lat, places[0].lng];
    return [13.0499, 80.2824]; // Chennai default
  }, [centerCoords, selectedPlace, places]);

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapRecenter center={center} zoom={selectedPlace ? 14 : 12} />

        {places.map((place, idx) => {
          if (!place.lat || !place.lng) return null;
          const isSelected = selectedPlace?.id === place.id;
          const pinColor = isSelected ? '#18181b' : (place.type === 'stay' ? '#7c3aed' : '#c2410c');

          return (
            <Marker
              key={place.id || idx}
              position={[place.lat, place.lng]}
              icon={createPin(pinColor, place.type === 'stay' ? '🏡' : (idx + 1).toString())}
              eventHandlers={{
                click: () => onSelectPlace && onSelectPlace(place)
              }}
            >
              <Popup>
                <div style={{ padding: '4px', maxWidth: '220px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#c2410c', textTransform: 'uppercase' }}>
                    {place.category}
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0 4px 0', color: '#18181b' }}>
                    {place.name || place.title}
                  </h4>
                  {place.shortDesc && (
                    <p style={{ fontSize: '0.78rem', color: '#52525b', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                      {place.shortDesc}
                    </p>
                  )}
                  {place.pricePerNight && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#18181b' }}>
                      ₹{place.pricePerNight.toLocaleString('en-IN')} / night
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {routePolyline && routePolyline.length > 1 && (
          <Polyline
            positions={routePolyline}
            color="#c2410c"
            weight={3}
            opacity={0.8}
            dashArray="6, 8"
          />
        )}
      </MapContainer>
    </div>
  );
}

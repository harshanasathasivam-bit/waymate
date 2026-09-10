import React, { useEffect, useMemo, useRef } from 'react';
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

function PopupCard({ place, isHiddenGem, lat, lng, onSelectPlace }) {
  const btnRef = useRef(null);
  const titleRef = useRef(null);

  const triggerSelect = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  useEffect(() => {
    const btn = btnRef.current;
    const title = titleRef.current;
    if (btn) {
      btn.addEventListener('click', triggerSelect);
      btn.addEventListener('touchend', triggerSelect);
    }
    if (title) {
      title.addEventListener('click', triggerSelect);
    }
    return () => {
      if (btn) {
        btn.removeEventListener('click', triggerSelect);
        btn.removeEventListener('touchend', triggerSelect);
      }
      if (title) {
        title.removeEventListener('click', triggerSelect);
      }
    };
  }, [place, onSelectPlace]);

  return (
    <div style={{ padding: '6px', maxWidth: '240px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: isHiddenGem ? '#9333ea' : '#c2410c', textTransform: 'uppercase' }}>
          {isHiddenGem ? '✨ Potential Hidden Gem' : place.category}
        </span>
        {place.dataConfidenceScore && (
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#059669', background: 'rgba(5, 150, 105, 0.1)', padding: '1px 5px', borderRadius: '4px' }}>
            {place.dataConfidenceScore}% Conf.
          </span>
        )}
      </div>

      <h4
        ref={titleRef}
        onClick={triggerSelect}
        style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0 4px 0', color: '#18181b', cursor: 'pointer' }}
        title="Click to view full details"
      >
        {place.name || place.title}
      </h4>

      {(place.shortDesc || place.description) && (
        <p style={{ fontSize: '0.78rem', color: '#52525b', margin: '0 0 6px 0', lineHeight: 1.4, maxHeight: '48px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {place.shortDesc || place.description}
        </p>
      )}

      {place.entryFee && place.entryFee !== 'Not available' && (
        <div style={{ fontSize: '0.74rem', color: '#18181b', fontWeight: 700, marginBottom: '4px' }}>
          Fee: <span style={{ color: '#059669' }}>{place.entryFee}</span>
        </div>
      )}

      {place.openingHours && place.openingHours !== 'Not available' && (
        <div style={{ fontSize: '0.72rem', color: '#71717a', marginBottom: '8px' }}>
          🕒 {place.openingHours}
        </div>
      )}

      {place.pricePerNight && (
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#18181b', marginBottom: '8px' }}>
          ₹{place.pricePerNight.toLocaleString('en-IN')} / night
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', marginTop: '6px', borderTop: '1px solid #e4e4e7', paddingTop: '6px' }}>
        <button
          ref={btnRef}
          type="button"
          onClick={triggerSelect}
          onMouseDown={triggerSelect}
          style={{
            flex: 1,
            background: '#18181b',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '0.74rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          Place Details
        </button>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#f4f4f5',
            color: '#0284c7',
            border: '1px solid #e4e4e7',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '0.74rem',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px'
          }}
        >
          Directions
        </a>
      </div>
    </div>
  );
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
          const lat = place.latitude || place.lat;
          const lng = place.longitude || place.lng;
          if (!lat || !lng) return null;

          const isSelected = selectedPlace?.id === place.id || selectedPlace?._id === place._id;
          const isHiddenGem = place.hiddenGemCandidate || place.category === 'Hidden-gem candidates';
          const pinColor = isSelected
            ? '#18181b'
            : isHiddenGem
            ? '#9333ea'
            : place.type === 'stay'
            ? '#7c3aed'
            : '#c2410c';

          const pinIcon = isHiddenGem ? '✨' : place.type === 'stay' ? '🏡' : (idx + 1).toString();

          return (
            <Marker
              key={place._id || place.id || idx}
              position={[lat, lng]}
              icon={createPin(pinColor, pinIcon)}
              eventHandlers={{
                click: () => onSelectPlace && onSelectPlace(place)
              }}
            >
              <Popup>
                <PopupCard
                  place={place}
                  isHiddenGem={isHiddenGem}
                  lat={lat}
                  lng={lng}
                  onSelectPlace={onSelectPlace}
                />
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

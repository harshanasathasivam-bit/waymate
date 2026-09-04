import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import SOSModal from './components/SOSModal';
import PlaceDetailModal from './components/PlaceDetailModal';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Trips from './pages/Trips';
import Stays from './pages/Stays';
import Nearby from './pages/Nearby';
import Saved from './pages/Saved';
import Safety from './pages/Safety';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import DestinationDetail from './pages/DestinationDetail';

import { DESTINATIONS } from './data/travelDatabase';

export default function App() {
  const [destinations] = useState(DESTINATIONS);
  const [currentDestination, setCurrentDestination] = useState(DESTINATIONS[0]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [sosOpen, setSosOpen] = useState(false);
  const [activePlaceDetail, setActivePlaceDetail] = useState(null);

  // Load saved places from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('waymate_user_saved');
      if (saved) setSavedPlaces(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const handleSavePlace = (place) => {
    setSavedPlaces(prev => {
      let updated;
      if (prev.some(p => p.id === place.id)) {
        updated = prev.filter(p => p.id !== place.id);
      } else {
        updated = [...prev, place];
      }
      localStorage.setItem('waymate_user_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (placeId) => savedPlaces.some(p => p.id === placeId);

  const handleRemoveSaved = (placeId) => {
    setSavedPlaces(prev => {
      const updated = prev.filter(p => p.id !== placeId);
      localStorage.setItem('waymate_user_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenPlaceDetail = (place) => {
    setActivePlaceDetail(place);
  };

  const handleClosePlaceDetail = () => {
    setActivePlaceDetail(null);
  };

  const handleAddToTrip = (place) => {
    try {
      const existingStops = JSON.parse(localStorage.getItem('waymate_custom_trip_stops') || '[]');
      if (!existingStops.some(s => s.id === place.id)) {
        const updated = [...existingStops, {
          id: place.id,
          title: place.name || place.title,
          time: '02:30 PM',
          duration: '1.5 hrs',
          cost: place.displayCost || place.estimatedCost || place.cost || 'Free',
          desc: place.shortDesc || place.whyVisit || place.description
        }];
        localStorage.setItem('waymate_custom_trip_stops', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
          
          {/* Top Navigation */}
          <Navbar
            destinations={destinations}
            currentDestination={currentDestination}
            onSelectDestination={setCurrentDestination}
            onOpenSOS={() => setSosOpen(true)}
            savedCount={savedPlaces.length}
          />

          {/* Main Work Stage */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    destination={currentDestination}
                    onSelectDestination={setCurrentDestination}
                    onSavePlace={handleSavePlace}
                    isSaved={isSaved}
                    onOpenSOS={() => setSosOpen(true)}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route
                path="/explore"
                element={
                  <Explore
                    destination={currentDestination}
                    onSavePlace={handleSavePlace}
                    isSaved={isSaved}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route
                path="/trips"
                element={
                  <Trips
                    destination={currentDestination}
                  />
                }
              />

              <Route
                path="/trip-planner"
                element={
                  <Trips
                    destination={currentDestination}
                  />
                }
              />

              <Route
                path="/stays"
                element={
                  <Stays
                    destination={currentDestination}
                    onSavePlace={handleSavePlace}
                    isSaved={isSaved}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route
                path="/nearby"
                element={
                  <Nearby
                    destination={currentDestination}
                    onSavePlace={handleSavePlace}
                    isSaved={isSaved}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route
                path="/saved"
                element={
                  <Saved
                    savedPlaces={savedPlaces}
                    onRemoveSaved={handleRemoveSaved}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route
                path="/safety"
                element={
                  <Safety
                    destination={currentDestination}
                    onOpenSOS={() => setSosOpen(true)}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <Profile />
                }
              />

              <Route
                path="/auth"
                element={
                  <Auth />
                }
              />

              <Route
                path="/destination/:id"
                element={
                  <DestinationDetail
                    onSavePlace={handleSavePlace}
                    isSaved={isSaved}
                    onOpenPlaceDetail={handleOpenPlaceDetail}
                  />
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer onOpenSOS={() => setSosOpen(true)} />

          {/* Global WayMate Guide AI Chatbot with Voice & Translation */}
          <AIChatbot
            currentDestination={currentDestination}
            budget={5000}
            savedCount={savedPlaces.length}
          />

          {/* SOS Emergency Modal */}
          <SOSModal
            isOpen={sosOpen}
            onClose={() => setSosOpen(false)}
            destination={currentDestination}
          />

          {/* Global Place Detail Modal System */}
          <PlaceDetailModal
            place={activePlaceDetail}
            onClose={handleClosePlaceDetail}
            onSavePlace={handleSavePlace}
            isSaved={isSaved}
            onAddToTrip={handleAddToTrip}
            currentDestination={currentDestination}
          />

        </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

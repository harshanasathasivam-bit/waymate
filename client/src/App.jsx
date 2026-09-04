import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import SOSModal from './components/SOSModal';

import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import ItineraryView from './pages/ItineraryView';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Compare from './pages/Compare';
import HiddenGems from './pages/HiddenGems';
import Experiences from './pages/Experiences';
import Packages from './pages/Packages';
import Safety from './pages/Safety';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Auth from './pages/Auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [sosOpen, setSosOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('smarttour_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('smarttour_user', JSON.stringify(userData));
    localStorage.setItem('smarttour_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smarttour_user');
    localStorage.removeItem('smarttour_token');
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar user={user} onLogout={handleLogout} onOpenSOS={() => setSosOpen(true)} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<TripPlanner />} />
            <Route path="/itinerary" element={<ItineraryView user={user} />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/safety" element={<Safety onOpenSOS={() => setSosOpen(true)} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer onOpenSOS={() => setSosOpen(true)} />
        <AIChatbot />
        <SOSModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />
      </div>
    </Router>
  );
}

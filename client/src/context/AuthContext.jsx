import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('waymate_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('waymate_token') || null;
    } catch (e) {
      return null;
    }
  });

  const [plannedTrips, setPlannedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('waymate_user_trips');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save session when user or token updates
  const setSession = (userData, tokenString) => {
    setUser(userData);
    setToken(tokenString);
    try {
      if (userData) {
        localStorage.setItem('waymate_user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('waymate_user');
      }
      if (tokenString) {
        localStorage.setItem('waymate_token', tokenString);
      } else {
        localStorage.removeItem('waymate_token');
      }
    } catch (e) {}
  };

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSession(data.user, data.token);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || 'Invalid credentials' };
    } catch (err) {
      // Fallback demo user login if server offline
      const demoUser = {
        id: 'usr_demo',
        name: email.split('@')[0] || 'Traveler',
        email,
        homeLocation: 'Chennai, Tamil Nadu',
        role: 'user',
        preferences: {
          budgetRange: '₹5,000 - ₹15,000',
          foodPreference: 'All',
          travelStyle: 'Comfortable'
        },
        createdAt: new Date().toISOString()
      };
      setSession(demoUser, 'demo_token_' + Date.now());
      return { success: true, user: demoUser };
    }
  };

  // Register handler
  const register = async ({ name, email, password, homeLocation = 'Salem', preferences = {} }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, homeLocation, preferences })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSession(data.user, data.token);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch (err) {
      const newUser = {
        id: 'usr_' + Date.now(),
        name,
        email,
        homeLocation,
        role: 'user',
        preferences: {
          budgetRange: '₹5,000 - ₹15,000',
          foodPreference: 'All',
          travelStyle: 'Comfortable',
          ...preferences
        },
        createdAt: new Date().toISOString()
      };
      setSession(newUser, 'demo_token_' + Date.now());
      return { success: true, user: newUser };
    }
  };

  // Logout handler
  const logout = () => {
    setSession(null, null);
  };

  // Update profile / preferences
  const updateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem('waymate_user', JSON.stringify(updated));
      if (token && user?.id) {
        await fetch('http://localhost:5000/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, ...updates })
        });
      }
    } catch (e) {}
  };

  // Save planned trip
  const savePlannedTrip = (trip) => {
    setPlannedTrips(prev => {
      const updated = [trip, ...prev.filter(t => t.id !== trip.id)];
      try {
        localStorage.setItem('waymate_user_trips', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        plannedTrips,
        savePlannedTrip
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Plus, Trash2, Edit3, Save, Printer, ArrowLeft, RefreshCw, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export default function ItineraryView({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPlan = location.state?.tripPlan;

  // Fallback demo plan if directly navigated without state
  const demoPlan = {
    destination: {
      id: "munnar",
      name: "Munnar",
      state: "Kerala",
      tagline: "Rolling Tea Gardens & Mist-covered Hills",
      distanceFromSalem: 295,
      safetyInfo: { policeContact: "+91 4865 230323", hospitalContact: "+91 4865 230233" }
    },
    matchPercentage: 94,
    summary: {
      startingLocation: "Salem",
      days: 4,
      travelers: 3,
      travelType: "Family",
      budgetInput: 15000,
      totalEstimatedCost: 13500,
      perPersonCost: 4500,
      budgetVariance: 1500,
      isOverBudget: false
    },
    budgetBreakdown: {
      accommodation: 4200,
      intercityTransport: 3200,
      localTransport: 2400,
      food: 2700,
      activities: 1000,
      emergencyBuffer: 1000,
      total: 13500
    },
    chosenHotel: { name: "Green Valley Budget Resort", pricePerNight: 1400 },
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Day 1 — Arrival & Tea Estate Highlights",
        schedule: [
          { time: "07:30 AM", activity: "Depart from Salem via Private Cab", category: "Travel", cost: 0, description: "Scenic drive through ghat roads" },
          { time: "11:30 AM", activity: "Check-in at Green Valley Budget Resort", category: "Hotel", cost: 1400, description: "Welcome herbal tea check-in" },
          { time: "01:00 PM", activity: "Traditional Kerala Sadhya Lunch", category: "Food", cost: 200, description: "Authentic banana leaf meal" },
          { time: "02:30 PM", activity: "Visit Eravikulam National Park", category: "Attraction", cost: 200, description: "Nilgiri Tahr mountain goat sighting" },
          { time: "06:00 PM", activity: "Sunset Tea Garden Walk & Photography", category: "Photography", cost: 0, description: "Golden hour view" }
        ]
      },
      {
        dayNumber: 2,
        title: "Day 2 — Dam Boating & Spice Farm",
        schedule: [
          { time: "08:30 AM", activity: "Hearty Breakfast at Hotel", category: "Food", cost: 150, description: "Appam with vegetable stew" },
          { time: "10:00 AM", activity: "Mattupetty Dam & Speedboating", category: "Attraction", cost: 150, description: "Serene storage dam boat ride" },
          { time: "01:30 PM", activity: "Lunch at Rapsy Restaurant", category: "Food", cost: 220, description: "Malabar chicken roast" },
          { time: "03:30 PM", activity: "KDHP Tea Museum & Factory Tour", category: "Experience", cost: 125, description: "Tea tasting masterclass" }
        ]
      }
    ]
  };

  const [tripPlan, setTripPlan] = useState(initialPlan || demoPlan);
  const [itineraryDays, setItineraryDays] = useState(tripPlan.itineraryDays);
  const [editingItem, setEditingItem] = useState(null);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityCost, setNewActivityCost] = useState(0);
  const [recalculating, setRecalculating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Remove Activity Item
  const handleRemoveActivity = (dayIndex, actIndex) => {
    const updated = [...itineraryDays];
    updated[dayIndex].schedule.splice(actIndex, 1);
    setItineraryDays(updated);
  };

  // Add Activity Item
  const handleAddActivity = (dayIndex) => {
    if (!newActivityName.trim()) return;
    const updated = [...itineraryDays];
    updated[dayIndex].schedule.push({
      time: "04:30 PM",
      activity: newActivityName,
      category: "Attraction",
      cost: parseInt(newActivityCost) || 0,
      description: "Custom user added activity"
    });
    setItineraryDays(updated);
    setNewActivityName('');
    setNewActivityCost(0);
    setEditingItem(null);
  };

  // Recalculate Trip
  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const res = await fetch('http://localhost:5000/api/itineraries/recalculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripPlan,
          modifiedItineraryDays: itineraryDays
        })
      });
      const data = await res.json();
      if (data.success) {
        setTripPlan(data.tripPlan);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRecalculating(false);
    }
  };

  // Save Trip to User Account
  const handleSaveTrip = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/itineraries/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          tripPlan
        })
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      alert('Failed to save trip.');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={() => navigate('/planner')} className="btn-secondary">
          <ArrowLeft size={16} /> Back to Planner
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.print()} className="btn-secondary">
            <Printer size={16} /> Export / Print PDF
          </button>
          <button onClick={handleSaveTrip} className="btn-primary">
            <Save size={16} /> {savedSuccess ? "Saved to Dashboard!" : "Save Trip"}
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
              {tripPlan.matchPercentage}% Suitability Match
            </div>
            <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit, sans-serif', color: '#f8fafc' }}>
              {tripPlan.destination.name} {tripPlan.summary.days}-Day Itinerary
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              From {tripPlan.summary.startingLocation} • {tripPlan.summary.travelers} Travelers • {tripPlan.summary.travelType} Style
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Estimated Cost</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit, sans-serif' }}>
              ₹{tripPlan.summary.totalEstimatedCost.toLocaleString('en-IN')}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>₹{tripPlan.summary.perPersonCost.toLocaleString('en-IN')} / person</span>
          </div>
        </div>

        {/* Recalculate Trigger Bar */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            ✏️ Custom Itinerary Editor Active: Add or remove attractions below and recalculate.
          </div>
          <button onClick={handleRecalculate} disabled={recalculating} className="btn-secondary" style={{ color: '#34d399', borderColor: '#10b981' }}>
            <RefreshCw size={16} className={recalculating ? 'animate-spin' : ''} />
            Recalculate Total Cost & Schedule
          </button>
        </div>
      </div>

      {/* Day by Day Timetable */}
      {itineraryDays.map((day, dIdx) => (
        <div key={dIdx} className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#34d399', fontFamily: 'Outfit, sans-serif' }}>
              {day.title}
            </h3>
            <button
              onClick={() => setEditingItem(dIdx)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            >
              <Plus size={14} /> Add Attraction
            </button>
          </div>

          {/* Activity items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {day.schedule.map((item, iIdx) => (
              <div key={iIdx} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div style={{
                    minWidth: '80px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#10b981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    {item.time}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', margin: '0 0 2px 0' }}>{item.activity}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{item.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    {item.cost ? `₹${item.cost}` : 'Free'}
                  </span>
                  <button
                    onClick={() => handleRemoveActivity(dIdx, iIdx)}
                    style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Activity Modal Form inline */}
          {editingItem === dIdx && (
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Attraction / Activity Name..."
                value={newActivityName}
                onChange={e => setNewActivityName(e.target.value)}
                style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <input
                type="number"
                placeholder="Est. Fee (₹)"
                value={newActivityCost}
                onChange={e => setNewActivityCost(e.target.value)}
                style={{ width: '120px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <button onClick={() => handleAddActivity(dIdx)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Add
              </button>
              <button onClick={() => setEditingItem(null)} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

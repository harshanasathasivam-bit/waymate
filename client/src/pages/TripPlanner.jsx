import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, DollarSign, Calendar, Users, Heart, Hotel, Bus, Shield, AlertTriangle, ArrowRight, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TripPlanner() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    startingLocation: 'Salem',
    destinationId: '',
    days: 4,
    travelers: 3,
    adults: 2,
    children: 1,
    seniors: 0,
    budget: 15000,
    travelType: 'Family',
    interests: ['Nature', 'Food', 'Photography'],
    hotelPreference: 'Budget',
    transportPreference: 'Private Cab',
    foodPreference: 'All',
    accessibilityRequirements: ['Senior Friendly']
  });

  // Generated Result State
  const [tripPlan, setTripPlan] = useState(null);

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      const updated = exists ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleAccessToggle = (acc) => {
    setFormData(prev => {
      const exists = prev.accessibilityRequirements.includes(acc);
      const updated = exists ? prev.accessibilityRequirements.filter(a => a !== acc) : [...prev.accessibilityRequirements, acc];
      return { ...prev, accessibilityRequirements: updated };
    });
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setTripPlan(data.tripPlan);
        setStep(4); // Results step
      } else {
        alert('Error generating plan: ' + data.message);
      }
    } catch (err) {
      alert('Network error. Check server connectivity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          <Sparkles size={16} /> Intelligent Personalization Engine
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          AI Trip Planner & Budget Optimizer
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Enter your journey parameters and let AI build a customized, budget-aware day-by-day travel plan.
        </p>
      </div>

      {/* Multi-step Stepper Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', position: 'relative' }}>
        {['1. Trip Basics', '2. Budget & Style', '3. Preferences', '4. AI Recommendation'].map((sName, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;

          return (
            <div key={idx} style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isActive ? '#10b981' : isDone ? '#0d9488' : 'rgba(255,255,255,0.08)',
                color: isActive || isDone ? '#ffffff' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px auto',
                fontWeight: 700,
                border: isActive ? '2px solid #34d399' : '1px solid rgba(255,255,255,0.1)'
              }}>
                {isDone ? '✓' : stepNum}
              </div>
              <span style={{ fontSize: '0.8rem', color: isActive ? '#34d399' : '#94a3b8', fontWeight: isActive ? 600 : 400 }}>
                {sName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#f8fafc' }}>Step 1: Starting Point & Destination</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Starting From</label>
                <div style={inputWrapStyle}>
                  <MapPin size={18} color="#10b981" />
                  <input
                    type="text"
                    value={formData.startingLocation}
                    onChange={e => setFormData({ ...formData, startingLocation: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Target Destination (Optional)</label>
                <select
                  value={formData.destinationId}
                  onChange={e => setFormData({ ...formData, destinationId: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">✨ Let AI Auto-Recommend Destination</option>
                  <option value="munnar">Munnar, Kerala</option>
                  <option value="wayanad">Wayanad, Kerala</option>
                  <option value="ooty">Ooty, Tamil Nadu</option>
                  <option value="kodaikanal">Kodaikanal, Tamil Nadu</option>
                  <option value="yercaud">Yercaud, Tamil Nadu</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={formData.days}
                  onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Total Travelers</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={e => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={() => setStep(2)} className="btn-primary">
                Next: Budget & Travel Style <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#f8fafc' }}>Step 2: Budget & Travel Type</h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Total Budget (₹ INR)</label>
              <div style={inputWrapStyle}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>₹</span>
                <input
                  type="number"
                  step="1000"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: parseInt(e.target.value) || 5000 })}
                  style={inputStyle}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                Est. ~₹{Math.round(formData.budget / (formData.days || 1)).toLocaleString('en-IN')}/day for {formData.travelers} travelers
              </span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Travel Style</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Family', 'Honeymoon', 'Solo', 'Photography', 'Senior-friendly', 'Adventure', 'Budget', 'Luxury'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, travelType: t })}
                    style={{
                      background: formData.travelType === t ? '#10b981' : 'rgba(255,255,255,0.08)',
                      color: formData.travelType === t ? '#fff' : '#94a3b8',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Interests (Select multiple)</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Nature', 'Food', 'Cultural', 'Photography', 'Wildlife', 'Spices'].map(i => {
                  const selected = formData.interests.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleInterestToggle(i)}
                      style={{
                        background: selected ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255,255,255,0.05)',
                        color: selected ? '#34d399' : '#94a3b8',
                        border: selected ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {selected ? '✓ ' : '+ '}{i}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button onClick={() => setStep(1)} className="btn-secondary">
                Back
              </button>
              <button onClick={() => setStep(3)} className="btn-primary">
                Next: Preferences & Accessibility <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#f8fafc' }}>Step 3: Stay, Transport & Accessibility</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Hotel Tier</label>
                <select
                  value={formData.hotelPreference}
                  onChange={e => setFormData({ ...formData, hotelPreference: e.target.value })}
                  style={inputStyle}
                >
                  <option value="Budget">Budget Homestay / Lodge (₹1000 - ₹1500)</option>
                  <option value="Mid-Range">Mid-Range 3-Star Resort (₹2500 - ₹4000)</option>
                  <option value="Luxury">Luxury Heritage / 5-Star (₹7000+)</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Transport Mode</label>
                <select
                  value={formData.transportPreference}
                  onChange={e => setFormData({ ...formData, transportPreference: e.target.value })}
                  style={inputStyle}
                >
                  <option value="Private Cab">Private Sightseeing Cab</option>
                  <option value="Train / Bus">Express Train / Luxury Bus</option>
                  <option value="Self Drive">Self Drive / Rental Bike</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Accessibility & Special Filters</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Senior Friendly', 'Wheelchair Accessible', 'Low Walking Requirements', 'Child Friendly', 'Nearby Hospitals'].map(acc => {
                  const checked = formData.accessibilityRequirements.includes(acc);
                  return (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => handleAccessToggle(acc)}
                      style={{
                        background: checked ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                        color: checked ? '#a78bfa' : '#94a3b8',
                        border: checked ? '1px solid #a78bfa' : '1px solid rgba(255,255,255,0.1)',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {checked ? '♿ ' : '♿ '}{acc}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
              <button onClick={() => setStep(2)} className="btn-secondary">
                Back
              </button>
              <button onClick={handleGeneratePlan} disabled={loading} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {loading ? 'AI Engine Calculating...' : 'Generate Personalized Trip'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Display Generated Trip Plan & Budget Optimizer */}
        {step === 4 && tripPlan && (
          <div className="animate-fade-in">
            {/* Match Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(13, 148, 136, 0.2) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                  Smart Recommendation
                </div>
                <h2 style={{ fontSize: '1.8rem', color: '#f8fafc', margin: '4px 0' }}>
                  {tripPlan.destination.name}, {tripPlan.destination.state}
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '600px' }}>
                  {tripPlan.explanation}
                </p>
              </div>

              <div style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)', padding: '16px 24px', borderRadius: '16px' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'Outfit, sans-serif' }}>
                  {tripPlan.matchPercentage}%
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Match Score
                </span>
              </div>
            </div>

            {/* Smart Budget Planner Breakdown */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '16px' }}>Smart Budget Breakdown</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Accommodation</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.accommodation.toLocaleString('en-IN')}</strong>
                </div>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Intercity Transit</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.intercityTransport.toLocaleString('en-IN')}</strong>
                </div>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Local Sightseeing</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.localTransport.toLocaleString('en-IN')}</strong>
                </div>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Food & Dining</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.food.toLocaleString('en-IN')}</strong>
                </div>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Attractions & Activities</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.activities.toLocaleString('en-IN')}</strong>
                </div>
                <div style={budgetBoxStyle}>
                  <span style={budgetCagLabel}>Emergency Buffer</span>
                  <strong style={budgetVal}>₹{tripPlan.budgetBreakdown.emergencyBuffer.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Total & Variance */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Target Budget: ₹{tripPlan.summary.budgetInput.toLocaleString('en-IN')}</span>
                  <h4 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
                    Est. Total: <span style={{ color: '#10b981' }}>₹{tripPlan.summary.totalEstimatedCost.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginLeft: '8px' }}>(₹{tripPlan.summary.perPersonCost.toLocaleString('en-IN')}/person)</span>
                  </h4>
                </div>

                {tripPlan.summary.isOverBudget ? (
                  <div className="badge badge-rose" style={{ padding: '8px 14px' }}>
                    <AlertTriangle size={16} /> Exceeds Budget by ₹{Math.abs(tripPlan.summary.budgetVariance).toLocaleString('en-IN')}
                  </div>
                ) : (
                  <div className="badge badge-emerald" style={{ padding: '8px 14px' }}>
                    <CheckCircle2 size={16} /> ₹{tripPlan.summary.budgetVariance.toLocaleString('en-IN')} Savings Remaining
                  </div>
                )}
              </div>

              {/* Budget Auto-Optimizer Tips */}
              {tripPlan.optimizationTips.length > 0 && (
                <div style={{ marginTop: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ color: '#fbbf24', fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} /> Smart Budget Optimization Recommendations
                  </h4>
                  {tripPlan.optimizationTips.map((tip, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '6px' }}>
                      • <strong>{tip.title}</strong>: {tip.description} (Save ~₹{tip.potentialSavings.toLocaleString('en-IN')})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '32px' }}>
              <button onClick={() => setStep(1)} className="btn-secondary">
                Modify Parameters
              </button>
              <button
                onClick={() => navigate('/itinerary', { state: { tripPlan } })}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              >
                View Full Itinerary & Custom Editor <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#cbd5e1',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none'
};

const inputWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '0 12px'
};

const budgetBoxStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '12px'
};

const budgetCagLabel = {
  display: 'block',
  fontSize: '0.75rem',
  color: '#94a3b8',
  marginBottom: '4px'
};

const budgetVal = {
  fontSize: '1rem',
  color: '#f8fafc'
};

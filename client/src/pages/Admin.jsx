import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, MapPin, Sparkles, Sliders, Plus, Trash2,
  CheckCircle, Clock, DollarSign, RefreshCw, ShieldAlert, Check, X,
  ExternalLink, Edit2, AlertTriangle, Eye, ShieldCheck, Globe
} from 'lucide-react';
import {
  syncPlaces, fetchReviewQueue, verifyPlaceAdmin,
  fetchAdminReports, resolveAdminReport
} from '../services/placesService';

export default function Admin() {
  const [analytics, setAnalytics] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [weights, setWeights] = useState({
    budgetMatch: 25,
    interestMatch: 25,
    durationMatch: 15,
    weatherMatch: 10,
    travelDistance: 10,
    familySuitability: 5,
    accessibility: 5,
    sustainability: 5
  });

  const [newDestName, setNewDestName] = useState('');
  const [newDestState, setNewDestState] = useState('Tamil Nadu');
  const [newDestBudget, setNewDestBudget] = useState(2000);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // AI Tourism Discovery & Review States
  const [reviewPlaces, setReviewPlaces] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSummary, setSyncSummary] = useState(null);
  const [selectedSyncDest, setSelectedSyncDest] = useState('Chennai');
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    // 1. Fetch Analytics
    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.analytics) {
          setAnalytics(data.analytics);
          if (data.analytics.weights) setWeights(data.analytics.weights);
        }
      })
      .catch(err => console.error(err));

    // 2. Fetch Enquiries
    fetch('http://localhost:5000/api/enquiries')
      .then(res => res.json())
      .then(data => {
        if (data.success) setEnquiries(data.enquiries);
      })
      .catch(err => console.error(err));

    // 3. Load Review Queue & Reports
    loadReviewQueue();
    loadReports();
  }, []);

  const loadReviewQueue = async () => {
    setReviewLoading(true);
    try {
      const data = await fetchReviewQueue();
      if (data.success) {
        setReviewPlaces(data.places || []);
      }
    } catch (err) {
      console.warn('Review queue error:', err.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const loadReports = async () => {
    setReportsLoading(true);
    try {
      const data = await fetchAdminReports();
      if (data.success) {
        setUserReports(data.reports || []);
      }
    } catch (err) {
      console.warn('Reports error:', err.message);
    } finally {
      setReportsLoading(false);
    }
  };

  // Trigger External Sync (OpenStreetMap & Wikimedia)
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncSummary(null);
    setErrorMsg('');

    try {
      const res = await syncPlaces(selectedSyncDest);
      if (res.success) {
        setSyncSummary(res.summary);
        setSuccessMsg(`Synchronization complete for ${selectedSyncDest}! Discovered ${res.summary.discovered} places.`);
        loadReviewQueue();
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Sync failed. Please check network or rate limit.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Approve Place
  const handleVerifyPlace = async (placeId, status = 'VERIFIED') => {
    try {
      await verifyPlaceAdmin(placeId, { verificationStatus: status });
      setSuccessMsg(`Place marked as ${status}`);
      loadReviewQueue();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update place');
    }
  };

  // Toggle Hidden Gem Verification
  const handleToggleHiddenGem = async (place) => {
    try {
      const nextVal = !place.hiddenGemVerified;
      await verifyPlaceAdmin(place._id || place.id, {
        hiddenGemVerified: nextVal,
        hiddenGemCandidate: nextVal
      });
      setSuccessMsg(nextVal ? 'Place verified as an Official Hidden Gem!' : 'Hidden gem status removed');
      loadReviewQueue();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Save Inline Edits
  const handleSavePlaceEdits = async (e) => {
    e.preventDefault();
    if (!editingPlace) return;

    try {
      await verifyPlaceAdmin(editingPlace._id || editingPlace.id, {
        category: editingPlace.category,
        description: editingPlace.description,
        openingHours: editingPlace.openingHours,
        entryFee: editingPlace.entryFee,
        verificationStatus: 'VERIFIED'
      });
      setSuccessMsg('Place edited and verified successfully');
      setEditingPlace(null);
      loadReviewQueue();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Resolve User Report
  const handleResolveReport = async (reportId, status = 'RESOLVED') => {
    try {
      await resolveAdminReport(reportId, {
        status,
        adminActionNotes: 'Reviewed and addressed by administrator'
      });
      setSuccessMsg(`Report marked as ${status}`);
      loadReports();
      loadReviewQueue();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleUpdateWeights = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/weights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weights })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Algorithm weights updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    if (!newDestName.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDestName,
          state: newDestState,
          avgDailyBudgetBudget: newDestBudget
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Destination ${newDestName} added successfully!`);
        setNewDestName('');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <LayoutDashboard size={14} /> System Administrator Portal
          </div>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit, sans-serif' }}>
            WayMate Intelligence Hub & Verification Portal
          </h1>
        </div>

        {/* Refresh Queues Button */}
        <button
          onClick={() => {
            loadReviewQueue();
            loadReports();
          }}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={15} /> Refresh Queues
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="badge badge-emerald" style={{ padding: '12px 20px', fontSize: '0.9rem', width: '100%', marginBottom: '24px', justifyContent: 'center' }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '12px 20px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} /> {errorMsg}
        </div>
      )}

      {/* Analytics KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Places Under Review</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b', margin: '6px 0' }}>
            {reviewPlaces.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>● Newly Discovered from OSM</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Active User Reports</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ef4444', margin: '6px 0' }}>
            {userReports.filter(r => r.status === 'PENDING').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#f87171' }}>● Outdated Info Flags</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Pilot Destination</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399', margin: '6px 0' }}>
            Chennai
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>● External Sync Connected</span>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Users</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a78bfa', margin: '6px 0' }}>
            {analytics?.totalUsers || 128}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a78bfa' }}>Registered Travelers</span>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 1. Dynamic Destination Synchronization & Review Hub */}
      {/* ========================================================== */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={22} color="#10b981" /> Dynamic External Tourism Discovery (Pilot: Chennai)
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0 }}>
              Queries OpenStreetMap Overpass API and Wikimedia to discover real places, deduplicate coordinates, and enrich factual data.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              value={selectedSyncDest}
              onChange={(e) => setSelectedSyncDest(e.target.value)}
              style={{
                background: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '0.88rem'
              }}
            >
              <option value="Chennai">Chennai (Pilot Destination)</option>
              <option value="Madurai" disabled>Madurai (Phase 2)</option>
              <option value="Coimbatore" disabled>Coimbatore (Phase 2)</option>
            </select>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              style={{
                background: isSyncing ? '#64748b' : '#10b981',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: isSyncing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Syncing External APIs...' : 'Trigger Destination Sync'}
            </button>
          </div>
        </div>

        {/* Live Sync Results Summary */}
        {syncSummary && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '6px' }}>
              ✓ External Discovery Completed in {syncSummary.durationMs}ms
            </div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
              <span>Discovered Raw Entities: <strong>{syncSummary.discovered}</strong></span>
              <span>Newly Added to Review: <strong>{syncSummary.newlyAdded}</strong></span>
              <span>Existing Updated: <strong>{syncSummary.updated}</strong></span>
            </div>
          </div>
        )}

        {/* Review Queue Table */}
        <h3 style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} color="#f59e0b" /> Discovered Places Pending Verification ({reviewPlaces.length})
        </h3>

        {reviewPlaces.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
            <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
            <p style={{ margin: 0 }}>Review queue is clear! All discovered places have been verified or published.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '12px 14px' }}>Place & Category</th>
                  <th style={{ padding: '12px 14px' }}>Confidence & Status</th>
                  <th style={{ padding: '12px 14px' }}>Source & Link</th>
                  <th style={{ padding: '12px 14px' }}>Timings & Fee</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviewPlaces.map(place => (
                  <tr key={place._id || place.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 700, color: '#f8fafc' }}>{place.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                        {place.category}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {place.description}
                      </div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          background: place.dataConfidenceScore >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: place.dataConfidenceScore >= 80 ? '#34d399' : '#fbbf24',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }}>
                          {place.dataConfidenceScore || 50}% Conf.
                        </span>
                        {place.hiddenGemCandidate && (
                          <span style={{
                            background: 'rgba(168, 85, 247, 0.15)',
                            color: '#c084fc',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.72rem'
                          }}>
                            ✨ Gem Candidate
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                        Status: <strong style={{ color: place.verificationStatus === 'USER_REPORTED' ? '#f87171' : '#f59e0b' }}>{place.verificationStatus}</strong>
                      </div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <div style={{ color: '#cbd5e1' }}>{place.sourceName || 'OpenStreetMap'}</div>
                      {place.sourceUrl && (
                        <a
                          href={place.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#38bdf8', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}
                        >
                          Inspect Source <ExternalLink size={11} />
                        </a>
                      )}
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                        {new Date(place.lastVerifiedAt || place.updatedAt || Date.now()).toLocaleDateString()}
                      </div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                        🕒 {place.openingHours || 'Not available'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '2px' }}>
                        🎟️ {place.entryFee || 'Not available'}
                      </div>
                    </td>

                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {/* Approve Button */}
                        <button
                          onClick={() => handleVerifyPlace(place._id || place.id, 'VERIFIED')}
                          title="Approve & Publish to Users"
                          style={{
                            background: '#10b981',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={13} /> Approve
                        </button>

                        {/* Hidden Gem Toggle */}
                        <button
                          onClick={() => handleToggleHiddenGem(place)}
                          title="Verify as Hidden Gem"
                          style={{
                            background: place.hiddenGemVerified ? '#9333ea' : 'rgba(147, 51, 234, 0.15)',
                            border: '1px solid #9333ea',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            color: place.hiddenGemVerified ? '#ffffff' : '#c084fc',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          ✨ {place.hiddenGemVerified ? 'Verified Gem' : 'Mark Gem'}
                        </button>

                        {/* Edit Inline */}
                        <button
                          onClick={() => setEditingPlace({ ...place })}
                          title="Edit Details"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            color: '#cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Inline Edit Modal */}
        {editingPlace && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '540px', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Edit Place: {editingPlace.name}</h3>
                <button onClick={() => setEditingPlace(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSavePlaceEdits} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Category</label>
                  <input
                    type="text"
                    value={editingPlace.category || ''}
                    onChange={e => setEditingPlace({ ...editingPlace, category: e.target.value })}
                    style={adminInputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Description</label>
                  <textarea
                    rows={3}
                    value={editingPlace.description || ''}
                    onChange={e => setEditingPlace({ ...editingPlace, description: e.target.value })}
                    style={adminInputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Opening Hours</label>
                    <input
                      type="text"
                      value={editingPlace.openingHours || ''}
                      onChange={e => setEditingPlace({ ...editingPlace, openingHours: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Entry Fee</label>
                    <input
                      type="text"
                      value={editingPlace.entryFee || ''}
                      onChange={e => setEditingPlace({ ...editingPlace, entryFee: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingPlace(null)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save & Approve Place
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* 2. User Outdated Information Reports Moderation Inbox */}
      {/* ========================================================== */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={22} color="#ef4444" /> Traveler Reports & Outdated Information Inbox
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '20px' }}>
          Community reports submitted by travelers for incorrect timings, closed locations, or pricing changes.
        </p>

        {userReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
            <CheckCircle size={28} color="#10b981" style={{ margin: '0 auto 6px' }} />
            <p style={{ margin: 0 }}>No unresolved traveler reports at this time.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '10px 14px' }}>Place Name</th>
                  <th style={{ padding: '10px 14px' }}>Issue Type</th>
                  <th style={{ padding: '10px 14px' }}>Traveler Details & Correction</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userReports.map(report => (
                  <tr key={report._id || report.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#f8fafc' }}>
                      {report.placeName || report.placeId?.name}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#f87171',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '0.74rem'
                      }}>
                        {report.issueType}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ color: '#cbd5e1' }}>{report.description}</div>
                      {report.suggestedCorrection && (
                        <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '3px' }}>
                          Suggested: {report.suggestedCorrection}
                        </div>
                      )}
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                        By {report.reportedBy} • {new Date(report.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        color: report.status === 'RESOLVED' ? '#34d399' : '#fbbf24',
                        fontWeight: 700,
                        fontSize: '0.78rem'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      {report.status !== 'RESOLVED' && (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleResolveReport(report._id, 'RESOLVED')}
                            style={{
                              background: '#10b981',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '5px 10px',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '0.74rem',
                              cursor: 'pointer'
                            }}
                          >
                            Mark Resolved
                          </button>
                          <button
                            onClick={() => handleResolveReport(report._id, 'DISMISSED')}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '5px 10px',
                              color: '#94a3b8',
                              fontSize: '0.74rem',
                              cursor: 'pointer'
                            }}
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* 3. Existing Recommendation Weights & Destination Form */}
      {/* ========================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* Recommendation Engine Weights Configurator */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#10b981" /> Algorithm Weighting Configurator
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
            Adjust the weight percentage assigned to each parameter during destination match scoring.
          </p>

          <form onSubmit={handleUpdateWeights} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.keys(weights).map(key => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    value={weights[key]}
                    onChange={e => setWeights({ ...weights, [key]: parseInt(e.target.value) || 0 })}
                    style={{ width: '70px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#34d399', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>%</span>
                </div>
              </div>
            ))}

            <button type="submit" className="btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }}>
              Save Weight Configuration
            </button>
          </form>
        </div>

        {/* Destination Management CRUD */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="#34d399" /> Add New Destination
          </h3>

          <form onSubmit={handleAddDestination} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Destination Name</label>
              <input
                type="text"
                placeholder="e.g. Coorg, Goa, Manali..."
                value={newDestName}
                onChange={e => setNewDestName(e.target.value)}
                style={adminInputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>State</label>
              <input
                type="text"
                value={newDestState}
                onChange={e => setNewDestState(e.target.value)}
                style={adminInputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Est. Daily Budget (₹)</label>
              <input
                type="number"
                value={newDestBudget}
                onChange={e => setNewDestBudget(parseInt(e.target.value) || 1000)}
                style={adminInputStyle}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>
              Publish Destination
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const adminInputStyle = {
  width: '100%',
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.9rem'
};

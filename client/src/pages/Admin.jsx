import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Star, MapPin, Calendar, DollarSign,
  Cpu, TrendingUp, CheckCircle, ArrowUpRight, Sparkles, Pause, Play,
  Check, ChevronRight, RefreshCw, ShieldCheck, Heart
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'places', label: 'Places', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'system', label: 'System', icon: Cpu }
  ];

  // 7-Day Chart Coordinates for smooth SVG curve
  // Mon: 1,420, Tue: 1,680, Wed: 1,540, Thu: 2,120, Fri: 2,480, Sat: 3,150, Sun: 2,890
  const chartData = [
    { day: 'Mon', value: 1420, x: 40, y: 150 },
    { day: 'Tue', value: 1680, x: 120, y: 130 },
    { day: 'Wed', value: 1540, x: 200, y: 140 },
    { day: 'Thu', value: 2120, x: 280, y: 95 },
    { day: 'Fri', value: 2480, x: 360, y: 70 },
    { day: 'Sat', value: 3150, x: 440, y: 30 },
    { day: 'Sun', value: 2890, x: 520, y: 48 }
  ];

  const svgPath = "M 40,150 C 80,140 100,132 120,130 C 160,126 180,142 200,140 C 240,136 260,105 280,95 C 320,80 340,75 360,70 C 400,60 420,35 440,30 C 480,25 500,45 520,48";
  const svgArea = `${svgPath} L 520,180 L 40,180 Z`;

  return (
    <div className="minimal-admin-layout">

      {/* =================================================================== */}
      {/* SIDEBAR */}
      {/* =================================================================== */}
      <aside className="minimal-admin-sidebar">
        <div>
          <div className="minimal-sidebar-header">
            <div className="minimal-brand-title">
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: '#c2410c',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.85rem'
              }}>
                <Sparkles size={16} />
              </span>
              WAYMATE
            </div>
            <div className="minimal-brand-subtitle">AI Travel Platform</div>
          </div>

          <ul className="minimal-nav-list">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`minimal-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={17} color={isActive ? '#c2410c' : '#71717a'} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="minimal-sidebar-footer">
          <div className="minimal-sidebar-profile">
            <div className="minimal-sidebar-avatar">A</div>
            <div>
              <div className="minimal-sidebar-name">Admin</div>
              <div className="minimal-sidebar-status">
                <span className="minimal-status-dot"></span>
                System Online
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================================== */}
      {/* MAIN WORKSTAGE */}
      {/* =================================================================== */}
      <main className="minimal-admin-main">

        {/* Toast alert */}
        {toast && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#18181b',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '0.88rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} color="#34d399" /> {toast}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div>
            {/* Header */}
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Overview</h1>
              <p className="minimal-page-subtitle">Your WayMate platform at a glance.</p>
            </div>

            {/* TOP 4 SIMPLE STAT CARDS */}
            <div className="minimal-stat-grid">
              
              {/* TOTAL USERS */}
              <div className="minimal-stat-card">
                <div className="minimal-stat-header">
                  <span className="minimal-stat-label">TOTAL USERS</span>
                </div>
                <div className="minimal-stat-value">12,480</div>
                <div className="minimal-stat-trend minimal-trend-positive">
                  <ArrowUpRight size={13} /> +12.4%
                </div>
              </div>

              {/* REVIEWS */}
              <div className="minimal-stat-card">
                <div className="minimal-stat-header">
                  <span className="minimal-stat-label">REVIEWS</span>
                </div>
                <div className="minimal-stat-value">3,842</div>
                <div className="minimal-stat-trend minimal-trend-positive">
                  <ArrowUpRight size={13} /> +8.2%
                </div>
              </div>

              {/* PLACES */}
              <div className="minimal-stat-card">
                <div className="minimal-stat-header">
                  <span className="minimal-stat-label">PLACES</span>
                </div>
                <div className="minimal-stat-value">1,248</div>
                <div className="minimal-stat-trend minimal-trend-neutral">
                  AI Managed
                </div>
              </div>

              {/* BOOKINGS */}
              <div className="minimal-stat-card">
                <div className="minimal-stat-header">
                  <span className="minimal-stat-label">BOOKINGS</span>
                </div>
                <div className="minimal-stat-value">2,184</div>
                <div className="minimal-stat-trend minimal-trend-positive">
                  <ArrowUpRight size={13} /> +15.6%
                </div>
              </div>

            </div>

            {/* PLATFORM ACTIVITY (7-DAY LINE CHART) */}
            <div className="minimal-card">
              <div className="minimal-card-header">
                <div>
                  <h2 className="minimal-card-title">Platform Activity</h2>
                  <div className="minimal-card-desc">Visitors & travelers over the last 7 days</div>
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px' }}>
                  +19.4% this week
                </span>
              </div>

              {/* Minimal Clean SVG Line Chart */}
              <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                <svg viewBox="0 0 560 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c2410c" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#c2410c" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="30" x2="520" y2="30" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="40" y1="80" x2="520" y2="80" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="40" y1="130" x2="520" y2="130" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="40" y1="180" x2="520" y2="180" stroke="#e4e4e7" strokeWidth="1" />

                  {/* Gradient Area */}
                  <path d={svgArea} fill="url(#chartGradient)" />

                  {/* Clean Line */}
                  <path d={svgPath} fill="none" stroke="#c2410c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Data Points & Labels */}
                  {chartData.map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#c2410c" strokeWidth="2.5" />
                      <text x={pt.x} y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a1a1aa">
                        {pt.day}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* TWO-COLUMN SECTION */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              
              {/* LEFT COLUMN: POPULAR INTERESTS & RECENT ACTIVITY */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* POPULAR INTERESTS */}
                <div className="minimal-card" style={{ marginBottom: 0 }}>
                  <div className="minimal-card-header">
                    <h2 className="minimal-card-title">Popular Interests</h2>
                  </div>

                  <div className="minimal-interest-group">
                    {[
                      { name: 'Nature', pct: 78, color: '#059669' },
                      { name: 'Heritage', pct: 64, color: '#c2410c' },
                      { name: 'Adventure', pct: 48, color: '#0284c7' },
                      { name: 'Photography', pct: 42, color: '#7c3aed' }
                    ].map(item => (
                      <div key={item.name} className="minimal-interest-item">
                        <div className="minimal-interest-header">
                          <span>{item.name}</span>
                          <span style={{ color: item.color }}>{item.pct}%</span>
                        </div>
                        <div className="minimal-interest-bar-bg">
                          <div
                            className="minimal-interest-bar-fill"
                            style={{ width: `${item.pct}%`, background: item.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="minimal-card" style={{ marginBottom: 0 }}>
                  <div className="minimal-card-header">
                    <h2 className="minimal-card-title">Recent Activity</h2>
                  </div>

                  <div className="minimal-activity-list">
                    <div className="minimal-activity-row">
                      <div className="minimal-activity-text">
                        <span>👤</span> New traveler joined WayMate
                      </div>
                      <span className="minimal-activity-time">2m ago</span>
                    </div>

                    <div className="minimal-activity-row">
                      <div className="minimal-activity-text">
                        <span>📍</span> Place information automatically updated
                      </div>
                      <span className="minimal-activity-time">14m ago</span>
                    </div>

                    <div className="minimal-activity-row">
                      <div className="minimal-activity-text">
                        <span>⭐</span> New review received for Marina Beach
                      </div>
                      <span className="minimal-activity-time">38m ago</span>
                    </div>

                    <div className="minimal-activity-row">
                      <div className="minimal-activity-text">
                        <span>🎟️</span> Booking completed for Ooty Heritage Stay
                      </div>
                      <span className="minimal-activity-time">1h ago</span>
                    </div>

                    <div className="minimal-activity-row">
                      <div className="minimal-activity-text">
                        <span>✨</span> New destination discovered by AI
                      </div>
                      <span className="minimal-activity-time">3h ago</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: REVENUE & AI SYSTEM STATUS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* REVENUE CARD */}
                <div className="minimal-card" style={{ marginBottom: 0 }}>
                  <div className="minimal-card-header">
                    <h2 className="minimal-card-title">Revenue</h2>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#71717a' }}>This Month</span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#18181b', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                      ₹2.84L
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.84rem', fontWeight: 700, color: '#059669', marginTop: '8px' }}>
                      <ArrowUpRight size={14} /> +14.8% from last month
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#71717a' }}>
                    <span>Partner Commissions: <strong>₹1.94L</strong></span>
                    <span>Direct Bookings: <strong>₹90.3K</strong></span>
                  </div>
                </div>

                {/* WAYMATE AI STATUS */}
                <div className="minimal-card" style={{ marginBottom: 0 }}>
                  <div className="minimal-card-header">
                    <h2 className="minimal-card-title">WayMate AI</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>
                      <span className="minimal-status-dot"></span>
                      All systems operational
                    </div>
                  </div>

                  <div className="minimal-ai-status-box">
                    <div className="minimal-ai-status-row">
                      <span className="minimal-ai-label">Data updates</span>
                      <span className="minimal-ai-badge">Automatic</span>
                    </div>

                    <div className="minimal-ai-status-row">
                      <span className="minimal-ai-label">Recommendations</span>
                      <span className="minimal-ai-badge">Automatic</span>
                    </div>

                    <div className="minimal-ai-status-row">
                      <span className="minimal-ai-label">Price monitoring</span>
                      <span className="minimal-ai-badge">Automatic</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 2: USERS */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'users' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Users</h1>
              <p className="minimal-page-subtitle">Registered travelers and active explorers.</p>
            </div>

            <div className="minimal-table-wrapper">
              <table className="minimal-table">
                <thead>
                  <tr>
                    <th>Traveler</th>
                    <th>Home Location</th>
                    <th>Trips Planned</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Aarav Sharma', email: 'aarav@example.com', loc: 'Chennai, TN', trips: 4, joined: 'Sep 2026' },
                    { name: 'Priya Sundaram', email: 'priya.s@example.com', loc: 'Bangalore, KA', trips: 7, joined: 'Aug 2026' },
                    { name: 'Karthik Raja', email: 'karthik.r@example.com', loc: 'Salem, TN', trips: 3, joined: 'Sep 2026' },
                    { name: 'Meera Iyer', email: 'meera.i@example.com', loc: 'Coimbatore, TN', trips: 5, joined: 'Jul 2026' },
                    { name: 'Rahul Varma', email: 'rahul.v@example.com', loc: 'Kochi, KL', trips: 2, joined: 'Sep 2026' }
                  ].map(u => (
                    <tr key={u.email}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#18181b' }}>{u.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#71717a' }}>{u.email}</div>
                      </td>
                      <td>{u.loc}</td>
                      <td style={{ fontWeight: 700 }}>{u.trips} trips</td>
                      <td>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          Active
                        </span>
                      </td>
                      <td style={{ color: '#71717a', fontSize: '0.82rem' }}>{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 3: REVIEWS */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'reviews' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Reviews</h1>
              <p className="minimal-page-subtitle">Traveler feedback and ratings across places.</p>
            </div>

            <div className="minimal-table-wrapper">
              <table className="minimal-table">
                <thead>
                  <tr>
                    <th>Traveler & Rating</th>
                    <th>Destination / Place</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { user: 'Aarav Sharma', place: 'Marina Beach Promenade', rating: 5, comment: 'Lighthouse evening view was spectacular. Accurate timing recommendations!', date: 'Today' },
                    { user: 'Priya Sundaram', place: 'Kapaleeshwarar Temple', rating: 5, comment: 'Spiritual and serene. The morning pooja slots suggested by AI were perfect.', date: 'Yesterday' },
                    { user: 'Karthik Raja', place: 'Kodaikanal Pine Forest', rating: 4, comment: 'Great mist walk. Very scenic and peaceful trails.', date: '2 days ago' },
                    { user: 'Meera Iyer', place: 'Ooty Botanical Gardens', rating: 5, comment: 'Clean, green, and well maintained. Excellent family spot.', date: '3 days ago' }
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#18181b' }}>{r.user}</div>
                        <div style={{ color: '#d97706', fontSize: '0.8rem', marginTop: '2px' }}>
                          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{r.place}</td>
                      <td style={{ color: '#52525b', fontSize: '0.84rem' }}>"{r.comment}"</td>
                      <td style={{ color: '#71717a', fontSize: '0.82rem' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 4: PLACES */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'places' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Places</h1>
              <p className="minimal-page-subtitle">1,248 tourist places autonomously managed by AI.</p>
            </div>

            <div className="minimal-table-wrapper">
              <table className="minimal-table">
                <thead>
                  <tr>
                    <th>Place Name</th>
                    <th>Region</th>
                    <th>Category</th>
                    <th>Timings & Entry</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Kapaleeshwarar Temple', region: 'Chennai', cat: 'Heritage', timing: '05:30 AM - 09:00 PM', fee: 'Free (Darshan ₹50)' },
                    { name: 'Marina Beach & Lighthouse', region: 'Chennai', cat: 'Coastal', timing: 'Open 24 Hours', fee: 'Free' },
                    { name: 'Guindy National Park', region: 'Chennai', cat: 'Nature', timing: '09:00 AM - 05:30 PM', fee: '₹20' },
                    { name: 'Pillar Rocks', region: 'Kodaikanal', cat: 'Viewpoint', timing: '09:00 AM - 04:30 PM', fee: '₹10' },
                    { name: 'Dhanushkodi Ghost Town', region: 'Rameshwaram', cat: 'Heritage', timing: '06:00 AM - 06:00 PM', fee: 'Free' }
                  ].map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: '#18181b' }}>{p.name}</td>
                      <td>{p.region}</td>
                      <td>
                        <span style={{ background: '#f4f4f5', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 600 }}>
                          {p.cat}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: '#52525b' }}>{p.timing} • {p.fee}</td>
                      <td>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          AI Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 5: BOOKINGS */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'bookings' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Bookings</h1>
              <p className="minimal-page-subtitle">2,184 completed partner bookings and itinerary packages.</p>
            </div>

            <div className="minimal-table-wrapper">
              <table className="minimal-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Traveler</th>
                    <th>Service / Destination</th>
                    <th>Amount</th>
                    <th>Commission</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'BK-9421', user: 'Aarav Sharma', service: 'Ooty Heritage Tea Estate Stay', amt: '₹6,400', comm: '₹768', status: 'Confirmed' },
                    { id: 'BK-9420', user: 'Priya Sundaram', service: 'Kodaikanal Guided Nature Trail', amt: '₹1,800', comm: '₹270', status: 'Confirmed' },
                    { id: 'BK-9419', user: 'Karthik Raja', service: 'Rameshwaram Coastal Homestay', amt: '₹4,200', comm: '₹504', status: 'Confirmed' },
                    { id: 'BK-9418', user: 'Meera Iyer', service: 'Chennai Heritage Temple Tour', amt: '₹2,500', comm: '₹375', status: 'Confirmed' }
                  ].map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700, fontFamily: 'monospace', color: '#18181b' }}>{b.id}</td>
                      <td>{b.user}</td>
                      <td style={{ fontWeight: 600 }}>{b.service}</td>
                      <td style={{ fontWeight: 700 }}>{b.amt}</td>
                      <td style={{ color: '#059669', fontWeight: 700 }}>{b.comm}</td>
                      <td>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 6: REVENUE */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'revenue' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">Revenue</h1>
              <p className="minimal-page-subtitle">Monthly monetization performance and partner splits.</p>
            </div>

            <div className="minimal-stat-grid" style={{ marginBottom: '24px' }}>
              <div className="minimal-stat-card">
                <span className="minimal-stat-label">THIS MONTH</span>
                <div className="minimal-stat-value">₹2.84L</div>
                <span className="minimal-stat-trend minimal-trend-positive">+14.8% vs last month</span>
              </div>

              <div className="minimal-stat-card">
                <span className="minimal-stat-label">GROSS BOOKING VALUE</span>
                <div className="minimal-stat-value">₹14.8L</div>
                <span className="minimal-stat-trend minimal-trend-neutral">228 bookings</span>
              </div>

              <div className="minimal-stat-card">
                <span className="minimal-stat-label">PARTNER COMMISSION</span>
                <div className="minimal-stat-value">₹1.94L</div>
                <span className="minimal-stat-trend minimal-trend-positive">Verified stays & tours</span>
              </div>
            </div>

            <div className="minimal-card">
              <div className="minimal-card-header">
                <h2 className="minimal-card-title">Category Breakdown</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Hotels & Homestays', amt: '₹1,19,490', pct: 42, color: '#c2410c' },
                  { name: 'Activities & Experiences', amt: '₹79,660', pct: 28, color: '#059669' },
                  { name: 'Curated Tours & Guides', amt: '₹51,210', pct: 18, color: '#0284c7' },
                  { name: 'Transport & Rentals', amt: '₹34,140', pct: 12, color: '#7c3aed' }
                ].map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fafaf9', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 600, color: '#18181b' }}>{item.name} ({item.pct}%)</div>
                    <div style={{ fontWeight: 800, color: item.color }}>{item.amt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 7: SYSTEM */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'system' && (
          <div>
            <div className="minimal-page-header">
              <h1 className="minimal-page-title">System</h1>
              <p className="minimal-page-subtitle">Overall AI health and emergency platform controls.</p>
            </div>

            <div className="minimal-card" style={{ marginBottom: '24px' }}>
              <div className="minimal-card-header">
                <div>
                  <h2 className="minimal-card-title">Autonomous AI Operations</h2>
                  <div className="minimal-card-desc">AI automatically updates platform data, prices, and recommendations.</div>
                </div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: paused ? '#ef4444' : '#059669',
                  background: paused ? '#fef2f2' : '#ecfdf5',
                  padding: '4px 12px',
                  borderRadius: '6px'
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: paused ? '#ef4444' : '#059669' }}></span>
                  {paused ? 'Autonomous Updates Paused' : 'Autonomous Updates Active'}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <span style={{ fontSize: '0.86rem', color: '#71717a' }}>
                  Safety switch to temporarily hold automated database commits in case of external source anomalies.
                </span>

                <button
                  onClick={() => {
                    const next = !paused;
                    setPaused(next);
                    showToast(next ? 'Autonomous updates paused' : 'Autonomous updates resumed');
                  }}
                  style={{
                    background: paused ? '#059669' : '#18181b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 18px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                  {paused ? 'Resume AI Updates' : 'Pause AI Updates'}
                </button>
              </div>
            </div>

            <div className="minimal-card">
              <div className="minimal-card-header">
                <h2 className="minimal-card-title">System Status</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fafaf9', borderRadius: '10px', fontSize: '0.86rem' }}>
                  <span style={{ color: '#52525b', fontWeight: 600 }}>API Gateway</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Operational (22ms)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fafaf9', borderRadius: '10px', fontSize: '0.86rem' }}>
                  <span style={{ color: '#52525b', fontWeight: 600 }}>Database Cluster</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Connected</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fafaf9', borderRadius: '10px', fontSize: '0.86rem' }}>
                  <span style={{ color: '#52525b', fontWeight: 600 }}>External Tourism Sync</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Synchronized (Just now)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

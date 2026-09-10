/**
 * Frontend Service for AI-Powered Tourism Place Discovery
 */

const API_BASE = 'http://localhost:5000/api/places';

export async function fetchPlaces(filters = {}) {
  const params = new URLSearchParams();
  if (filters.destination) params.append('destination', filters.destination);
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.hiddenGemsOnly) params.append('hiddenGemsOnly', 'true');
  if (filters.status) params.append('status', filters.status);
  if (filters.budget) params.append('budget', filters.budget);
  if (filters.duration) params.append('duration', filters.duration);
  if (filters.companion) params.append('companion', filters.companion);
  if (filters.interests && filters.interests.length > 0) {
    params.append('interests', Array.isArray(filters.interests) ? filters.interests.join(',') : filters.interests);
  }
  if (filters.maxDistance) params.append('maxDistance', filters.maxDistance);
  if (filters.includeUnreviewed) params.append('includeUnreviewed', 'true');

  const res = await fetch(`${API_BASE}?${params.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch places`);
  return res.json();
}

export async function fetchPlaceById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch place`);
  return res.json();
}

export async function fetchNearbyPlaces(id, radiusMeters = 5000) {
  const res = await fetch(`${API_BASE}/${id}/nearby?radius=${radiusMeters}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch nearby places`);
  return res.json();
}

export async function syncPlaces(destination = 'Chennai') {
  const res = await fetch(`${API_BASE}/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destination, triggeredBy: 'Admin Portal' })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}: Synchronization failed`);
  }
  return res.json();
}

export async function reportPlace(placeId, reportData) {
  const res = await fetch(`${API_BASE}/${placeId}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit report');
  }
  return res.json();
}

export async function fetchReviewQueue() {
  const res = await fetch(`${API_BASE}/admin/review-queue`);
  if (!res.ok) throw new Error('Failed to fetch admin review queue');
  return res.json();
}

export async function verifyPlaceAdmin(placeId, updateData) {
  const res = await fetch(`${API_BASE}/admin/${placeId}/verify`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!res.ok) throw new Error('Failed to update place verification');
  return res.json();
}

export async function fetchAdminReports() {
  const res = await fetch(`${API_BASE}/admin/reports`);
  if (!res.ok) throw new Error('Failed to fetch admin reports');
  return res.json();
}

export async function resolveAdminReport(reportId, updateData) {
  const res = await fetch(`${API_BASE}/admin/reports/${reportId}/resolve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!res.ok) throw new Error('Failed to resolve report');
  return res.json();
}

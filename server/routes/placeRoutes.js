const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// Public Place Discovery Endpoints
router.get('/', placeController.getPlaces);
router.get('/:id', placeController.getPlaceById);
router.get('/:id/nearby', placeController.getNearbyPlaces);
router.post('/sync', placeController.syncDestination);
router.post('/:id/report', placeController.reportPlace);

// Admin Moderation & Verification Endpoints
router.get('/admin/review-queue', placeController.getAdminReviewQueue);
router.put('/admin/:id/verify', placeController.verifyPlace);
router.get('/admin/reports', placeController.getAdminReports);
router.put('/admin/reports/:reportId/resolve', placeController.resolveReport);

module.exports = router;

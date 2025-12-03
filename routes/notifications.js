const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// GET /api/notifications/subscribe - SSE endpoint for real-time notifications
router.get('/subscribe', notificationController.subscribe);

// GET /api/notifications/status - Get connection status
router.get('/status', notificationController.getConnectionStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const employeeRoutes = require('./employees');
const importRoutes = require('./import');
const notificationRoutes = require('./notifications');

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Auth routes
router.use('/auth', authRoutes);

// Employee routes
router.use('/employees', employeeRoutes);

// Import routes
router.use('/import', importRoutes);

// Notification routes
router.use('/notifications', notificationRoutes);

module.exports = router;

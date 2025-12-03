const { redisClient } = require('../config/redis');

// Store active SSE connections by user ID
const activeConnections = new Map();
let subscriber = null;

// Subscribe to Redis notifications
const subscribeToNotifications = () => {
    subscriber = redisClient.duplicate();
    
    subscriber.connect().then(() => {
        subscriber.subscribe('employee-notifications', (message) => {
            try {
                const notification = JSON.parse(message);
                const { userId, type } = notification;
                
                // Send notification to specific user if they have active connection
                if (activeConnections.has(userId)) {
                    const connections = activeConnections.get(userId);
                    connections.forEach(connection => {
                        connection.write(`data: ${JSON.stringify(notification)}\n\n`);
                    });
                }
            } catch (error) {
                console.error('Error processing notification:', error);
            }
        });
    }).catch(error => {
        console.error('Failed to connect Redis subscriber:', error);
    });
};

// Initialize SSE service
const initializeSSE = () => {
    subscribeToNotifications();
    
    // Send heartbeat to keep connections alive
    setInterval(() => {
        activeConnections.forEach((connections, userId) => {
            connections.forEach(connection => {
                connection.write(': heartbeat\n\n');
            });
        });
    }, 30000); // 30 seconds
};

// Add new SSE connection
const addConnection = (userId, res) => {
    if (!activeConnections.has(userId)) {
        activeConnections.set(userId, new Set());
    }
    
    activeConnections.get(userId).add(res);
    
    // Set up connection cleanup on disconnect
    res.on('close', () => {
        removeConnection(userId, res);
    });
    
    // Send initial connection message
    res.write(`data: ${JSON.stringify({
        type: 'connection_established',
        userId,
        message: 'SSE connection established',
        timestamp: new Date().toISOString()
    })}\n\n`);
};

// Remove SSE connection
const removeConnection = (userId, res) => {
    if (activeConnections.has(userId)) {
        const connections = activeConnections.get(userId);
        connections.delete(res);
        
        // Clean up empty connection sets
        if (connections.size === 0) {
            activeConnections.delete(userId);
        }
    }
};

// Get active connection count for user
const getConnectionCount = (userId) => {
    return activeConnections.has(userId) ? activeConnections.get(userId).size : 0;
};

// Get total active connections
const getTotalConnections = () => {
    let total = 0;
    activeConnections.forEach(connections => {
        total += connections.size;
    });
    return total;
};

// Cleanup function for graceful shutdown
const cleanup = async () => {
    console.log('Cleaning up SSE service...');
    
    // Close all active connections
    activeConnections.forEach((connections, userId) => {
        connections.forEach(connection => {
            try {
                connection.end();
            } catch (error) {
                console.error('Error closing connection:', error);
            }
        });
    });
    activeConnections.clear();
    
    // Disconnect Redis subscriber
    if (subscriber) {
        try {
            await subscriber.quit();
            console.log('Redis subscriber disconnected');
        } catch (error) {
            console.error('Error disconnecting Redis subscriber:', error);
        }
    }
};

module.exports = {
    initializeSSE,
    addConnection,
    removeConnection,
    getConnectionCount,
    getTotalConnections,
    cleanup
};

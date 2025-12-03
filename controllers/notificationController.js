const { success, error } = require('../utils/responseHelper');
const { addConnection, getConnectionCount, getTotalConnections } = require('../services/sseService');

const notificationController = {
    // SSE endpoint for real-time notifications
    subscribe: async (req, res) => {
        try {
            const userId = req.user.id;
            
            // Set SSE headers
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Cache-Control'
            });
            
            // Add connection to SSE service
            addConnection(userId, res);
            
            console.log(`SSE connection established for user ${userId}`);
            
        } catch (err) {
            console.error('SSE subscription error:', err);
            return error(res);
        }
    },
    
    // Get connection status
    getConnectionStatus: async (req, res) => {
        try {
            const userId = req.user.id;
            const userConnections = getConnectionCount(userId);
            const totalConnections = getTotalConnections();
            
            return success(res, {
                userId,
                activeConnections: userConnections,
                totalActiveConnections: totalConnections,
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            console.error('Get connection status error:', err);
            return error(res);
        }
    }
};

module.exports = notificationController;

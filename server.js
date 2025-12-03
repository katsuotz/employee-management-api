require('dotenv').config();
const app = require('./app');
const db = require('./models');
const { connectRedis } = require('./config/redis');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Database connection and server startup
const startServer = async () => {
    try {
        // Test database connection
        await db.sequelize.authenticate();
        logger.info('✓ Database connection established successfully');

        // Note: Run migrations with 'npm run migrate' instead of auto-sync
        // await db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        logger.info('✓ Database ready (run migrations if needed)');

        // Connect to Redis
        await connectRedis();

        // Start server
        app.listen(PORT, () => {
            logger.info(`✓ Server is running on port ${PORT}`);
            logger.info(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`✓ API available at: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        logger.error('Unable to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
    logger.info('Shutting down gracefully...');
    await db.sequelize.close();
    process.exit(0);
});

startServer();

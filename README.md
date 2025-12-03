# Employee Management System - Backend API

Backend API for Employee Management System built with Express.js, PostgreSQL, Sequelize ORM, and Redis.

## Features

- ✅ RESTful API with Express.js
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Redis caching for improved performance
- ✅ Environment-based configuration
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Example User CRUD operations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Cache**: Redis
- **Environment**: dotenv

## Project Structure

```
backend/
├── config/
│   ├── database.js       # Sequelize configuration
│   └── redis.js          # Redis client configuration
├── controllers/
│   └── userController.js # User business logic
├── middleware/
│   └── errorHandler.js   # Global error handler
├── models/
│   ├── index.js          # Model loader
│   └── User.js           # User model
├── routes/
│   ├── index.js          # Main router
│   └── userRoutes.js     # User routes
├── utils/
│   └── logger.js         # Logging utility
├── .env.example          # Environment variables template
├── .gitignore
├── app.js                # Express app configuration
├── package.json
└── server.js             # Server entry point
```

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Redis (v6 or higher)

## Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and configure your database and Redis settings:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=manajemen_karyawan
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

3. **Create PostgreSQL database**:
   ```sql
   CREATE DATABASE manajemen_karyawan;
   ```

## Running the Application

### Development Mode
```bash
pnpm dev
```

### Production Mode
```bash
pnpm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## Database Models

### User Model
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required)
- `role` (Enum: admin, manager, employee)
- `isActive` (Boolean, Default: true)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Redis Caching

The application uses Redis for caching user data:
- Cache key: `users:all`
- TTL: 300 seconds (5 minutes)
- Automatically invalidated on create, update, or delete operations

## Error Handling

The application includes comprehensive error handling:
- Sequelize validation errors (400)
- Unique constraint violations (409)
- Not found errors (404)
- Internal server errors (500)

## Development Notes

### Database Synchronization
In development mode, the database schema is automatically synchronized using `sequelize.sync({ alter: true })`. 

**For production**, you should use Sequelize migrations instead:
```bash
npx sequelize-cli migration:generate --name create-users-table
npx sequelize-cli db:migrate
```

## License

ISC

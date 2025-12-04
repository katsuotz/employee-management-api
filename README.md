# Employee Management System - Backend API

Backend API for Employee Management System built with Express.js, PostgreSQL, Sequelize ORM, and Redis.

## Features

- ✅ RESTful API with Express.js
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Redis caching for improved performance
- ✅ JWT Authentication
- ✅ File upload for CSV import
- ✅ Background job processing with Bull Queue
- ✅ Environment-based configuration
- ✅ Comprehensive error handling
- ✅ CORS enabled
- ✅ Database migrations and seeders

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15+
- **ORM**: Sequelize
- **Cache**: Redis 7+
- **Authentication**: JWT
- **Queue**: Bull (Redis-based job queue)
- **File Upload**: Multer
- **Package Manager**: pnpm

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- Redis (v7 or higher)
- pnpm (latest version)

## Installation

### 1. Clone and install dependencies:
```bash
pnpm install
```

### 2. Set up environment variables:
```bash
cp .env.example .env
```

Then edit `.env` and configure your settings:

## Environment Variables

### Server Configuration
```env
NODE_ENV=development
PORT=5000
```

### PostgreSQL Database Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=manajemen_karyawan
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### Redis Configuration
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### JWT Configuration
```env
JWT_SECRET=your_jwt_secret_here
```

### Run database migrations:
```bash
# Create all tables based on models
pnpm run migrate

# If you need to undo the last migration
pnpm run migrate:undo

# Undo all migrations
pnpm run migrate:undo:all
```

### Run database seeders (populate database with initial data):
```bash
# Run all seeders
pnpm run seed

# Undo the last seeder
pnpm run seed:undo

# Undo all seeders
pnpm run seed:undo:all
```

### Migration and Seeder Commands

#### Migration Commands
```bash
# Generate a new migration file
pnpm run migration:generate --name create-employees-table

# Run pending migrations
pnpm run migrate

# Undo last migration
pnpm run migrate:undo

# Undo all migrations
pnpm run migrate:undo:all
```

#### Seeder Commands
```bash
# Generate a new seeder file
pnpm run seeder:generate --name demo-employees

# Run all seeders
pnpm run seed

# Undo last seeder
pnpm run seed:undo

# Undo all seeders
pnpm run seed:undo:all
```

## Running the Application

### Development Mode
```bash
pnpm dev
```
The server will start on `http://localhost:5000` with hot reload using nodemon.

### Production Mode
```bash
pnpm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Start production server |
| `pnpm dev` | Start development server with hot reload |
| `pnpm test` | Run Jest tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm migrate` | Run database migrations |
| `pnpm migrate:undo` | Undo last migration |
| `pnpm migrate:undo:all` | Undo all migrations |
| `pnpm migration:generate` | Generate new migration file |
| `pnpm seed` | Run database seeders |
| `pnpm seed:undo` | Undo last seeder |
| `pnpm seed:undo:all` | Undo all seeders |
| `pnpm seeder:generate` | Generate new seeder file |

## Redis Caching

The application uses Redis for:
- **Job queue** - Background job processing for CSV imports
- **Cache** - Frequently accessed data with TTL
- **Pub/Sub** - Real-time notifications for import progress

## Background Jobs

The application uses Bull Queue for background processing:
- **CSV Import Jobs** - Process large CSV files asynchronously
- **Job Status Tracking** - Monitor job progress and status

## Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure
- Unit tests for controllers and services
- Integration tests for API endpoints
- Database tests with fixtures
- Mock external dependencies

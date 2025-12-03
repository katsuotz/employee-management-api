# Database Migrations Guide

## Overview

This project uses Sequelize migrations for database schema management instead of auto-sync for better control and production safety.

## Migration Commands

### Run Migrations
```bash
npm run migrate
```
This applies all pending migrations to the database.

### Undo Last Migration
```bash
npm run migrate:undo
```
Reverts the most recent migration.

### Undo All Migrations
```bash
npm run migrate:undo:all
```
Reverts all migrations (use with caution!).

### Generate New Migration
```bash
npm run migration:generate -- migration-name
```
Example:
```bash
npm run migration:generate -- add-department-table
```

## Existing Migrations

### 20251203085642-create-users-table.js
Creates the `users` table with:
- `id` (UUID primary key)
- `name` (string, required)
- `email` (string, required, unique with index)
- `password` (string, required)
- `role` (enum: 'admin', 'user', default: 'user')
- `created_at` and `updated_at` timestamps

## First-Time Setup

After installing dependencies and configuring your database:

1. **Run the migration**:
   ```bash
   npm run migrate
   ```

2. **Verify the table was created**:
   ```sql
   \dt  -- in psql
   ```

## Creating New Migrations

When you need to modify the database schema:

1. **Generate a new migration file**:
   ```bash
   npm run migration:generate -- your-migration-name
   ```

2. **Edit the generated file** in the `migrations/` folder

3. **Implement the `up` method** (what to do when applying the migration)

4. **Implement the `down` method** (how to revert the migration)

5. **Run the migration**:
   ```bash
   npm run migrate
   ```

## Best Practices

- ✅ Always test migrations in development before production
- ✅ Never modify existing migration files that have been run
- ✅ Always provide a `down` method for rollback capability
- ✅ Use transactions for complex migrations
- ✅ Keep migrations small and focused
- ❌ Don't use `sequelize.sync()` in production

## Migration Status

To check which migrations have been applied, query the `SequelizeMeta` table:

```sql
SELECT * FROM "SequelizeMeta";
```

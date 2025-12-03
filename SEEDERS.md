# Database Seeders Guide

## Overview

Seeders are used to populate your database with initial or test data. This is useful for development, testing, or setting up default data like admin users.

## Seeder Commands

### Run All Seeders
```bash
npm run seed
```
Executes all seeder files in the `seeders/` directory.

### Undo Last Seeder
```bash
npm run seed:undo
```
Reverts the most recently executed seeder.

### Undo All Seeders
```bash
npm run seed:undo:all
```
Reverts all seeders (use with caution!).

### Generate New Seeder
```bash
npm run seeder:generate -- seeder-name
```
Example:
```bash
npm run seeder:generate -- demo-users
```

## Existing Seeders

### 20251203090508-demo-admin-user.js
Creates a demo admin user with the following credentials:

- **Name**: Admin User
- **Email**: admin@example.com
- **Password**: admin123 (⚠️ **Plain text - hash in production!**)
- **Role**: admin

> [!WARNING]
> The password is stored in plain text. In production, you MUST hash passwords using bcrypt before storing them.

## Usage

### First-Time Setup

After running migrations, seed the database with initial data:

```bash
# Run migrations first
npm run migrate

# Then run seeders
npm run seed
```

### Verify Seeded Data

```sql
-- Check if admin user was created
SELECT id, name, email, role FROM users WHERE email = 'admin@example.com';
```

Expected output:
```
                  id                  |    name    |       email        | role  
--------------------------------------+------------+--------------------+-------
 <uuid>                               | Admin User | admin@example.com  | admin
```

## Creating New Seeders

### Example: Seeding Multiple Users

1. **Generate seeder file**:
   ```bash
   npm run seeder:generate -- demo-users
   ```

2. **Edit the generated file**:
   ```javascript
   'use strict';
   const { v4: uuidv4 } = require('uuid');

   module.exports = {
     async up(queryInterface, Sequelize) {
       await queryInterface.bulkInsert('users', [
         {
           id: uuidv4(),
           name: 'John Doe',
           email: 'john@example.com',
           password: 'password123',
           role: 'user',
           created_at: new Date(),
           updated_at: new Date()
         },
         {
           id: uuidv4(),
           name: 'Jane Smith',
           email: 'jane@example.com',
           password: 'password123',
           role: 'user',
           created_at: new Date(),
           updated_at: new Date()
         }
       ], {});
     },

     async down(queryInterface, Sequelize) {
       await queryInterface.bulkDelete('users', {
         email: ['john@example.com', 'jane@example.com']
       }, {});
     }
   };
   ```

3. **Run the seeder**:
   ```bash
   npm run seed
   ```

## Best Practices

✅ **DO:**
- Use seeders for development and testing data
- Always provide a `down` method for cleanup
- Use unique identifiers (like email) in `down` method
- Generate UUIDs using the `uuid` package
- Document seeder credentials in comments

❌ **DON'T:**
- Use seeders for production data migrations (use migrations instead)
- Store plain text passwords in production
- Seed sensitive data without proper security
- Forget to handle duplicate entries

## Production Considerations

### Password Hashing

For production, hash passwords using bcrypt:

```javascript
const bcrypt = require('bcrypt');

// In seeder
const hashedPassword = await bcrypt.hash('admin123', 10);

await queryInterface.bulkInsert('users', [
  {
    id: uuidv4(),
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword, // Hashed password
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date()
  }
], {});
```

### Environment-Specific Seeders

You can create different seeders for different environments:

- `seeders/development/` - Development data
- `seeders/test/` - Test data
- `seeders/production/` - Production initial data (if needed)

## Seeder Status

Sequelize tracks executed seeders in the `SequelizeData` table:

```sql
SELECT * FROM "SequelizeData";
```

## Workflow

Typical development workflow:

```bash
# 1. Run migrations
npm run migrate

# 2. Seed database
npm run seed

# 3. Start development server
npm run dev

# When you need fresh data:
npm run seed:undo:all  # Clear seeded data
npm run seed           # Re-seed
```

## Notes

- Seeders run in alphabetical order by filename
- The timestamp prefix ensures execution order
- Seeders are idempotent - running twice may cause duplicates
- Use `ignoreDuplicates: true` option to prevent duplicate errors

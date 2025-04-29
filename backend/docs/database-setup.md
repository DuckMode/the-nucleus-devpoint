# Database Setup Guide

This guide provides instructions for setting up and working with the PostgreSQL database for this project.

## Table of Contents

1. [Database Options](#database-options)
2. [Schema Overview](#schema-overview)
3. [Working with Drizzle ORM](#working-with-drizzle-orm)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)

## Database Options

You have two options for setting up your PostgreSQL database:

### Option 1: Local PostgreSQL 17.x

For development, you can set up PostgreSQL 17.x locally. See [postgres-local-setup.md](./postgres-local-setup.md) for detailed instructions.

### Option 2: Neon PostgreSQL (Cloud)

For a cloud-based solution, you can use Neon's serverless PostgreSQL. See [neon-postgres-setup.md](./neon-postgres-setup.md) for detailed instructions.

## Schema Overview

The database schema includes the following tables:

- **users**: User accounts and profiles
- **projects**: Projects created by users
- **project_members**: Many-to-many relationship between users and projects
- **tasks**: Tasks within projects
- **comments**: Comments on tasks
- **notifications**: User notifications

## Working with Drizzle ORM

This project uses [Drizzle ORM](https://orm.drizzle.team/) for database operations.

### Key Commands

```bash
# Generate migrations from schema changes
npm run db:generate

# Apply migrations to the database
npm run db:migrate

# Open Drizzle Studio to view and edit data
npm run db:studio

# Test database connection
npm run db:test-connection

# Introspect an existing database to generate schema
npm run db:introspect
```

### Schema Definition

The database schema is defined in `src/db/schema.ts`. When you make changes to this file, you need to generate and apply migrations.

## Common Tasks

### Adding a New Table

1. Add the table definition to `src/db/schema.ts`
2. Generate migrations: `npm run db:generate`
3. Apply migrations: `npm run db:migrate`

### Modifying an Existing Table

1. Update the table definition in `src/db/schema.ts`
2. Generate migrations: `npm run db:generate`
3. Apply migrations: `npm run db:migrate`

### Querying Data

```typescript
import { db } from './db';
import { users } from './db/schema';

// Select all users
const allUsers = await db.select().from(users);

// Select a specific user
const user = await db.select().from(users).where(eq(users.id, userId));
```

## Troubleshooting

### Connection Issues

If you're having trouble connecting to the database:

1. Check your `.env` file to ensure the `DATABASE_URL` is correct
2. Run `npm run db:test-connection` to test the connection
3. Verify that your database server is running
4. Check firewall settings if connecting to a remote database

### Migration Issues

If migrations fail:

1. Check the error message for specific issues
2. Ensure your schema is valid
3. Try running `drizzle-kit generate:pg --verbose` for more detailed output
4. For complex schema changes, consider creating multiple smaller migrations

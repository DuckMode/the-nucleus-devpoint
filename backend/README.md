# Backend API

This is a modern backend API built with:

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - SQL ORM for TypeScript
- **PostgreSQL (Neon)** - Serverless PostgreSQL database
- **Passport** - Authentication middleware
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL 17.x database (local or Neon account)

### Database Setup

You have two options for setting up your PostgreSQL database:

#### Option 1: Local PostgreSQL

1. Install PostgreSQL 17.x locally (see [docs/postgres-local-setup.md](./docs/postgres-local-setup.md))
2. Run the setup script to create the database:

```bash
# Make the script executable
chmod +x scripts/setup-local-db.sh

# Run the setup script
./scripts/setup-local-db.sh
```

#### Option 2: Neon PostgreSQL (Cloud)

1. Sign up for a Neon account and create a project (see [docs/neon-postgres-setup.md](./docs/neon-postgres-setup.md))
2. Update your `.env` file with the Neon connection string

For more detailed information about the database setup, see [docs/database-setup.md](./docs/database-setup.md).

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nucleus_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### Installation

```bash
# Install dependencies
npm install

# Test database connection
npm run db:test-connection

# Generate database migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Database Management

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

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── db/             # Database setup and schema
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models and validation schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── drizzle/            # Database migrations
├── .env                # Environment variables
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

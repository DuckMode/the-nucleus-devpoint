# The Nucleus DevPoint

A modern, full-stack development platform built with TypeScript, React, and Node.js.

## Project Overview

The Nucleus DevPoint is a comprehensive development platform that provides a solid foundation for building modern web applications. It follows a monorepo structure with separate packages for the frontend, backend, and shared utilities.

## Tech Stack

### Frontend
- **React** - A JavaScript library for building user interfaces
- **TypeScript** - A typed superset of JavaScript
- **Vite** - A fast build tool and development server
- **Tailwind CSS** - A utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Zod** - TypeScript-first schema validation
- **Vitest** - Fast testing framework for Vite
- **React Testing Library** - User-centric testing utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - SQL ORM for TypeScript
- **PostgreSQL (Neon)** - Serverless PostgreSQL database
- **Passport** - Authentication middleware
- **Zod** - Schema validation

## Project Structure

```
the-nucleus-devpoint/
├── frontend/           # React frontend application
├── backend/            # Express API server
├── src/                # Shared utilities and components
└── keep-do-not-delete/ # Project documentation and requirements
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL 17.x (local or Neon account)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SudoDuck-Dev/the-nucleus-devpoint.git
cd the-nucleus-devpoint
```

2. Set up the backend:
```bash
cd backend
npm install
# Configure your database (see backend/README.md for details)
npm run dev
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## Development Workflow

This project follows a test-driven development approach. For more information about the testing strategy, see the [TEST_README.md](./frontend/TEST_README.md) file in the frontend directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Repository

The source code for this project is available on GitHub:
[https://github.com/SudoDuck-Dev/the-nucleus-devpoint](https://github.com/SudoDuck-Dev/the-nucleus-devpoint)

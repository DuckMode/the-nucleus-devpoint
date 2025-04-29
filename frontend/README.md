# Modern Frontend Stack

This project is built with a modern frontend stack:

- **React** - A JavaScript library for building user interfaces
- **TypeScript** - A typed superset of JavaScript
- **Vite** - A fast build tool and development server
- **Tailwind CSS** - A utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Zod** - TypeScript-first schema validation
- **Vitest** - Fast testing framework for Vite
- **React Testing Library** - User-centric testing utilities

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # React components
│   │   └── ui/          # UI components built with Radix UI
│   ├── schemas/         # Zod validation schemas
│   ├── test/            # Test setup and utilities
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── App.test.tsx     # Tests for App component
│   ├── index.css        # Global styles with Tailwind directives
│   └── main.tsx         # Application entry point
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── index.html           # HTML template
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vitest.config.ts     # Vitest configuration
└── TEST_README.md       # Documentation for the testing approach
```

## Features

- **Type Safety** - Full TypeScript support
- **Fast Development** - Vite's blazing fast dev server with HMR
- **Styling** - Tailwind CSS for utility-first styling
- **Accessibility** - Radix UI for accessible components
- **Validation** - Zod for runtime type checking and validation
- **Code Quality** - ESLint and Prettier for code formatting and linting
- **Testing** - Comprehensive test suite with Vitest and React Testing Library
- **Test-Driven Development** - Components built using TDD approach (see TEST_README.md)

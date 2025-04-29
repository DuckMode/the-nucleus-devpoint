# Test-Driven Development (TDD) Approach

This project follows a test-driven development approach for building React components. This means we write tests before implementing the components, ensuring that our code meets the requirements and is well-tested from the start.

## Testing Stack

- **Vitest**: Fast testing framework compatible with Vite
- **React Testing Library**: For testing React components in a user-centric way
- **Jest DOM**: For additional DOM testing assertions
- **User Event**: For simulating user interactions

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test File Structure

Tests are co-located with the components they test, following this naming convention:

- Component: `ComponentName.tsx`
- Test: `ComponentName.test.tsx`

## TDD Workflow

1. **Write the test first**: Define the expected behavior of the component
2. **Run the test and watch it fail**: Verify that the test correctly identifies missing functionality
3. **Implement the component**: Write the minimal code needed to make the test pass
4. **Run the test again**: Verify that the implementation meets the requirements
5. **Refactor**: Clean up the code while keeping the tests passing

## Example Components

The following components have been implemented using TDD:

- **Button**: A versatile button component with different variants and sizes
- **Card**: A card component with header, content, and footer sections
- **Dialog**: A modal dialog component built with Radix UI primitives

## Best Practices

- Test components from a user's perspective (what they see and interact with)
- Test component behavior, not implementation details
- Use descriptive test names that explain the expected behavior
- Keep tests independent and isolated
- Use setup and teardown functions for common test setup

## Adding New Components

When adding a new component:

1. Create a test file first (`ComponentName.test.tsx`)
2. Define the component's props interface and expected behavior in tests
3. Implement the component to satisfy the tests
4. Run the tests to ensure everything works as expected

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the Console component to simplify testing
vi.mock('./components/console', () => ({
  Console: () => <div data-testid="console-component">Console Component</div>
}));

describe('App component', () => {
  beforeEach(() => {
    // Create a div with id "root" to serve as a portal container
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'root');
    document.body.appendChild(portalRoot);

    // Create sidebar elements
    const leftSidebar = document.createElement('div');
    leftSidebar.id = 'sidebarLeft';
    document.body.appendChild(leftSidebar);
  });

  it('renders the app title', () => {
    render(<App />);

    // Check for the app title
    const appTitle = screen.getByText('THE NUCLEUS');
    expect(appTitle).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<App />);

    // Check for the search input
    const searchInput = screen.getByPlaceholderText('Ask Nucleus...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the sidebar with devices', () => {
    render(<App />);

    // Check for the sidebar heading
    const sidebarHeading = screen.getByText('DEVICES');
    expect(sidebarHeading).toBeInTheDocument();

    // Check for some sidebar items
    expect(screen.getByText('MindMap')).toBeInTheDocument();
    expect(screen.getByText('Through The Wire Frame')).toBeInTheDocument();
    expect(screen.getByText('UX FLOW')).toBeInTheDocument();
  });

  it('renders the console component', () => {
    render(<App />);

    // Check that the console component is rendered
    const consoleComponent = screen.getByTestId('console-component');
    expect(consoleComponent).toBeInTheDocument();
  });
});

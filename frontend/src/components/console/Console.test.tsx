import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Console } from './Console';

// Mock the child components to simplify testing
vi.mock('./ConsoleTopBar', () => ({
  ConsoleTopBar: () => <div data-testid="console-top-bar">ConsoleTopBar</div>
}));

vi.mock('./ConsoleExpandedContent', () => ({
  ConsoleExpandedContent: () => <div data-testid="console-expanded-content">ConsoleExpandedContent</div>
}));

vi.mock('./MinimizeButton', () => ({
  MinimizeButton: ({ isExpanded, onClick }) => (
    <button
      data-testid="minimize-button"
      onClick={onClick}
      aria-label={isExpanded ? 'Close Console' : 'Open Console'}
    >
      {isExpanded ? 'Minimize' : 'Expand'}
    </button>
  )
}));

// Mock the cn utility
vi.mock('../../utils/cn', () => ({
  cn: (...inputs) => inputs.filter(Boolean).join(' ')
}));

describe('Console', () => {
  // Mock DOM elements and functions
  beforeEach(() => {
    // Create notification area for testing notifications
    const notificationArea = document.createElement('div');
    notificationArea.id = 'notificationArea';
    document.body.appendChild(notificationArea);

    // Create sidebar elements for testing sidebar toggle
    const leftSidebar = document.createElement('div');
    leftSidebar.id = 'sidebarLeft';
    document.body.appendChild(leftSidebar);

    const rightSidebar = document.createElement('div');
    rightSidebar.id = 'sidebarRight';
    document.body.appendChild(rightSidebar);

    // Create modal for testing
    const modal = document.createElement('div');
    modal.id = 'sidebarModal';
    document.body.appendChild(modal);

    // Create Ask Nuc component for testing
    const askNucComponent = document.createElement('div');
    askNucComponent.id = 'askNucComponent';
    document.body.appendChild(askNucComponent);

    // Mock document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'notificationArea') return notificationArea;
      if (id === 'sidebarLeft') return leftSidebar;
      if (id === 'sidebarRight') return rightSidebar;
      if (id === 'sidebarModal') return modal;
      if (id === 'askNucComponent') return askNucComponent;
      return null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders in collapsed state by default', () => {
    render(<Console />);

    // Check that the minimize button shows "Expand"
    expect(screen.getByTestId('minimize-button')).toHaveTextContent('Expand');

    // Check that the bottom controls are not visible
    expect(screen.queryByTitle('Add Block')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Toggle Sidebars')).not.toBeInTheDocument();
  });

  it('toggles between collapsed and expanded states when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<Console />);

    // Click the button to expand
    await user.click(screen.getByTestId('minimize-button'));

    // Button should have changed
    expect(screen.getByTestId('minimize-button')).toHaveTextContent('Minimize');

    // Bottom controls should be visible
    expect(screen.getByTitle('Add Block')).toBeInTheDocument();
    expect(screen.getByTitle('Toggle Sidebars')).toBeInTheDocument();

    // Click again to collapse
    await user.click(screen.getByTestId('minimize-button'));

    // Button should have changed back
    expect(screen.getByTestId('minimize-button')).toHaveTextContent('Expand');
  });

  it('shows Ask Nuc component and handles input', async () => {
    const user = userEvent.setup();

    // Mock the appendChild method of the notification area
    const appendChildSpy = vi.fn();
    document.getElementById('notificationArea').appendChild = appendChildSpy;

    render(<Console />);

    // Expand the console to see the Ask Nuc component
    await user.click(screen.getByTestId('minimize-button'));

    // Check that the Ask Nuc component is rendered
    const askNucInput = screen.getByPlaceholderText('Ask Nuc...');
    expect(askNucInput).toBeInTheDocument();

    // Type in the input and click send
    await user.type(askNucInput, 'Test question');
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Check that a notification was created
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('renders the console container', () => {
    render(<Console />);

    // Check that the console container is rendered
    const consoleContainer = screen.getByTestId('console-top-bar').parentElement;
    expect(consoleContainer).toHaveClass('console-container');
  });

  it('renders the Ask Nuc component', () => {
    render(<Console />);

    // Check that the Ask Nuc component is rendered
    const askNucInput = screen.getByPlaceholderText('Ask Nuc...');
    expect(askNucInput).toBeInTheDocument();

    // Check that the Send button is rendered
    const sendButton = screen.getByLabelText('Send');
    expect(sendButton).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsoleTopBar } from './ConsoleTopBar';

describe('ConsoleTopBar', () => {
  beforeEach(() => {
    // Create notification area for testing
    const notificationArea = document.createElement('div');
    notificationArea.id = 'notificationArea';
    document.body.appendChild(notificationArea);
  });
  
  afterEach(() => {
    // Clean up
    const notificationArea = document.getElementById('notificationArea');
    if (notificationArea) {
      document.body.removeChild(notificationArea);
    }
  });
  
  it('renders correctly with all elements', () => {
    render(<ConsoleTopBar />);
    
    // Check for metrics status
    expect(screen.getByText(/metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/ok/i)).toBeInTheDocument();
    
    // Check for project name
    expect(screen.getByText(/project/i)).toBeInTheDocument();
    expect(screen.getByText(/myworkflowapp/i)).toBeInTheDocument();
    
    // Check for complete status
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /terminal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /navigate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resources/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /help/i })).toBeInTheDocument();
  });
  
  it('shows notification when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ConsoleTopBar />);
    
    const terminalButton = screen.getByRole('button', { name: /terminal/i });
    await user.click(terminalButton);
    
    // Check that notification was created
    const notificationArea = document.getElementById('notificationArea');
    expect(notificationArea?.textContent).toContain('Terminal opened');
  });
});

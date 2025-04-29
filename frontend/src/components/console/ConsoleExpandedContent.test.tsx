import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsoleExpandedContent } from './ConsoleExpandedContent';

// Mock the document.getElementById to return a mock element
vi.mock('../../utils/cn', () => ({
  cn: (...inputs) => inputs.filter(Boolean).join(' ')
}));

describe('ConsoleExpandedContent', () => {
  // Mock DOM elements and functions
  beforeEach(() => {
    // Create notification area for testing showNotification
    const notificationArea = document.createElement('div');
    notificationArea.id = 'notificationArea';
    document.body.appendChild(notificationArea);

    // Mock document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'notificationArea') {
        return notificationArea;
      }
      if (id === 'statsSection') {
        const mockSection = document.createElement('div');
        mockSection.classList.add('collapsible');
        return mockSection;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all sections correctly', () => {
    render(<ConsoleExpandedContent />);

    // Check Stats section
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Metrics')).toBeInTheDocument();
    expect(screen.getByText('Project Status')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('CPU')).toBeInTheDocument();

    // Check Tools section
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Navigate')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();

    // Check Project Info section
    expect(screen.getByText('Project Info')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('MyWorkflowApp')).toBeInTheDocument();
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByText('main')).toBeInTheDocument();
    expect(screen.getByText('Last Commit')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();

    // Check Git Status section
    expect(screen.getByText('Git Status')).toBeInTheDocument();
    expect(screen.getByText('Commits')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Pushes')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('Branches')).toBeInTheDocument();

    // There are multiple elements with text "3", so we'll check that at least one exists
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);

    expect(screen.getByText('Git Ratio')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('toggles section when header is clicked', () => {
    render(<ConsoleExpandedContent />);

    // Click on the Stats header to toggle the section
    fireEvent.click(screen.getByText('Stats'));

    // The toggleSection function should have called document.getElementById
    expect(document.getElementById).toHaveBeenCalledWith('statsSection');
  });

  it('shows notification when a tool button is clicked', async () => {
    const user = userEvent.setup();
    const appendChildSpy = vi.spyOn(document.getElementById('notificationArea'), 'appendChild');

    render(<ConsoleExpandedContent />);

    // Find the Terminal button by text content
    const terminalButton = screen.getByText('Terminal').closest('button');
    expect(terminalButton).not.toBeNull();

    // Click on the Terminal button
    if (terminalButton) {
      await user.click(terminalButton);

      // Check that appendChild was called on the notification area
      expect(appendChildSpy).toHaveBeenCalled();
    }
  });

  it('shows notification when Git button is clicked', async () => {
    const user = userEvent.setup();
    const appendChildSpy = vi.spyOn(document.getElementById('notificationArea'), 'appendChild');

    render(<ConsoleExpandedContent />);

    // Find the Git button by text content
    const gitButton = screen.getByText('Git').closest('button');
    expect(gitButton).not.toBeNull();

    // Click on the Git button
    if (gitButton) {
      await user.click(gitButton);

      // Check that appendChild was called on the notification area
      expect(appendChildSpy).toHaveBeenCalled();
    }
  });
});

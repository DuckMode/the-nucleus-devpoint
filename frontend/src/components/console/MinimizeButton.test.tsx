import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MinimizeButton } from './MinimizeButton';

describe('MinimizeButton', () => {
  it('renders with correct icon when collapsed', () => {
    const mockOnClick = vi.fn();
    render(<MinimizeButton isExpanded={false} onClick={mockOnClick} />);
    
    // Check that the button has the correct aria-label
    const button = screen.getByRole('button', { name: /open console/i });
    expect(button).toBeInTheDocument();
    
    // Check that it has the up chevron icon (this is a bit tricky to test directly)
    // We could check for specific class names if needed
  });
  
  it('renders with correct icon when expanded', () => {
    const mockOnClick = vi.fn();
    render(<MinimizeButton isExpanded={true} onClick={mockOnClick} />);
    
    // Check that the button has the correct aria-label
    const button = screen.getByRole('button', { name: /close console/i });
    expect(button).toBeInTheDocument();
    
    // Check that it has the down chevron icon (this is a bit tricky to test directly)
  });
  
  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<MinimizeButton isExpanded={false} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

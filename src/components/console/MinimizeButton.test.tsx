import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MinimizeButton } from './MinimizeButton';

describe('MinimizeButton', () => {
  it('renders correctly when collapsed', () => {
    const handleClick = vi.fn();
    render(<MinimizeButton isExpanded={false} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Open Console');
  });

  it('renders correctly when expanded', () => {
    const handleClick = vi.fn();
    render(<MinimizeButton isExpanded={true} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Close Console');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<MinimizeButton isExpanded={false} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct icon when collapsed', () => {
    const handleClick = vi.fn();
    render(<MinimizeButton isExpanded={false} onClick={handleClick} />);
    
    const icon = screen.getByTestId('chevron-up-icon');
    expect(icon).toBeInTheDocument();
  });

  it('has the correct icon when expanded', () => {
    const handleClick = vi.fn();
    render(<MinimizeButton isExpanded={true} onClick={handleClick} />);
    
    const icon = screen.getByTestId('chevron-down-icon');
    expect(icon).toBeInTheDocument();
  });
});

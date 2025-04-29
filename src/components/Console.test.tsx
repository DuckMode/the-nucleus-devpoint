import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Console } from './Console';

describe('Console', () => {
  it('renders in collapsed state by default', () => {
    render(<Console />);
    
    // Check that the minimize button is present with the correct title
    const button = screen.getByRole('button', { name: /open console/i });
    expect(button).toBeInTheDocument();
  });
  
  it('toggles between collapsed and expanded states when the button is clicked', () => {
    render(<Console />);
    
    // Click the button to expand
    const button = screen.getByRole('button', { name: /open console/i });
    fireEvent.click(button);
    
    // Button should have changed
    const updatedButton = screen.getByRole('button', { name: /close console/i });
    expect(updatedButton).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(updatedButton);
    
    // Back to collapsed
    const collapsedButton = screen.getByRole('button', { name: /open console/i });
    expect(collapsedButton).toBeInTheDocument();
  });
});

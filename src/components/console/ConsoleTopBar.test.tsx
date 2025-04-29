import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConsoleTopBar } from './ConsoleTopBar';

describe('ConsoleTopBar', () => {
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
    expect(screen.getByText(/terminal/i)).toBeInTheDocument();
    expect(screen.getByText(/navigate/i)).toBeInTheDocument();
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
    expect(screen.getByText(/resources/i)).toBeInTheDocument();
    expect(screen.getByText(/help/i)).toBeInTheDocument();
  });
});

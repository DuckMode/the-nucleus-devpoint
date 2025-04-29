import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-500')
    expect(button).not.toHaveClass('bg-gray-400')
    expect(button).not.toHaveAttribute('disabled')
  })

  it('renders correctly with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Primary Button' })
    expect(button).toHaveClass('bg-blue-500')
  })

  it('renders correctly with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Secondary Button' })
    expect(button).toHaveClass('bg-purple-500')
    expect(button).not.toHaveClass('bg-blue-500')
  })

  it('renders correctly with danger variant', () => {
    render(<Button variant="danger">Danger Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Danger Button' })
    expect(button).toHaveClass('bg-red-500')
    expect(button).not.toHaveClass('bg-blue-500')
  })

  it('renders correctly when disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('bg-gray-400')
    expect(button).toHaveClass('cursor-not-allowed')
    expect(button).not.toHaveClass('bg-blue-500')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Custom Button' })
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('bg-blue-500') // Should still have default classes
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled and clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    await user.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toHaveClass('py-1')
    expect(button).toHaveClass('px-3')
    expect(button).toHaveClass('text-sm')
  })

  it('renders with medium size (default)', () => {
    render(<Button>Medium Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Medium Button' })
    expect(button).toHaveClass('py-2')
    expect(button).toHaveClass('px-4')
    expect(button).toHaveClass('text-base')
  })

  it('renders with large size', () => {
    render(<Button size="lg">Large Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Large Button' })
    expect(button).toHaveClass('py-3')
    expect(button).toHaveClass('px-6')
    expect(button).toHaveClass('text-lg')
  })
})

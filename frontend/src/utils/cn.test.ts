import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const isPrimary = false
    
    expect(cn(
      'base-class',
      isActive && 'active',
      isPrimary && 'primary'
    )).toBe('base-class active')
  })

  it('should handle object syntax', () => {
    expect(cn({
      'base-class': true,
      'active': true,
      'disabled': false
    })).toBe('base-class active')
  })

  it('should handle array syntax', () => {
    expect(cn(['base-class', 'active'])).toBe('base-class active')
  })

  it('should handle mixed inputs', () => {
    expect(cn(
      'base-class',
      { 'active': true, 'disabled': false },
      ['extra', 'classes']
    )).toBe('base-class active extra classes')
  })

  it('should handle Tailwind class conflicts correctly', () => {
    // The tailwind-merge functionality should handle conflicting classes
    expect(cn(
      'px-2 py-1',
      'px-4' // This should override the previous px-2
    )).toBe('py-1 px-4')
  })
})

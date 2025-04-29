import * as React from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'danger'
  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Button component with different variants and sizes
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    // Base classes that apply to all buttons
    const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    // Variant-specific classes
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
      secondary: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500',
      danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    }
    
    // Size-specific classes
    const sizeClasses = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    }
    
    // Disabled state overrides the variant styling
    const disabledClasses = 'bg-gray-400 text-gray-100 cursor-not-allowed hover:bg-gray-400'
    
    return (
      <button
        className={cn(
          baseClasses,
          sizeClasses[size],
          disabled ? disabledClasses : variantClasses[variant],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

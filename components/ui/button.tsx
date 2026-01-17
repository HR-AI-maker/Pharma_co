'use client'

import { forwardRef, ButtonHTMLAttributes, ReactElement, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, asChild = false, ...restProps }, ref) => {
    // Remove asChild from props to prevent it from being passed to DOM
    const props = restProps
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'

    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500',
      ghost: 'text-foreground hover:bg-muted focus:ring-gray-500',
      danger: 'bg-error text-white hover:bg-red-600 focus:ring-red-500',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

    const loadingSpinner = loading ? (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ) : null

    // If asChild is true, clone the child element with button styles
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        className: cn(combinedClassName, (children as ReactElement).props.className),
        ref,
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loadingSpinner}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

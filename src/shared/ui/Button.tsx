// shared/ui/Button.tsx
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wide?: boolean
}

export function Button({
  children,
  leftIcon,
  rightIcon,
  variant,
  size = 'md',
  wide = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'btn'
  const variantClass = variant ? `btn-${variant}` : ''
  const sizeClass = size !== 'md' ? `btn-${size}` : ''
  const wideClass = wide ? 'btn-wide' : ''

  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    wideClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}
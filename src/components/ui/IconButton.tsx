import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
  size?: 's' | 'm' | 'l'
  variant?: 'ghost' | 'floating'
  priority?: 'primary' | 'accent' | 'secondary' | 'tertiary'
  intent?: 'default' | 'error' | 'success'
  loading?: boolean
  selected?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, label, size = 's', variant = 'ghost', priority = 'tertiary', intent = 'default', loading = false, selected = false, className = '', disabled, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`icon-button icon-button--${size} icon-button--${variant} icon-button--${priority} icon-button--${intent} ${loading ? 'is-loading' : ''} ${selected ? 'is-selected' : ''} ${className}`}
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="collapse-loader" aria-hidden="true" /> : icon}
    </button>
  )
})

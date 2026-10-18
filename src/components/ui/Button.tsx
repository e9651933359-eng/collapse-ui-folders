import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  leadingIcon?: ReactNode
  priority?: 'primary' | 'accent' | 'secondary' | 'tertiary'
  size?: 's' | 'm' | 'l'
  intent?: 'default' | 'error' | 'success'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children,
  leadingIcon,
  priority = 'secondary',
  size = 's',
  intent = 'default',
  loading = false,
  type = 'button',
  className = '',
  disabled,
  ...props
}: ButtonProps, ref) {
  return (
    <button
      ref={ref}
      className={`collapse-button collapse-button--${priority} collapse-button--${size} collapse-button--${intent} ${loading ? 'is-loading' : ''} ${className}`}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="collapse-button__state-layer">
        {loading ? <span className="collapse-loader" aria-hidden="true" /> : leadingIcon && <span className="collapse-button__icon">{leadingIcon}</span>}
        <span className="collapse-button__label">{children}</span>
      </span>
    </button>
  )
})

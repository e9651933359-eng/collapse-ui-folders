import type { AnchorHTMLAttributes, ReactNode } from 'react'

type HyperLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  leadingIcon?: ReactNode
  size?: 's' | 'm' | 'l'
  tone?: 'accent' | 'default' | 'secondary'
  weight?: 'regular' | 'medium'
  disabled?: boolean
  visualState?: 'enabled' | 'hovered' | 'visited'
}

export function HyperLink({ children, leadingIcon, size = 'm', tone = 'accent', weight = 'medium', disabled = false, visualState = 'enabled', className = '', onClick, tabIndex, ...props }: HyperLinkProps) {
  return (
    <a className={`collapse-hyper-link collapse-hyper-link--${size} collapse-hyper-link--${tone} collapse-hyper-link--${weight} is-${visualState} ${disabled ? 'is-disabled' : ''} ${className}`} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : tabIndex} onClick={(event) => { if (disabled) event.preventDefault(); else onClick?.(event) }} {...props}>
      {leadingIcon && <span className="collapse-hyper-link__icon" aria-hidden="true">{leadingIcon}</span>}
      <span>{children}</span>
    </a>
  )
}

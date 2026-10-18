import type { ReactNode } from 'react'
import { FederationIcon } from './FederationIcon'

type StatusProps = {
  children?: ReactNode
  className?: string
  filled?: boolean
  leadingElement?: 'bullet' | ReactNode
  size?: 'xs' | 's' | 'm' | 'l'
  tone?: 'default' | 'secondary' | 'accent' | 'warning' | 'success' | 'error'
  federation?: boolean
}

export function Status({ children, className = '', filled = false, leadingElement, size = 'm', tone = 'accent', federation = false }: StatusProps) {
  const resolvedLeading = federation ? <FederationIcon size="s" /> : (leadingElement ?? 'bullet')
  return (
    <span className={`collapse-status collapse-status--${size} collapse-status--${tone} ${filled ? 'is-filled' : ''} ${federation ? 'is-federation' : ''} ${className}`}>
      {resolvedLeading === 'bullet' ? <span className="collapse-status__bullet" aria-hidden="true" /> : <span className="collapse-status__icon" aria-hidden="true">{resolvedLeading}</span>}
      {children && <span>{children}</span>}
    </span>
  )
}

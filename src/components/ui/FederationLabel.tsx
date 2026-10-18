import type { HTMLAttributes, ReactNode } from 'react'
import { FederationIcon } from './FederationIcon'

type FederationLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  iconLabel?: string
  iconPosition?: 'start' | 'end'
  iconSize?: 'xs' | 's' | 'm'
}

export function FederationLabel({ children, className = '', iconLabel = 'Федерация', iconPosition = 'end', iconSize = 's', ...props }: FederationLabelProps) {
  const icon = <FederationIcon size={iconSize} aria-label={iconLabel} />
  return (
    <span className={`collapse-federation-label collapse-federation-label--${iconPosition} ${className}`} {...props}>
      {iconPosition === 'start' && icon}
      <span className="collapse-federation-label__text">{children}</span>
      {iconPosition === 'end' && icon}
    </span>
  )
}

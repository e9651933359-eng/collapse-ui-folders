import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  kind?: 'filter' | 'assistive' | 'multiple' | 'list' | 'open'
  size?: 'xs' | 's' | 'm'
  tone?: 'default' | 'success' | 'warning' | 'error' | 'accent-light' | 'accent'
  selected?: boolean
  leadingElement?: ReactNode
  trailingElement?: ReactNode
}

export function Chip({ children, kind = 'filter', size = 'm', tone = 'default', selected = false, leadingElement, trailingElement, className = '', type = 'button', ...props }: ChipProps) {
  return (
    <button className={`collapse-chip collapse-chip--${kind} collapse-chip--${size} collapse-chip--${tone} ${selected ? 'is-selected' : ''} ${className}`} type={type} aria-pressed={kind === 'filter' || kind === 'multiple' ? selected : undefined} {...props}>
      {leadingElement && <span className="collapse-chip__element" aria-hidden="true">{leadingElement}</span>}
      <span className="collapse-chip__label">{children}</span>
      {trailingElement && <span className="collapse-chip__element" aria-hidden="true">{trailingElement}</span>}
    </button>
  )
}

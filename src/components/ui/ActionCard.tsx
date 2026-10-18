import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ActionCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: ReactNode
  size?: 's' | 'm'
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'error'
  shape?: 'top' | 'bottom' | 'circular'
  align?: 'center' | 'left'
}

type ActionCardGroupProps = {
  children: ReactNode
  layout?: 'full' | 'prominent-bottom' | 'split'
  className?: string
}

export function ActionCard({ children, icon, size = 'm', tone = 'default', shape = 'top', align = 'center', className = '', type = 'button', ...props }: ActionCardProps) {
  return <button className={`collapse-action-card collapse-action-card--${size} collapse-action-card--${tone} collapse-action-card--${shape} collapse-action-card--${align} ${className}`} type={type} {...props}>{icon && <span className="collapse-action-card__icon">{icon}</span>}<span>{children}</span></button>
}

export function ActionCardGroup({ children, layout = 'full', className = '' }: ActionCardGroupProps) {
  return <div className={`collapse-action-card-group collapse-action-card-group--${layout} ${className}`}>{children}</div>
}

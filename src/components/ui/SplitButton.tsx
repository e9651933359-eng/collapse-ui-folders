import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type SplitButtonProps = {
  icon: ReactNode
  ariaLabel: string
  menuLabel?: string
  size?: 's' | 'm' | 'l'
  tone?: 'default' | 'error' | 'warning' | 'success'
  disabled?: boolean
  primaryDisabled?: boolean
  menuDisabled?: boolean
  onPrimaryClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onMenuClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  className?: string
}

export function SplitButton({ icon, ariaLabel, menuLabel = 'Открыть меню', size = 's', tone = 'default', disabled = false, primaryDisabled = false, menuDisabled = false, onPrimaryClick, onMenuClick, className = '' }: SplitButtonProps) {
  return (
    <div className={`collapse-split-button collapse-split-button--${size} collapse-split-button--${tone} ${className}`} role="group" aria-label={ariaLabel}>
      <button className="collapse-split-button__action" type="button" aria-label={ariaLabel} disabled={disabled || primaryDisabled} onClick={onPrimaryClick}>{icon}</button>
      <button className="collapse-split-button__menu" type="button" aria-label={menuLabel} disabled={disabled || menuDisabled} onClick={onMenuClick}><ChevronDown aria-hidden="true" /></button>
    </div>
  )
}

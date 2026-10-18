import { AlertTriangle, CheckCircle2, Info, X, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import './feedback.css'

export type InfoBarType = 'default' | 'accent' | 'warning' | 'error' | 'success'

type InfoBarProps = {
  actionLabel?: string
  className?: string
  closable?: boolean
  icon?: ReactNode
  linkLabel?: string
  onAction?: () => void
  onClose?: () => void
  onLink?: () => void
  slot?: ReactNode
  supporting?: string
  title: string
  type?: InfoBarType
}

const typeIcons: Record<InfoBarType, LucideIcon> = {
  default: Info,
  accent: Info,
  warning: AlertTriangle,
  error: AlertTriangle,
  success: CheckCircle2,
}

export function InfoBar({
  actionLabel,
  className = '',
  closable = true,
  icon,
  linkLabel,
  onAction,
  onClose,
  onLink,
  slot,
  supporting,
  title,
  type = 'default',
}: InfoBarProps) {
  const StatusIcon = typeIcons[type]
  return (
    <section className={`collapse-info-bar collapse-info-bar--${type} ${className}`} role={type === 'error' ? 'alert' : 'status'}>
      <span className="collapse-info-bar__icon" aria-hidden="true">{icon ?? <StatusIcon />}</span>
      {slot && <span className="collapse-info-bar__slot">{slot}</span>}
      <div className="collapse-info-bar__copy">
        <div>
          <strong>{title}</strong>
          {supporting && <p>{supporting}</p>}
        </div>
        {linkLabel && <button type="button" className="collapse-feedback-link" onClick={onLink}>{linkLabel}</button>}
      </div>
      <div className="collapse-info-bar__actions">
        {actionLabel && <button type="button" className="collapse-feedback-action" onClick={onAction}>{actionLabel}</button>}
        {closable && <button type="button" className="collapse-feedback-icon-button" aria-label="Закрыть" onClick={onClose}><X /></button>}
      </div>
    </section>
  )
}

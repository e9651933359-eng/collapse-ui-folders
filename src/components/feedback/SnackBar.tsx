import { AlertTriangle, Info, LoaderCircle, X } from 'lucide-react'
import type { ReactNode } from 'react'
import './feedback.css'

export type SnackBarType = 'default' | 'error' | 'warning'

type SnackBarProps = {
  actionLabel?: string
  className?: string
  closable?: boolean
  fixed?: boolean
  icon?: ReactNode
  loading?: boolean
  onAction?: () => void
  onClose?: () => void
  supporting?: string
  title: string
  type?: SnackBarType
}

export function SnackBar({ actionLabel, className = '', closable = true, fixed = false, icon, loading = false, onAction, onClose, supporting, title, type = 'default' }: SnackBarProps) {
  return (
    <section className={`collapse-snackbar collapse-snackbar--${type} ${fixed ? 'is-fixed' : ''} ${className}`} role={type === 'error' ? 'alert' : 'status'}>
      <div className="collapse-snackbar__content">
        <span className="collapse-snackbar__icon" aria-hidden="true">{loading ? <LoaderCircle className="collapse-snackbar__loader" /> : icon ?? (type === 'default' ? <Info /> : <AlertTriangle />)}</span>
        <div className="collapse-snackbar__copy"><strong>{title}</strong>{supporting && <p>{supporting}</p>}</div>
      </div>
      {(actionLabel || closable) && <div className="collapse-snackbar__actions">
        {actionLabel && <button type="button" onClick={onAction}>{actionLabel}</button>}
        {closable && <button type="button" aria-label="Закрыть" onClick={onClose}><X /></button>}
      </div>}
    </section>
  )
}

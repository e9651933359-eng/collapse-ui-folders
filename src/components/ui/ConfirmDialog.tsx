import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Button } from './Button'

type ConfirmDialogProps = {
  cancelLabel?: string
  confirmLabel: string
  description?: ReactNode
  onCancel: () => void
  onConfirm: () => void
  open: boolean
  title: ReactNode
  intent?: 'default' | 'error'
}

export function ConfirmDialog({ cancelLabel = 'Отмена', confirmLabel, description, onCancel, onConfirm, open, title, intent = 'error' }: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    confirmRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onCancel, open])

  if (!open) return null

  return (
    <div className="collapse-modal-scrim confirm-dialog-scrim">
      <section className="collapse-modal-surface confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby={description ? 'confirm-dialog-description' : undefined}>
        <h2 id="confirm-dialog-title">{title}</h2>
        {description && <p id="confirm-dialog-description">{description}</p>}
        <Button ref={confirmRef} className="confirm-dialog__confirm" priority={intent === 'error' ? 'primary' : 'secondary'} intent={intent} size="m" onClick={onConfirm}>{confirmLabel}</Button>
        <button className="confirm-dialog__cancel" type="button" onClick={onCancel}>{cancelLabel}</button>
      </section>
    </div>
  )
}

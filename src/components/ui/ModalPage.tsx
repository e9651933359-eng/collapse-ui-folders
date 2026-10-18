import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { ModalHeader } from './ModalHeader'

type ModalPageProps = {
  actions?: ReactNode
  children: ReactNode
  className?: string
  footer?: ReactNode
  height?: 'content' | 'viewport'
  onBack?: () => void
  onClose: () => void
  open: boolean
  placement?: 'center' | 'right'
  /** `content` keeps the body fixed and lets a child with its own overflow scroll, so blocks above it stay in place. */
  scroll?: 'body' | 'content'
  title: ReactNode
}

export function ModalPage({ actions, children, className = '', footer, height = 'content', onBack, onClose, open, placement = 'center', scroll = 'body', title }: ModalPageProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className={`collapse-modal-page__scrim collapse-modal-page__scrim--${placement} collapse-modal-page__scrim--${height}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section ref={dialogRef} className={`collapse-modal-page collapse-modal-page--${height} ${className}`} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <ModalHeader actions={actions} onBack={onBack} onClose={onClose} title={title} titleId={titleId} />
        <div className={`collapse-modal-page__body collapse-modal-page__body--scroll-${scroll}`}>{children}</div>
        {footer && <footer className="collapse-modal-page__footer">{footer}</footer>}
      </section>
    </div>
  )
}

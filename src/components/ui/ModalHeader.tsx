import { ChevronLeft, X } from 'lucide-react'
import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { IconButton } from './IconButton'

type ModalHeaderProps = {
  actions?: ReactNode
  className?: string
  closeIcon?: ReactNode
  onBack?: () => void
  onClose: () => void
  title: ReactNode
  titleId?: string
}

export const ModalHeader = forwardRef<HTMLButtonElement, ModalHeaderProps>(function ModalHeader({ actions, className = '', closeIcon, onBack, onClose, title, titleId }, closeButtonRef) {
  return (
    <header className={`collapse-modal-header ${className}`.trim()}>
      {onBack && <IconButton icon={<ChevronLeft aria-hidden="true" />} label="Назад" size="s" variant="floating" onClick={onBack} />}
      <h2 id={titleId}>{title}</h2>
      {actions && <span className="collapse-modal-header__actions">{actions}</span>}
      <IconButton ref={closeButtonRef} icon={closeIcon ?? <X aria-hidden="true" />} label="Закрыть" size="s" variant="floating" onClick={onClose} />
    </header>
  )
})

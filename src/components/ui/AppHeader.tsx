import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { IconButton } from './IconButton'
import { FederationLabel } from './FederationLabel'

type AppHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'content'> & {
  title: string
  supportingText?: string
  leadingElement?: ReactNode
  actions?: ReactNode
  content?: ReactNode
  backLabel?: string
  onBack?: () => void
  federation?: boolean
}

export function AppHeader({ title, supportingText, leadingElement, actions, content, backLabel = 'Назад', onBack, federation = false, className = '', ...props }: AppHeaderProps) {
  return (
    <header className={`collapse-app-header ${className}`} {...props}>
      <div className="collapse-app-header__row">
        {onBack && <IconButton icon={<ChevronLeft aria-hidden="true" />} label={backLabel} variant="floating" size="s" onClick={onBack} />}
        {leadingElement && <span className="collapse-app-header__leading">{leadingElement}</span>}
        <span className="collapse-app-header__content"><strong>{federation ? <FederationLabel>{title}</FederationLabel> : title}</strong>{supportingText && <small>{supportingText}</small>}</span>
        {actions && <span className="collapse-app-header__actions">{actions}</span>}
      </div>
      {content && <div className="collapse-app-header__slot">{content}</div>}
    </header>
  )
}

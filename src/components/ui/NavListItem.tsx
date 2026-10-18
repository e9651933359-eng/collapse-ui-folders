import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Phone, Pin } from 'lucide-react'
import { Counter } from './Counter'
import { FederationLabel } from './FederationLabel'

type NavListItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  title: string
  supportingText?: string
  leadingElement?: ReactNode
  status?: string
  organization?: boolean
  selected?: boolean
  counter?: number
  badge?: string
  pinned?: boolean
  callActive?: boolean
  federation?: boolean
  type?: 'segment' | 'button'
}

export function NavListItem({ title, supportingText, leadingElement, status, organization = false, selected = false, counter, badge, pinned = false, callActive = false, federation = false, type = 'segment', className = '', ...props }: NavListItemProps) {
  return (
    <button className={`collapse-nav-list-item ${selected ? 'is-selected' : ''} ${className}`} type="button" aria-pressed={type === 'segment' ? selected : undefined} {...props}>
      {leadingElement && <span className="collapse-nav-list-item__leading">{leadingElement}</span>}
      <span className="collapse-nav-list-item__content">
        <span className="collapse-nav-list-item__label">{organization && <span aria-label="Организация">◎</span>}{federation ? <FederationLabel>{title}</FederationLabel> : title}</span>
        {status && <small>{status}</small>}
        {supportingText && <small>{supportingText}</small>}
      </span>
      <span className="collapse-nav-list-item__trailing">
        {badge && <span className="collapse-nav-list-item__badge">{badge}</span>}
        {callActive && <span className="collapse-nav-list-item__call"><Phone aria-hidden="true" /></span>}
        {pinned && <Pin aria-hidden="true" />}
        {counter !== undefined && <Counter tone="accent">{counter}</Counter>}
      </span>
    </button>
  )
}

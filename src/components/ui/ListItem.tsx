import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { FederationLabel } from './FederationLabel'

type ListItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: ReactNode
  supporting?: ReactNode
  overline?: ReactNode
  leadingElement?: ReactNode
  trailingElement?: ReactNode
  size?: 'm' | 'l'
  divider?: boolean
  error?: boolean
  federation?: boolean
  federationIconPosition?: 'start' | 'end'
  federationIconSize?: 'xs' | 's' | 'm'
  /** `false` — строка только для просмотра: `div` без hover, нажатия и фокуса. */
  interactive?: boolean
}

export function ListItem({ label, supporting, overline, leadingElement, trailingElement, size = 'm', divider = true, error = false, federation = false, federationIconPosition = 'end', federationIconSize = 's', interactive = true, className = '', type = 'button', ...props }: ListItemProps) {
  const classes = `collapse-list-item collapse-list-item--${size} ${divider ? 'has-divider' : ''} ${error ? 'is-error' : ''} ${federation ? 'is-federation' : ''} ${interactive ? '' : 'is-static'} ${className}`
  const content = <>{leadingElement && <span className="collapse-list-item__leading">{leadingElement}</span>}<span className="collapse-list-item__content">{overline && <small className="collapse-list-item__overline">{overline}</small>}<span>{federation ? <FederationLabel iconPosition={federationIconPosition} iconSize={federationIconSize}>{label}</FederationLabel> : label}</span>{supporting && <small>{supporting}</small>}</span>{trailingElement && <span className="collapse-list-item__trailing">{trailingElement}</span>}</>
  if (!interactive) return <div className={classes} {...(props as HTMLAttributes<HTMLDivElement>)}>{content}</div>
  return <button className={classes} type={type} {...props}>{content}</button>
}

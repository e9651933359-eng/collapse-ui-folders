import type { HTMLAttributes, ReactNode } from 'react'
import { FederationIcon } from './FederationIcon'

type FederationTagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}

/** Тег-признак федерации на warning-фоне: иконка слева, подпись Caption/L Medium. Используется в профилях участника и канала. */
export function FederationTag({ children, className = '', ...props }: FederationTagProps) {
  return <span className={`collapse-federation-tag ${className}`.trim()} {...props}><FederationIcon size="xs" />{children}</span>
}

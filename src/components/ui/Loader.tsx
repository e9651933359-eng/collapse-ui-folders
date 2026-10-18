import type { HTMLAttributes } from 'react'

type LoaderProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  tone?: 'accent' | 'light' | 'ai'
}

export function Loader({ label = 'Загрузка', size = 'medium', tone = 'accent', className = '', ...props }: LoaderProps) {
  return <span className={`collapse-spinner collapse-spinner--${size} collapse-spinner--${tone} ${className}`} role="status" aria-label={label} {...props} />
}

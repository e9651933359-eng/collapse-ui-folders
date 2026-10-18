import type { HTMLAttributes, ReactNode } from 'react'

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  shape?: 'default' | 'left' | 'right'
  surface?: 'primary' | 'clear'
  background?: 'default' | 'gradient'
}

export function Surface({ children, shape = 'default', surface = 'primary', background = 'default', className = '', ...props }: SurfaceProps) {
  return <div className={`collapse-surface collapse-surface--${shape} collapse-surface--${surface} collapse-surface--${background} ${className}`} {...props}>{children}</div>
}

import type { HTMLAttributes, ReactNode } from 'react'

type BottomNavSurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: 'default' | 'accent' | 'clear'
  label?: string
}

export function BottomNavSurface({ children, tone = 'clear', label = 'Основная навигация', className = '', ...props }: BottomNavSurfaceProps) {
  return <nav className={`collapse-bottom-nav collapse-bottom-nav--${tone} ${className}`} aria-label={label} {...props}>{children}</nav>
}

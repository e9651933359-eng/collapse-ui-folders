import type { HTMLAttributes, ReactNode } from 'react'

type CounterProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  qty?: '1-9' | '10+'
  size?: 's' | 'm'
  tone?: 'negative' | 'accent' | 'warning' | 'default'
  emphasis?: 'primary' | 'secondary' | 'tertiary'
  shape?: 'expressive' | 'default'
}

export function Counter({ children, qty, size = 's', tone = 'default', emphasis = 'primary', shape = 'default', className = '', ...props }: CounterProps) {
  const numericValue = typeof children === 'number' ? children : Number(children)
  const resolvedQty = qty ?? (Number.isFinite(numericValue) && Math.abs(numericValue) >= 10 ? '10+' : '1-9')

  return <span data-qty={resolvedQty} className={`collapse-counter collapse-counter--${size} collapse-counter--${tone} collapse-counter--${emphasis} collapse-counter--shape-${shape} ${className}`} {...props}>{children}</span>
}

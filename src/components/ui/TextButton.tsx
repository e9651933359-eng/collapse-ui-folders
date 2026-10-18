import type { ButtonHTMLAttributes, ReactNode } from 'react'

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  tone?: 'base' | 'accent' | 'error'
}

export function TextButton({ children, tone = 'accent', className = '', type = 'button', ...props }: TextButtonProps) {
  return (
    <button className={`collapse-text-button collapse-text-button--${tone} ${className}`} type={type} {...props}>
      <span>{children}</span>
    </button>
  )
}

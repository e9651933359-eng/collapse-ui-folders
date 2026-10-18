import { Check, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './feedback.css'

export type ToastType = 'default' | 'success' | 'accent'

type ToastProps = {
  children: ReactNode
  className?: string
  duration?: number
  fixedContainer?: boolean
  icon?: ReactNode
  onClose?: () => void
  open?: boolean
  type?: ToastType
}

export function Toast({ children, className = '', duration = 3000, fixedContainer = false, icon, onClose, open = true, type = 'default' }: ToastProps) {
  const [visible, setVisible] = useState(open)

  useEffect(() => setVisible(open), [open])
  useEffect(() => {
    if (!visible || duration <= 0) return
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose, visible])

  if (!visible) return null
  return (
    <div className={`collapse-toast collapse-toast--${type} ${fixedContainer ? 'is-fixed' : ''} ${className}`} role="status" aria-live="polite">
      <span className="collapse-toast__icon" aria-hidden="true">{icon ?? (type === 'success' ? <Check /> : <Info />)}</span>
      <span>{children}</span>
    </div>
  )
}

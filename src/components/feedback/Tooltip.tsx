import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './feedback.css'

export type TooltipPlacement =
  | 'none'
  | 'top-start' | 'top-center' | 'top-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end'
  | 'left-top' | 'left-middle' | 'left-bottom'
  | 'right-top' | 'right-middle' | 'right-bottom'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  defaultOpen?: boolean
  fixedContainer?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: TooltipPlacement
}

export function Tooltip({
  children,
  content,
  defaultOpen = false,
  fixedContainer = true,
  onOpenChange,
  open,
  placement = 'top-center',
}: TooltipProps) {
  const tooltipId = useId()
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const clearLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    longPressTimer.current = null
  }

  useEffect(() => clearLongPress, [])

  return (
    <span
      className="collapse-tooltip-trigger"
      aria-describedby={isOpen ? tooltipId : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse') return
        clearLongPress()
        longPressTimer.current = setTimeout(() => setOpen(true), 500)
      }}
      onPointerUp={clearLongPress}
      onPointerCancel={clearLongPress}
    >
      {children}
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`collapse-tooltip collapse-tooltip--${placement} ${fixedContainer ? 'is-fixed' : ''}`}
        >
          {content}
        </span>
      )}
    </span>
  )
}

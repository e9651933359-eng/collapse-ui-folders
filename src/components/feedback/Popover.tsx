import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './feedback.css'

export type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

type PopoverProps = {
  children: ReactNode
  contentClassName?: string
  content: ReactNode
  defaultOpen?: boolean
  gap?: 'default' | 'clear'
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: PopoverPlacement
}

export function Popover({ children, contentClassName = '', content, defaultOpen = false, gap = 'default', onOpenChange, open, placement = 'bottom-start' }: PopoverProps) {
  const id = useId()
  const rootRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open ?? internalOpen

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!isOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [isOpen])

  return (
    <span ref={rootRef} className="collapse-popover-trigger">
      <span
        className="collapse-popover-trigger__control"
        aria-controls={isOpen ? id : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setOpen(!isOpen)}
        onKeyDownCapture={(event) => {
          if (event.key === 'Escape') setOpen(false)
          if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
            event.preventDefault()
            setOpen(!isOpen)
          }
        }}
      >{children}</span>
      {isOpen && (
        <div
          ref={panelRef}
          id={id}
          className={`collapse-popover collapse-popover--${placement} collapse-popover--gap-${gap} ${contentClassName}`}
          role="dialog"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              const focusTarget = rootRef.current?.querySelector<HTMLElement>('button,[href],[tabindex="0"]')
              focusTarget?.focus()
            }
          }}
        >{content}</div>
      )}
    </span>
  )
}

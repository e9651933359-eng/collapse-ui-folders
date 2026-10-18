import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Menu, type OptionMenuItem } from './Menu'
import './option-menu.css'

type DropFieldProps = {
  className?: string
  disabled?: boolean
  error?: string
  label?: string
  leadingIcon?: ReactNode
  onChange?: (value: string) => void
  options: OptionMenuItem[]
  placeholder?: string
  supporting?: string
  value?: string
}

export function DropField({ className = '', disabled = false, error, label = 'Label', leadingIcon, onChange, options, placeholder = 'Placeholder', supporting, value }: DropFieldProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.id === value)

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  return (
    <div ref={rootRef} className={`collapse-drop-field ${open ? 'is-active' : ''} ${error ? 'is-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}>
      {label && <span className="collapse-drop-field__label">{label}</span>}
      <button
        type="button"
        className="collapse-drop-field__control"
        role="combobox"
        aria-label={label || placeholder}
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-invalid={Boolean(error)}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {leadingIcon && <span className="collapse-drop-field__leading">{leadingIcon}</span>}
        <span className={selected ? '' : 'is-placeholder'}>{selected?.label ?? placeholder}</span>
        <span className="collapse-drop-field__chevron" aria-hidden="true"><ChevronDown /></span>
      </button>
      {(error || supporting) && <span className="collapse-drop-field__hint">{error ?? supporting}</span>}
      {open && (
        <div id={listId} className="collapse-drop-field__menu">
          <Menu
            ariaLabel={label || 'Список вариантов'}
            autoFocus
            items={options}
            onClose={() => setOpen(false)}
            onSelect={(item) => {
              onChange?.(item.id)
              if (!item.submenu) setOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

export type ComboBoxOption = {
  value: string
  label: string
  supporting?: string
}

type ComboBoxProps = {
  ariaLabel: string
  className?: string
  defaultOpen?: boolean
  onChange?: (value: string) => void
  options: ComboBoxOption[]
  placement?: 'top' | 'bottom'
  value: string
}

export function ComboBox({
  ariaLabel,
  className = '',
  defaultOpen = false,
  onChange,
  options,
  placement = 'bottom',
  value,
}: ComboBoxProps) {
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(defaultOpen)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [open])

  const selectOption = (option: ComboBoxOption) => {
    onChange?.(option.value)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (options.length === 0) return
      setOpen(true)
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setHighlightedIndex((current) => (current + direction + options.length) % options.length)
      return
    }

    if (event.key === 'Enter' && open && options[highlightedIndex]) {
      event.preventDefault()
      selectOption(options[highlightedIndex])
    }
  }

  return (
    <div ref={rootRef} className={`combo-box ${open ? 'is-active' : ''} ${className}`}>
      <button
        className="combo-box__field"
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className="combo-box__value">{selected?.label}</span>
        <span className="combo-box__action" aria-hidden="true">
          <img src="assets/figma/ic-chevron-down-combobox.svg" alt="" />
        </span>
      </button>

      {open && (
        <div id={listboxId} className={`combo-box__menu combo-box__menu--${placement}`} role="listbox" aria-label={ariaLabel}>
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`combo-box__option ${index === highlightedIndex ? 'is-highlighted' : ''}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(option)}
            >
              <span className="combo-box__option-copy">
                <span>{option.label}</span>
                {option.supporting && <small>{option.supporting}</small>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

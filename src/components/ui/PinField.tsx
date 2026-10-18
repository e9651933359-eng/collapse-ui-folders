import { useRef } from 'react'
import type { ChangeEvent, InputHTMLAttributes } from 'react'

type PinFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'maxLength'> & {
  value: string
  onChange: (value: string) => void
  length?: 4 | 6
  masked?: boolean
  label?: string
}

export function PinField({ value, onChange, length = 4, masked = true, label = 'Код подтверждения', className = '', disabled, ...props }: PinFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const normalized = value.replace(/\D/g, '').slice(0, length)
  const activeIndex = Math.min(normalized.length, length - 1)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value.replace(/\D/g, '').slice(0, length))

  return (
    <div className={`collapse-pin-field ${disabled ? 'is-disabled' : ''} ${className}`} onClick={() => inputRef.current?.focus()}>
      <input ref={inputRef} aria-label={label} autoComplete="one-time-code" inputMode="numeric" disabled={disabled} value={normalized} maxLength={length} onChange={handleChange} {...props} />
      <div className="collapse-pin-field__cells" aria-hidden="true">
        {Array.from({ length }, (_, index) => {
          const character = normalized[index]
          const active = !disabled && normalized.length < length && index === activeIndex
          return <span className={`collapse-pin-field__cell ${character ? 'is-filled' : ''} ${active ? 'is-active' : ''}`} key={index}>{character ? (masked ? '•' : character) : active ? <i /> : null}</span>
        })}
      </div>
    </div>
  )
}

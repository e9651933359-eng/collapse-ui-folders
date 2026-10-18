import type { ButtonHTMLAttributes } from 'react'

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  selected: boolean
  label: string
  onChange?: (selected: boolean) => void
  pressed?: boolean
  hovered?: boolean
}

export function Switch({ selected, label, onChange, pressed = false, hovered = false, className = '', type = 'button', ...props }: SwitchProps) {
  return (
    <button
      className={`collapse-switch ${selected ? 'is-on' : ''} ${pressed ? 'is-pressed' : ''} ${hovered ? 'is-hovered' : ''} ${className}`}
      type={type}
      role="switch"
      aria-checked={selected}
      aria-label={label}
      {...props}
      onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) onChange?.(!selected) }}
    >
      <span aria-hidden="true" />
    </button>
  )
}

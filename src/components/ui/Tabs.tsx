import { useId, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Counter } from './Counter'

export type TabOption = { value: string; label: ReactNode; disabled?: boolean; icon?: ReactNode; counter?: number }

type TabsProps = {
  options: readonly TabOption[]
  value: string
  onValueChange: (value: string) => void
  /** `accent` и `default` — плашки; `line` — табы с подчёркиванием (Figma my-Base 14589:3328, Type=Default). */
  type?: 'accent' | 'default' | 'line'
  ariaLabel?: string
}

export function Tabs({ options, value, onValueChange, type = 'accent', ariaLabel = 'Разделы' }: TabsProps) {
  const id = useId()
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const enabled = options.map((option, optionIndex) => ({ option, optionIndex })).filter(({ option }) => !option.disabled)
    const current = enabled.findIndex(({ optionIndex }) => optionIndex === index)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length
    const target = enabled[next]
    if (target) { refs.current[target.optionIndex]?.focus(); onValueChange(target.option.value) }
  }

  return (
    <div className={`collapse-tabs collapse-tabs--${type}`} role="tablist" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const selected = option.value === value
        return <button key={option.value} ref={(node) => { refs.current[index] = node }} id={`${id}-${option.value}-tab`} className={`collapse-tab ${selected ? 'is-selected' : ''}`} type="button" role="tab" aria-selected={selected} aria-controls={`${id}-${option.value}-panel`} tabIndex={selected ? 0 : -1} disabled={option.disabled} onClick={() => onValueChange(option.value)} onKeyDown={(event) => moveFocus(event, index)}>{option.icon && <span className="collapse-tab__icon">{option.icon}</span>}<span>{option.label}</span>{option.counter !== undefined && <Counter tone={selected && type !== 'default' ? 'accent' : 'default'}>{option.counter}</Counter>}</button>
      })}
    </div>
  )
}

import { useId, useState } from 'react'
import type { InputHTMLAttributes, KeyboardEvent } from 'react'
import { X } from 'lucide-react'

type ChipsFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  label: string
  values: string[]
  onValuesChange: (values: string[]) => void
  error?: boolean
  supportingText?: string
}

export function ChipsField({ label, values, onValuesChange, error = false, supportingText, className = '', id, disabled, placeholder = 'Добавить', ...props }: ChipsFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const [draft, setDraft] = useState('')
  const commit = () => { const next = draft.trim(); if (next && !values.includes(next)) onValuesChange([...values, next]); setDraft('') }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); commit() }
    if (event.key === 'Backspace' && !draft && values.length) onValuesChange(values.slice(0, -1))
    props.onKeyDown?.(event)
  }
  return (
    <label className={`collapse-chips-field ${error ? 'is-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`} htmlFor={fieldId}>
      <span className="collapse-chips-field__label">{label}</span>
      <span className="collapse-chips-field__surface">
        {values.map((value) => <span className="collapse-chip collapse-chip--multiple collapse-chip--m collapse-chip--default" key={value}><span className="collapse-chip__label">{value}</span><button type="button" className="collapse-chips-field__remove" aria-label={`Удалить ${value}`} disabled={disabled} onClick={() => onValuesChange(values.filter((item) => item !== value))}><X aria-hidden="true" /></button></span>)}
        <input {...props} id={fieldId} disabled={disabled} value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={(event) => { commit(); props.onBlur?.(event) }} onKeyDown={handleKeyDown} />
      </span>
      {supportingText && <span className="collapse-chips-field__support">{supportingText}</span>}
    </label>
  )
}

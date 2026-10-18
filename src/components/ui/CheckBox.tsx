import { useEffect, useRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode
  size?: 's' | 'm'
  shape?: 'default' | 'ellipse'
  indeterminate?: boolean
  loading?: boolean
  visualOnly?: boolean
}

export function CheckBox({ label, size = 'm', shape = 'default', indeterminate = false, loading = false, visualOnly = false, className = '', disabled, checked, ...props }: CheckBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate }, [indeterminate])

  if (visualOnly) {
    return <span className={`choice-control choice-control--${size} choice-control--${shape} choice-control--visual ${checked ? 'is-selected' : ''} ${indeterminate ? 'is-indeterminate' : ''} ${className}`} aria-hidden="true"><span className="choice-control__target"><span className="choice-control__indicator" /></span></span>
  }

  return (
    <label className={`choice-control choice-control--${size} choice-control--${shape} ${loading ? 'is-loading' : ''} ${className}`}>
      <input ref={inputRef} type="checkbox" disabled={disabled || loading} aria-busy={loading || undefined} checked={checked} {...props} />
      <span className="choice-control__target" aria-hidden="true"><span className="choice-control__indicator" /></span>
      {label && <span className="choice-control__label">{label}</span>}
    </label>
  )
}

import type { InputHTMLAttributes, ReactNode } from 'react'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode
  size?: 's' | 'm'
  loading?: boolean
}

export function Radio({ label, size = 'm', loading = false, className = '', disabled, ...props }: RadioProps) {
  return (
    <label className={`choice-control choice-control--radio choice-control--${size} ${loading ? 'is-loading' : ''} ${className}`}>
      <input type="radio" disabled={disabled || loading} aria-busy={loading || undefined} {...props} />
      <span className="choice-control__target" aria-hidden="true"><span className="choice-control__indicator" /></span>
      {label && <span className="choice-control__label">{label}</span>}
    </label>
  )
}

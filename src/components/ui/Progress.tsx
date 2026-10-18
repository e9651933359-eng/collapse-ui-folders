import type { CSSProperties, HTMLAttributes } from 'react'

type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  value?: number
  size?: 's' | 'm'
  indeterminate?: boolean
  label?: string
}

export function Progress({ value = 0, size = 'm', indeterminate = false, label = 'Прогресс', className = '', ...props }: ProgressProps) {
  const normalized = Math.max(0, Math.min(100, value))
  return (
    <div className={`collapse-progress collapse-progress--${size} ${indeterminate ? 'is-indeterminate' : ''} ${className}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={indeterminate ? undefined : normalized} {...props}>
      <span className="collapse-progress__active" style={{ '--progress-value': `${normalized}%` } as CSSProperties} />
      <span className="collapse-progress__stop" />
    </div>
  )
}

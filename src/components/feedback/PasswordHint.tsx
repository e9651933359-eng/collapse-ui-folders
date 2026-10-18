import './feedback.css'

export type PasswordHintType = 'zero' | 'low' | 'medium' | 'high'

const labels: Record<PasswordHintType, string> = {
  zero: 'Минимум 8 символов',
  low: 'Слабый',
  medium: 'Средний',
  high: 'Надежный',
}

const filledSegments: Record<PasswordHintType, number> = { zero: 0, low: 1, medium: 2, high: 3 }

type PasswordHintProps = { className?: string; type?: PasswordHintType }

export function PasswordHint({ className = '', type = 'zero' }: PasswordHintProps) {
  return (
    <div className={`collapse-password-hint collapse-password-hint--${type} ${className}`} aria-live="polite">
      <span className="collapse-password-hint__bars" aria-hidden="true">
        {[0, 1, 2].map((segment) => <span key={segment} className={segment < filledSegments[type] ? 'is-filled' : ''} />)}
      </span>
      <span>{labels[type]}</span>
    </div>
  )
}

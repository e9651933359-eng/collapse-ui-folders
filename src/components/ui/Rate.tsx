import { Star } from 'lucide-react'

type RateProps = {
  value: number
  onChange?: (value: number) => void
  size?: 's' | 'm' | 'l'
  disabled?: boolean
  label?: string
}

export function Rate({ value, onChange, size = 's', disabled = false, label = 'Оценка' }: RateProps) {
  return <div className={`collapse-rate collapse-rate--${size}`} role="radiogroup" aria-label={label}>{[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" role="radio" aria-checked={value === rating} aria-label={`${rating} из 5`} disabled={disabled} className={rating <= value ? 'is-filled' : ''} onClick={() => onChange?.(rating)}><Star aria-hidden="true" /></button>)}</div>
}

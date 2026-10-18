import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
}

export function SearchField({ className = '', label = 'Поиск', placeholder = 'Поиск', ...props }: SearchFieldProps) {
  return (
    <label className={`collapse-search-field ${className}`}>
      <Search aria-hidden="true" />
      <input type="search" aria-label={label} placeholder={placeholder} {...props} />
    </label>
  )
}

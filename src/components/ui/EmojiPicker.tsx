import { useMemo, useRef, useState } from 'react'
import type { UIEvent } from 'react'
import { Search } from 'lucide-react'

export type EmojiCategory = { id: string; label: string; icon: string; emojis: string[] }

export const defaultEmojiCategories: EmojiCategory[] = [
  { id: 'recent', label: 'Часто используемые', icon: '◷', emojis: ['😇', '🐶', '🚨', '💚', '👀', '🙏', '👎', '🤡', '🫡', '✅', '😁', '🔥', '💊', '🍯', '🤩', '📌', '🤷', '🤘'] },
  { id: 'people', label: 'Смайлики и люди', icon: '☺', emojis: ['😀', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍'] },
  { id: 'animals', label: 'Животные', icon: '🐻', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'] },
  { id: 'food', label: 'Еда', icon: '🍱', emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒'] },
]

type EmojiPickerProps = {
  categories?: EmojiCategory[]
  onSelect?: (emoji: string) => void
  emptyText?: string
  className?: string
}

export function EmojiPicker({ categories = defaultEmojiCategories, onSelect, emptyText = 'Ничего не найдено', className = '' }: EmojiPickerProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(categories[0]?.id)
  const scrollRef = useRef<HTMLDivElement>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => categories.map((category) => ({ ...category, emojis: normalizedQuery ? category.emojis.filter((emoji) => emoji.includes(normalizedQuery)) : category.emojis })).filter((category) => category.emojis.length), [categories, normalizedQuery])
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (normalizedQuery) return
    const containerTop = event.currentTarget.getBoundingClientRect().top
    const nearest = categories.map((category) => event.currentTarget.querySelector<HTMLElement>(`[data-category="${category.id}"]`)).filter(Boolean).sort((a, b) => Math.abs((a?.getBoundingClientRect().top ?? 0) - containerTop) - Math.abs((b?.getBoundingClientRect().top ?? 0) - containerTop))[0]
    if (nearest?.dataset.category) setActive(nearest.dataset.category)
  }
  const goTo = (id: string) => { setActive(id); scrollRef.current?.querySelector<HTMLElement>(`[data-category="${id}"]`)?.scrollIntoView({ block: 'start', behavior: 'smooth' }) }
  return (
    <section className={`collapse-emoji-picker ${className}`} aria-label="Выбор эмодзи">
      <label className="collapse-emoji-picker__search"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск" aria-label="Поиск эмодзи" /></label>
      <div className="collapse-emoji-picker__scroll" ref={scrollRef} onScroll={handleScroll}>
        {filtered.length ? filtered.map((category) => <section data-category={category.id} key={category.id}><h3>{category.label}</h3><div className="collapse-emoji-picker__grid">{category.emojis.map((emoji, index) => <button type="button" data-tooltip={emoji} aria-label={emoji} key={`${emoji}-${index}`} onClick={() => onSelect?.(emoji)}>{emoji}</button>)}</div></section>) : <p className="collapse-emoji-picker__empty">{emptyText}</p>}
      </div>
      <div className="collapse-emoji-picker__segments" role="tablist" aria-label="Категории эмодзи">{categories.map((category) => <button type="button" role="tab" aria-selected={active === category.id} className={active === category.id ? 'is-selected' : ''} aria-label={category.label} key={category.id} onClick={() => goTo(category.id)}>{category.icon}</button>)}</div>
    </section>
  )
}

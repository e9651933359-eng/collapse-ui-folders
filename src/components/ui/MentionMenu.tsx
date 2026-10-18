import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Avatar } from './Avatar'

export type MentionMenuItem = {
  id: string
  name: string
  username?: string
  initials?: string
  image?: string
  status?: 'online' | 'offline' | 'busy'
}

type MentionMenuProps = {
  items: MentionMenuItem[]
  onSelect: (item: MentionMenuItem) => void
  ariaLabel?: string
  emptyText?: string
}

export function MentionMenu({ items, onSelect, ariaLabel = 'Участники чата', emptyText = 'Ничего не найдено' }: MentionMenuProps) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    setActiveIndex((current) => current >= items.length ? -1 : current)
  }, [items.length])

  const moveActive = (direction: 1 | -1) => {
    if (!items.length) return
    const next = activeIndex < 0
      ? direction === 1 ? 0 : items.length - 1
      : (activeIndex + direction + items.length) % items.length
    setActiveIndex(next)
    optionRefs.current[next]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActive(1)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(-1)
    }
    if (event.key === 'Home' && items.length) {
      event.preventDefault()
      setActiveIndex(0)
      optionRefs.current[0]?.focus()
    }
    if (event.key === 'End' && items.length) {
      event.preventDefault()
      const last = items.length - 1
      setActiveIndex(last)
      optionRefs.current[last]?.focus()
    }
  }

  return (
    <div className="collapse-mention-menu" role="listbox" aria-label={ariaLabel} onKeyDown={handleKeyDown}>
      {items.length ? items.map((item, index) => (
        <button
          ref={(node) => { optionRefs.current[index] = node }}
          type="button"
          role="option"
          aria-selected={activeIndex === index}
          className={`collapse-mention-menu__option ${activeIndex === index ? 'is-active' : ''}`}
          tabIndex={index === 0 || activeIndex === index ? 0 : -1}
          key={item.id}
          onFocus={() => setActiveIndex(index)}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => onSelect(item)}
        >
          <span className="collapse-mention-menu__leading">
            <Avatar
              label={item.name}
              size={28}
              emoji={item.initials}
              image={item.image}
              status={item.status}
              filled={false}
            />
          </span>
          <span className="collapse-mention-menu__content">
            <span className="collapse-mention-menu__label">{item.name}</span>
            {item.username && <span className="collapse-mention-menu__supporting">{item.username}</span>}
          </span>
        </button>
      )) : <p className="collapse-mention-menu__empty">{emptyText}</p>}
    </div>
  )
}

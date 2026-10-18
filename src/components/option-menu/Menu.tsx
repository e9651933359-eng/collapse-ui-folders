import { Check, ChevronRight, LoaderCircle, RefreshCw } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import './option-menu.css'
import { FederationLabel } from '../ui/FederationLabel'

export type OptionMenuItem = {
  disabled?: boolean
  divider?: boolean
  error?: boolean
  id: string
  kind?: 'direct' | 'checkbox' | 'switch'
  label: string
  leading?: ReactNode
  selected?: boolean
  submenu?: OptionMenuItem[]
  supporting?: string
  trailingText?: string
  federation?: boolean
}

export type OptionMenuStatus = 'items' | 'loading' | 'fail' | 'scrolling-loader'

type ListItemMenuProps = OptionMenuItem & {
  active?: boolean
  divider?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onOpenSubmenu?: () => void
  tabIndex?: number
}

export function ListItemMenu({ active = false, disabled = false, divider = false, error = false, federation = false, kind = 'direct', label, leading, onClick, onMouseEnter, selected = false, submenu, supporting, tabIndex = -1, trailingText }: ListItemMenuProps) {
  const role = kind === 'direct' ? 'menuitem' : 'menuitemcheckbox'
  return (
    <button
      className={`collapse-menu-item__state ${divider ? 'has-divider' : ''} ${active ? 'is-active' : ''} ${error ? 'is-error' : ''}`}
      type="button"
      role={role}
      aria-checked={kind === 'direct' ? undefined : selected}
      aria-disabled={disabled || undefined}
      aria-haspopup={submenu ? 'menu' : undefined}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {leading && <span className="collapse-menu-item__leading">{leading}</span>}
      <span className="collapse-menu-item__copy">
        <span>{federation ? <FederationLabel>{label}</FederationLabel> : label}</span>
        {supporting && <small>{supporting}</small>}
      </span>
      <span className="collapse-menu-item__trailing">
        {trailingText && <small>{trailingText}</small>}
        {kind === 'checkbox' && selected && <Check />}
        {kind === 'switch' && <span className={`collapse-menu-switch ${selected ? 'is-selected' : ''}`} aria-hidden="true"><span /></span>}
        {submenu && <ChevronRight />}
      </span>
    </button>
  )
}

type MenuProps = {
  ariaLabel: string
  autoFocus?: boolean
  className?: string
  items: OptionMenuItem[]
  maxHeight?: CSSProperties['maxHeight']
  onClose?: () => void
  onRetry?: () => void
  onSelect?: (item: OptionMenuItem) => void
  status?: OptionMenuStatus
}

export function Menu({ ariaLabel, autoFocus = false, className = '', items, maxHeight = 'var(--collapse-size-menu-max)', onClose, onRetry, onSelect, status = 'items' }: MenuProps) {
  const menuId = useId()
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const firstEnabledIndex = items.findIndex((item) => !item.disabled)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)

  useEffect(() => {
    if (autoFocus && status === 'items' && firstEnabledIndex >= 0) itemRefs.current[firstEnabledIndex]?.focus()
  }, [autoFocus, firstEnabledIndex, status])

  const nextEnabled = (start: number, step: 1 | -1) => {
    if (!items.length) return start
    let index = start
    for (let count = 0; count < items.length; count += 1) {
      index = (index + step + items.length) % items.length
      if (!items[index]?.disabled) return index
    }
    return start
  }

  const focusItem = (index: number) => {
    setActiveIndex(index)
    requestAnimationFrame(() => itemRefs.current[index]?.focus())
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      if (openSubmenu !== null) setOpenSubmenu(null)
      else onClose?.()
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      focusItem(nextEnabled(activeIndex < 0 ? (event.key === 'ArrowDown' ? -1 : 0) : activeIndex, event.key === 'ArrowDown' ? 1 : -1))
      return
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      const enabled = items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled)
      const target = event.key === 'Home' ? enabled[0] : enabled.at(-1)
      if (target) focusItem(target.index)
      return
    }
    if (event.key === 'ArrowRight' && activeIndex >= 0 && items[activeIndex]?.submenu) {
      event.preventDefault()
      setOpenSubmenu(activeIndex)
      return
    }
    if (event.key === 'ArrowLeft' && openSubmenu !== null) {
      event.preventDefault()
      setOpenSubmenu(null)
    }
  }

  if (status === 'loading') {
    return <div className={`collapse-option-menu collapse-option-menu--message ${className}`} role="status"><LoaderCircle className="collapse-option-menu__loader" /><span>Загрузка</span></div>
  }

  if (status === 'fail') {
    return <div className={`collapse-option-menu collapse-option-menu--message ${className}`} role="alert"><strong>Не найдено</strong><button type="button" onClick={onRetry}><RefreshCw />Обновить</button></div>
  }

  return (
    <ul id={menuId} className={`collapse-option-menu ${items.length >= 7 || status === 'scrolling-loader' ? 'is-scrollable' : ''} ${className}`} role="menu" aria-label={ariaLabel} style={{ maxHeight }} onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          className="collapse-option-menu__entry"
          role="none"
          key={item.id}
          ref={(node) => { itemRefs.current[index] = node?.querySelector('button') ?? null }}
          onMouseLeave={() => {
            setHoveredIndex((current) => current === index ? null : current)
            if (item.submenu) setOpenSubmenu(null)
          }}
        >
          <ListItemMenu
            {...item}
            active={index === (hoveredIndex ?? activeIndex)}
            tabIndex={index === (activeIndex >= 0 ? activeIndex : firstEnabledIndex) ? 0 : -1}
            onMouseEnter={() => {
              setHoveredIndex(index)
              setOpenSubmenu(item.submenu ? index : null)
            }}
            onClick={() => {
              if (item.submenu) setOpenSubmenu(index)
              else onSelect?.(item)
            }}
          />
          {item.submenu && openSubmenu === index && (
            <span className="collapse-option-menu__submenu">
              <Menu ariaLabel={`${item.label}: подменю`} autoFocus items={item.submenu} onClose={() => setOpenSubmenu(null)} onSelect={onSelect} />
            </span>
          )}
        </li>
      ))}
      {status === 'scrolling-loader' && <li className="collapse-option-menu__scroll-loader" role="none"><LoaderCircle className="collapse-option-menu__loader" aria-label="Загрузка" /></li>}
    </ul>
  )
}

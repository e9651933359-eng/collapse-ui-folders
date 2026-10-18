import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DragEvent, KeyboardEvent, MouseEvent, ReactNode, WheelEvent as ReactWheelEvent } from 'react'
import { Menu, type OptionMenuItem } from '../option-menu/Menu'
import { Counter } from './Counter'

export type SegmentOption = {
  value: string
  label: string
  icon?: ReactNode
  counter?: number
  kind?: 'fixed' | 'system' | 'custom'
}

export type SegmentDisplayMode = 'names' | 'names-and-icons' | 'icons'
export type SegmentTabsMode = 'fill' | 'dynamic'

type SegmentControlsProps = {
  options: readonly SegmentOption[]
  value: string
  onValueChange: (value: string) => void
  fixedOptionValue?: string
  onOrderChange?: (values: string[]) => void
  menuItems?: readonly OptionMenuItem[]
  getMenuItems?: (option: SegmentOption) => readonly OptionMenuItem[]
  onMenuSelect?: (item: OptionMenuItem, option: SegmentOption) => void
  onSettingsClick?: () => void
  settingsLabel?: string
  displayMode?: SegmentDisplayMode
  /** Fill shares the available width; Dynamic preserves each tab's content width (Figma Hug). */
  tabs?: SegmentTabsMode
}

function moveOption(values: string[], movedValue: string, targetValue: string, fixedValue?: string) {
  const from = values.indexOf(movedValue)
  const to = values.indexOf(targetValue)
  if (from < 0 || to < 0 || from === to || targetValue === fixedValue) return values

  const next = [...values]
  next.splice(from, 1)
  next.splice(to, 0, movedValue)
  return next
}

export function SegmentControls({
  options,
  value,
  onValueChange,
  fixedOptionValue,
  onOrderChange,
  menuItems,
  getMenuItems,
  onMenuSelect,
  onSettingsClick,
  settingsLabel = 'Настроить папки',
  displayMode = 'names',
  tabs = 'dynamic',
}: SegmentControlsProps) {
  const [dragOrder, setDragOrder] = useState<string[] | null>(null)
  const [draggedValue, setDraggedValue] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())
  const menuRef = useRef<HTMLDivElement>(null)
  const previousPositions = useRef(new Map<string, number>())
  const [menuOptionValue, setMenuOptionValue] = useState<string | null>(null)
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
  const optionMap = useMemo(() => new Map(options.map((option) => [option.value, option])), [options])
  const menuOption = menuOptionValue ? optionMap.get(menuOptionValue) : undefined
  const activeMenuItems = menuOption
    ? getMenuItems?.(menuOption) ?? (menuOption.value === value ? menuItems : undefined)
    : undefined
  const menuOpen = Boolean(menuOption && activeMenuItems?.length)
  const orderedOptions = (dragOrder ?? options.map((option) => option.value))
    .flatMap((optionValue) => optionMap.get(optionValue) ?? [])
  const layoutKey = orderedOptions
    .map((option) => `${option.value}:${option.label}:${option.counter ?? ''}:${Boolean(option.icon)}`)
    .join('|')

  const itemsForOption = (option: SegmentOption) => getMenuItems?.(option) ?? (option.value === value ? menuItems : undefined)

  const scrollOptionIntoView = useCallback((optionValue: string, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current
    const item = itemRefs.current.get(optionValue)
    if (!container || !item) return

    const visibleStart = container.scrollLeft
    const visibleEnd = visibleStart + container.clientWidth
    const itemStart = item.offsetLeft
    const itemEnd = itemStart + item.offsetWidth
    const nextScrollLeft = itemStart < visibleStart
      ? itemStart
      : itemEnd > visibleEnd
        ? visibleStart + itemEnd - visibleEnd
        : visibleStart

    if (nextScrollLeft === visibleStart) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({ left: nextScrollLeft, behavior: reducedMotion ? 'auto' : behavior })
  }, [])

  useLayoutEffect(() => {
    let frame = requestAnimationFrame(() => scrollOptionIntoView(value))
    const container = containerRef.current
    if (!container || typeof ResizeObserver === 'undefined') return () => cancelAnimationFrame(frame)

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => scrollOptionIntoView(value))
    })
    observer.observe(container)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [displayMode, layoutKey, scrollOptionIntoView, tabs, value])

  useLayoutEffect(() => {
    const nextPositions = new Map<string, number>()
    itemRefs.current.forEach((element, optionValue) => {
      const nextLeft = element.getBoundingClientRect().left
      const previousLeft = previousPositions.current.get(optionValue)
      nextPositions.set(optionValue, nextLeft)

      if (previousLeft === undefined || previousLeft === nextLeft || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const styles = getComputedStyle(element)
      const duration = Number.parseFloat(styles.getPropertyValue('--collapse-motion-duration-slow')) || 280
      const easing = styles.getPropertyValue('--collapse-motion-easing-standard').trim() || 'ease'
      element.animate(
        [{ transform: `translateX(${previousLeft - nextLeft}px)` }, { transform: 'translateX(0)' }],
        { duration, easing },
      )
    })
    previousPositions.current = nextPositions
  }, [layoutKey])

  useLayoutEffect(() => {
    if (!menuOpen || !menuOptionValue) return
    const trigger = itemRefs.current.get(menuOptionValue)?.getBoundingClientRect()
    const menu = menuRef.current?.getBoundingClientRect()
    if (!trigger || !menu) return
    const left = Math.max(0, Math.min(trigger.left, window.innerWidth - menu.width))
    const top = trigger.bottom + 4 + menu.height > window.innerHeight
      ? Math.max(0, trigger.top - menu.height - 4)
      : trigger.bottom + 4
    setMenuPosition((current) => current.left === left && current.top === top ? current : { left, top })
  }, [menuOpen, menuOptionValue])

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node
      const trigger = menuOptionValue ? itemRefs.current.get(menuOptionValue) : undefined
      if (!trigger?.contains(target) && !menuRef.current?.contains(target)) setMenuOptionValue(null)
    }
    const close = () => setMenuOptionValue(null)
    document.addEventListener('pointerdown', closeOutside)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      window.removeEventListener('resize', close)
    }
  }, [menuOpen, menuOptionValue])

  useEffect(() => {
    if (menuOptionValue && !optionMap.has(menuOptionValue)) setMenuOptionValue(null)
  }, [menuOptionValue, optionMap])

  const canReorder = (optionValue: string) => Boolean(onOrderChange && optionValue !== fixedOptionValue)

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    if (maxScrollLeft <= 0) return

    const axisDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const deltaScale = event.deltaMode === globalThis.WheelEvent.DOM_DELTA_LINE
      ? container.clientHeight
      : event.deltaMode === globalThis.WheelEvent.DOM_DELTA_PAGE
        ? container.clientWidth
        : 1
    const delta = axisDelta * deltaScale
    const canScroll = delta < 0
      ? Math.floor(container.scrollLeft) > 0
      : Math.ceil(container.scrollLeft) < Math.ceil(maxScrollLeft)
    if (!delta || !canScroll) return

    const nextScrollLeft = Math.max(0, Math.min(maxScrollLeft, container.scrollLeft + delta))
    if (nextScrollLeft === container.scrollLeft) return
    event.preventDefault()
    container.scrollLeft = nextScrollLeft
  }

  const openMenu = (option: SegmentOption) => {
    if (!itemsForOption(option)?.length) return
    const trigger = itemRefs.current.get(option.value)?.getBoundingClientRect()
    if (trigger) setMenuPosition({ left: trigger.left, top: trigger.bottom + 4 })
    setMenuOptionValue(option.value)
  }

  const finishDrag = () => {
    if (dragOrder) onOrderChange?.(dragOrder)
    setDragOrder(null)
    setDraggedValue(null)
  }

  const handleDragStart = (event: DragEvent<HTMLButtonElement>, optionValue: string) => {
    if (!canReorder(optionValue)) {
      event.preventDefault()
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', optionValue)
    setDragOrder(options.map((option) => option.value))
    setDraggedValue(optionValue)
  }

  const handleDragEnter = (targetValue: string) => {
    if (!draggedValue || targetValue === fixedOptionValue) return
    setDragOrder((current) => current ? moveOption(current, draggedValue, targetValue, fixedOptionValue) : current)
  }

  const handleKeyboardReorder = (event: KeyboardEvent<HTMLButtonElement>, optionValue: string) => {
    if (!onOrderChange || !event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()

    const values = options.map((option) => option.value)
    const currentIndex = values.indexOf(optionValue)
    const direction = event.key === 'ArrowLeft' ? -1 : 1
    const targetIndex = currentIndex + direction
    if (optionValue === fixedOptionValue || targetIndex < 0 || targetIndex >= values.length || values[targetIndex] === fixedOptionValue) return

    const next = moveOption(values, optionValue, values[targetIndex], fixedOptionValue)
    onOrderChange(next)
    setAnnouncement(`${optionMap.get(optionValue)?.label}: новая позиция ${next.indexOf(optionValue) + 1}`)
  }

  const handleItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, option: SegmentOption) => {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault()
      openMenu(option)
      return
    }
    handleKeyboardReorder(event, option.value)
  }

  const handleContextMenu = (event: MouseEvent<HTMLButtonElement>, option: SegmentOption) => {
    if (!itemsForOption(option)?.length) return
    event.preventDefault()
    event.stopPropagation()
    openMenu(option)
  }

  return (
    <div
      ref={containerRef}
      className={`segment-controls segment-controls--${tabs}`}
      role="tablist"
      aria-label="Фильтры чатов"
      onScroll={() => setMenuOptionValue(null)}
      onWheel={handleWheel}
    >
      {orderedOptions.map((option) => {
        const hasMenu = Boolean(itemsForOption(option)?.length)
        const showIcon = displayMode !== 'names' && Boolean(option.icon)
        const showLabel = displayMode !== 'icons' || !option.icon
        return (
        <button
          key={option.value}
          ref={(element) => {
            if (element) itemRefs.current.set(option.value, element)
            else itemRefs.current.delete(option.value)
          }}
          className={`segment-controls__item ${showIcon ? 'has-icon' : ''} ${showIcon && !showLabel ? 'is-icon-only' : ''} ${value === option.value ? 'is-selected' : ''} ${canReorder(option.value) ? 'is-reorderable' : ''} ${draggedValue === option.value ? 'is-dragging' : ''}`}
          type="button"
          role="tab"
          aria-label={option.label}
          title={displayMode === 'icons' ? option.label : undefined}
          aria-selected={value === option.value}
          aria-haspopup={hasMenu ? 'menu' : undefined}
          aria-expanded={hasMenu ? menuOptionValue === option.value : undefined}
          aria-keyshortcuts={[
            canReorder(option.value) ? 'Alt+ArrowLeft Alt+ArrowRight' : '',
            hasMenu ? 'Shift+F10' : '',
          ].filter(Boolean).join(' ') || undefined}
          draggable={canReorder(option.value)}
          onClick={() => {
            onValueChange(option.value)
            requestAnimationFrame(() => scrollOptionIntoView(option.value))
          }}
          onContextMenu={(event) => handleContextMenu(event, option)}
          onDragStart={(event) => handleDragStart(event, option.value)}
          onDragEnter={() => handleDragEnter(option.value)}
          onDragOver={(event) => { if (draggedValue) event.preventDefault() }}
          onDrop={(event) => { event.preventDefault(); finishDrag() }}
          onDragEnd={finishDrag}
          onKeyDown={(event) => handleItemKeyDown(event, option)}
        >
          {showIcon && <span className="segment-controls__icon" aria-hidden="true">{option.icon}</span>}
          {showLabel && <span className="segment-controls__label">{option.label}</span>}
          {Boolean(option.counter) && <Counter tone="accent" size="m" shape="default">{option.counter}</Counter>}
        </button>
      )})}
      {onSettingsClick && (
        <button
          className="segment-controls__settings"
          type="button"
          aria-label={settingsLabel}
          title={settingsLabel}
          onClick={(event) => {
            event.stopPropagation()
            setMenuOptionValue(null)
            onSettingsClick()
          }}
        >
          <img src="assets/figma/ic-local-settings-outline.svg" alt="" aria-hidden="true" />
        </button>
      )}
      <span className="visually-hidden" aria-live="polite">{announcement}</span>
      {menuOpen && menuOption && activeMenuItems?.length && createPortal(
        <div ref={menuRef} className="segment-controls__menu" style={menuPosition}>
          <Menu
            ariaLabel={`Действия с папкой «${menuOption.label}»`}
            autoFocus
            items={[...activeMenuItems]}
            onClose={() => {
              setMenuOptionValue(null)
              itemRefs.current.get(menuOption.value)?.focus()
            }}
            onSelect={(item) => {
              onMenuSelect?.(item, menuOption)
              setMenuOptionValue(null)
            }}
          />
        </div>,
        document.body,
      )}
    </div>
  )
}

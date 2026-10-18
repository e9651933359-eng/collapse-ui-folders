import { useEffect, useLayoutEffect, useMemo, useRef, useState, type DragEvent, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Pin, PinOff } from 'lucide-react'
import type { Chat } from '../../types/chat'
import { Menu, type OptionMenuItem } from '../../components/option-menu/Menu'
import { Avatar } from '../../components/ui/Avatar'
import { Counter } from '../../components/ui/Counter'
import { IconButton } from '../../components/ui/IconButton'
import { FederationIcon } from '../../components/ui/FederationIcon'

export type ChatFolderOption = {
  chatIds: string[]
  id: string
  label: string
}

const EMPTY_FOLDERS: readonly ChatFolderOption[] = []

type ChatListItemProps = {
  chat: Chat
  indicator?: ReactNode
  federation?: boolean
  folders?: readonly ChatFolderOption[]
  dragging?: boolean
  reorderable?: boolean
  selected?: boolean
  onCreateFolder?: (chatId: string) => void
  onMarkRead?: (chatId: string) => void
  onSelect: (chatId: string) => void
  onToggleFolder?: (chatId: string, folderId: string) => void
  onToggleNotifications?: (chatId: string) => void
  onTogglePin?: (chatId: string) => void
  onDragEnd?: () => void
  onDragEnter?: (chatId: string) => void
  onDragStart?: (event: DragEvent<HTMLDivElement>, chatId: string) => void
  onDrop?: () => void
  onReorderKeyDown?: (event: KeyboardEvent<HTMLButtonElement>, chatId: string) => void
}

type MenuPosition = { left: number; top?: number; bottom?: number }

const menuIcon = (src: string) => <img className="chat-action-icon" src={src} alt="" aria-hidden="true" />

export function ChatListItem({
  chat,
  indicator,
  federation = chat.federation ?? false,
  folders = EMPTY_FOLDERS,
  dragging = false,
  reorderable = false,
  selected = false,
  onCreateFolder,
  onMarkRead,
  onSelect,
  onToggleFolder,
  onToggleNotifications,
  onTogglePin,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onDrop,
  onReorderKeyDown,
}: ChatListItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pointerToggledRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({ left: 0, top: 0 })

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu()
      return
    }
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) setMenuPosition({ left: Math.max(0, rect.right - 298), top: rect.bottom })
    setMenuOpen(true)
  }

  useLayoutEffect(() => {
    if (!menuOpen || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const menuRect = menuRef.current?.getBoundingClientRect()
    const menuWidth = menuRect?.width ?? 0
    const menuHeight = menuRect?.height ?? 0
    const opensUp = rect.bottom + menuHeight > window.innerHeight && rect.top >= menuHeight
    const left = rect.left + menuWidth > window.innerWidth ? Math.max(0, rect.right - menuWidth) : rect.left
    setMenuPosition(opensUp
      ? { left, bottom: window.innerHeight - rect.top }
      : { left, top: rect.bottom })
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      if (!itemRef.current?.contains(target) && !menuRef.current?.contains(target)) closeMenu()
    }
    const closeOnViewportChange = () => closeMenu()
    document.addEventListener('pointerdown', closeOnOutsideClick)
    window.addEventListener('resize', closeOnViewportChange)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      window.removeEventListener('resize', closeOnViewportChange)
    }
  }, [menuOpen])

  const folderItems = useMemo<OptionMenuItem[]>(() => {
    const items: OptionMenuItem[] = folders.map((folder, index) => ({
      id: `folder:${folder.id}`,
      kind: 'checkbox' as const,
      label: folder.label,
      selected: folder.chatIds.includes(chat.id),
      divider: index === folders.length - 1 && folders.length < 10,
    }))
    if (folders.length < 10) items.push({
      id: 'folder:create',
      kind: 'direct',
      label: 'Создать папку',
      leading: menuIcon('assets/figma/ic-plus-outline.svg'),
      selected: false,
      divider: false,
    })
    return items
  }, [chat.id, folders])

  const menuItems = useMemo<OptionMenuItem[]>(() => [
    {
      id: 'toggle-pin',
      label: chat.pinned ? 'Открепить' : 'Закрепить',
      leading: chat.pinned ? <PinOff aria-hidden="true" /> : <Pin aria-hidden="true" />,
    },
    ...(chat.unread ? [{
      id: 'mark-read',
      label: 'Пометить как прочитанное',
      leading: menuIcon('assets/figma/ic-markunread-outline.svg'),
    }] : []),
    {
      id: 'toggle-notifications',
      label: chat.muted ? 'Включить уведомления' : 'Выключить уведомления',
      leading: menuIcon(chat.muted ? 'assets/figma/ic-bell-outline.svg' : 'assets/figma/ic-bell-off-outline.svg'),
    },
    {
      id: 'folders',
      label: 'Добавить в папку',
      leading: menuIcon('assets/figma/ic-folder-add-outline.svg'),
      submenu: folderItems,
    },
  ], [chat.muted, chat.pinned, chat.unread, folderItems])

  const handleMenuSelect = (item: OptionMenuItem) => {
    if (item.id === 'toggle-pin') onTogglePin?.(chat.id)
    if (item.id === 'mark-read') onMarkRead?.(chat.id)
    if (item.id === 'toggle-notifications') onToggleNotifications?.(chat.id)
    if (item.id === 'folder:create') onCreateFolder?.(chat.id)
    if (item.id.startsWith('folder:') && item.id !== 'folder:create') onToggleFolder?.(chat.id, item.id.slice('folder:'.length))
    closeMenu()
  }

  return (
    <div
      ref={itemRef}
      className={`chat-row ${selected ? 'is-active' : ''} ${menuOpen ? 'has-open-menu' : ''} ${reorderable ? 'is-reorderable' : ''} ${dragging ? 'is-dragging' : ''}`}
      draggable={reorderable}
      role="listitem"
      onDragStart={(event) => onDragStart?.(event, chat.id)}
      onDragEnter={() => onDragEnter?.(chat.id)}
      onDragOver={(event) => { if (reorderable) event.preventDefault() }}
      onDrop={(event) => { event.preventDefault(); onDrop?.() }}
      onDragEnd={onDragEnd}
    >
      <button
        className="chat-row__select"
        type="button"
        aria-current={selected ? 'true' : undefined}
        aria-keyshortcuts={reorderable ? 'Alt+ArrowUp Alt+ArrowDown' : undefined}
        onClick={() => onSelect(chat.id)}
        onKeyDown={(event) => onReorderKeyDown?.(event, chat.id)}
      >
        <Avatar
          label={chat.title}
          image={chat.avatarImage}
          tone={chat.avatarTone}
          emoji={chat.avatar}
          filled={chat.avatarFilled ?? true}
          shape={chat.kind === 'channel' ? 'squircle' : 'round'}
        />
        <span className="chat-row__body">
          <span className="chat-row__heading">
            {(indicator || federation) && <span className="chat-row__indicator">{indicator ?? <FederationIcon size="s" aria-label="Федеративный чат" />}</span>}
            <span className="chat-row__title">{chat.title}</span>
          </span>
        </span>
        <span className="chat-row__trailing">
          {!!chat.unread
            ? <Counter className="chat-row__counter" tone={chat.muted ? 'default' : 'accent'} size="m" shape="default">{chat.unread}</Counter>
            : chat.pinned && <Pin className="chat-row__pin" aria-label="Закреплено" />}
        </span>
      </button>
      <IconButton
        ref={triggerRef}
        className="chat-row__menu-trigger"
        size="s"
        label={`Действия: ${chat.title}`}
        icon={<img src="assets/figma/ic-more-horizontal-outline.svg" alt="" aria-hidden="true" />}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onPointerDown={(event) => {
          event.preventDefault()
          event.stopPropagation()
          pointerToggledRef.current = true
          toggleMenu()
        }}
        onClick={(event) => {
          event.stopPropagation()
          if (pointerToggledRef.current) pointerToggledRef.current = false
          else toggleMenu()
        }}
      />
      {menuOpen && createPortal(
        <div ref={menuRef} className="chat-row__menu" style={menuPosition}>
          <Menu
            ariaLabel={`Действия с чатом «${chat.title}»`}
            autoFocus
            items={menuItems}
            onClose={() => closeMenu(true)}
            onSelect={handleMenuSelect}
          />
        </div>,
        document.body,
      )}
    </div>
  )
}

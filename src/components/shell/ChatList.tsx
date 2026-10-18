import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState, type DragEvent, type KeyboardEvent, type ReactNode } from 'react'
import type { OptionMenuItem } from '../option-menu/Menu'
import type { Chat } from '../../types/chat'
import { ChatListItem, type ChatFolderOption } from '../../features/chat/ChatListItem'
import { IconButton } from '../ui/IconButton'
import { SegmentControls } from '../ui/SegmentControls'
import type { SegmentDisplayMode, SegmentOption } from '../ui/SegmentControls'
import { TextButton } from '../ui/TextButton'

type ChatListProps = {
  chats: Chat[]
  title?: string
  selectedId?: string
  query: string
  segment: string
  segments?: readonly SegmentOption[]
  segmentDisplayMode?: SegmentDisplayMode
  folders?: readonly ChatFolderOption[]
  onQueryChange: (value: string) => void
  onSegmentChange: (value: string) => void
  onSegmentOrderChange?: (values: string[]) => void
  onCreateFolder?: (chatId?: string) => void
  onCreateChat?: () => void
  onDeleteFolder?: (folderId: string) => void
  onEditFolder?: (folderId: string) => void
  onHideSegment?: (segmentId: string) => void
  onMarkRead?: (chatId: string) => void
  onMarkSegmentRead?: (segmentId: string) => void
  onOpenFolderSettings: () => void
  onPinnedOrderChange?: (chatIds: string[]) => void
  onSelect: (id: string) => void
  onToggleFolder?: (chatId: string, folderId: string) => void
  onToggleNotifications?: (chatId: string) => void
  onTogglePin?: (chatId: string) => void
  renderItemIndicator?: (chat: Chat) => ReactNode
}

const chatSegments = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' },
] as const

const emptyFolders: readonly ChatFolderOption[] = []

function moveChat(values: string[], movedValue: string, targetValue: string) {
  const from = values.indexOf(movedValue)
  const to = values.indexOf(targetValue)
  if (from < 0 || to < 0 || from === to) return values

  const next = [...values]
  next.splice(from, 1)
  next.splice(to, 0, movedValue)
  return next
}

export function ChatList({
  chats,
  title = 'Чаты',
  selectedId,
  query,
  segment,
  segments = chatSegments,
  segmentDisplayMode = 'names',
  folders = emptyFolders,
  onCreateFolder,
  onCreateChat,
  onDeleteFolder,
  onEditFolder,
  onHideSegment,
  onMarkRead,
  onMarkSegmentRead,
  onQueryChange,
  onPinnedOrderChange,
  onSegmentChange,
  onSegmentOrderChange,
  onOpenFolderSettings,
  onSelect,
  onToggleFolder,
  onToggleNotifications,
  onTogglePin,
  renderItemIndicator,
}: ChatListProps) {
  const [dragOrder, setDragOrder] = useState<string[] | null>(null)
  const [draggedChatId, setDraggedChatId] = useState<string | null>(null)
  const [reorderAnnouncement, setReorderAnnouncement] = useState('')
  const isCustomFolder = folders.some((folder) => folder.id === segment)
  const pinnedChatIds = useMemo(() => chats.filter((chat) => chat.pinned).map((chat) => chat.id), [chats])
  const orderedChats = useMemo(() => {
    const chatMap = new Map(chats.map((chat) => [chat.id, chat]))
    const pinnedIds = dragOrder ?? pinnedChatIds
    return [...pinnedIds, ...chats.filter((chat) => !chat.pinned).map((chat) => chat.id)]
      .flatMap((chatId) => chatMap.get(chatId) ?? [])
  }, [chats, dragOrder, pinnedChatIds])
  const canReorderPinned = Boolean(onPinnedOrderChange && pinnedChatIds.length > 1)
  const menuIcon = (src: string) => <img className="chat-action-icon" src={src} alt="" aria-hidden="true" />
  const folderMenuItems = (option: SegmentOption): OptionMenuItem[] => option.value === 'all'
    ? [{ id: 'manage', label: 'Управлять папками', leading: menuIcon('assets/figma/ic-setting-outline.svg') }]
    : option.kind === 'custom'
      ? [
        { id: 'edit', label: 'Редактировать папку', leading: <Pencil aria-hidden="true" /> },
        ...(option.counter ? [{ id: 'mark-read', label: 'Пометить как прочитанное', leading: menuIcon('assets/figma/ic-markunread-outline.svg') }] : []),
        { id: 'delete', label: 'Удалить папку', leading: <Trash2 aria-hidden="true" />, error: true },
      ]
      : [
        { id: 'hide', label: 'Скрыть папку', leading: menuIcon('assets/figma/ic-eye-off-outline.svg') },
        ...(option.counter ? [{ id: 'mark-read', label: 'Пометить как прочитанное', leading: menuIcon('assets/figma/ic-markunread-outline.svg') }] : []),
      ]

  const handleFolderMenuSelect = (item: OptionMenuItem, option: SegmentOption) => {
    if (item.id === 'manage') onOpenFolderSettings()
    if (item.id === 'hide') onHideSegment?.(option.value)
    if (item.id === 'mark-read') onMarkSegmentRead?.(option.value)
    if (item.id === 'edit') onEditFolder?.(option.value)
    if (item.id === 'delete') onDeleteFolder?.(option.value)
  }

  const finishPinnedDrag = () => {
    if (dragOrder) onPinnedOrderChange?.(dragOrder)
    setDragOrder(null)
    setDraggedChatId(null)
  }

  const startPinnedDrag = (event: DragEvent<HTMLDivElement>, chatId: string) => {
    if (!canReorderPinned || !pinnedChatIds.includes(chatId)) {
      event.preventDefault()
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', chatId)
    setDragOrder(pinnedChatIds)
    setDraggedChatId(chatId)
  }

  const enterPinnedChat = (chatId: string) => {
    if (!draggedChatId || !pinnedChatIds.includes(chatId)) return
    setDragOrder((current) => current ? moveChat(current, draggedChatId, chatId) : current)
  }

  const reorderPinnedWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, chatId: string) => {
    if (!canReorderPinned || !event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return
    event.preventDefault()
    const currentIndex = pinnedChatIds.indexOf(chatId)
    const targetIndex = currentIndex + (event.key === 'ArrowUp' ? -1 : 1)
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= pinnedChatIds.length) return
    const next = moveChat(pinnedChatIds, chatId, pinnedChatIds[targetIndex])
    onPinnedOrderChange?.(next)
    setReorderAnnouncement(`${chats.find((chat) => chat.id === chatId)?.title}: новая позиция ${next.indexOf(chatId) + 1}`)
  }

  return (
    <aside className="chat-list-panel">
      <header className="chat-list-panel__header">
        <h1>{title}</h1>
        <IconButton size="s" variant="floating" label="Создать чат" icon={<Plus />} onClick={onCreateChat} />
      </header>
      <label className="search-field">
        <Search aria-hidden="true" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Поиск" aria-label="Поиск по чатам" />
      </label>
      <SegmentControls
        tabs="dynamic"
        options={segments}
        value={segment}
        onValueChange={onSegmentChange}
        fixedOptionValue="all"
        getMenuItems={folderMenuItems}
        onMenuSelect={handleFolderMenuSelect}
        onOrderChange={onSegmentOrderChange}
        onSettingsClick={onOpenFolderSettings}
        settingsLabel="Управлять папками"
        displayMode={segmentDisplayMode}
      />
      <div className="chat-list" role="list" aria-label="Список чатов">
        {orderedChats.length ? orderedChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            federation={chat.federation}
            indicator={renderItemIndicator?.(chat)}
            folders={folders}
            dragging={draggedChatId === chat.id}
            reorderable={canReorderPinned && Boolean(chat.pinned)}
            selected={selectedId === chat.id}
            onCreateFolder={onCreateFolder}
            onMarkRead={onMarkRead}
            onSelect={onSelect}
            onToggleFolder={onToggleFolder}
            onToggleNotifications={onToggleNotifications}
            onTogglePin={onTogglePin}
            onDragStart={startPinnedDrag}
            onDragEnter={enterPinnedChat}
            onDragEnd={finishPinnedDrag}
            onDrop={finishPinnedDrag}
            onReorderKeyDown={reorderPinnedWithKeyboard}
          />
        )) : isCustomFolder && !query.trim() ? (
          <div className="chat-list__empty chat-list__empty--folder">
            <p>Выберите чаты и каналы,<br />чтобы они появились в этой папке</p>
            <TextButton tone="base" onClick={() => onEditFolder?.(segment)}>Выбрать чаты и каналы</TextButton>
          </div>
        ) : <div className="chat-list__empty">Ничего не найдено</div>}
        <span className="visually-hidden" aria-live="polite">{reorderAnnouncement}</span>
      </div>
    </aside>
  )
}

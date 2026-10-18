import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Chat } from '../../types/chat'
import { federationChats } from '../../features/federation/mockData'
import { togglePinnedChat } from '../../features/chat/order'
import { countActiveUnreadChats } from '../../features/chat/unread'
import { ChatList } from './ChatList'

const chats: Chat[] = [
  { id: 'direct', title: 'Альбина Бахматулина', subtitle: 'Личный чат', avatar: 'АБ', avatarTone: '#e8ddff', kind: 'direct', messages: [] },
  { id: 'pinned', title: 'Запуск общего продукта', subtitle: '8 участников', avatar: 'ЗП', avatarTone: '#f1d8ff', kind: 'group', pinned: true, unread: 4, messages: [] },
  { id: 'pinned-design', title: 'Дизайн платформы', subtitle: '6 участников', avatar: 'ДП', avatarTone: '#dff4ff', kind: 'group', pinned: true, messages: [] },
  { id: 'delivery', title: 'Интеграция доставки', subtitle: '12 участников', avatar: 'ИД', avatarTone: '#dce8ff', kind: 'group', unread: 2, messages: [] },
]

function PinnedFirstStory() {
  const [items, setItems] = useState(chats)
  const [selectedId, setSelectedId] = useState('direct')
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('all')

  const selectChat = (chatId: string) => {
    setSelectedId(chatId)
    setItems((current) => current.map((chat) => chat.id === chatId && chat.unread ? { ...chat, unread: 0 } : chat))
  }

  const reorderPinnedChats = (orderedChatIds: string[]) => {
    setItems((current) => {
      const reorderedIds = new Set(orderedChatIds)
      const chatMap = new Map(current.map((item) => [item.id, item]))
      const reorderedChats = orderedChatIds.flatMap((chatId) => chatMap.get(chatId) ?? [])
      let reorderedIndex = 0
      return current.map((item) => reorderedIds.has(item.id) ? reorderedChats[reorderedIndex++] : item)
    })
  }

  return (
    <div style={{ width: 408, height: 480 }}>
      <ChatList
        chats={items}
        selectedId={selectedId}
        query={query}
        segment={segment}
        onQueryChange={setQuery}
        onSegmentChange={setSegment}
        onOpenFolderSettings={() => undefined}
        onPinnedOrderChange={reorderPinnedChats}
        onSelect={selectChat}
        onTogglePin={(chatId) => setItems((current) => togglePinnedChat(current, chatId))}
      />
    </div>
  )
}

function LongMixedListStory() {
  const [items, setItems] = useState(federationChats)
  const [selectedId, setSelectedId] = useState(federationChats[0].id)
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('all')
  const filtered = items.filter((chat) => {
    const matchesQuery = chat.title.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru'))
    const matchesSegment = segment === 'all'
      || (segment === 'new' && Boolean(chat.unread))
      || (segment === 'chats' && chat.kind !== 'channel')
      || (segment === 'channels' && chat.kind === 'channel')
    return matchesQuery && matchesSegment
  })
  const unreadCount = (kind?: 'chat' | 'channel') => countActiveUnreadChats(items, (chat) => !kind || (kind === 'channel' ? chat.kind === 'channel' : chat.kind !== 'channel'))

  return (
    <div style={{ width: 408, height: 720 }}>
      <ChatList
        chats={filtered}
        selectedId={selectedId}
        query={query}
        segment={segment}
        segments={[
          { value: 'all', label: 'Все', kind: 'fixed' },
          { value: 'new', label: 'Новые', counter: unreadCount(), kind: 'system' },
          { value: 'chats', label: 'Чаты', counter: unreadCount('chat'), kind: 'system' },
          { value: 'channels', label: 'Каналы', counter: unreadCount('channel'), kind: 'system' },
        ]}
        onQueryChange={setQuery}
        onSegmentChange={setSegment}
        onOpenFolderSettings={() => undefined}
        onSelect={(chatId) => {
          setSelectedId(chatId)
          setItems((current) => current.map((chat) => chat.id === chatId ? { ...chat, unread: 0 } : chat))
        }}
      />
    </div>
  )
}

const folderCounterChats: Chat[] = [
  { id: 'active-unread', title: 'Активный непрочитанный', subtitle: 'Новое сообщение', avatar: 'АН', avatarTone: '#e8ddff', kind: 'group', unread: 12, messages: [] },
  { id: 'muted-unread', title: 'Muted непрочитанный', subtitle: 'Уведомления выключены', avatar: 'МН', avatarTone: '#dce8ff', kind: 'group', unread: 27, muted: true, messages: [] },
  { id: 'read', title: 'Прочитанный', subtitle: 'Нет новых сообщений', avatar: 'П', avatarTone: '#d8f1e2', kind: 'group', messages: [] },
]

function FolderCounterRulesStory() {
  const folderChatIds = folderCounterChats.map((chat) => chat.id)
  const counter = countActiveUnreadChats(folderCounterChats, (chat) => folderChatIds.includes(chat.id))

  return (
    <div style={{ width: 408, height: 360 }}>
      <ChatList
        chats={folderCounterChats}
        selectedId="read"
        query=""
        segment="folder-demo"
        segments={[
          { value: 'all', label: 'Все', kind: 'fixed' },
          { value: 'folder-demo', label: 'Папка', counter, kind: 'custom' },
        ]}
        folders={[{ id: 'folder-demo', label: 'Папка', chatIds: folderChatIds }]}
        onQueryChange={() => undefined}
        onSegmentChange={() => undefined}
        onOpenFolderSettings={() => undefined}
        onSelect={() => undefined}
      />
    </div>
  )
}

function NewFolderKeepsSelectedStory() {
  const [items, setItems] = useState<Chat[]>([
    { id: 'new-chat', title: 'Новый чат', subtitle: 'Непрочитанное сообщение', avatar: 'НЧ', avatarTone: '#e8ddff', kind: 'group', unread: 2, messages: [] },
    { id: 'another-new-chat', title: 'Ещё один новый чат', subtitle: 'Непрочитанное сообщение', avatar: 'ЕН', avatarTone: '#dce8ff', kind: 'group', unread: 1, messages: [] },
    { id: 'read-chat', title: 'Прочитанный чат', subtitle: 'Нет новых сообщений', avatar: 'ПЧ', avatarTone: '#d8f1e2', kind: 'group', messages: [] },
  ])
  const [selectedId, setSelectedId] = useState('read-chat')
  const [segment, setSegment] = useState('new')
  const [retainedId, setRetainedId] = useState<string | null>(null)
  const filtered = items.filter((chat) => segment === 'all' || (segment === 'new' && (Boolean(chat.unread) || chat.id === retainedId)))
  const unreadCount = countActiveUnreadChats(items, () => true)

  const selectChat = (chatId: string) => {
    const chat = items.find((item) => item.id === chatId)
    if (segment === 'new') setRetainedId((current) => Boolean(chat?.unread) || current === chatId ? chatId : null)
    setSelectedId(chatId)
    setItems((current) => current.map((chat) => chat.id === chatId ? { ...chat, unread: 0 } : chat))
  }

  const selectSegment = (nextSegment: string) => {
    if (nextSegment !== 'new') setRetainedId(null)
    setSegment(nextSegment)
  }

  return (
    <div style={{ width: 408, height: 420 }}>
      <ChatList
        chats={filtered}
        selectedId={selectedId}
        query=""
        segment={segment}
        segments={[
          { value: 'all', label: 'Все', kind: 'fixed' },
          { value: 'new', label: 'Новые', counter: unreadCount, kind: 'system' },
        ]}
        onQueryChange={() => undefined}
        onSegmentChange={selectSegment}
        onOpenFolderSettings={() => undefined}
        onSelect={selectChat}
      />
    </div>
  )
}

const meta = {
  title: 'Shell/ChatList',
  component: ChatList,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ChatList>

export default meta
type Story = StoryObj<typeof meta>

export const PinnedFirst: Story = {
  args: {
    chats,
    selectedId: 'direct',
    query: '',
    segment: 'all',
    onQueryChange: () => undefined,
    onSegmentChange: () => undefined,
    onOpenFolderSettings: () => undefined,
    onSelect: () => undefined,
  },
  parameters: { docs: { description: { story: 'Новый закреплённый чат становится первым в списке. Закреплённые чаты можно менять местами перетаскиванием или сочетанием Alt + ↑/↓. Выбор чата сразу снимает его счётчик непрочитанных.' } } },
  render: () => <PinnedFirstStory />,
}

export const LongMixedList: Story = {
  args: {
    chats: federationChats,
    selectedId: federationChats[0].id,
    query: '',
    segment: 'all',
    onQueryChange: () => undefined,
    onSegmentChange: () => undefined,
    onOpenFolderSettings: () => undefined,
    onSelect: () => undefined,
  },
  parameters: { docs: { description: { story: 'Длинный демо-список с личными и групповыми чатами, пятью дополнительными каналами и смешанными федеративными состояниями.' } } },
  render: () => <LongMixedListStory />,
}

export const FolderCounterRules: Story = {
  args: {
    chats: folderCounterChats,
    selectedId: 'read',
    query: '',
    segment: 'folder-demo',
    onQueryChange: () => undefined,
    onSegmentChange: () => undefined,
    onOpenFolderSettings: () => undefined,
    onSelect: () => undefined,
  },
  parameters: { docs: { description: { story: 'Счётчик папки равен числу непрочитанных активных чатов. Muted-чат сохраняет серый собственный счётчик, но не увеличивает счётчик папки.' } } },
  render: () => <FolderCounterRulesStory />,
}

export const NewFolderKeepsSelected: Story = {
  args: {
    chats: folderCounterChats,
    selectedId: 'read',
    query: '',
    segment: 'new',
    onQueryChange: () => undefined,
    onSegmentChange: () => undefined,
    onOpenFolderSettings: () => undefined,
    onSelect: () => undefined,
  },
  parameters: { docs: { description: { story: 'После открытия чат в «Новых» сразу становится прочитанным, но остаётся выбранным в папке. Он исчезает после перехода на другой чат или сегмент.' } } },
  render: () => <NewFolderKeepsSelectedStory />,
}

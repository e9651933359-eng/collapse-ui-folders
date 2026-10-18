import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Chat } from '../../types/chat'
import { ChatListItem, type ChatFolderOption } from './ChatListItem'

const chat: Chat = {
  id: 'updates',
  title: 'Обновления продукта',
  subtitle: 'Сегодня, 09:40',
  avatar: '👀',
  avatarTone: '#53c985',
  kind: 'channel',
  unread: 33,
  messages: [],
}

function InteractiveItem() {
  const [item, setItem] = useState(chat)
  const [folders, setFolders] = useState<ChatFolderOption[]>([
    { id: 'folder-1', label: 'Папка 1', chatIds: ['updates'] },
    { id: 'folder-2', label: 'Папка 2', chatIds: [] },
    { id: 'folder-3', label: 'Папка 3', chatIds: [] },
  ])

  return (
    <div className="chat-list-item-story">
      <ChatListItem
        chat={item}
        folders={folders}
        selected
        onSelect={() => undefined}
        onMarkRead={() => setItem((current) => ({ ...current, unread: 0 }))}
        onToggleNotifications={() => setItem((current) => ({ ...current, muted: !current.muted }))}
        onTogglePin={() => setItem((current) => ({ ...current, pinned: !current.pinned }))}
        onToggleFolder={(chatId, folderId) => setFolders((current) => current.map((folder) => folder.id === folderId
          ? { ...folder, chatIds: folder.chatIds.includes(chatId) ? folder.chatIds.filter((id) => id !== chatId) : [...folder.chatIds, chatId] }
          : folder))}
      />
    </div>
  )
}

const meta = {
  title: 'Chat/ChatListItem',
  component: ChatListItem,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ChatListItem>

export default meta
type Story = StoryObj<typeof meta>

export const HoverAndContextMenu: Story = {
  args: { chat, onSelect: () => undefined },
  parameters: { docs: { description: { story: 'Три точки показываются на hover и при клавиатурном focus-visible. После мышиного выбора и ухода курсора строка возвращается к обычному trailing-состоянию.' } } },
  render: () => <InteractiveItem />,
}

export const Federation: Story = {
  args: { chat: { ...chat, federation: true, title: 'Альбина Бахматулина', avatar: 'АБ', avatarTone: '#e8ddff', avatarFilled: false, kind: 'direct' }, federation: true, onSelect: () => undefined },
  render: (args) => <div className="chat-list-item-story"><ChatListItem {...args} /></div>,
}

export const GroupMonogram: Story = {
  args: { chat: { ...chat, title: 'АБ команда', avatar: 'АБ', avatarTone: '#e8ddff', avatarFilled: false, kind: 'group' }, onSelect: () => undefined },
  render: (args) => <div className="chat-list-item-story"><ChatListItem {...args} /></div>,
}

export const PinnedUnread: Story = {
  args: { chat: { ...chat, pinned: true, unread: 3 }, onSelect: () => undefined },
  parameters: { docs: { description: { story: 'Непрочитанный каунтер заменяет пин в trailing-слоте.' } } },
  render: (args) => <div className="chat-list-item-story"><ChatListItem {...args} /></div>,
}

export const PinnedRead: Story = {
  args: { chat: { ...chat, pinned: true, unread: 0 }, onSelect: () => undefined },
  parameters: { docs: { description: { story: 'После прочтения каунтер исчезает, и в trailing-слоте показывается пин.' } } },
  render: (args) => <div className="chat-list-item-story"><ChatListItem {...args} /></div>,
}

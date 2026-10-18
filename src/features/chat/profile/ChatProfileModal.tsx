import { Bell, ChevronRight, Users } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Avatar, ListItem, ModalPage, Switch, Tabs } from '../../../components/ui'
import type { Chat } from '../../../types/chat'
import './profile.css'

type ChatProfileModalProps = {
  chat?: Chat
  memberCount: number
  onClose: () => void
  onOpenMembers: () => void
  onToggleNotifications?: (chatId: string) => void
  open: boolean
  /** Необязательный признак под названием (например, «Есть участники из другой организации»). */
  tag?: ReactNode
}

const tabs = [
  { value: 'media', label: 'Медиа' },
  { value: 'files', label: 'Файлы' },
  { value: 'links', label: 'Ссылки' },
] as const

/** Профиль группового чата или канала (Figma 6932:42733): общий для /chats и /federation. */
export function ChatProfileModal({ chat, memberCount, onClose, onOpenMembers, onToggleNotifications, open, tag }: ChatProfileModalProps) {
  const [tab, setTab] = useState<string>('media')
  if (!chat) return null
  const channel = chat.kind === 'channel'
  const media = chat.messages.flatMap((message) => message.images ?? [])
  const files = chat.messages.flatMap((message) => message.attachments ?? [])
  const links = chat.messages.flatMap((message) => message.linkPreview ? [message.linkPreview] : [])
  const empty = <p className="chat-profile__empty">Пока ничего нет</p>
  return (
    <ModalPage open={open} title={channel ? 'Профиль канала' : 'Профиль чата'} onClose={onClose} className="chat-profile">
      <div className="chat-profile__content">
        <div className="chat-profile__identity">
          <Avatar label={chat.title} image={chat.avatarImage} emoji={chat.avatar} tone={chat.avatarTone} size={124} shape={channel ? 'squircle' : 'round'} filled={chat.avatarFilled ?? true} />
          <div className="chat-profile__info">
            <div className="chat-profile__name"><h3>{chat.title}</h3><span>{chat.subtitle}</span></div>
            {tag}
          </div>
        </div>
        <div className="chat-profile__group">
          <ListItem interactive={false} divider={false} leadingElement={<Bell aria-hidden="true" />} label="Получать уведомления" trailingElement={<Switch selected={!chat.muted} label="Получать уведомления" onChange={() => onToggleNotifications?.(chat.id)} />} />
        </div>
        <div className="chat-profile__group">
          <ListItem divider={false} leadingElement={<Users aria-hidden="true" />} label="Участники" trailingElement={<span className="chat-profile__count">{memberCount}<ChevronRight aria-hidden="true" /></span>} onClick={onOpenMembers} />
        </div>
        <div className="chat-profile__tabs">
          <Tabs type="line" options={tabs} value={tab} onValueChange={setTab} ariaLabel="Материалы чата" />
          {tab === 'media' && (media.length ? <div className="chat-profile__media">{media.map((image) => <img key={image.src} src={image.src} alt={image.alt} />)}</div> : empty)}
          {tab === 'files' && (files.length ? <div className="chat-profile__list">{files.map((file) => <ListItem key={file.id} interactive={false} divider={false} label={file.name} />)}</div> : empty)}
          {tab === 'links' && (links.length ? <div className="chat-profile__list">{links.map((link) => <ListItem key={link.id} interactive={false} divider={false} label={link.title} supporting={link.url} />)}</div> : empty)}
        </div>
      </div>
    </ModalPage>
  )
}

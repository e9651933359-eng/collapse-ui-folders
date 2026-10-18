import type { DiskRef, LinkPreview } from './disk'

export type MessageReaction = {
  emoji: string
  count: number
  reacted?: boolean
}

export type Message = {
  id: string
  author: 'me' | 'other'
  text: string
  time: string
  sender?: string
  avatar?: string
  avatarTone?: string
  avatarFilled?: boolean
  avatarImage?: string
  federation?: boolean
  reply?: { sender: string; text: string }
  pinned?: boolean
  reactions?: MessageReaction[]
  attachments?: Array<{
    id: string
    name: string
    size: number
    type: string
    disk?: DiskRef
  }>
  linkPreview?: LinkPreview
  images?: Array<{
    src: string
    alt: string
  }>
}

export type Chat = {
  id: string
  title: string
  subtitle: string
  avatar: string
  avatarImage?: string
  avatarTone: string
  avatarFilled?: boolean
  kind?: 'direct' | 'group' | 'channel'
  unread?: number
  pinned?: boolean
  muted?: boolean
  federation?: boolean
  messages: Message[]
}

/** Участник чата для профиля и списка участников. Данные контактов необязательны. */
export type ChatMember = {
  id: string
  name: string
  initials: string
  tone: string
  image?: string
  email?: string
  phone?: string
  role?: string
  organization?: string
  /** Сотрудник другой организации (Федерация): показывает признак в списке и профиле. */
  external?: boolean
  /** Подпись роли в чате; участник с ней попадает в раздел «Администраторы». */
  adminRole?: string
}

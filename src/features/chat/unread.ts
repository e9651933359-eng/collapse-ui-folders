import type { Chat } from '../../types/chat'

export function hasActiveUnread(chat: Pick<Chat, 'muted' | 'unread'>) {
  return Boolean(chat.unread) && !chat.muted
}

export function countActiveUnreadChats(chats: readonly Chat[], matchesFolder: (chat: Chat) => boolean = () => true) {
  return chats.filter((chat) => hasActiveUnread(chat) && matchesFolder(chat)).length
}

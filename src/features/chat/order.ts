import type { Chat } from '../../types/chat'

export function togglePinnedChat(chats: readonly Chat[], chatId: string) {
  const chatIndex = chats.findIndex((chat) => chat.id === chatId)
  if (chatIndex < 0) return [...chats]

  const chat = chats[chatIndex]
  if (chat.pinned) return chats.map((item) => item.id === chatId ? { ...item, pinned: false } : item)

  return [
    { ...chat, pinned: true },
    ...chats.slice(0, chatIndex),
    ...chats.slice(chatIndex + 1),
  ]
}

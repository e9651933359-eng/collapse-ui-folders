/** Product-approved folder emoji set shared by folders and federation. */
export const folderEmoji = {
  all: '🗂️',
  new: '🔔',
  chats: '💬',
  channels: '📢',
  custom: '📂',
} as const

export const folderEmojiCategory = {
  id: 'folders',
  label: 'Папки',
  icon: folderEmoji.custom,
  emojis: Object.values(folderEmoji),
}

export function getCustomFolderEmoji(emoji?: string) {
  return emoji?.trim() || folderEmoji.custom
}

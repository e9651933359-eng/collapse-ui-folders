import assert from 'node:assert/strict'
import test from 'node:test'
import { folderEmoji, folderEmojiCategory, getCustomFolderEmoji } from '../src/components/ui/folderEmoji.ts'

test('folder presets match the approved set and picker category', () => {
  assert.deepEqual(folderEmoji, { all: '🗂️', new: '🔔', chats: '💬', channels: '📢', custom: '📂' })
  assert.deepEqual(folderEmojiCategory.emojis, Object.values(folderEmoji))
})

test('missing and blank custom emoji use the same fallback', () => {
  for (const value of [undefined, '', '  ']) assert.equal(getCustomFolderEmoji(value), '📂')
})

test('a selected custom emoji is preserved', () => {
  for (const value of ['💚', '🔥', '👩‍💻']) assert.equal(getCustomFolderEmoji(value), value)
})

import { useState } from 'react'
import type { ReactNode } from 'react'
import { CheckCheck, MoreHorizontal, MessageCircle, Pin, SmilePlus } from 'lucide-react'
import type { Message, MessageReaction } from '../../types/chat'
import { Avatar } from '../../components/ui/Avatar'
import { IconButton } from '../../components/ui/IconButton'
import { ListItemFile } from '../../components/ui/ListItemFile'
import { FederationLabel } from '../../components/ui/FederationLabel'
import { DiskAttachmentRow, LinkPreviewCard } from '../disk/DiskMessageItems'

export type MessageBubbleProps = {
  message: Message
  onReply?: (message: Message) => void
  onMore?: (message: Message) => void
  onReactionChange?: (reactions: MessageReaction[]) => void
  /** Удаление файла или предпросмотра ссылки из чата (меню «Удалить из чата»). */
  onRemoveItem?: (messageId: string, itemId: string) => void
  federation?: boolean
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`
  return `${(bytes / (1024 * 1024)).toLocaleString('ru', { maximumFractionDigits: 1 })} МБ`
}

type InlineMatch = {
  index: number
  length: number
  render: (key: string) => ReactNode
}

function renderInlineMarkup(value: string, keyPrefix = 'text'): ReactNode[] {
  const patterns: Array<{ expression: RegExp; render: (match: RegExpExecArray, key: string) => ReactNode }> = [
    { expression: /\*\*([^*]+)\*\*/, render: (match, key) => <strong key={key}>{renderInlineMarkup(match[1], key)}</strong> },
    { expression: /~~([^~]+)~~/, render: (match, key) => <s key={key}>{renderInlineMarkup(match[1], key)}</s> },
    { expression: /<u>([\s\S]+?)<\/u>/, render: (match, key) => <u key={key}>{renderInlineMarkup(match[1], key)}</u> },
    { expression: /_([^_]+)_/, render: (match, key) => <em key={key}>{renderInlineMarkup(match[1], key)}</em> },
    { expression: /`([^`]+)`/, render: (match, key) => <code key={key}>{match[1]}</code> },
    { expression: /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/, render: (match, key) => <a key={key} href={match[2]} target="_blank" rel="noreferrer">{match[1]}</a> },
  ]
  const matches = patterns.flatMap(({ expression, render }) => {
    const match = expression.exec(value)
    if (!match) return []
    return [{ index: match.index, length: match[0].length, render: (key: string) => render(match, key) } satisfies InlineMatch]
  })
  const first = matches.sort((a, b) => a.index - b.index)[0]
  if (!first) return [value]
  const result: ReactNode[] = []
  if (first.index > 0) result.push(value.slice(0, first.index))
  result.push(first.render(`${keyPrefix}-${first.index}`))
  result.push(...renderInlineMarkup(value.slice(first.index + first.length), `${keyPrefix}-${first.index + first.length}`))
  return result
}

function FormattedMessageText({ value }: { value: string }) {
  const parts = value.split(/```(?:\n)?([\s\S]*?)(?:\n)?```/)
  return <div className="message__text">{parts.map((part, index) => index % 2
    ? <pre key={`code-${index}`}><code>{part}</code></pre>
    : <span key={`text-${index}`}>{renderInlineMarkup(part, `part-${index}`)}</span>)}</div>
}

export function MessageBubble({ message, onReply, onMore, onReactionChange, onRemoveItem, federation = message.federation ?? false }: MessageBubbleProps) {
  const mine = message.author === 'me'
  const [reactions, setReactions] = useState(message.reactions ?? [])

  const toggleReaction = (emoji: string) => {
    setReactions((current) => {
      const existing = current.find((reaction) => reaction.emoji === emoji)
      const next = existing
        ? current.flatMap((reaction) => {
            if (reaction.emoji !== emoji) return [reaction]
            const count = reaction.count + (reaction.reacted ? -1 : 1)
            return count > 0 ? [{ ...reaction, count, reacted: !reaction.reacted }] : []
          })
        : [...current, { emoji, count: 1, reacted: true }]

      onReactionChange?.(next)
      return next
    })
  }

  return (
    <article
      className={`message ${mine ? 'message--mine' : 'message--other'}`}
      aria-label={`${mine ? 'Исходящее' : 'Входящее'} сообщение, ${message.time}`}
    >
      <div className="message__row">
        {!mine && (
          <Avatar
            label={message.sender ?? 'Участник'}
            image={message.avatarImage}
            tone={message.avatarTone}
            emoji={message.avatar}
            filled={message.avatarFilled ?? false}
          />
        )}
        <div className="message__stack">
          <div className="message__bubble">
            {!mine && message.sender && <div className="message__sender">{federation ? <FederationLabel iconPosition="start">{message.sender}</FederationLabel> : message.sender}</div>}
            {message.reply && (
              <div className="message__reply">
                <strong>{message.reply.sender}</strong>
                <span>{message.reply.text}</span>
              </div>
            )}
            {message.attachments?.length ? (
              <div className="message__attachments" aria-label="Прикреплённые файлы">
                {message.attachments.map((attachment) => attachment.disk ? (
                  <DiskAttachmentRow key={attachment.id} attachment={attachment} onRemove={onRemoveItem ? (id) => onRemoveItem(message.id, id) : undefined} />
                ) : (
                  <ListItemFile
                    key={attachment.id}
                    size="s"
                    fileName={attachment.name}
                    extension={attachment.name.split('.').pop()}
                    meta={formatBytes(attachment.size)}
                  />
                ))}
              </div>
            ) : null}
            {message.linkPreview ? (
              <div className="message__link-preview">
                <LinkPreviewCard preview={message.linkPreview} onRemove={onRemoveItem ? () => onRemoveItem(message.id, message.linkPreview!.id) : undefined} />
              </div>
            ) : null}
            {message.images?.length ? (
              <div className="message__images" aria-label="Изображения в сообщении">
                {message.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}
              </div>
            ) : null}
            <div className="message__content">
              {message.text && <FormattedMessageText value={message.text} />}
              <span className="message__meta">
                {message.pinned && <Pin aria-label="Закреплено" />}
                {message.time}
                {mine && <CheckCheck aria-label="Прочитано" />}
              </span>
            </div>
            {!mine && <img className="message__tail" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
          </div>

          {reactions.length > 0 && (
            <div className="message__reactions" aria-label="Реакции на сообщение">
              {reactions.map((reaction) => (
                <button
                  key={reaction.emoji}
                  type="button"
                  className={`message__reaction ${reaction.reacted ? 'is-selected' : ''}`}
                  aria-label={`${reaction.emoji}: ${reaction.count}`}
                  aria-pressed={reaction.reacted}
                  onClick={() => toggleReaction(reaction.emoji)}
                >
                  <span aria-hidden="true">{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="message__actions" aria-label="Действия с сообщением">
        <button type="button" aria-label="Поставить реакцию 👍" onClick={() => toggleReaction('👍')}>👍</button>
        <button type="button" aria-label="Поставить реакцию 🔥" onClick={() => toggleReaction('🔥')}>🔥</button>
        <IconButton type="button" size="s" label="Другие реакции" icon={<SmilePlus />} />
        <IconButton type="button" size="s" label="Ответить" icon={<MessageCircle />} onClick={() => onReply?.(message)} />
        <IconButton type="button" size="s" label="Ещё" icon={<MoreHorizontal />} onClick={() => onMore?.(message)} />
      </div>
    </article>
  )
}

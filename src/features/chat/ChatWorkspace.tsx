import { Phone, Search, UserPlus } from 'lucide-react'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import type { Chat } from '../../types/chat'
import { Avatar } from '../../components/ui/Avatar'
import { IconButton } from '../../components/ui/IconButton'
import { MessageBubble } from './MessageBubble'
import { MessageEditor } from './MessageEditor'
import type { MessageEditorPayload } from './MessageEditor'
import { FederationLabel } from '../../components/ui/FederationLabel'
import { DiskToastHost } from '../disk/DiskToastHost'

type ChatWorkspaceProps = {
  chat: Chat
  composerNotice?: ReactNode
  federation?: boolean
  draft: string
  onDraftChange: (value: string) => void
  onAddParticipants?: () => void
  onOpenProfile?: () => void
  onRemoveMessageItem?: (messageId: string, itemId: string) => void
  onSend: (payload: MessageEditorPayload) => void
}

export function ChatWorkspace({ chat, composerNotice, federation = chat.federation ?? false, draft, onAddParticipants, onDraftChange, onOpenProfile, onRemoveMessageItem, onSend }: ChatWorkspaceProps) {
  const scroller = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [chat.messages.length, chat.id])

  const identity = (
    <>
      <Avatar
        label={chat.title}
        image={chat.avatarImage}
        tone={chat.avatarTone}
        emoji={chat.avatar}
        filled={chat.avatarFilled ?? true}
        shape={chat.kind === 'channel' ? 'squircle' : 'round'}
      />
      <div><strong className="chat-header__title">{federation ? <FederationLabel iconLabel="Федеративный чат" iconPosition="start">{chat.title}</FederationLabel> : chat.title}</strong><span className="chat-header__subtitle">{chat.subtitle}</span></div>
    </>
  )

  return (
    <main className="chat-workspace">
      <header className="chat-header">
        {onOpenProfile
          ? <button type="button" className="chat-header__identity chat-header__identity--action" onClick={onOpenProfile} aria-label={`Открыть профиль: ${chat.title}`}>{identity}</button>
          : <div className="chat-header__identity">{identity}</div>}
        <div className="chat-header__actions">
          {onAddParticipants && <IconButton size="s" variant="floating" label="Добавить участников" icon={<UserPlus />} onClick={onAddParticipants} />}
          <IconButton size="s" variant="floating" label="Начать звонок" icon={<Phone />} />
          <IconButton size="s" variant="floating" label="Поиск в переписке" icon={<Search />} />
        </div>
      </header>
      <div className="message-feed" ref={scroller}>
        <div className="message-feed__date">Сегодня</div>
        <div className="message-feed__content">
          {chat.messages.map((message) => <MessageBubble key={message.id} message={message} federation={message.federation} onRemoveItem={onRemoveMessageItem} />)}
        </div>
      </div>
      <footer className="composer-surface">
        <MessageEditor federation={federation} topPanel={composerNotice} value={draft} onChange={onDraftChange} onSend={onSend} />
      </footer>
      <DiskToastHost />
    </main>
  )
}

export function ChatWorkspaceEmpty() {
  return (
    <main className="chat-workspace chat-workspace--empty">
      <p>Выберите, с кем хотите начать разговор</p>
    </main>
  )
}

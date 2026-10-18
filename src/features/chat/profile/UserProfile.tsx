import { Check } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionCard, Avatar, IconButton, ListItem, ModalPage } from '../../../components/ui'
import type { ChatMember } from '../../../types/chat'
import './profile.css'

type UserProfileProps = {
  /** Название организации: показывается в «Дополнительной информации», если задано. */
  organization?: string
  onBack?: () => void
  onClose: () => void
  onOpenChat?: () => void
  open: boolean
  member?: ChatMember
  /** Необязательный признак под именем (например, тег Федерации). */
  tag?: ReactNode
  variant?: 'full' | 'compact'
}

/** Копируемое значение контакта: кнопка справа, сама строка только для просмотра. */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(value) } catch { /* Буфер обмена может быть недоступен: прототип всё равно подтверждает действие. */ }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  return <IconButton label={copied ? 'Скопировано' : label} icon={copied ? <Check aria-hidden="true" /> : <img src="assets/figma/ic-copy-filled.svg" alt="" aria-hidden="true" />} onClick={copy} />
}

/** Профиль пользователя (Figma 40000074:62312): используется для личных чатов и участников. */
export function UserProfile({ member, onBack, onClose, onOpenChat, open, organization, tag, variant = 'full' }: UserProfileProps) {
  if (!member) return null
  // Допущение прототипа: отдельного логина в данных нет, показываем локальную часть почты, как «b.fedorov» в макете.
  const username = member.email?.split('@')[0]
  const contacts = [
    ...(member.email ? [{ id: 'email', label: 'Email', value: member.email }] : []),
    ...(variant === 'full' && member.phone ? [{ id: 'phone', label: 'Телефон', value: member.phone }] : []),
  ]
  const extra = [
    ...(organization ? [{ id: 'organization', label: 'Организация', value: organization }] : []),
    ...(member.role ? [{ id: 'role', label: 'Должность', value: member.role }] : []),
  ]
  return (
    <ModalPage open={open} title="Профиль участника" onBack={onBack} onClose={onClose} className="user-profile">
      <div className="user-profile__content">
        <div className="user-profile__identity">
          <Avatar label={member.name} image={member.image} emoji={member.initials} tone={member.tone} size={124} filled={false} />
          <div className="user-profile__info">
            <div className="user-profile__name"><h3>{member.name}</h3>{username && <span>{username}</span>}</div>
            {tag}
          </div>
        </div>
        <ActionCard className="user-profile__chat" shape="circular" icon={<img src="assets/figma/ic-chat-filled.svg" alt="" aria-hidden="true" />} onClick={onOpenChat ?? onClose}>Чат</ActionCard>
        {contacts.length > 0 && <section className="user-profile__section" aria-labelledby="user-profile-contacts">
          <h4 id="user-profile-contacts">Контакты</h4>
          <div className="user-profile__group">
            {contacts.map((item, index) => (
              <ListItem key={item.id} interactive={false} divider={index < contacts.length - 1} overline={item.label} label={<span className="user-profile__value--accent">{item.value}</span>} trailingElement={<CopyButton value={item.value} label={`Скопировать: ${item.label}`} />} />
            ))}
          </div>
        </section>}
        {extra.length > 0 && <section className="user-profile__section" aria-labelledby="user-profile-extra">
          <h4 id="user-profile-extra">Дополнительная информация</h4>
          <div className="user-profile__group">
            {extra.map((item, index) => <ListItem key={item.id} interactive={false} divider={index < extra.length - 1} overline={item.label} label={item.value} />)}
          </div>
        </section>}
      </div>
    </ModalPage>
  )
}

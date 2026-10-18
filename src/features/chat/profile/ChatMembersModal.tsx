import { UserPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, IconButton, ListItem, ModalPage, SearchField } from '../../../components/ui'
import type { ChatMember } from '../../../types/chat'
import { sortMembersByName } from './members'
import './profile.css'

type ChatMembersModalProps = {
  members: ChatMember[]
  onAddParticipants?: () => void
  onBack?: () => void
  onClose: () => void
  onMemberSelect?: (memberId: string) => void
  open: boolean
}

function participantWord(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return 'участник'
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'участника'
  return 'участников'
}

/** Все участники чата или канала по алфавиту; администраторы — отдельным разделом (Figma 6932:39360). */
export function ChatMembersModal({ members, onAddParticipants, onBack, onClose, onMemberSelect, open }: ChatMembersModalProps) {
  const [query, setQuery] = useState('')
  useEffect(() => { if (open) setQuery('') }, [open])

  const sections = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru')
    const visible = sortMembersByName(members).filter((member) => !needle || `${member.name} ${member.email ?? ''}`.toLocaleLowerCase('ru').includes(needle))
    return [
      { id: 'admins', title: 'Администраторы', items: visible.filter((member) => member.adminRole) },
      { id: 'members', title: 'Участники', items: visible.filter((member) => !member.adminRole) },
    ].filter((section) => section.items.length)
  }, [members, query])

  const actions = onAddParticipants ? <IconButton label="Добавить участников" icon={<UserPlus aria-hidden="true" />} onClick={onAddParticipants} /> : undefined
  return (
    <ModalPage className="chat-members-modal" open={open} title={`${members.length} ${participantWord(members.length)}`} actions={actions} onBack={onBack} onClose={onClose} scroll="content" height="viewport">
      <div className="chat-members-modal__content">
        <SearchField value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="chat-members-modal__list">
          {sections.map((section) => (
            <section key={section.id} className="chat-members-modal__section" aria-label={section.title}>
              <h4>{section.title}</h4>
              <div className="chat-members-modal__group">
                {section.items.map((member) => (
                  <ListItem
                    key={member.id}
                    divider={false}
                    federation={member.external}
                    federationIconPosition="start"
                    federationIconSize="xs"
                    label={member.name}
                    leadingElement={<Avatar label={member.name} image={member.image} emoji={member.initials} tone={member.tone} filled={false} />}
                    trailingElement={member.adminRole ? <span className="chat-members-modal__role">{member.adminRole}</span> : undefined}
                    onClick={() => onMemberSelect?.(member.id)}
                  />
                ))}
              </div>
            </section>
          ))}
          {!sections.length && <p className="chat-members-modal__empty">Участники не найдены</p>}
        </div>
      </div>
    </ModalPage>
  )
}

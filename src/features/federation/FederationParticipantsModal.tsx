import { useEffect, useMemo, useState } from 'react'
import { Avatar } from '../../components/ui/Avatar'
import { ListItem } from '../../components/ui/ListItem'
import { ModalPage } from '../../components/ui/ModalPage'
import { SearchField } from '../../components/ui/SearchField'
import type { FederationChatMeta } from './model'
import { federationParticipants, getParticipantWord } from './model'
import './federation.css'

type FederationParticipantsModalProps = {
  onClose: () => void
  onParticipantSelect?: (participantId: string) => void
  open: boolean
  participants: FederationChatMeta['externalParticipants']
}

const participantById = new Map(federationParticipants.map((participant) => [participant.id, participant]))

export function FederationParticipantsModal({ onClose, onParticipantSelect, open, participants }: FederationParticipantsModalProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const items = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru')
    return participants.map((participant) => ({
      ...participant,
      details: participantById.get(participant.id),
    })).filter((participant) => !needle || `${participant.name} ${participant.organization} ${participant.details?.email ?? ''}`.toLocaleLowerCase('ru').includes(needle))
  }, [participants, query])

  const count = participants.length
  return (
    <ModalPage className="federation-participants-modal" open={open} title={`${count} ${getParticipantWord(count)} из другой организации`} onClose={onClose}>
      <div className="federation-participants-modal__content">
        <SearchField autoFocus value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="federation-participants-modal__list" aria-label="Участники из других организаций">
          {items.map((participant) => (
            <ListItem
              key={participant.id}
              divider={false}
              federation
              federationIconPosition="start"
              federationIconSize="xs"
              label={participant.name}
              leadingElement={<Avatar label={participant.name} image={participant.details?.image} emoji={participant.details?.initials ?? participant.name.slice(0, 2).toUpperCase()} tone={participant.details?.tone} filled={false} />}
              supporting={participant.details?.email ?? participant.organization}
              onClick={() => { onClose(); onParticipantSelect?.(participant.id) }}
            />
          ))}
          {!items.length && <p className="federation-participants-modal__empty">Участники не найдены</p>}
        </div>
      </div>
    </ModalPage>
  )
}

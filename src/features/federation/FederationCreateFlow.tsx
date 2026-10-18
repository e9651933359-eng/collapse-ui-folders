import { Camera, UserPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DropField } from '../../components/option-menu'
import { Avatar, Button, CheckBox, ConfirmDialog, IconButton, ListItem, ModalPage, SearchField, Switch, TextArea, TextField, Uploader } from '../../components/ui'
import type { Chat } from '../../types/chat'
import type { FederationChatMeta, FederationParticipant } from './model'
import { federationOrganizations, getFederationOrganization, getFederationParticipants, getParticipantWord } from './model'
import './federation.css'

export type FederationFlowMode = 'start' | 'channel' | 'add-members'

export type FederationCreatedChat = {
  chat: Chat
  meta?: FederationChatMeta
}

type FederationCreateFlowProps = {
  existingMeta?: FederationChatMeta
  mode: FederationFlowMode
  onAddParticipants?: (participants: FederationParticipant[]) => void
  onClose: () => void
  onCreate: (result: FederationCreatedChat) => void
  open: boolean
}

type FlowView = 'start' | 'details' | 'members' | 'warning'
type EntityKind = 'group' | 'channel'

const participantNameCollator = new Intl.Collator('ru', { sensitivity: 'base' })

export function FederationCreateFlow({ existingMeta, mode, onAddParticipants, onClose, onCreate, open }: FederationCreateFlowProps) {
  const [view, setView] = useState<FlowView>('start')
  const [kind, setKind] = useState<EntityKind>('group')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [organizationId, setOrganizationId] = useState('mts')
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [channelAccess, setChannelAccess] = useState<'private' | 'public'>('private')
  const [adminsOnly, setAdminsOnly] = useState(true)

  useEffect(() => {
    if (!open) return
    setView(mode === 'start' ? 'start' : mode === 'channel' ? 'details' : 'members')
    setKind(mode === 'channel' ? 'channel' : 'group')
    setName('')
    setDescription('')
    setOrganizationId(mode === 'add-members' ? 'alfa' : 'mts')
    setQuery('')
    setSelectedIds([])
    setChannelAccess('private')
    setAdminsOnly(true)
  }, [mode, open])

  const organization = getFederationOrganization(organizationId) ?? federationOrganizations[0]
  const participants = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru')
    return getFederationParticipants(organizationId)
      .filter((participant) => !needle || `${participant.name} ${participant.email}`.toLocaleLowerCase('ru').includes(needle))
      .sort((first, second) => participantNameCollator.compare(first.name, second.name))
  }, [organizationId, query])
  const selectedParticipants = selectedIds.flatMap((id) => federationOrganizations.flatMap((item) => getFederationParticipants(item.id)).find((participant) => participant.id === id) ?? [])
  const externalSelected = selectedParticipants.filter((participant) => getFederationOrganization(participant.organizationId)?.external)
  const organizationOptions = federationOrganizations.map((item) => ({ id: item.id, label: item.name, disabled: !item.available || (kind === 'channel' && channelAccess === 'public' && item.external), supporting: item.unavailableReason ?? (kind === 'channel' && channelAccess === 'public' && item.external ? 'Для публичного канала доступны только сотрудники вашей организации' : undefined) }))

  const close = () => { onClose() }
  const selectParticipant = (participant: FederationParticipant) => {
    const external = Boolean(getFederationOrganization(participant.organizationId)?.external)
    const chat: Chat = {
      id: `federation-${participant.id}-${crypto.randomUUID()}`,
      title: participant.name,
      subtitle: external ? `${getFederationOrganization(participant.organizationId)?.name ?? ''} · другая организация` : getFederationOrganization(participant.organizationId)?.name ?? '',
      avatar: participant.initials,
      avatarImage: participant.image,
      avatarTone: participant.tone,
      kind: 'direct',
      federation: external,
      messages: [],
    }
    onCreate({ chat, meta: external ? { chatId: chat.id, organizations: ['MTS Link', getFederationOrganization(participant.organizationId)?.name ?? ''], externalParticipantCount: 1, externalParticipants: [{ id: participant.id, name: participant.name, organization: getFederationOrganization(participant.organizationId)?.name ?? '' }] } : undefined })
    close()
  }

  const finishCreate = () => {
    const externalOrganizations = [...new Set(externalSelected.map((participant) => getFederationOrganization(participant.organizationId)?.name).filter((item): item is string => Boolean(item)))]
    const total = selectedParticipants.length + 1
    const chat: Chat = {
      id: `federation-${kind}-${crypto.randomUUID()}`,
      title: name.trim() || (kind === 'channel' ? 'Новый канал' : 'Новая группа'),
      subtitle: `${total} ${getParticipantWord(total)}`,
      avatar: (name.trim() || (kind === 'channel' ? 'НК' : 'НГ')).slice(0, 2).toUpperCase(),
      avatarTone: kind === 'channel' ? '#7047fe' : '#e8ddff',
      avatarFilled: kind !== 'group',
      kind,
      federation: externalSelected.length > 0,
      messages: [],
    }
    const meta = externalSelected.length ? {
      chatId: chat.id,
      organizations: ['MTS Link', ...externalOrganizations],
      externalParticipantCount: externalSelected.length,
      externalParticipants: externalSelected.map((participant) => ({ id: participant.id, name: participant.name, organization: getFederationOrganization(participant.organizationId)?.name ?? '' })),
    } : undefined
    onCreate({ chat, meta })
    close()
  }

  const finishAdd = () => {
    onAddParticipants?.(selectedParticipants)
    close()
  }

  const submitMembers = () => {
    if (mode === 'add-members') {
      if (externalSelected.length && !existingMeta?.externalParticipantCount) setView('warning')
      else finishAdd()
      return
    }
    if (kind === 'group') {
      setView('details')
      return
    }
    finishCreate()
  }

  const footer = view === 'details' ? (
    <>
      <Button size="s" onClick={close}>Отмена</Button>
      <Button size="s" priority="accent" disabled={!name.trim()} onClick={() => {
        if (kind === 'group') finishCreate()
        else { setOrganizationId('mts'); setView('members') }
      }}>Создать</Button>
    </>
  ) : view === 'members' ? (
    <>
      <Button size="s" onClick={mode === 'add-members' ? close : kind === 'group' ? () => setView('details') : finishCreate}>Пропустить</Button>
      <Button size="s" priority="accent" disabled={!selectedIds.length} onClick={submitMembers}>{mode === 'add-members' ? `Добавить ${selectedIds.length || ''}` : `Добавить ${selectedIds.length || ''}`}</Button>
    </>
  ) : undefined

  const title = view === 'start' ? 'Начните общение' : view === 'details' ? (kind === 'channel' ? 'Новый канал' : 'Новая группа') : mode === 'add-members' ? 'Добавьте участников' : kind === 'channel' ? 'Добавьте участников в канал' : 'Добавьте участников'

  return (
    <>
      <ModalPage
        open={open && view !== 'warning'}
        height={view === 'details' && kind === 'group' ? 'content' : 'viewport'}
        scroll={view === 'details' ? 'body' : 'content'}
        title={title}
        onClose={close}
        onBack={view === 'details' && kind === 'group' ? () => setView('members') : view === 'members' && mode !== 'add-members' ? () => setView(kind === 'group' ? 'start' : 'details') : undefined}
        actions={view === 'start' ? <IconButton icon={<UserPlus aria-hidden="true" />} label="Создать групповой чат" size="s" variant="floating" onClick={() => { setKind('group'); setView('members') }} /> : undefined}
        footer={footer}
        className="federation-flow"
      >
        {view === 'start' && (
          <div className="federation-flow__picker">
            <SearchField value={query} onChange={(event) => setQuery(event.target.value)} />
            <DropField className="federation-flow__organization" label="" value={organizationId} options={organizationOptions} onChange={setOrganizationId} />
            <div className="federation-flow__list" aria-label={`Участники: ${organization.name}`}>
              {participants.map((participant) => <ListItem key={participant.id} federation={organization.external} label={participant.name} supporting={organization.external ? participant.email : undefined} leadingElement={<Avatar label={participant.name} image={participant.image} emoji={participant.initials} tone={participant.tone} filled={false} status={organization.external ? undefined : 'online'} />} onClick={() => selectParticipant(participant)} />)}
            </div>
          </div>
        )}

        {view === 'details' && (
          <div className="federation-flow__details">
            <Uploader className="federation-flow__uploader" accept="image/*"><Camera aria-hidden="true" /></Uploader>
            <TextField autoFocus label="Название *" value={name} onChange={(event) => setName(event.target.value)} />
            {kind === 'channel' && <TextArea label="Описание" placeholder="Анонсы релизов" value={description} counter="Количество знаков" onChange={(event) => setDescription(event.target.value)} />}
            {kind === 'channel' && (
              <section className="federation-flow__settings" aria-label="Настройки доступа">
                <h3>Настройки доступа</h3>
                <DropField className="federation-flow__access" label="" value={channelAccess} options={[{ id: 'private', label: 'Приватный канал' }, { id: 'public', label: 'Публичный канал' }]} onChange={(value) => { setChannelAccess(value as 'private' | 'public'); if (value === 'public') setOrganizationId('mts') }} />
                <div className="federation-flow__switch-row"><span>Только владелец и администраторы могут публиковать сообщения</span><Switch label="Только администраторы могут публиковать" selected={adminsOnly} onChange={setAdminsOnly} /></div>
                <small>Настройки можно изменить позже</small>
              </section>
            )}
          </div>
        )}

        {view === 'members' && (
          <div className="federation-flow__picker">
            <SearchField value={query} onChange={(event) => setQuery(event.target.value)} />
            {(kind !== 'channel' || channelAccess === 'private') && <DropField className="federation-flow__organization" label="" value={organizationId} options={organizationOptions} onChange={setOrganizationId} />}
            <div className="federation-flow__list">
              {participants.map((participant) => {
                const selected = selectedIds.includes(participant.id)
                return (
                  <ListItem
                    key={participant.id}
                    className="federation-flow__member"
                    divider={false}
                    federation={organization.external}
                    label={participant.name}
                    supporting={participant.email}
                    leadingElement={<Avatar label={participant.name} image={participant.image} emoji={participant.initials} tone={participant.tone} filled={false} />}
                    trailingElement={<CheckBox size="s" visualOnly checked={selected} />}
                    role="checkbox"
                    aria-checked={selected}
                    onClick={() => setSelectedIds((current) => selected ? current.filter((id) => id !== participant.id) : [...current, participant.id])}
                  />
                )
              })}
            </div>
          </div>
        )}
      </ModalPage>

      <ConfirmDialog
        open={open && view === 'warning'}
        intent="default"
        title={<>Вы добавляете {selectedIds.length === 1 ? 'участника' : 'участников'}<br />из другой организации</>}
        description={`${selectedIds.length === 1 ? 'Участник, который не входит' : 'Участники, которые не входят'} в вашу организацию, получ${selectedIds.length === 1 ? 'ит' : 'ат'} доступ к сообщениям и файлам этой переписки`}
        confirmLabel="Продолжить"
        onCancel={() => setView('members')}
        onConfirm={finishAdd}
      />
    </>
  )
}

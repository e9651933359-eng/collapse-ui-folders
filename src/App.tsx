import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { Toast } from './components/feedback/Toast'
import { ProductRail } from './components/shell/ProductRail'
import { ChatList } from './components/shell/ChatList'
import { FolderManagementModal } from './components/ui/FolderManagementModal'
import type { ManagedFolder, SystemFolder } from './components/ui/FolderManagementModal'
import { ConfirmDialog } from './components/ui/ConfirmDialog'
import type { SegmentDisplayMode, SegmentOption } from './components/ui/SegmentControls'
import { folderEmoji, getCustomFolderEmoji } from './components/ui/folderEmoji'
import { ChatWorkspace, ChatWorkspaceEmpty } from './features/chat/ChatWorkspace'
import type { MessageEditorPayload } from './features/chat/MessageEditor'
import { initialChats } from './features/chat/mockData'
import { togglePinnedChat } from './features/chat/order'
import { countActiveUnreadChats } from './features/chat/unread'
import {
  FederationChatIndicator,
  FederationCreateFlow,
  FederationNotice,
  FederationParticipantProfile,
  FederationParticipantsModal,
  federationChatMetadata,
  federationChats,
  federationDemoContext,
  federationParticipants,
  getFederationOrganization,
  getFederationAvailability,
} from './features/federation'
import type { FederationChatMeta, FederationFlowMode, FederationParticipant } from './features/federation'
import { ChatMembersModal } from './features/chat/profile/ChatMembersModal'
import { ChatProfileModal } from './features/chat/profile/ChatProfileModal'
import { UserProfile } from './features/chat/profile/UserProfile'
import { getChatMembers } from './features/chat/profile/members'
import { FederationTag } from './components/ui/FederationTag'
import type { Chat, ChatMember } from './types/chat'

const CHAT_LIST_DEFAULT_WIDTH = 320
const CHAT_LIST_MIN_WIDTH = 240
const CHAT_LIST_MAX_WIDTH = 480

type ChatExperienceProps = {
  chatsSource?: Chat[]
  initialSelectedId?: string
  initialFolderOrder?: string[]
  listTitle?: string
  onCreateChat?: (segment: string) => void
  onAddParticipants?: (chat: Chat) => void
  /** Участники чата для профиля и списка участников; по умолчанию — демо-состав обычных чатов. */
  getMembers?: (chat: Chat) => ChatMember[]
  renderChatIndicator?: (chat: Chat) => ReactNode
  renderComposerNotice?: (chat: Chat) => ReactNode
  renderOverlay?: (api: ChatExperienceOverlayApi) => ReactNode
  shellLabel?: string
}

export type ChatExperienceOverlayApi = {
  addChat: (chat: Chat) => void
  chats: Chat[]
  selectedChat?: Chat
  selectChat: (chatId: string) => void
  updateChat: (chatId: string, update: (chat: Chat) => Chat) => void
}

export function ChatExperience({
  chatsSource = initialChats,
  initialFolderOrder = ['new'],
  initialSelectedId,
  listTitle = 'Чаты',
  onCreateChat,
  onAddParticipants,
  getMembers = getChatMembers,
  renderChatIndicator,
  renderComposerNotice,
  renderOverlay,
  shellLabel = 'MTS Link — Чаты',
}: ChatExperienceProps) {
  const [chats, setChats] = useState<Chat[]>(chatsSource)
  const [selectedId, setSelectedId] = useState(initialSelectedId)
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('')
  const [folderDisplayMode, setFolderDisplayMode] = useState<SegmentDisplayMode>('names')
  const [retainedNewChatId, setRetainedNewChatId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  /** Профиль открытого чата: чат/канал, список участников или пользователь. `fromMembers` — «Назад» ведёт к списку. */
  const [profile, setProfile] = useState<{ chatId: string; view: 'chat' | 'members' | 'user'; memberId?: string; fromMembers?: boolean }>()
  const [isFolderModalOpen, setFolderModalOpen] = useState(false)
  const [folderModalView, setFolderModalView] = useState<'manage' | 'create' | 'edit'>('manage')
  const [editingFolderId, setEditingFolderId] = useState<string>()
  const [folderModalInitialChatIds, setFolderModalInitialChatIds] = useState<string[]>([])
  const [folderPendingDelete, setFolderPendingDelete] = useState<ManagedFolder>()
  const [customFolders, setCustomFolders] = useState<ManagedFolder[]>([])
  const [folderOrder, setFolderOrder] = useState<string[]>(initialFolderOrder)
  const [toastMessage, setToastMessage] = useState('')
  const [chatListWidth, setChatListWidth] = useState(CHAT_LIST_DEFAULT_WIDTH)
  const [isChatListResizing, setChatListResizing] = useState(false)
  const chatListResize = useRef<{ pointerId: number; startX: number; startWidth: number } | undefined>(undefined)

  useEffect(() => {
    const clearSelection = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || isFolderModalOpen || folderPendingDelete || document.querySelector('[role="dialog"], [role="menu"]')) return
      setSelectedId(undefined)
      setDraft('')
    }

    window.addEventListener('keydown', clearSelection, true)
    return () => window.removeEventListener('keydown', clearSelection, true)
  }, [folderPendingDelete, isFolderModalOpen])

  const clampChatListWidth = (width: number) => Math.min(CHAT_LIST_MAX_WIDTH, Math.max(CHAT_LIST_MIN_WIDTH, width))

  const startChatListResize = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    chatListResize.current = { pointerId: event.pointerId, startX: event.clientX, startWidth: chatListWidth }
    event.currentTarget.setPointerCapture(event.pointerId)
    setChatListResizing(true)
  }

  const moveChatListResize = (event: PointerEvent<HTMLDivElement>) => {
    const resize = chatListResize.current
    if (!resize || resize.pointerId !== event.pointerId) return
    setChatListWidth(clampChatListWidth(resize.startWidth + event.clientX - resize.startX))
  }

  const stopChatListResize = (event: PointerEvent<HTMLDivElement>) => {
    if (chatListResize.current?.pointerId !== event.pointerId) return
    chatListResize.current = undefined
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    setChatListResizing(false)
  }

  const resizeChatListWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      setChatListWidth((width) => clampChatListWidth(width + (event.key === 'ArrowLeft' ? -16 : 16)))
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setChatListWidth(event.key === 'Home' ? CHAT_LIST_MIN_WIDTH : CHAT_LIST_MAX_WIDTH)
    }
  }

  const segments = useMemo<SegmentOption[]>(() => {
    const systemLabels: Record<SystemFolder, string> = {
      new: 'Новые',
      chats: 'Чаты',
      channels: 'Каналы',
    }

    const unreadCount = (folder: SystemFolder | ManagedFolder) => countActiveUnreadChats(chats, (chat) => {
      if (typeof folder !== 'string') return folder.chatIds.includes(chat.id)
      if (folder === 'new') return true
      if (folder === 'chats') return chat.kind !== 'channel'
      return chat.kind === 'channel'
    })

    const result: SegmentOption[] = [
      { value: 'all', label: 'Все', icon: folderEmoji.all, kind: 'fixed' as const },
    ]
    folderOrder.forEach((id) => {
        if (id in systemLabels) {
          const folderId = id as SystemFolder
          result.push({ value: id, label: systemLabels[folderId], icon: folderEmoji[folderId], counter: unreadCount(folderId), kind: 'system' })
          return
        }
        const folder = customFolders.find((item) => item.id === id)
        if (folder) result.push({ value: folder.id, label: folder.label, icon: getCustomFolderEmoji(folder.emoji), counter: unreadCount(folder), kind: 'custom' })
      })
    return result
  }, [chats, customFolders, folderOrder])

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru')
    return chats.filter((chat) => {
      const matchesQuery = !needle || chat.title.toLocaleLowerCase('ru').includes(needle)
      const folder = customFolders.find((item) => item.id === segment)
      const matchesSegment = !segment || segment === 'all'
        || (segment === 'new' && (Boolean(chat.unread) || chat.id === retainedNewChatId))
        || (segment === 'chats' && chat.kind !== 'channel')
        || (segment === 'channels' && chat.kind === 'channel')
        || Boolean(folder?.chatIds.includes(chat.id))
      return matchesQuery && matchesSegment
    })
  }, [chats, customFolders, query, retainedNewChatId, segment])
  const selected = chats.find((chat) => chat.id === selectedId)

  const sendMessage = (payload: MessageEditorPayload) => {
    if (!selected) return
    const text = payload.text.trim()
    if (!text && !payload.attachments.length) return
    const time = new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit' }).format(new Date())
    setChats((items) => items.map((chat) => chat.id === selected.id
      ? { ...chat, messages: [...chat.messages, { id: crypto.randomUUID(), author: 'me', text, time, attachments: payload.attachments, linkPreview: payload.linkPreview }] }
      : chat))
    setDraft('')
  }

  const removeMessageItem = (messageId: string, itemId: string) => {
    if (!selected) return
    setChats((items) => items.map((chat) => chat.id === selected.id
      ? { ...chat, messages: chat.messages.map((message) => message.id !== messageId ? message : {
        ...message,
        attachments: message.attachments?.filter((attachment) => attachment.id !== itemId),
        linkPreview: message.linkPreview?.id === itemId ? undefined : message.linkPreview,
      }) }
      : chat))
  }

  const openFolderModal = (view: 'manage' | 'create' | 'edit' = 'manage', folderId?: string, initialChatIds: string[] = []) => {
    setFolderModalView(view)
    setEditingFolderId(folderId)
    setFolderModalInitialChatIds(initialChatIds)
    setFolderModalOpen(true)
  }

  const matchesFolder = (chat: Chat, folderId: string) => {
    if (folderId === 'all' || folderId === 'new') return true
    if (folderId === 'chats') return chat.kind !== 'channel'
    if (folderId === 'channels') return chat.kind === 'channel'
    return Boolean(customFolders.find((folder) => folder.id === folderId)?.chatIds.includes(chat.id))
  }

  const markFolderRead = (folderId: string) => {
    if (folderId === 'new' && segment === 'new') setRetainedNewChatId(selectedId ?? null)
    setChats((current) => current.map((chat) => matchesFolder(chat, folderId) ? { ...chat, unread: 0 } : chat))
  }

  const selectChat = (chatId: string) => {
    const chat = chats.find((item) => item.id === chatId)
    if (segment === 'new') {
      setRetainedNewChatId((current) => Boolean(chat?.unread) || current === chatId ? chatId : null)
    }
    setSelectedId(chatId)
    setChats((current) => current.map((chat) => chat.id === chatId && chat.unread ? { ...chat, unread: 0 } : chat))
  }

  const selectSegment = (nextSegment: string) => {
    if (nextSegment !== 'new') setRetainedNewChatId(null)
    setSegment(nextSegment)
  }

  const markChatRead = (chatId: string) => {
    if (segment === 'new' && selectedId === chatId) setRetainedNewChatId(chatId)
    setChats((current) => current.map((chat) => chat.id === chatId ? { ...chat, unread: 0 } : chat))
  }

  const hideSystemFolder = (folderId: string) => {
    setFolderOrder((current) => current.filter((id) => id !== folderId))
    if (segment === folderId) selectSegment('all')
  }

  const confirmDeleteFolder = () => {
    if (!folderPendingDelete) return
    setCustomFolders((current) => current.filter((folder) => folder.id !== folderPendingDelete.id))
    setFolderOrder((current) => current.filter((id) => id !== folderPendingDelete.id))
    if (segment === folderPendingDelete.id) setSegment('all')
    setFolderPendingDelete(undefined)
    setToastMessage('Папка удалена')
  }

  const toggleChatFolder = (chatId: string, folderId: string) => {
    const folder = customFolders.find((item) => item.id === folderId)
    if (!folder) return
    const isIncluded = folder.chatIds.includes(chatId)
    setCustomFolders((current) => current.map((item) => item.id === folderId
      ? { ...item, chatIds: isIncluded ? item.chatIds.filter((id) => id !== chatId) : [...item.chatIds, chatId] }
      : item))
    setToastMessage(`${isIncluded ? 'Удалено из папки' : 'Добавлено в папку'} «${folder.label}»`)
  }

  const reorderChats = (orderedChatIds: string[]) => {
    setChats((current) => {
      const reorderedIds = new Set(orderedChatIds)
      const chatMap = new Map(current.map((chat) => [chat.id, chat]))
      const reorderedChats = orderedChatIds.flatMap((chatId) => chatMap.get(chatId) ?? [])
      let reorderedIndex = 0
      return current.map((chat) => reorderedIds.has(chat.id) ? reorderedChats[reorderedIndex++] : chat)
    })
  }

  return (
    <div className="app-stage">
      <section
        className={`chat-shell${isChatListResizing ? ' is-resizing-chat-list' : ''}`}
        aria-label={shellLabel}
        style={{ '--chat-list-resizable-width': `${chatListWidth}px` } as CSSProperties}
      >
        <ProductRail />
        <ChatList
          chats={filtered}
          title={listTitle}
          selectedId={selected?.id}
          query={query}
          segment={segment}
          segments={segments}
          segmentDisplayMode={folderDisplayMode}
          folders={customFolders}
          onQueryChange={setQuery}
          onSegmentChange={selectSegment}
          onSegmentOrderChange={(values) => setFolderOrder(values.filter((value) => value !== 'all'))}
          onCreateFolder={(chatId) => openFolderModal('create', undefined, chatId ? [chatId] : [])}
          onCreateChat={onCreateChat ? () => onCreateChat(segment) : undefined}
          onDeleteFolder={(folderId) => setFolderPendingDelete(customFolders.find((folder) => folder.id === folderId))}
          onEditFolder={(folderId) => openFolderModal('edit', folderId)}
          onHideSegment={hideSystemFolder}
          onMarkRead={markChatRead}
          onMarkSegmentRead={markFolderRead}
          onOpenFolderSettings={() => openFolderModal('manage')}
          onPinnedOrderChange={reorderChats}
          onSelect={selectChat}
          onToggleFolder={toggleChatFolder}
          onToggleNotifications={(chatId) => setChats((current) => current.map((chat) => chat.id === chatId ? { ...chat, muted: !chat.muted } : chat))}
          onTogglePin={(chatId) => setChats((current) => togglePinnedChat(current, chatId))}
          renderItemIndicator={renderChatIndicator}
        />
        <div
          className="chat-list-resizer"
          role="separator"
          aria-label="Изменить ширину списка чатов"
          aria-orientation="vertical"
          aria-valuemin={CHAT_LIST_MIN_WIDTH}
          aria-valuemax={CHAT_LIST_MAX_WIDTH}
          aria-valuenow={chatListWidth}
          tabIndex={0}
          title="Потяните, чтобы изменить ширину"
          onDoubleClick={() => setChatListWidth(CHAT_LIST_DEFAULT_WIDTH)}
          onKeyDown={resizeChatListWithKeyboard}
          onPointerDown={startChatListResize}
          onPointerMove={moveChatListResize}
          onPointerUp={stopChatListResize}
          onPointerCancel={stopChatListResize}
        />
        {selected ? <ChatWorkspace
          chat={selected}
          federation={selected.federation}
          composerNotice={renderComposerNotice?.(selected)}
          draft={draft}
          onAddParticipants={onAddParticipants && selected.kind !== 'direct' ? () => onAddParticipants(selected) : undefined}
          onOpenProfile={() => setProfile(selected.kind === 'direct' ? { chatId: selected.id, view: 'user', memberId: getMembers(selected)[0]?.id } : { chatId: selected.id, view: 'chat' })}
          onDraftChange={setDraft}
          onRemoveMessageItem={removeMessageItem}
          onSend={sendMessage}
        /> : <ChatWorkspaceEmpty />}
        {(() => {
          const profileChat = profile ? chats.find((chat) => chat.id === profile.chatId) : undefined
          if (!profile || !profileChat) return null
          const members = getMembers(profileChat)
          const member = members.find((item) => item.id === profile.memberId)
          const close = () => setProfile(undefined)
          return <>
            <ChatProfileModal open={profile.view === 'chat'} chat={profileChat} memberCount={members.length} onClose={close} onOpenMembers={() => setProfile({ chatId: profileChat.id, view: 'members' })} onToggleNotifications={(chatId) => setChats((current) => current.map((chat) => chat.id === chatId ? { ...chat, muted: !chat.muted } : chat))} tag={profileChat.federation ? <FederationTag>Есть участники из другой организации</FederationTag> : undefined} />
            <ChatMembersModal open={profile.view === 'members'} members={members} onBack={() => setProfile({ chatId: profileChat.id, view: 'chat' })} onClose={close} onAddParticipants={onAddParticipants ? () => { close(); onAddParticipants(profileChat) } : undefined} onMemberSelect={(memberId) => setProfile({ chatId: profileChat.id, view: 'user', memberId, fromMembers: true })} />
            <UserProfile open={profile.view === 'user'} member={member} organization={member?.external ? member.organization : undefined} tag={member?.external ? <FederationTag>Участник из другой организации</FederationTag> : undefined} onBack={profile.fromMembers ? () => setProfile({ chatId: profileChat.id, view: 'members' }) : undefined} onClose={close} />
          </>
        })()}
        <FolderManagementModal
          open={isFolderModalOpen}
          initialView={folderModalView}
          initialFolderId={editingFolderId}
          initialSelectedChatIds={folderModalInitialChatIds}
          customFolders={customFolders}
          displayMode={folderDisplayMode}
          onDisplayModeChange={setFolderDisplayMode}
          candidates={chats.map((chat) => ({
            id: chat.id,
            label: chat.title,
            avatar: chat.avatar,
            avatarTone: chat.avatarTone,
            shape: chat.kind === 'channel' ? 'squircle' : 'round',
          }))}
          onClose={() => setFolderModalOpen(false)}
          onReorderCustomFolders={(folderIds) => {
            setCustomFolders((current) => folderIds.flatMap((id) => current.find((folder) => folder.id === id) ?? []))
            setFolderOrder((current) => {
              let customIndex = 0
              const customIds = new Set(folderIds)
              return current.map((id) => customIds.has(id) ? folderIds[customIndex++] : id)
            })
          }}
          enabledSystemFolders={folderOrder.filter((id): id is SystemFolder => ['new', 'chats', 'channels'].includes(id))}
          onSystemFolderChange={(folder, enabled) => {
            setFolderOrder((current) => enabled
              ? (current.includes(folder) ? current : [...current, folder])
              : current.filter((id) => id !== folder))
            if (!enabled && segment === folder) selectSegment('all')
          }}
          onCreateFolder={(folder) => {
            const id = `folder-${crypto.randomUUID()}`
            setCustomFolders((current) => [...current, { ...folder, id }])
            setFolderOrder((current) => [...current, id])
            setToastMessage('Папка создана')
          }}
          onUpdateFolder={(folderId, folder) => {
            setCustomFolders((current) => current.map((item) => item.id === folderId ? { ...item, ...folder } : item))
            setToastMessage('Папка обновлена')
          }}
        />
        <ConfirmDialog
          open={Boolean(folderPendingDelete)}
          title={<>Вы уверены, что хотите удалить<br />папку «{folderPendingDelete?.label}»?</>}
          description={<>Папка будет удалена. Чаты<br />и каналы останутся в разделе «Все»</>}
          confirmLabel="Удалить"
          onCancel={() => setFolderPendingDelete(undefined)}
          onConfirm={confirmDeleteFolder}
        />
        {toastMessage && <Toast className="folder-created-toast" duration={3000} icon={<img src="assets/figma/ic-message-check-outline.svg" alt="" aria-hidden="true" />} onClose={() => setToastMessage('')}>{toastMessage}</Toast>}
        {renderOverlay?.({
          addChat: (chat) => { setChats((current) => [chat, ...current]); setSelectedId(chat.id); setSegment('all') },
          chats,
          selectedChat: selected,
          selectChat,
          updateChat: (chatId, update) => setChats((current) => current.map((chat) => chat.id === chatId ? update(chat) : chat)),
        })}
      </section>
    </div>
  )
}

type FederationFlowState = { mode: FederationFlowMode; chatId?: string } | null

function FederationPage({ canCreateChat }: { canCreateChat: boolean }) {
  const [flow, setFlow] = useState<FederationFlowState>(null)
  const [metadata, setMetadata] = useState<FederationChatMeta[]>(federationChatMetadata)
  const [profileParticipantId, setProfileParticipantId] = useState<string>()
  /** Чат, из списка участников которого открыт профиль: «Назад» возвращает к этому списку. */
  const [profileBackChatId, setProfileBackChatId] = useState<string>()
  const [participantsChatId, setParticipantsChatId] = useState<string>()
  const findMeta = (chatId: string) => metadata.find((item) => item.chatId === chatId)
  /** Все участники чата: сотрудники МТС и внешние; внешние помечены `external`. Внутренний состав — демо-допущение. */
  const getFederationMembers = (chat: Chat): ChatMember[] => {
    const external = (findMeta(chat.id)?.externalParticipants ?? []).map((item): ChatMember => {
      const details = federationParticipants.find((participant) => participant.id === item.id)
      return { id: item.id, name: item.name, initials: details?.initials ?? item.name.slice(0, 2).toUpperCase(), tone: details?.tone ?? '#e8ddff', image: details?.image, email: details?.email, phone: details?.phone, role: details?.role, organization: item.organization, external: true }
    })
    if (chat.kind === 'direct') return external.length ? external : getChatMembers(chat)
    const internal = federationParticipants.filter((participant) => participant.organizationId === 'mts').slice(0, Math.max(1, (Number(/^(\d+)\s+участ/.exec(chat.subtitle)?.[1]) || external.length + 4) - external.length)).map((participant, index): ChatMember => ({ id: participant.id, name: participant.name, initials: participant.initials, tone: participant.tone, image: participant.image, email: participant.email, phone: participant.phone, role: participant.role, organization: 'МТС', adminRole: index === 0 ? 'Владелец' : undefined }))
    return [...internal, ...external]
  }

  return (
    <ChatExperience
      chatsSource={federationChats}
      initialFolderOrder={['new', 'chats', 'channels']}
      listTitle="Чаты"
      shellLabel="MTS Link — Чаты"
      onCreateChat={canCreateChat ? (segment) => setFlow({ mode: segment === 'channels' ? 'channel' : 'start' }) : undefined}
      onAddParticipants={(chat) => setFlow({ mode: 'add-members', chatId: chat.id })}
      getMembers={getFederationMembers}
      renderChatIndicator={(chat) => chat.federation ? <FederationChatIndicator chat={chat} /> : null}
      renderComposerNotice={(chat) => {
        const meta = findMeta(chat.id)
        return meta ? <FederationNotice variant={chat.kind === 'direct' ? 'compact' : 'details'} externalParticipantCount={meta.externalParticipantCount} onOpenParticipants={chat.kind === 'direct' ? undefined : () => setParticipantsChatId(chat.id)} /> : null
      }}
      renderOverlay={(api) => {
        const targetChat = flow?.chatId ? api.chats.find((chat) => chat.id === flow.chatId) : undefined
        const targetMeta = targetChat ? findMeta(targetChat.id) : undefined
        const addParticipants = (participants: FederationParticipant[]) => {
          if (!targetChat) return
          const external = participants.filter((participant) => getFederationOrganization(participant.organizationId)?.external)
          api.updateChat(targetChat.id, (chat) => ({ ...chat, federation: chat.federation || external.length > 0 }))
          if (!external.length) return
          setMetadata((current) => {
            const existing = current.find((item) => item.chatId === targetChat.id)
            const additions = external.map((participant) => ({ id: participant.id, name: participant.name, organization: getFederationOrganization(participant.organizationId)?.name ?? '' }))
            if (!existing) return [...current, { chatId: targetChat.id, organizations: ['МТС', ...new Set(additions.map((item) => item.organization))], externalParticipantCount: additions.length, externalParticipants: additions }]
            const nextParticipants = [...existing.externalParticipants, ...additions.filter((addition) => !existing.externalParticipants.some((participant) => participant.id === addition.id))]
            return current.map((item) => item.chatId === targetChat.id ? { ...item, organizations: [...new Set([...item.organizations, ...additions.map((addition) => addition.organization)])], externalParticipantCount: nextParticipants.length, externalParticipants: nextParticipants } : item)
          })
        }
        const profileParticipant = federationParticipants.find((participant) => participant.id === profileParticipantId)
        const participantsMeta = participantsChatId ? findMeta(participantsChatId) : undefined
        return <>
          <FederationCreateFlow open={Boolean(flow)} mode={flow?.mode ?? 'start'} existingMeta={targetMeta} onClose={() => setFlow(null)} onCreate={({ chat, meta }) => { api.addChat(chat); if (meta) setMetadata((current) => [meta, ...current]) }} onAddParticipants={addParticipants} />
          <FederationParticipantsModal open={Boolean(participantsMeta)} participants={participantsMeta?.externalParticipants ?? []} onClose={() => setParticipantsChatId(undefined)} onParticipantSelect={(participantId) => { setProfileBackChatId(participantsChatId); setProfileParticipantId(participantId) }} />
          <FederationParticipantProfile open={Boolean(profileParticipantId)} participant={profileParticipant} organization={profileParticipant ? getFederationOrganization(profileParticipant.organizationId)?.name ?? '' : ''} onBack={profileBackChatId ? () => { setProfileParticipantId(undefined); setParticipantsChatId(profileBackChatId); setProfileBackChatId(undefined) } : undefined} onClose={() => { setProfileParticipantId(undefined); setProfileBackChatId(undefined) }} />
        </>
      }}
    />
  )
}

export function App() {
  const route = import.meta.env.VITE_APP_VARIANT === 'federation'
    ? '/federation'
    : window.location.pathname.replace(/\/$/, '') || '/chats'
  const federationAvailability = getFederationAvailability(federationDemoContext)

  if (route === '/federation' && federationAvailability.visible) {
    return <FederationPage canCreateChat={federationAvailability.canCreateChat} />
  }

  return <ChatExperience />
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { initialChats } from '../mockData'
import { ChatMembersModal } from './ChatMembersModal'
import { ChatProfileModal } from './ChatProfileModal'
import { UserProfile } from './UserProfile'
import { getChatMembers } from './members'

const group = initialChats.find((chat) => chat.id === 'team')!
const channel = initialChats.find((chat) => chat.id === 'design')!
const direct = initialChats.find((chat) => chat.id === 'alexey-smirnov')!
const noop = () => undefined

const meta = { title: 'Chat/Profile', parameters: { layout: 'fullscreen', docs: { description: { component: 'Профили, открываемые кликом по шапке чата: чат, канал, личный чат; список всех участников по алфавиту.' } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const GroupProfile: Story = { render: () => <ChatProfileModal open chat={group} memberCount={getChatMembers(group).length} onClose={noop} onOpenMembers={noop} /> }
export const ChannelProfile: Story = { render: () => <ChatProfileModal open chat={channel} memberCount={getChatMembers(channel).length} onClose={noop} onOpenMembers={noop} /> }
export const Members: Story = { render: () => <ChatMembersModal open members={getChatMembers(group)} onBack={noop} onClose={noop} /> }
export const DirectUserProfile: Story = { render: () => <UserProfile open member={getChatMembers(direct)[0]} onClose={noop} /> }

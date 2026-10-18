import type { Meta, StoryObj } from '@storybook/react-vite'
import { federationParticipants } from './model'
import { FederationParticipantProfile } from './FederationParticipantProfile'

const meta = { title: 'Federation/ParticipantProfile', component: FederationParticipantProfile, parameters: { layout: 'fullscreen', docs: { description: { component: 'Профиль участника открывается по центру экрана.' } } }, args: { open: true, participant: federationParticipants.find((participant) => participant.id === 'albina'), organization: 'Альфа-Банк', onClose: () => undefined } } satisfies Meta<typeof FederationParticipantProfile>
export default meta
type Story = StoryObj<typeof meta>
export const Full: Story = {}
export const WithBack: Story = { args: { onBack: () => undefined } }
export const Compact: Story = { args: { variant: 'compact' } }

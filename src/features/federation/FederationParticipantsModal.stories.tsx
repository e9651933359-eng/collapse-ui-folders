import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationParticipantsModal } from './FederationParticipantsModal'
import { federationChatMetadata } from './model'

const meta = {
  title: 'Federation/FederationParticipantsModal',
  component: FederationParticipantsModal,
  parameters: { layout: 'fullscreen' },
  args: { open: true, participants: federationChatMetadata[1].externalParticipants, onClose: () => undefined },
} satisfies Meta<typeof FederationParticipantsModal>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

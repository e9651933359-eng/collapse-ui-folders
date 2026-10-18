import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationNotice } from './FederationNotice'

const meta = {
  title: 'Federation/FederationNotice',
  component: FederationNotice,
  args: { externalParticipantCount: 3, onOpenParticipants: () => undefined },
  decorators: [(Story) => <div className="federation-notice-story"><Story /></div>],
} satisfies Meta<typeof FederationNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Persistent: Story = {}
export const Compact: Story = { args: { variant: 'compact', externalParticipantCount: 1 } }

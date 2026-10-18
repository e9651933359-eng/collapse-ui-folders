import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationIcon } from './FederationIcon'

const meta = {
  title: 'UI/FederationIcon',
  component: FederationIcon,
  args: { 'aria-label': 'Федерация' },
} satisfies Meta<typeof FederationIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 's' } }
export const ExtraSmall: Story = { args: { size: 'xs' } }

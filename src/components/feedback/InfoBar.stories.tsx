import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoBar } from './InfoBar'

const meta = { title: 'Feedback/Info Bar', component: InfoBar, args: { title: 'Title', supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.', linkLabel: 'Hyper-Link', actionLabel: 'Действие' }, decorators: [(Story) => <div style={{ width: 980, maxWidth: '90vw', padding: 16, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Story /></div>] } satisfies Meta<typeof InfoBar>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Accent: Story = { args: { type: 'accent' } }
export const Warning: Story = { args: { type: 'warning' } }
export const Error: Story = { args: { type: 'error' } }
export const Success: Story = { args: { type: 'success' } }

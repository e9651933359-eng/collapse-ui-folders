import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordHint } from './PasswordHint'

const meta = { title: 'Feedback/PasswordHint', component: PasswordHint, parameters: { layout: 'centered' }, decorators: [(Story) => <div style={{ padding: 40, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Story /></div>] } satisfies Meta<typeof PasswordHint>
export default meta
type Story = StoryObj<typeof meta>
export const Zero: Story = { args: { type: 'zero' } }
export const Low: Story = { args: { type: 'low' } }
export const Medium: Story = { args: { type: 'medium' } }
export const High: Story = { args: { type: 'high' } }
export const AllStates: Story = { render: () => <div style={{ display: 'grid', gap: 24 }}>{(['zero','low','medium','high'] as const).map((type) => <PasswordHint key={type} type={type} />)}</div> }

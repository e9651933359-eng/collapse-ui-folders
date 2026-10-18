import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const sizes = [8,12,16,20,24,28,32,36,40,44,48,56,64,72,80,88,96] as const
const meta = { title: 'Feedback/Skeleton', component: Skeleton, parameters: { layout: 'centered' }, decorators: [(Story) => <div style={{ padding: 40, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Story /></div>] } satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Blocks: Story = { render: () => <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>{sizes.map((size) => <Skeleton key={size} size={size} />)}</div> }
export const Circles: Story = { render: () => <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>{sizes.map((size) => <Skeleton key={size} size={size} type="circle" />)}</div> }
export const ContentPlaceholder: Story = { render: () => <div style={{ width: 360, display: 'flex', gap: 12 }}><Skeleton size={48} type="circle" /><div style={{ flex: 1, display: 'grid', gap: 8 }}><Skeleton width="100%" height={16} /><Skeleton width="70%" height={12} /></div></div> }

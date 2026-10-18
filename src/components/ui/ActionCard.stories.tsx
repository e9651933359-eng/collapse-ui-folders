import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageCircle } from 'lucide-react'
import { ActionCard, ActionCardGroup } from './ActionCard'

const meta = { title: 'UI/ActionCard', component: ActionCard, args: { children: 'Открыть чат', icon: <MessageCircle /> } } satisfies Meta<typeof ActionCard>
export default meta
type Story = StoryObj<typeof meta>

export const Tones: Story = { render: () => <div className="ui-story-row">{(['default', 'accent', 'success', 'warning', 'error'] as const).map((tone) => <ActionCard key={tone} tone={tone} icon={<MessageCircle />}>{tone}</ActionCard>)}</div> }
export const Shapes: Story = { render: () => <div className="ui-story-row">{(['top', 'bottom', 'circular'] as const).map((shape) => <ActionCard key={shape} shape={shape}>{shape}</ActionCard>)}</div> }
export const Disabled: Story = { args: { disabled: true } }
export const Layouts: Story = { render: () => <div className="ui-story-grid">{(['full', 'prominent-bottom', 'split'] as const).map((layout) => <ActionCardGroup key={layout} layout={layout}>{Array.from({ length: layout === 'full' ? 4 : layout === 'prominent-bottom' ? 3 : 2 }, (_, index) => <ActionCard key={index} icon={<MessageCircle />}>{`${layout} ${index + 1}`}</ActionCard>)}</ActionCardGroup>)}</div> }

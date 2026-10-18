import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { SplitButton } from './SplitButton'

const meta = { title: 'UI/SplitButton', component: SplitButton, args: { icon: <Bell />, ariaLabel: 'Уведомить' } } satisfies Meta<typeof SplitButton>
export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = { render: () => <div className="ui-story-row">{(['s', 'm', 'l'] as const).map((size) => <SplitButton key={size} size={size} icon={<Bell />} ariaLabel={`Размер ${size}`} />)}</div> }
export const Tones: Story = { render: () => <div className="ui-story-row">{(['default', 'error', 'warning', 'success'] as const).map((tone) => <SplitButton key={tone} tone={tone} icon={<Bell />} ariaLabel={tone} />)}</div> }
export const Disabled: Story = { args: { disabled: true } }

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { Status } from './Status'

const meta = { title: 'UI/Status', component: Status, args: { children: 'Статус' } } satisfies Meta<typeof Status>
export default meta
type Story = StoryObj<typeof meta>

export const Tones: Story = { render: () => <div className="ui-story-row">{(['default', 'secondary', 'accent', 'warning', 'success', 'error'] as const).map((tone) => <Status key={tone} tone={tone}>{tone}</Status>)}</div> }
export const Sizes: Story = { render: () => <div className="ui-story-row">{(['xs', 's', 'm', 'l'] as const).map((size) => <Status key={size} size={size}>{size.toUpperCase()}</Status>)}</div> }
export const FilledAndIcon: Story = { args: { filled: true, leadingElement: <Bell /> } }
export const Federation: Story = { args: { federation: true, children: 'Гость' } }

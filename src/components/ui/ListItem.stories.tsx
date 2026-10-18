import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRight, User } from 'lucide-react'
import { ListItem } from './ListItem'

const meta = { title: 'UI/ListItem', component: ListItem, args: { label: 'Показать участникам', supporting: 'Supporting line text', overline: 'Overline', leadingElement: <User />, trailingElement: <ChevronRight /> }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof ListItem>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hovered: Story = { args: { className: 'is-hovered' } }
export const Large: Story = { args: { size: 'l' } }
export const Error: Story = { args: { error: true, supporting: 'Действие недоступно' } }
export const Disabled: Story = { args: { disabled: true } }
export const Federation: Story = { args: { federation: true, label: 'Альбина Бахматулина' } }
export const FederationStart: Story = { args: { federation: true, federationIconPosition: 'start', federationIconSize: 'xs', label: 'Альбина Бахматулина' } }
export const ViewOnly: Story = { args: { interactive: false, overline: 'Email', label: 'user_name@alfabank.ru' } }

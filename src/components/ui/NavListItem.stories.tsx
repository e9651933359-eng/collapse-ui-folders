import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'
import { NavListItem } from './NavListItem'

const meta = { title: 'UI/NavListItem', component: NavListItem, decorators: [(Story) => <div className="ui-story-field"><Story /></div>], args: { title: 'Команда', supportingText: '15 участников', leadingElement: <Avatar label="Команда" emoji="К" /> } } satisfies Meta<typeof NavListItem>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { counter: 3, pinned: true } }
export const Selected: Story = { args: { selected: true, badge: 'Работа' } }
export const ActiveCall: Story = { args: { callActive: true, status: 'Идёт звонок' } }
export const Disabled: Story = { args: { disabled: true } }
export const Federation: Story = { args: { federation: true, title: 'Проект с партнёрами' } }

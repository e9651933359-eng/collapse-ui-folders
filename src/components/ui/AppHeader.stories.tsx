import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoreHorizontal, Search } from 'lucide-react'
import { AppHeader } from './AppHeader'
import { Avatar } from './Avatar'
import { IconButton } from './IconButton'

const actions = <><IconButton icon={<Search />} label="Поиск" variant="floating" /><IconButton icon={<MoreHorizontal />} label="Ещё" variant="floating" /></>
const meta = { title: 'UI/AppHeader', component: AppHeader, decorators: [(Story) => <div className="ui-story-field"><Story /></div>], args: { title: 'Команда', supportingText: '15 участников', leadingElement: <Avatar label="Команда" emoji="К" />, actions } } satisfies Meta<typeof AppHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithBack: Story = { args: { onBack: () => undefined } }
export const WithContent: Story = { args: { content: <div>Дополнительная область</div> } }
export const Federation: Story = { args: { federation: true, title: 'Проект с партнёрами' } }

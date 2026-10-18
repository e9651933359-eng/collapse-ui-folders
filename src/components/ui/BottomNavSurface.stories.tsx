import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, MessageCircle, User } from 'lucide-react'
import { BottomNavSurface } from './BottomNavSurface'
import { IconButton } from './IconButton'

const content = <div className="ui-story-row"><IconButton icon={<MessageCircle />} label="Чаты" selected /><IconButton icon={<Bell />} label="Уведомления" /><IconButton icon={<User />} label="Профиль" /></div>
const meta = { title: 'UI/BottomNavSurface', component: BottomNavSurface, decorators: [(Story) => <div className="ui-story-field"><Story /></div>], args: { children: content } } satisfies Meta<typeof BottomNavSurface>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { tone: 'default' } }
export const Accent: Story = { args: { tone: 'accent' } }
export const Clear: Story = { args: { tone: 'clear' } }

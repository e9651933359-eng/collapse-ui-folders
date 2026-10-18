import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquare, X } from 'lucide-react'
import { TextArea } from './TextArea'

const meta = { title: 'UI/TextArea', component: TextArea, args: { label: 'Описание', placeholder: 'Введите текст', supportingText: 'Supporting text' }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof TextArea>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'Многострочный текст для демонстрации компонента.', counter: '49/100' } }
export const WithElements: Story = { args: { leadingElement: <MessageSquare />, trailingElement: <X /> } }
export const Error: Story = { args: { error: true, supportingText: 'Поле заполнено неверно' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Недоступно' } }

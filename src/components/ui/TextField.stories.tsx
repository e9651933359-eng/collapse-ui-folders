import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, X } from 'lucide-react'
import { TextField } from './TextField'

const meta = { title: 'UI/TextField', component: TextField, args: { label: 'Название', placeholder: 'Введите название', supportingText: 'Supporting text' }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'Команда' } }
export const WithElements: Story = { args: { leadingElement: <Search />, trailingElement: <X />, counter: '7/100' } }
export const Error: Story = { args: { error: true, supportingText: 'Исправьте значение' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Недоступно' } }

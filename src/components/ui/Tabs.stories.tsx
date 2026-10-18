import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Archive, Star } from 'lucide-react'
import { Tabs } from './Tabs'

const options = [{ value: 'all', label: 'Все' }, { value: 'important', label: 'Важные', icon: <Star />, counter: 3 }, { value: 'archive', label: 'Архив', icon: <Archive /> }, { value: 'disabled', label: 'Недоступно', disabled: true }]
function InteractiveTabs({ type = 'accent' }: { type?: 'accent' | 'default' | 'line' }) { const [value, setValue] = useState('all'); return <Tabs options={options} value={value} onValueChange={setValue} type={type} /> }
const meta = { title: 'UI/Tabs', component: Tabs, args: { options, value: 'all', onValueChange: () => undefined } } satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

export const Accent: Story = { render: () => <InteractiveTabs /> }
export const Default: Story = { render: () => <InteractiveTabs type="default" /> }
export const Line: Story = { render: () => <InteractiveTabs type="line" />, parameters: { docs: { description: { story: 'Табы с подчёркиванием, Figma my-Base 14589:3328 (Type=Default).' } } } }
export const Overflow: Story = { render: () => <div className="ui-story-narrow"><Tabs options={[...options, ...options.map((option) => ({ ...option, value: `${option.value}-2` }))]} value="all" onValueChange={() => undefined} /></div> }

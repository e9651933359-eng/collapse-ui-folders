import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rate } from './Rate'

function InteractiveRate() { const [value, setValue] = useState(3); return <Rate value={value} onChange={setValue} /> }
const meta = { title: 'UI/Rate', component: Rate, args: { value: 3 } } satisfies Meta<typeof Rate>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveRate /> }
export const Sizes: Story = { render: () => <div className="ui-story-row">{(['s', 'm', 'l'] as const).map((size) => <Rate key={size} value={4} size={size} />)}</div> }
export const Disabled: Story = { args: { disabled: true } }

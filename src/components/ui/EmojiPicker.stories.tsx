import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmojiPicker } from './EmojiPicker'

function InteractivePicker() { const [selected, setSelected] = useState(''); return <div><EmojiPicker onSelect={setSelected} />{selected && <p aria-live="polite">Выбрано: {selected}</p>}</div> }
const meta = { title: 'UI/EmojiPicker', component: EmojiPicker } satisfies Meta<typeof EmojiPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <InteractivePicker /> }
export const Empty: Story = { args: { categories: [] } }

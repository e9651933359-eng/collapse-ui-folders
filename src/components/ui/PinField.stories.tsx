import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PinField } from './PinField'

function InteractivePinField({ length = 4, masked = true }: { length?: 4 | 6; masked?: boolean }) { const [value, setValue] = useState(''); return <PinField value={value} onChange={setValue} length={length} masked={masked} /> }
const meta = { title: 'UI/PinField', component: PinField, args: { value: '', onChange: () => undefined } } satisfies Meta<typeof PinField>
export default meta
type Story = StoryObj<typeof meta>

export const FourDigitsMasked: Story = { render: () => <InteractivePinField /> }
export const SixDigitsVisible: Story = { render: () => <InteractivePinField length={6} masked={false} /> }
export const Completed: Story = { args: { value: '7351', onChange: () => undefined, masked: false } }
export const Disabled: Story = { args: { value: '73', onChange: () => undefined, disabled: true } }

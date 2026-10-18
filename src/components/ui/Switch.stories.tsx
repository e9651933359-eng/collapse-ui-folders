import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

function InteractiveSwitch() { const [selected, setSelected] = useState(false); return <Switch selected={selected} onChange={setSelected} label="Уведомления" /> }

const meta = { title: 'UI/Switch', component: Switch, args: { selected: true, label: 'Уведомления' } } satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveSwitch /> }
export const On: Story = {}
export const Off: Story = { args: { selected: false } }
export const HoveredOn: Story = { args: { hovered: true } }
export const HoveredOff: Story = { args: { selected: false, hovered: true } }
export const PressedOn: Story = { args: { pressed: true } }
export const PressedOff: Story = { args: { selected: false, pressed: true } }
export const DisabledOn: Story = { args: { disabled: true } }
export const DisabledOff: Story = { args: { selected: false, disabled: true } }

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/Button'
import { Popover } from './Popover'

const meta = { title: 'Feedback/Popover', component: Popover, parameters: { layout: 'centered' }, args: { children: <Button>Открыть</Button>, content: <div style={{ width: 220, padding: 12 }}>Контент Popover<br /><button type="button">Действие</button></div> } } satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>
export const Interactive: Story = { render: (args) => <div style={{ padding: 160, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Popover {...args}><Button>Открыть</Button></Popover></div> }
export const GapClear: Story = { args: { defaultOpen: true, gap: 'clear' }, render: (args) => <div style={{ padding: 160, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Popover {...args}><Button>Открыть</Button></Popover></div> }

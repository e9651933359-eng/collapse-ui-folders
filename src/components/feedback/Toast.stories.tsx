import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Toast } from './Toast'

function TimedToast() { const [key, setKey] = useState(0); return <div style={{ minHeight: 120, display: 'grid', gap: 20, placeItems: 'center' }}><Button onClick={() => setKey((value) => value + 1)}>Показать снова</Button><Toast key={key}>Пароль сохранён!</Toast></div> }
const meta = { title: 'Feedback/Toast', component: Toast, args: { children: 'Title', duration: 0 }, parameters: { layout: 'centered' }, decorators: [(Story) => <div style={{ minWidth: 560, minHeight: 160, padding: 40, display: 'grid', placeItems: 'center', borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Story /></div>] } satisfies Meta<typeof Toast>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Success: Story = { args: { type: 'success', children: 'Пароль сохранён!' } }
export const Accent: Story = { args: { type: 'accent', children: 'Изменения применены' } }
export const LongFixed: Story = { args: { fixedContainer: true, children: 'A very long title to fit a lot of text. Text can go here.' } }
export const FolderCreated: Story = { args: { children: 'Папка создана', icon: <img src="assets/figma/ic-message-check-outline.svg" alt="" aria-hidden="true" /> } }
export const AutoDismissAfterThreeSeconds: Story = { render: () => <TimedToast /> }

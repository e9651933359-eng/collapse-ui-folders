import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { SnackBar } from './SnackBar'

function Dismissible() { const [open, setOpen] = useState(true); return open ? <SnackBar title="Файл удалён" supporting="Действие можно отменить" actionLabel="Отменить" onAction={() => setOpen(false)} onClose={() => setOpen(false)} /> : <Button onClick={() => setOpen(true)}>Показать</Button> }
const meta = { title: 'Feedback/SnackBar', component: SnackBar, args: { title: 'Title', supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.', actionLabel: 'Label' }, parameters: { layout: 'centered' }, decorators: [(Story) => <div style={{ minWidth: 520, padding: 40, display: 'grid', placeItems: 'center', borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Story /></div>] } satisfies Meta<typeof SnackBar>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Warning: Story = { args: { type: 'warning' } }
export const Error: Story = { args: { type: 'error' } }
export const Loading: Story = { args: { loading: true } }
export const WithoutSupportingOrButtons: Story = { args: { supporting: undefined, actionLabel: undefined, closable: false } }
export const DismissAndAction: Story = { render: () => <Dismissible /> }

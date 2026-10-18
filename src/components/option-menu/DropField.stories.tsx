import { Folder } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DropField } from './DropField'

const options = [{ id: 'names', label: 'Только названия' }, { id: 'preview', label: 'Названия и превью' }, { id: 'disabled', label: 'Недоступный вариант', disabled: true }]
function Demo({ error, disabled }: { error?: string; disabled?: boolean }) { const [value, setValue] = useState('names'); return <div style={{ width: 620, minHeight: 430, paddingTop: 80, display: 'grid', placeItems: 'start center', borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><DropField label="Отображение папок" leadingIcon={<Folder />} options={options} value={value} onChange={setValue} error={error} disabled={disabled} supporting="Выберите вид списка" /></div> }
const meta = { title: 'Option Menu/Drop Field', component: DropField, args: { options, label: 'Отображение папок' }, parameters: { layout: 'centered' } } satisfies Meta<typeof DropField>
export default meta
type Story = StoryObj<typeof meta>
export const Interactive: Story = { render: () => <Demo /> }
export const Error: Story = { render: () => <Demo error="Выберите значение" /> }
export const Disabled: Story = { render: () => <Demo disabled /> }

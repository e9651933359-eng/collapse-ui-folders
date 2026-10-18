import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'

const columns = [{ key: 'name', title: 'Название', description: 'Чат или канал' }, { key: 'members', title: 'Участники' }]
const rows = [{ id: 'design', name: 'Дизайн', members: '18' }, { id: 'team', name: 'Команда', members: '15' }, { id: 'archive', name: 'Архив', members: '—', disabled: true }]
function SelectionTable({ mode }: { mode: 'radio' | 'checkbox' }) { const [selectedIds, setSelectedIds] = useState<string[]>(['team']); return <Table columns={columns} rows={rows} selectionMode={mode} selectedIds={selectedIds} onSelectionChange={setSelectedIds} /> }
const meta = { title: 'UI/Table', component: Table, args: { columns, rows } } satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const RadioSelection: Story = { render: () => <SelectionTable mode="radio" /> }
export const CheckBoxSelection: Story = { render: () => <SelectionTable mode="checkbox" /> }
export const Federation: Story = { args: { columns: [{ key: 'name', title: 'Сотрудник', federation: true }, { key: 'members', title: 'Организация' }], rows: [{ id: 'external', name: 'Альбина Бахматулина', members: 'Партнёр', federation: true }] } }

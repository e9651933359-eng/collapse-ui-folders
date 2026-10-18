import { Bell, Copy, Download, Share2, Trash2 } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Menu, type OptionMenuItem } from './Menu'

const items: OptionMenuItem[] = [
  { id: 'copy', label: 'Копировать', leading: <Copy />, trailingText: '⌘C' },
  { id: 'share', label: 'Поделиться', supporting: 'Доступ и ссылка', leading: <Share2 />, submenu: [{ id: 'link', label: 'Скопировать ссылку' }, { id: 'invite', label: 'Пригласить участника' }] },
  { id: 'notify', label: 'Уведомления', leading: <Bell />, kind: 'switch', selected: true },
  { id: 'export', label: 'Скачать', leading: <Download />, disabled: true },
  { id: 'delete', label: 'Удалить без подтверждения', leading: <Trash2 />, error: true },
]

function InteractiveMenu({ source = items }: { source?: OptionMenuItem[] }) { const [selected, setSelected] = useState(''); return <div><Menu ariaLabel="Меню действий" items={source} onSelect={(item) => setSelected(item.label)} /><p aria-live="polite">{selected && `Выбрано: ${selected}`}</p></div> }
const meta = { title: 'Option Menu/Menu', component: Menu, args: { ariaLabel: 'Меню действий', items }, parameters: { layout: 'centered' } } satisfies Meta<typeof Menu>
export default meta
type Story = StoryObj<typeof meta>
export const StandardAndNested: Story = { render: () => <InteractiveMenu /> }
export const AutoFocusWithDefaultVisualState: Story = {
  args: { autoFocus: true, items: [{ id: 'manage', label: 'Управлять папками' }] },
  parameters: { docs: { description: { story: 'Автофокус не включает Hover. Наведение подсвечивает пункт только пока указатель находится над ним.' } } },
}
export const DisabledAndErrorItems: Story = {}
export const Loading: Story = { args: { status: 'loading' } }
export const Fail: Story = { args: { status: 'fail' } }
export const LongScrollable: Story = { render: () => <InteractiveMenu source={Array.from({ length: 14 }, (_, index) => ({ id: `${index}`, label: `Пункт меню ${index + 1}`, supporting: index % 2 ? 'Вспомогательный текст' : undefined }))} /> }
export const Federation: Story = { args: { items: [{ id: 'external', label: 'Альбина Бахматулина', supporting: 'Другая организация', federation: true }] } }

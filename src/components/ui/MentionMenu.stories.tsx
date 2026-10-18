import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MentionMenu } from './MentionMenu'
import type { MentionMenuItem } from './MentionMenu'

const items: MentionMenuItem[] = [
  { id: 'alexander-afanasiev', name: 'Александр Афанасьев', username: 'alexander.afanasiev', initials: 'АА' },
  { id: 'alexander-gerasimov', name: 'Александр Герасимов', username: 'alexander.gerasimov', initials: 'АГ', status: 'online' },
  { id: 'alexey-sukhanov', name: 'Алексей Суханов', username: 'alexey.sukhanov', initials: 'АС' },
  { id: 'alexey-fomin', name: 'Алексей Фомин', username: 'Alexey Fomin', initials: 'АФ' },
  { id: 'anastasia-khudyakova', name: 'Анастасия Худякова', username: 'a.khudyakova', initials: 'АХ', status: 'online' },
  { id: 'anna-filipova', name: 'Анна Филипова', username: 'a.filipova', initials: 'АФ' },
]

function InteractiveMentionMenu() {
  const [selected, setSelected] = useState<MentionMenuItem | null>(null)
  return <div><MentionMenu items={items} onSelect={setSelected} />{selected && <p aria-live="polite">Выбрано: {selected.name}</p>}</div>
}

const meta = {
  title: 'UI/MentionMenu',
  component: MentionMenu,
  args: { items, onSelect: () => undefined },
  decorators: [(Story) => <div style={{ minHeight: 360, padding: 32 }}><Story /></div>],
} satisfies Meta<typeof MentionMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <InteractiveMentionMenu /> }
export const Empty: Story = { args: { items: [] } }

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, ChevronDown, X } from 'lucide-react'
import { Chip } from './Chip'

function InteractiveFilter() { const [selected, setSelected] = useState(false); return <Chip kind="filter" selected={selected} leadingElement={<Check />} trailingElement={<ChevronDown />} onClick={() => setSelected((value) => !value)}>Фильтр</Chip> }
const meta = { title: 'UI/Chip', component: Chip, args: { children: 'Label' } } satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>

export const Filter: Story = { render: () => <InteractiveFilter /> }
export const Kinds: Story = { render: () => <div className="ui-story-row"><Chip kind="filter" trailingElement={<ChevronDown />}>Filter</Chip><Chip kind="assistive">Assistive</Chip><Chip kind="multiple" selected>Multiple</Chip><Chip kind="list" trailingElement={<X />}>List</Chip><Chip kind="open" trailingElement={<ChevronDown />}>Open</Chip></div> }
export const Tones: Story = { render: () => <div className="ui-story-row">{(['default', 'accent-light', 'accent', 'success', 'warning', 'error'] as const).map((tone) => <Chip key={tone} kind="assistive" tone={tone}>{tone}</Chip>)}</div> }
export const States: Story = { render: () => <div className="ui-story-row"><Chip selected>Selected</Chip><Chip disabled>Disabled</Chip><Chip className="is-hovered">Hovered</Chip></div> }

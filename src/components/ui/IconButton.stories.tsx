import type { Meta, StoryObj } from '@storybook/react-vite'
import { Phone } from 'lucide-react'
import { IconButton } from './IconButton'

const meta = { title: 'UI/IconButton', component: IconButton, args: { label: 'Позвонить', icon: <Phone /> } } satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { size: 's' } }
export const Floating: Story = { args: { variant: 'floating' } }
export const FloatingHovered: Story = { args: { variant: 'floating', className: 'is-hovered' } }
export const Selected: Story = { args: { selected: true } }
export const Sizes: Story = { render: () => <div className="ui-story-row">{(['s', 'm', 'l'] as const).map((size) => <IconButton key={size} size={size} label={`Размер ${size}`} icon={<Phone />} />)}</div> }
export const Priorities: Story = { render: () => <div className="ui-story-row">{(['primary', 'accent', 'secondary', 'tertiary'] as const).map((priority) => <IconButton key={priority} priority={priority} label={priority} icon={<Phone />} />)}</div> }
export const DisabledAndLoading: Story = { render: () => <div className="ui-story-row"><IconButton disabled label="Недоступно" icon={<Phone />} /><IconButton loading label="Загрузка" icon={<Phone />} /></div> }

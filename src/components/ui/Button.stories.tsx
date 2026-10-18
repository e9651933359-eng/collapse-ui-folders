import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Создать папку', priority: 'secondary', size: 's' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const SecondarySmall: Story = {}
export const SecondarySmallHovered: Story = { args: { className: 'is-hovered' } }
export const Priorities: Story = {
  render: () => <div className="ui-story-row">{(['primary', 'accent', 'secondary', 'tertiary'] as const).map((priority) => <Button key={priority} priority={priority} leadingIcon={<Plus />}>{priority}</Button>)}</div>,
}
export const Sizes: Story = {
  render: () => <div className="ui-story-row">{(['s', 'm', 'l'] as const).map((size) => <Button key={size} size={size}>{size.toUpperCase()}</Button>)}</div>,
}
export const SemanticAndSystemStates: Story = {
  render: () => <div className="ui-story-row"><Button priority="accent" intent="error">Ошибка</Button><Button priority="accent" intent="success">Готово</Button><Button disabled>Недоступно</Button><Button loading>Загрузка</Button></div>,
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Counter } from './Counter'

const meta = { title: 'UI/Counter', component: Counter, args: { children: 3 } } satisfies Meta<typeof Counter>
export default meta
type Story = StoryObj<typeof meta>

export const Tones: Story = { render: () => <div className="ui-story-row">{(['negative', 'accent', 'warning', 'default'] as const).map((tone) => <Counter key={tone} tone={tone}>12</Counter>)}</div> }
export const Sizes: Story = { render: () => <div className="ui-story-row"><Counter size="s">3</Counter><Counter size="s">12</Counter><Counter size="m">3</Counter><Counter size="m">12</Counter></div> }
export const Emphasis: Story = { render: () => <div className="ui-story-row">{(['primary', 'secondary', 'tertiary'] as const).map((emphasis) => <Counter key={emphasis} emphasis={emphasis}>{emphasis}</Counter>)}</div> }
export const Shapes: Story = { render: () => <div className="ui-story-row"><Counter tone="accent" shape="default">3</Counter><Counter shape="expressive">12</Counter></div> }

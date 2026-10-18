import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface } from './Surface'

const meta = { title: 'UI/Surface', component: Surface, args: { children: <div className="ui-story-grid">Контент поверхности</div> }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof Surface>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Clear: Story = { args: { surface: 'clear' } }
export const Gradient: Story = { args: { background: 'gradient' } }
export const Shapes: Story = { render: () => <div className="ui-story-grid">{(['default', 'left', 'right'] as const).map((shape) => <Surface key={shape} shape={shape}><div className="ui-story-grid">{shape}</div></Surface>)}</div> }

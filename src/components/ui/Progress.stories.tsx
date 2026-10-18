import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta = { title: 'UI/Progress', component: Progress, args: { value: 50 }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Determinate: Story = {}
export const Steps: Story = { render: () => <div className="ui-story-grid">{[0, 10, 30, 50, 80, 100].map((value) => <Progress key={value} value={value} label={`${value}%`} />)}</div> }
export const Indeterminate: Story = { args: { indeterminate: true } }

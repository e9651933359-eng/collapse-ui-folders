import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField } from './SearchField'

const meta = { title: 'UI/SearchField', component: SearchField, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

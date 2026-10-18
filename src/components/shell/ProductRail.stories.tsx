import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductRail } from './ProductRail'

const meta = {
  title: 'Shell/ProductRail',
  component: ProductRail,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ height: 760 }}><Story /></div>],
} satisfies Meta<typeof ProductRail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModalHeader } from './ModalHeader'

const meta = {
  title: 'UI/ModalHeader',
  component: ModalHeader,
  parameters: { layout: 'centered' },
  args: {
    onClose: () => undefined,
    title: 'Выберите чаты и каналы',
  },
  decorators: [(Story) => <div className="ui-story-field"><Story /></div>],
} satisfies Meta<typeof ModalHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithBackAction: Story = { args: { onBack: () => undefined } }

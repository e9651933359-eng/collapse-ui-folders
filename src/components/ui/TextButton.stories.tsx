import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextButton } from './TextButton'

const meta = {
  title: 'UI/TextButton',
  component: TextButton,
  args: { children: 'Изменить' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TextButton>

export default meta
type Story = StoryObj<typeof meta>

export const States: Story = {
  render: () => (
    <div className="ui-story-row">
      <TextButton>Изменить</TextButton>
      <TextButton tone="base">Выбрать чаты и каналы</TextButton>
      <TextButton disabled>Недоступно</TextButton>
    </div>
  ),
}

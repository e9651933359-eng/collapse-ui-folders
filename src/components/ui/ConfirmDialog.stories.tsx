import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmDialog } from './ConfirmDialog'

const meta = {
  title: 'UI/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    title: <>Вы уверены, что хотите удалить<br />папку «Моя папка»?</>,
    description: <>Папка будет удалена. Чаты<br />и каналы останутся в разделе «Все»</>,
    confirmLabel: 'Удалить',
    onCancel: () => undefined,
    onConfirm: () => undefined,
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>
export const DeleteFolder: Story = {}
export const FederationParticipant: Story = { args: { intent: 'default', title: <>Вы добавляете участника<br />из другой организации</>, description: 'Участник получит доступ к сообщениям и файлам этой переписки', confirmLabel: 'Продолжить' } }

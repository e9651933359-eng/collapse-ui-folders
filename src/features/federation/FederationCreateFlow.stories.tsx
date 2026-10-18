import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationCreateFlow } from './FederationCreateFlow'

const meta = { title: 'Federation/CreateFlow', component: FederationCreateFlow, parameters: { layout: 'fullscreen' }, args: { open: true, mode: 'start', onClose: () => undefined, onCreate: () => undefined } } satisfies Meta<typeof FederationCreateFlow>
export default meta
type Story = StoryObj<typeof meta>
export const StartChat: Story = { parameters: { docs: { description: { story: 'В МТС 30 сотрудников с фотографиями. Прокручивается только список: заголовок с действиями, поиск и выбор организации остаются на месте.' } } } }
export const GroupCreation: Story = { parameters: { docs: { description: { story: 'Иконка группового чата открывает алфавитный список участников. Вся строка переключает выбор, а чекбокс показывает состояние. После «Добавить» или «Пропустить» открываются параметры новой группы в модальном окне с высотой по содержимому.' } } } }
export const NewChannel: Story = { args: { mode: 'channel' } }

import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationTag } from './FederationTag'

const meta = { title: 'Base/FederationTag', component: FederationTag, parameters: { docs: { description: { component: 'Плашка «Участник из другой организации». Figma 40000074:62321, 6932:42733. Только отображение, не интерактивна.' } } } } satisfies Meta<typeof FederationTag>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { children: 'Участник из другой организации' } }

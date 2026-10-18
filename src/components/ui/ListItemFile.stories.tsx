import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListItemFile } from './ListItemFile'

const meta = { title: 'UI/ListItemFile', component: ListItemFile, args: { fileName: 'Логотип компании.png', meta: '56,3 MB', extension: 'PNG' }, decorators: [(Story) => <div className="ui-story-field"><Story /></div>] } satisfies Meta<typeof ListItemFile>
export default meta
type Story = StoryObj<typeof meta>

export const Enabled: Story = { args: { onDelete: () => undefined, onMore: () => undefined } }
export const Loading: Story = {
  args: { state: 'loading', meta: '3,0 МБ / 5,0 МБ', progress: 30, background: 'secondary', size: 's' },
  parameters: { docs: { description: { story: 'Загрузка отображается статичной иконкой файла и прогрессом без вращения.' } } },
}
export const Error: Story = { args: { state: 'error', onDelete: () => undefined } }
export const Folder: Story = { args: { fileName: 'Название папки', extension: 'folder', meta: 'Папка на МТС Диске', background: 'secondary', size: 's' }, parameters: { docs: { description: { story: 'Иконка папки — Figma 8734:83895 (40×40, папка 28 px).' } } } }
export const Secondary: Story = { args: { background: 'secondary' } }
export const Document: Story = { args: { fileName: 'Документ.docx', meta: '9 КБ', extension: 'DOCX', size: 's', background: 'secondary', onDelete: () => undefined } }
export const Video: Story = { args: { fileName: 'Federation_video.mp4', meta: '1,9 МБ', extension: 'MP4', size: 's', background: 'secondary', onDelete: () => undefined } }
export const ErrorWithRetry: Story = { args: { state: 'error', size: 's', background: 'secondary', fileName: 'network-report.docx', errorText: 'Не удалось загрузить', onRetry: () => undefined, onDelete: () => undefined, extension: 'docx' } }
export const ErrorSizeLimit: Story = { args: { state: 'error', size: 's', background: 'secondary', fileName: 'Видео.mov', errorText: 'Файл слишком большой', onDelete: () => undefined, extension: 'mov' } }

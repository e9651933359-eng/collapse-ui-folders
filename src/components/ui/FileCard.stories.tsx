import type { Meta, StoryObj } from '@storybook/react-vite'
import { Folder } from 'lucide-react'
import { FileCard } from './FileCard'
import { FilePreviewStub } from './FilePreviewStub'
import { Menu } from '../option-menu/Menu'

const menu = <Menu ariaLabel="Действия с файлом" items={[{ id: 'copy', label: 'Скопировать ссылку' }, { id: 'remove', label: 'Убрать предпросмотр' }]} />
const disk = <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Folder size={16} fill="currentColor" stroke="none" />disk.mts-link.ru</span>

const meta = { title: 'UI/FileCard', component: FileCard, args: { title: 'Название файла.xls', meta: disk, extension: 'xls', onOpen: () => undefined, moreContent: menu } } satisfies Meta<typeof FileCard>
export default meta
type Story = StoryObj<typeof meta>

export const Spreadsheet: Story = {}
export const Document: Story = { args: { title: 'Бриф на редизайн.docx', extension: 'docx' } }
export const Presentation: Story = { args: { title: 'Roadmap 2027.pptx', extension: 'pptx' } }
export const Pdf: Story = { args: { title: 'Гайд по бренду.pdf', extension: 'pdf' } }
export const WithoutPreview: Story = { args: { preview: null } }
export const Forbidden: Story = { args: { state: 'forbidden', title: 'Нет доступа к файлу', meta: 'Нет доступа', extension: 'unk', moreContent: undefined } }
export const WithoutMenu: Story = { args: { moreContent: undefined } }
export const PreviewStubs: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 424 }}>
      {['xls', 'docx', 'pptx', 'pdf'].map((extension) => <div key={extension} style={{ height: 76, border: '1px solid var(--collapse-color-border-opacity-base-tertiary-dim)' }}><FilePreviewStub extension={extension} seed="story" /></div>)}
    </div>
  ),
  parameters: { docs: { description: { story: 'Заглушка миниатюры: случайная разметка по типу файла, а не настоящее содержимое.' } } },
}

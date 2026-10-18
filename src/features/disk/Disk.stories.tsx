import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { DiskRedirectModal } from './DiskRedirectModal'
import { DiskAttachmentRow, LinkPreviewCard } from './DiskMessageItems'
import { DiskPickerModal } from './DiskPickerModal'
import { DiskToastHost } from './DiskToastHost'
import { diskFileUrl, diskFolderUrl } from './model'

const meta = { title: 'Disk/Scenarios', decorators: [(Story) => <div className="ui-story-field"><Story /><DiskToastHost /></div>] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Picker: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [picked, setPicked] = useState<string[]>([])
    return (
      <>
        <Button priority="primary" size="m" onClick={() => setOpen(true)}>Выбрать с МТС Диска</Button>
        <p>Прикреплено: {picked.join(', ') || 'ничего'}</p>
        <DiskPickerModal open={open} onClose={() => setOpen(false)} onAttach={(files) => setPicked(files.map((file) => file.name))} />
      </>
    )
  },
}

export const Redirect: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return <><Button size="m" onClick={() => setOpen(true)}>Открыть Диск</Button><DiskRedirectModal open={open} onClose={() => setOpen(false)} /></>
  },
}

export const SentFile: Story = {
  render: () => <DiskAttachmentRow attachment={{ id: 'a1', name: 'Бриф на редизайн.docx', size: 1258291, type: '', disk: { source: 'disk', url: diskFileUrl('f1'), fileId: 'f1' } }} onRemove={() => undefined} />,
}

export const SentFolder: Story = {
  render: () => <DiskAttachmentRow attachment={{ id: 'a2', name: 'Проекты', size: 0, type: '', disk: { source: 'disk', url: diskFolderUrl('fo1'), fileId: 'fo1', kind: 'folder' } }} onRemove={() => undefined} />,
}

export const SentLink: Story = {
  render: () => <LinkPreviewCard onRemove={() => undefined} preview={{ id: 'l1', url: diskFileUrl('f3'), title: 'Презентация для клиента.pptx', meta: 'МТС Диск · Я', extension: 'pptx', status: 'ready' }} />,
}

export const SentLinkForbidden: Story = {
  render: () => <LinkPreviewCard preview={{ id: 'l2', url: diskFileUrl('x1'), title: 'Нет доступа к файлу', meta: 'МТС Диск', extension: 'unk', status: 'forbidden' }} />,
}

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { FolderManagementModal } from './FolderManagementModal'
import type { ManagedFolder, SystemFolder } from './FolderManagementModal'
import type { SegmentDisplayMode } from './SegmentControls'

const candidates = [
  { id: 'design', label: 'Дизайн', avatar: '🎨', avatarTone: 'linear-gradient(145deg,#007fff,#ffce4a)', shape: 'squircle' as const },
  { id: 'team', label: 'Команда', avatar: '◒', avatarTone: 'linear-gradient(145deg,#ff215d,#ff7c47 35%,#7047fe 68%,#00c8ff)' },
  { id: 'mts', label: 'МТС', avatar: 'М Т С', avatarTone: '#e93347' },
  { id: 'updates', label: 'Обновления продукта', avatar: '👀', avatarTone: '#53c985', shape: 'squircle' as const },
]

function ModalDemo() {
  const [open, setOpen] = useState(true)
  const [enabledFolders, setEnabledFolders] = useState<SystemFolder[]>(['new'])
  const [displayMode, setDisplayMode] = useState<SegmentDisplayMode>('names')
  const [customFolders, setCustomFolders] = useState<ManagedFolder[]>([
    { id: 'folder-product', label: 'Продукт', emoji: '🔥', chatIds: ['design', 'updates'] },
    { id: 'folder-team', label: 'Команда', emoji: '💚', chatIds: ['team'] },
    { id: 'folder-default', label: 'Без эмодзи', chatIds: [] },
  ])

  return (
    <div className="folder-modal-story-canvas">
      {!open && (
        <Button type="button" onClick={() => setOpen(true)}>
          Открыть управление папками
        </Button>
      )}
      <FolderManagementModal
        open={open}
        candidates={candidates}
        customFolders={customFolders}
        enabledSystemFolders={enabledFolders}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        onCreateFolder={(folder) => setCustomFolders((current) => [...current, { ...folder, id: `folder-${current.length + 1}` }])}
        onReorderCustomFolders={(ids) => setCustomFolders((current) => ids.flatMap((id) => current.find((folder) => folder.id === id) ?? []))}
        onUpdateFolder={(id, folder) => setCustomFolders((current) => current.map((item) => item.id === id ? { ...item, ...folder } : item))}
        onSystemFolderChange={(folder, enabled) => setEnabledFolders((current) => enabled ? [...current, folder] : current.filter((item) => item !== folder))}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

const meta = {
  title: 'UI/FolderManagementModal',
  component: FolderManagementModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FolderManagementModal>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  args: { open: true, candidates, displayMode: 'names', onDisplayModeChange: () => undefined, onClose: () => undefined },
  render: () => <ModalDemo />,
  parameters: { docs: { description: { story: 'Все экраны модалки используют общий предел 700 px и сохраняют минимум 16 px до краёв экрана.' } } },
}

export const CreateFromChatContext: Story = {
  args: {
    open: true,
    initialView: 'create',
    initialSelectedChatIds: ['team'],
    candidates,
    displayMode: 'names',
    onDisplayModeChange: () => undefined,
    onClose: () => undefined,
  },
}

export const EditExistingFolder: Story = {
  args: {
    open: true,
    initialView: 'edit',
    initialFolderId: 'folder-notifications',
    customFolders: [
      { id: 'folder-notifications', label: 'Уведомления', emoji: '🔔', chatIds: [] },
    ],
    candidates,
    displayMode: 'names',
    onDisplayModeChange: () => undefined,
    onUpdateFolder: () => undefined,
    onClose: () => undefined,
  },
}

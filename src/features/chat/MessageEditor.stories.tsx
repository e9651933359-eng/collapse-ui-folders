import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { MessageEditor } from './MessageEditor'
import type { MessageEditorPayload } from './MessageEditor'
import { DiskToastHost } from '../disk/DiskToastHost'
import { FederationNotice } from '../federation/FederationNotice'

const meta = {
  title: 'Chat/MessageEditor',
  component: MessageEditor,
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/EyCGbFUOroCmeeGpFT5NQ5/?node-id=337-1351' } },
} satisfies Meta<typeof MessageEditor>
export default meta
type Story = StoryObj<typeof meta>

function InteractiveEditor(props: Partial<React.ComponentProps<typeof MessageEditor>> = {}) {
  const [value, setValue] = useState('')
  const [lastSent, setLastSent] = useState<MessageEditorPayload>()
  return <div className="message-editor-story"><MessageEditor {...props} value={value} onChange={setValue} onSend={(payload) => { setLastSent(payload); setValue('') }} /><DiskToastHost />{lastSent && <p aria-live="polite">Отправлено: {lastSent.text || `${lastSent.attachments.length} файл(а)`}</p>}</div>
}

export const Empty: Story = { args: { value: '', onChange: () => undefined, onSend: () => undefined } }
export const Filled: Story = { args: { value: 'Привет! Как дела?', onChange: () => undefined, onSend: () => undefined } }
export const MaxWidth: Story = { args: Filled.args, parameters: { layout: 'fullscreen' } }
export const Federation: Story = { args: { federation: true, topPanel: <FederationNotice variant="compact" externalParticipantCount={1} />, value: '', onChange: () => undefined, onSend: () => undefined } }
export const Interactive: Story = {
  args: { value: '', onChange: () => undefined, onSend: () => undefined },
  render: () => <InteractiveEditor />,
}
export const DiskScenarios: Story = {
  args: { value: '', onChange: () => undefined, onSend: () => undefined },
  render: () => <InteractiveEditor />,
  parameters: { docs: { description: { story: 'Кнопка папки открывает МТС Диск. Вставьте https://disk.mts.ru/f/f1 (доступная ссылка) или https://disk.mts.ru/f/x1 (нет прав). Демо-файлы: >100 МБ — лимит, 50–100 МБ — квота, .exe — формат не поддерживается, «network» в имени — обрыв связи, «gone» — файл недоступен.' } } },
}

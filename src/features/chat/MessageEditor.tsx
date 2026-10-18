import { FolderOpen } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ChangeEvent, ClipboardEvent, DragEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Popover } from '../../components/feedback/Popover'
import { EmojiPicker } from '../../components/ui/EmojiPicker'
import { IconButton } from '../../components/ui/IconButton'
import { ListItemFile } from '../../components/ui/ListItemFile'
import { MentionMenu } from '../../components/ui/MentionMenu'
import type { DiskRef, LinkPreview } from '../../types/disk'
import { DiskPickerModal } from '../disk/DiskPickerModal'
import { isUrl, resolveLink } from '../disk/mockDisk'
import type { DiskFile } from '../disk/mockDisk'
import { DISK_ERROR_TEXT, diskFileUrl, diskFolderUrl, extensionOf, formatBytes as formatDiskBytes } from '../disk/model'
import type { DiskErrorKind } from '../disk/model'
import { DiskStoredMeta } from '../disk/DiskMeta'
import { notify } from '../disk/toast'
import { simulateUpload } from '../disk/upload'
import type { UploadTarget } from '../disk/upload'
import { foldersFromInput, readDropped, validateLocalFolder } from '../disk/localFolder'
import type { LocalFolder } from '../disk/localFolder'
import { Menu } from '../../components/option-menu/Menu'

export type MessageEditorAttachment = {
  id: string
  name: string
  size: number
  type: string
  /** Есть у файлов, которые лежат на МТС Диске (выбраны с Диска или загружены на него). */
  disk?: DiskRef
}

export type MessageEditorPayload = {
  text: string
  attachments: MessageEditorAttachment[]
  linkPreview?: LinkPreview
}

type UploadAttachment = MessageEditorAttachment & {
  previewUrl?: string
  progress: number
  status: 'loading' | 'ready' | 'error'
  error?: DiskErrorKind
  /** Номер авто-повтора при обрыве связи. */
  retry?: number
  file?: File
  /** Локальная папка: загружается одним объектом, `error` — итог проверок. */
  folder?: { count: number; error?: DiskErrorKind }
}

type EditorLink = LinkPreview & { loading?: boolean }

type MessageEditorProps = {
  federation?: boolean
  topPanel?: ReactNode
  value: string
  onChange: (value: string) => void
  onSend: (payload: MessageEditorPayload) => void
}

const mentions = [
  { id: 'anna', name: 'Анна Иванова', username: 'anna.ivanova', initials: 'АИ', status: 'online' as const },
  { id: 'mikhail', name: 'Михаил', username: 'mikhail', initials: 'МИ', image: 'assets/figma/message-avatar-photo.png' },
  { id: 'maria', name: 'Мария', username: 'maria', initials: 'МА' },
  { id: 'olga', name: 'Ольга', username: 'olga', initials: 'ОЛ' },
  { id: 'alexey', name: 'Алексей Суханов', username: 'alexey.sukhanov', initials: 'АС' },
  { id: 'anastasia', name: 'Анастасия Худякова', username: 'a.khudyakova', initials: 'АХ', status: 'online' as const },
]

const asset = (name: string) => `assets/figma/ic-message-${name}.svg${name === 'link-outline' ? '?v=2' : ''}`
const icon = (name: string) => <img src={asset(name)} alt="" aria-hidden="true" />

const formatBytes = formatDiskBytes

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const rest = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${rest}`
}

export function MessageEditor({ federation = false, topPanel, value, onChange, onSend }: MessageEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const cancelUploads = useRef(new Map<string, () => void>())
  const linkTimer = useRef<number | undefined>(undefined)
  const previewUrls = useRef(new Set<string>())
  const [attachments, setAttachments] = useState<UploadAttachment[]>([])
  const [link, setLink] = useState<EditorLink>()
  const [attachOpen, setAttachOpen] = useState(false)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [formattingOpen, setFormattingOpen] = useState(false)
  const [mentionOpen, setMentionOpen] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState<number | null>(null)
  const isRecording = recordingSeconds !== null

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    const maxHeight = Number.parseFloat(getComputedStyle(textarea).getPropertyValue('--collapse-size-message-editor-input-max'))
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight || textarea.scrollHeight)}px`
  }, [value])

  useEffect(() => {
    if (!isRecording) return
    const timer = window.setInterval(() => {
      setRecordingSeconds((current) => {
        if (current === null) return null
        if (current >= 299) {
          window.clearInterval(timer)
          return 300
        }
        return current + 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isRecording])

  useEffect(() => () => {
    cancelUploads.current.forEach((cancel) => cancel())
    window.clearTimeout(linkTimer.current)
    previewUrls.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const focusEditor = (selectionStart?: number, selectionEnd = selectionStart) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current
      textarea?.focus()
      if (textarea && selectionStart !== undefined) textarea.setSelectionRange(selectionStart, selectionEnd ?? selectionStart)
    })
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    const start = textarea?.selectionStart ?? value.length
    const end = textarea?.selectionEnd ?? value.length
    onChange(`${value.slice(0, start)}${text}${value.slice(end)}`)
    focusEditor(start + text.length)
  }

  const applyFormat = (before: string, after = before, placeholder = 'текст') => {
    const textarea = textareaRef.current
    const start = textarea?.selectionStart ?? value.length
    const end = textarea?.selectionEnd ?? value.length
    const selected = value.slice(start, end) || placeholder
    onChange(`${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`)
    focusEditor(start + before.length, start + before.length + selected.length)
  }

  const patchAttachment = (id: string, patch: Partial<UploadAttachment>) => setAttachments((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))

  const runUpload = (attachment: { id: string } & UploadTarget, manual = false) => {
    patchAttachment(attachment.id, { status: 'loading', progress: 0, error: undefined, retry: undefined })
    const cancel = simulateUpload(attachment, {
      onProgress: (progress) => patchAttachment(attachment.id, { progress, status: 'loading' }),
      onRetry: (retry) => patchAttachment(attachment.id, { retry, progress: 0 }),
      onDone: () => {
        cancelUploads.current.delete(attachment.id)
        patchAttachment(attachment.id, { status: 'ready', progress: 100, retry: undefined })
        notify(attachment.folder ? 'Папка загружена на Диск' : 'Файл загружен на Диск')
      },
      onError: (error) => {
        cancelUploads.current.delete(attachment.id)
        patchAttachment(attachment.id, { status: 'error', error, retry: undefined })
      },
    }, { manual })
    cancelUploads.current.set(attachment.id, cancel)
  }

  const addFolders = (folders: LocalFolder[]) => {
    const next = folders.filter((folder) => folder.count > 0).map<UploadAttachment>((folder) => {
      const id = crypto.randomUUID()
      return { id, name: folder.name, size: folder.size, type: '', progress: 0, status: 'loading', folder: { count: folder.count, error: validateLocalFolder(folder) }, disk: { source: 'local', kind: 'folder', url: diskFolderUrl(id.slice(0, 8)) } }
    })
    if (!next.length) return
    setAttachments((current) => [...current, ...next])
    next.forEach((folder, index) => window.setTimeout(() => runUpload(folder), index * 120))
  }

  const addFiles = (files: FileList | File[]) => {
    const next = Array.from(files).map<UploadAttachment>((file) => {
      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      if (previewUrl) previewUrls.current.add(previewUrl)
      const id = crypto.randomUUID()
      return {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl,
        progress: 0,
        status: 'loading',
        file,
        disk: { source: 'local', url: diskFileUrl(id.slice(0, 8)) },
      }
    })

    setAttachments((current) => [...current, ...next])
    next.forEach((file, index) => window.setTimeout(() => runUpload(file), index * 120))
  }

  const attachDiskFiles = (files: DiskFile[]) => {
    const next = files.map<UploadAttachment>((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: '',
      progress: 100,
      status: 'ready',
      disk: { source: 'disk', url: file.kind === 'folder' ? diskFolderUrl(file.id) : diskFileUrl(file.id), fileId: file.id, kind: file.kind === 'folder' ? 'folder' : 'file' },
    }))
    setAttachments((current) => [...current, ...next])
  }

  const removeAttachment = (attachment: UploadAttachment) => {
    cancelUploads.current.get(attachment.id)?.()
    cancelUploads.current.delete(attachment.id)
    if (attachment.previewUrl) {
      URL.revokeObjectURL(attachment.previewUrl)
      previewUrls.current.delete(attachment.previewUrl)
    }
    setAttachments((current) => current.filter((item) => item.id !== attachment.id))
  }

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const pasted = event.clipboardData.getData('text').trim()
    if (!isUrl(pasted) || link?.url === pasted) return
    if (!resolveLink(pasted)) return
    window.clearTimeout(linkTimer.current)
    setLink({ id: crypto.randomUUID(), url: pasted, title: pasted, meta: 'Загрузка превью…', extension: 'url', status: 'external', loading: true })
    linkTimer.current = window.setTimeout(() => setLink((current) => {
      const resolved = resolveLink(pasted)
      return current && current.url === pasted && resolved ? { ...current, ...resolved, loading: false } : undefined
    }), 700)
  }

  const removeLink = () => { window.clearTimeout(linkTimer.current); setLink(undefined) }

  const readyAttachments = attachments.filter((attachment) => attachment.status === 'ready')
  const hasContent = Boolean(value.trim() || readyAttachments.length)
  const isUploading = attachments.some((attachment) => attachment.status === 'loading') || Boolean(link?.loading)

  const send = () => {
    if (!hasContent || isUploading) return
    onSend({
      text: value.trim(),
      attachments: readyAttachments.map(({ id, name, size, type, disk }) => ({ id, name, size, type, disk })),
      linkPreview: link && !link.loading ? { id: link.id, url: link.url, title: link.title, meta: link.meta, extension: link.extension, status: link.status } : undefined,
    })
    attachments.forEach((attachment) => {
      if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl)
    })
    previewUrls.current.clear()
    setAttachments([])
    removeLink()
    setFormattingOpen(false)
    focusEditor()
  }

  if (recordingSeconds !== null) {
    return (
      <div className="message-editor message-editor--recording" aria-label="Запись голосового сообщения">
        <IconButton size="s" label="Отменить запись" icon={<img src="assets/figma/ic-cancel-outline.svg" alt="" aria-hidden="true" />} onClick={() => setRecordingSeconds(null)} />
        <span className="message-editor__recording-time">{formatDuration(recordingSeconds)}</span>
        <span className="message-editor__wave" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} />)}</span>
        <IconButton size="s" priority="tertiary" label="Отправить голосовое сообщение" icon={icon('send-filled')} onClick={() => {
          onSend({ text: `Голосовое сообщение · ${formatDuration(recordingSeconds)}`, attachments: [] })
          setRecordingSeconds(null)
        }} />
      </div>
    )
  }

  return (
    <div
      className={`message-editor ${dragActive ? 'is-drag-active' : ''} ${federation ? 'is-federation' : ''}`}
      onDragEnter={(event) => { event.preventDefault(); setDragActive(true) }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragActive(false) }}
      onDrop={(event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragActive(false)
        void readDropped(event.dataTransfer).then(({ files, folders }) => {
          if (files.length) addFiles(files)
          addFolders(folders)
        })
      }}
    >
      {topPanel && <div className="message-editor__top-panel">{topPanel}</div>}
      {formattingOpen && (
        <div className="message-editor__formatting" role="toolbar" aria-label="Форматирование текста">
          <IconButton size="s" label="Полужирный" icon={icon('bold-outline')} onClick={() => applyFormat('**')} />
          <IconButton size="s" label="Курсив" icon={icon('italic-outline')} onClick={() => applyFormat('_')} />
          <IconButton size="s" label="Зачёркнутый" icon={icon('strikethrough-outline')} onClick={() => applyFormat('~~')} />
          <IconButton size="s" label="Подчёркнутый" icon={icon('underline-outline')} onClick={() => applyFormat('<u>', '</u>')} />
          <span className="toolbar-divider" aria-hidden="true" />
          <IconButton size="s" label="Ссылка" icon={icon('link-outline')} onClick={() => applyFormat('[', '](https://)', 'ссылка')} />
          <span className="toolbar-divider" aria-hidden="true" />
          <IconButton size="s" label="Строчный код" icon={icon('code-outline')} onClick={() => applyFormat('`')} />
          <IconButton size="s" label="Блок кода" icon={icon('codeblock-outline')} onClick={() => applyFormat('```\n', '\n```')} />
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={handlePaste}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            send()
          }
          if (event.key === 'Escape') {
            setEmojiOpen(false)
            setMentionOpen(false)
          }
        }}
        rows={1}
        placeholder="Сообщение..."
        aria-label="Текст сообщения"
      />

      {(attachments.length > 0 || link) && (
        <div className="message-editor__attachments" aria-label="Прикреплённые файлы">
          {link && (
            <div className="message-editor__attachment" key={link.id}>
              <ListItemFile
                size="s"
                background="secondary"
                state={link.loading ? 'loading' : link.status === 'forbidden' ? 'error' : 'enabled'}
                fileName={link.title}
                extension={link.extension}
                meta={link.meta}
                errorText="Нет доступа к файлу"
                progress={60}
                onDelete={link.loading ? undefined : removeLink}
              />
            </div>
          )}
          {attachments.map((attachment) => (
            <div className="message-editor__attachment" key={attachment.id}>
              <ListItemFile
                size="s"
                background="secondary"
                state={attachment.status === 'ready' ? 'enabled' : attachment.status}
                fileName={attachment.name}
                extension={attachment.disk?.kind === 'folder' ? 'folder' : attachment.error === 'type' ? 'unk' : extensionOf(attachment.name) || undefined}
                preview={attachment.previewUrl ? <img src={attachment.previewUrl} alt="" /> : undefined}
                meta={attachment.status === 'loading'
                  ? attachment.retry ? `Повторная попытка ${attachment.retry} из 3…` : `${formatBytes(Math.round(attachment.size * attachment.progress / 100))} / ${formatBytes(attachment.size)}`
                  : <DiskStoredMeta label={attachment.disk?.kind === 'folder' ? 'Папка на МТС Диске' : undefined} />}
                errorText={attachment.error ? DISK_ERROR_TEXT[attachment.error] : undefined}
                progress={attachment.progress}
                onRetry={attachment.error === 'network' ? () => runUpload(attachment, true) : undefined}
                onDelete={attachment.status === 'loading' ? undefined : () => removeAttachment(attachment)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="message-editor__toolbar">
        <div className="message-editor__actions">
          <input
            ref={inputRef}
            className="message-editor__file-input"
            type="file"
            multiple
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files?.length) addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          <input
            ref={folderInputRef}
            className="message-editor__file-input"
            type="file"
            multiple
            {...{ webkitdirectory: '' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files?.length) addFolders(foldersFromInput(event.target.files))
              event.target.value = ''
            }}
          />
          <Popover
            open={attachOpen}
            placement="top-start"
            gap="clear"
            contentClassName="collapse-popover--bare"
            onOpenChange={setAttachOpen}
            content={
              <Menu
                ariaLabel="Что прикрепить"
                items={[{ id: 'file', label: 'Файл' }, { id: 'folder', label: 'Папку' }]}
                onSelect={(item) => { setAttachOpen(false); (item.id === 'folder' ? folderInputRef : inputRef).current?.click() }}
              />
            }
          >
            <IconButton size="s" selected={attachOpen} label="Прикрепить с устройства" icon={icon('attach-outline')} />
          </Popover>
          <IconButton size="s" label="Прикрепить с МТС Диска" icon={<FolderOpen />} onClick={() => setPickerOpen(true)} />
          <span className="toolbar-divider" aria-hidden="true" />
          <Popover
            open={emojiOpen}
            placement="top-start"
            gap="clear"
            onOpenChange={(open) => { setEmojiOpen(open); if (open) setMentionOpen(false) }}
            content={<EmojiPicker onSelect={(emoji) => { insertText(emoji); setEmojiOpen(false) }} />}
          >
            <IconButton size="s" selected={emojiOpen} label="Эмодзи" icon={icon('smile-outline')} />
          </Popover>
          <Popover
            open={mentionOpen}
            placement="top-start"
            gap="clear"
            contentClassName="collapse-popover--bare"
            onOpenChange={(open) => { setMentionOpen(open); if (open) setEmojiOpen(false) }}
            content={<MentionMenu items={mentions} onSelect={(mention) => { insertText(`@${mention.name} `); setMentionOpen(false) }} />}
          >
            <IconButton size="s" selected={mentionOpen} label="Упомянуть" icon={icon('mention-outline')} />
          </Popover>
          <IconButton size="s" selected={formattingOpen} aria-pressed={formattingOpen} label="Форматирование" icon={icon('markdown')} onClick={() => setFormattingOpen((open) => !open)} />
        </div>
        <IconButton
          size="s"
          priority="tertiary"
          disabled={isUploading}
          label={hasContent ? 'Отправить сообщение' : 'Голосовое сообщение'}
          icon={hasContent ? icon('send-filled') : icon('mic-outline')}
          onClick={hasContent ? send : () => setRecordingSeconds(0)}
          className="message-editor__send"
        />
      </div>
      {pickerOpen && createPortal(
        <DiskPickerModal
          open
          onClose={() => setPickerOpen(false)}
          attachedIds={attachments.flatMap((item) => item.disk?.fileId ? [item.disk.fileId] : [])}
          onAttach={attachDiskFiles}
        />,
        document.body,
      )}
    </div>
  )
}

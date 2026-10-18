import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu } from '../../components/option-menu/Menu'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { FileCard } from '../../components/ui/FileCard'
import { ListItemFile } from '../../components/ui/ListItemFile'
import type { DiskRef, LinkPreview } from '../../types/disk'
import { DiskRedirectModal } from './DiskRedirectModal'
import { DiskStoredMeta } from './DiskMeta'
import { copyLink, extensionOf } from './model'
import { notify } from './toast'

type Attachment = { id: string; name: string; size: number; type: string; disk?: DiskRef }

type RowProps = {
  attachment: Attachment
  onRemove?: (id: string) => void
}

/** Строка файла в отправленном сообщении: меню «Скопировать ссылку / Удалить из чата». */
export function DiskAttachmentRow({ attachment, onRemove }: RowProps) {
  const [confirming, setConfirming] = useState(false)
  const url = attachment.disk?.url ?? ''
  const isFolder = attachment.disk?.kind === 'folder'
  const menu = (
    <Menu
      ariaLabel="Действия с файлом"
      items={[{ id: 'copy', label: 'Скопировать ссылку' }, ...(onRemove ? [{ id: 'remove', label: 'Удалить из чата', error: true }] : [])]}
      onSelect={(item) => { if (item.id === 'copy') void copyLink(url, notify); else setConfirming(true) }}
    />
  )
  const extension = isFolder ? 'folder' : extensionOf(attachment.name)
  const withThumbnail = !isFolder && THUMBNAIL_EXTENSIONS.has(extension)
  return (
    <>
      {withThumbnail ? (
        <FileCard
          title={attachment.name}
          meta={<DiskStoredMeta />}
          extension={extension}
          moreContent={menu}
          morePlacement="top-end"
          onOpen={() => notify('Открываем файл на Диске')}
        />
      ) : <ListItemFile
        size="s"
        fileName={attachment.name}
        extension={isFolder ? 'folder' : extensionOf(attachment.name)}
        meta={<DiskStoredMeta label={isFolder ? 'Папка на МТС Диске' : undefined} />}
        moreContent={menu}
        morePlacement="top-end"
        onClick={(event) => { if (!(event.target as HTMLElement).closest('.collapse-file-item__actions')) notify(isFolder ? 'Открываем папку на Диске' : 'Открываем файл на Диске') }}
      />}
      {confirming && createPortal(
        <ConfirmDialog
          open
          title={isFolder ? 'Удалить папку из чата?' : 'Удалить файл из чата?'}
          description={isFolder ? 'Папка исчезнет из этого чата, но останется доступна на Диске.' : 'Файл исчезнет из этого чата, но останется доступен на Диске.'}
          confirmLabel="Удалить"
          onCancel={() => setConfirming(false)}
          onConfirm={() => { setConfirming(false); onRemove?.(attachment.id) }}
        />,
        document.body,
      )}
    </>
  )
}

/** Форматы с миниатюрой после отправки (Teams: word, excel, ppt, pdf). */
const THUMBNAIL_EXTENSIONS = new Set(['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'])

const hostOf = (url: string) => { try { return new URL(url).hostname } catch { return url } }

type CardProps = { preview: LinkPreview; onRemove?: () => void }

/** Карточка ссылки в сообщении. Без прав клик открывает модалку перехода на Диск. */
export function LinkPreviewCard({ preview, onRemove }: CardProps) {
  const [requesting, setRequesting] = useState(false)
  const forbidden = preview.status === 'forbidden'
  const menu = (
    <Menu
      ariaLabel="Действия со ссылкой"
      items={[{ id: 'copy', label: 'Скопировать ссылку' }, ...(onRemove ? [{ id: 'remove', label: 'Убрать предпросмотр' }] : [])]}
      onSelect={(item) => { if (item.id === 'copy') void copyLink(preview.url, notify); else onRemove?.() }}
    />
  )
  return (
    <>
      <FileCard
        title={preview.title}
        meta={forbidden ? 'Нет доступа' : <DiskStoredMeta label={hostOf(preview.url)} icon={preview.status === 'external' ? 'link' : 'folder'} />}
        extension={preview.extension}
        state={forbidden ? 'forbidden' : 'enabled'}
        moreContent={menu}
        morePlacement="top-end"
        onOpen={() => (forbidden ? setRequesting(true) : notify(preview.status === 'external' ? 'Открываем ссылку' : 'Открываем файл на Диске'))}
      />
      {requesting && createPortal(<DiskRedirectModal open onClose={() => setRequesting(false)} />, document.body)}
    </>
  )
}

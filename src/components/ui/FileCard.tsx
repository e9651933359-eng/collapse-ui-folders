import type { ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Popover } from '../feedback/Popover'
import type { PopoverPlacement } from '../feedback/Popover'
import { FileTypeIcon } from './FileTypeIcon'
import { FilePreviewStub } from './FilePreviewStub'
import { IconButton } from './IconButton'

type FileCardProps = {
  title: string
  /** Вторая строка: например, иконка папки и домен. */
  meta?: ReactNode
  extension?: string
  /** Миниатюра документа над строкой; по умолчанию собирается заглушка `FilePreviewStub`. Передайте `null`, чтобы скрыть. */
  preview?: ReactNode | null
  state?: 'enabled' | 'forbidden'
  onOpen?: () => void
  /** Слот меню «Ещё». Без него кнопка не показывается. */
  moreContent?: ReactNode
  morePlacement?: PopoverPlacement
  className?: string
}

/** Баннер-карточка документа или ссылки в сообщении (temporary card chat, Figma 8678:102365). */
export function FileCard({ title, meta, extension = 'file', preview, state = 'enabled', onOpen, moreContent, morePlacement = 'bottom-end', className = '' }: FileCardProps) {
  const previewNode = state === 'forbidden' || preview === null ? null : preview ?? <FilePreviewStub extension={extension} seed={title} />
  return (
    <div className={`collapse-file-card is-${state} ${className}`}>
      <button className="collapse-file-card__main" type="button" onClick={onOpen} aria-label={title}>
        {previewNode && <span className="collapse-file-card__preview"><span>{previewNode}</span></span>}
        <span className="collapse-file-card__row">
          <FileTypeIcon extension={extension} />
          <span className="collapse-file-card__copy"><span>{title}</span>{meta && <small>{meta}</small>}</span>
        </span>
      </button>
      {moreContent && (
        <span className="collapse-file-card__more">
          <Popover placement={morePlacement} gap="clear" contentClassName="collapse-popover--bare" content={moreContent}>
            <IconButton size="s" label="Ещё" icon={<MoreHorizontal />} />
          </Popover>
        </span>
      )}
    </div>
  )
}

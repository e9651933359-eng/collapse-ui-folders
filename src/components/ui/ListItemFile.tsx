import type { HTMLAttributes, ReactNode } from 'react'
import { MoreHorizontal, RotateCw, Trash2 } from 'lucide-react'
import { Popover } from '../feedback/Popover'
import type { PopoverPlacement } from '../feedback/Popover'
import { IconButton } from './IconButton'
import { FileTypeIcon } from './FileTypeIcon'
import { Progress } from './Progress'

type ListItemFileProps = HTMLAttributes<HTMLDivElement> & {
  fileName: string
  meta?: ReactNode
  extension?: string
  preview?: ReactNode
  size?: 's' | 'm' | 'l'
  state?: 'enabled' | 'loading' | 'error'
  background?: 'default' | 'secondary'
  progress?: number
  /** Текст в состоянии `error`; по умолчанию «Ошибка загрузки». */
  errorText?: string
  onDelete?: () => void
  onMore?: () => void
  /** Повтор в состоянии `error`; без него кнопка не показывается. */
  onRetry?: () => void
  /** Слот меню «Ещё»: если передан, кнопка открывает Popover с этим содержимым. */
  moreContent?: ReactNode
  /** Сторона открытия меню: в ленте сообщений у нижнего края лучше `top-end`. */
  morePlacement?: PopoverPlacement
}

export function ListItemFile({ fileName, meta, extension = 'FILE', preview, size = 'l', state = 'enabled', background = 'default', progress = 0, errorText = 'Ошибка загрузки', onDelete, onMore, onRetry, moreContent, morePlacement = 'bottom-end', className = '', ...props }: ListItemFileProps) {
  const isError = state === 'error'
  const hasHoverRemove = background === 'secondary' && Boolean(onDelete) && !isError
  const showDelete = Boolean(onDelete) && (background !== 'secondary' || isError)
  const showRetry = isError && Boolean(onRetry)
  const showMore = Boolean(onMore) || Boolean(moreContent)
  const hasInlineActions = showDelete || showRetry || showMore
  const moreButton = <IconButton label="Ещё" icon={<MoreHorizontal />} onClick={onMore} />

  return (
    <div className={`collapse-file-item collapse-file-item--${size} collapse-file-item--${background} is-${state} ${className}`} {...props}>
      <div className="collapse-file-item__state-layer">
        <span className={`collapse-file-item__preview${preview ? ' is-media' : ''}`}>{preview ?? <FileTypeIcon extension={extension} />}</span>
        <span className="collapse-file-item__content"><span>{fileName}</span><small>{isError ? errorText : meta}</small></span>
        {state !== 'loading' && hasInlineActions && (
          <span className="collapse-file-item__actions">
            {showRetry && <IconButton label="Повторить загрузку" icon={<RotateCw />} onClick={onRetry} />}
            {showDelete && <IconButton label="Удалить" icon={<Trash2 />} onClick={onDelete} />}
            {moreContent ? <Popover placement={morePlacement} gap="clear" contentClassName="collapse-popover--bare" content={moreContent}>{moreButton}</Popover> : onMore && moreButton}
          </span>
        )}
      </div>
      {state !== 'loading' && hasHoverRemove && <button className="collapse-file-item__remove" type="button" aria-label="Удалить" title="Удалить" onClick={onDelete}><img src="assets/figma/ic-cancel-filled.svg" alt="" /></button>}
      {state === 'loading' && <Progress className="collapse-file-item__progress" size="s" value={progress} label={`Загрузка файла ${fileName}`} />}
    </div>
  )
}

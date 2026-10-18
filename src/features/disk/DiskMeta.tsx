import { Folder, Link2 } from 'lucide-react'
import './disk.css'

type DiskStoredMetaProps = {
  /** Подпись рядом с иконкой; по умолчанию файл лежит на МТС Диске. */
  label?: string
  /** `folder` — файл на Диске, `link` — внешняя ссылка. */
  icon?: 'folder' | 'link'
}

/** Вторая строка карточки файла: иконка папки и где он лежит (или домен ссылки). */
export function DiskStoredMeta({ label = 'Файл на МТС Диске', icon = 'folder' }: DiskStoredMetaProps) {
  const Icon = icon === 'folder' ? Folder : Link2
  return <span className="disk-stored-meta"><Icon aria-hidden="true" />{label}</span>
}

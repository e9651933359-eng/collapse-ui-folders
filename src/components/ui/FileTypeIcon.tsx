type FileTypeIconProps = {
  /** Расширение файла или служебное значение `folder` для папки (Figma 8734:83895). */
  extension?: string
}

const toneByExtension: Record<string, 'accent' | 'error' | 'success'> = {
  css: 'success',
  csv: 'success',
  dmg: 'accent',
  doc: 'accent',
  docx: 'accent',
  exe: 'accent',
  html: 'success',
  ico: 'accent',
  java: 'success',
  jpeg: 'accent',
  jpg: 'accent',
  json: 'success',
  pdf: 'error',
  png: 'accent',
  ppt: 'error',
  pptx: 'error',
  xls: 'success',
  xlsx: 'success',
}

export function FileTypeIcon({ extension = 'file' }: FileTypeIconProps) {
  if (extension === 'folder') {
    return <span className="collapse-file-type collapse-file-type--folder" aria-hidden="true"><img className="collapse-file-type__folder" src="assets/figma/file-type-folder.svg" alt="" /></span>
  }
  const normalizedExtension = extension.replace(/^\./, '').slice(0, 4).toLowerCase() || 'file'
  const tone = toneByExtension[normalizedExtension] ?? 'neutral'

  return (
    <span className={`collapse-file-type collapse-file-type--${tone}`} aria-hidden="true">
      <img className="collapse-file-type__sheet" src="assets/figma/file-type-sheet-s.svg" alt="" />
      <img className="collapse-file-type__fold" src="assets/figma/file-type-fold-s.svg" alt="" />
      <span className="collapse-file-type__tag">{normalizedExtension}</span>
    </span>
  )
}

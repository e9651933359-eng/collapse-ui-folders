type FilePreviewStubProps = {
  extension?: string
  /** Любая строка: по ней детерминированно строится «содержимое», чтобы один файл всегда выглядел одинаково. */
  seed: string
}

type Kind = 'sheet' | 'slides' | 'pdf' | 'doc'

const kindByExtension: Record<string, Kind> = { xls: 'sheet', xlsx: 'sheet', csv: 'sheet', ppt: 'slides', pptx: 'slides', pdf: 'pdf', doc: 'doc', docx: 'doc' }

function random(seed: string) {
  let state = 2166136261
  for (const char of seed) state = Math.imul(state ^ char.charCodeAt(0), 16777619)
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return (state >>> 0) / 4294967296
  }
}

const width = (next: () => number, min: number, max: number) => `${Math.round(min + next() * (max - min))}%`

/** Заглушка миниатюры документа: случайно собранная разметка нужного типа, а не реальное содержимое файла. */
export function FilePreviewStub({ extension = 'doc', seed }: FilePreviewStubProps) {
  const kind = kindByExtension[extension.toLowerCase()] ?? 'doc'
  const next = random(`${seed}.${extension}`)

  return (
    <span className={`collapse-file-preview collapse-file-preview--${kind}`} aria-hidden="true">
      {kind === 'sheet' && Array.from({ length: 5 }, (_, row) => (
        <span className={`collapse-file-preview__row${row === 0 ? ' is-head' : ''}`} key={row}>
          {Array.from({ length: 6 }, (_, column) => (
            <i key={column} className={row > 0 && column === 1 ? 'is-chip' : undefined} style={{ width: row === 0 ? undefined : width(next, 35, 85) }} />
          ))}
        </span>
      ))}
      {kind === 'slides' && Array.from({ length: 3 }, (_, slide) => (
        <span className="collapse-file-preview__slide" key={slide}>
          <i style={{ width: width(next, 40, 80) }} />
          <i style={{ width: width(next, 25, 60) }} />
          <b />
        </span>
      ))}
      {(kind === 'doc' || kind === 'pdf') && (
        <>
          <i className="collapse-file-preview__title" style={{ width: width(next, 35, 65) }} />
          {Array.from({ length: 5 }, (_, line) => <i key={line} style={{ width: width(next, 55, 100) }} />)}
        </>
      )}
    </span>
  )
}

export type DiskRef = {
  source: 'disk' | 'local'
  url: string
  fileId?: string
  /** Папка с Диска прикрепляется одним объектом; по умолчанию — файл. */
  kind?: 'file' | 'folder'
}

export type LinkPreview = {
  id: string
  url: string
  title: string
  meta: string
  extension: string
  /** `ready` — файл доступен, `forbidden` — у отправителя нет прав, `external` — обычная внешняя ссылка. */
  status: 'ready' | 'forbidden' | 'external'
}

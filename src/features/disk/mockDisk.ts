import { DISK_ORIGIN, diskFileUrl, extensionOf } from './model'

export type DiskTab = 'mine' | 'shared' | 'favorites' | 'recent' | 'common'

/** `drive` — общий диск: корень раздела «Общие диски», его нельзя выбрать и прикрепить. */
export type DiskKind = 'file' | 'folder' | 'drive'

export type DiskFile = {
  id: string
  name: string
  kind: DiskKind
  size: number
  owner: string
  openedAt: string
  openedTs: number
  /** Родитель в дереве: `null` — корень «Моего диска» (или список общих дисков для `drive`). */
  parentId: string | null
  /** Плоские разделы, где объект показывается списком: «Доступные мне», «Избранное», «Недавние». */
  tabs: Array<'shared' | 'favorites' | 'recent'>
}

const MB = 1024 * 1024
/** Владелец всегда в формате «Фамилия Имя», в том числе текущий пользователь. */
const ME = 'Соколов Вячеслав'

const file = (id: string, name: string, size: number, owner: string, openedAt: string, openedTs: number, parentId: string | null, tabs: DiskFile['tabs'] = []): DiskFile => ({ id, name, kind: 'file', size, owner, openedAt, openedTs, parentId, tabs })
const folder = (id: string, name: string, owner: string, openedAt: string, openedTs: number, parentId: string | null, tabs: DiskFile['tabs'] = []): DiskFile => ({ id, name, kind: 'folder', size: 0, owner, openedAt, openedTs, parentId, tabs })
const drive = (id: string, name: string): DiskFile => ({ id, name, kind: 'drive', size: 0, owner: '', openedAt: '', openedTs: 0, parentId: null, tabs: [] })

/**
 * Демо-содержимое МТС Диска: три дерева (личный диск, общие диски) и плоские списки.
 * Файлы намеренно закрывают разные права и типы для проверки сценариев.
 * Логика переходов взята из прототипа `Пикер файлов для чатов.html`.
 */
export const diskFiles: DiskFile[] = [
  // Мой диск, корень
  file('f1', 'Бриф на редизайн.docx', 1.2 * MB, ME, 'Сегодня, 12:40', 12, null, ['recent', 'favorites']),
  file('f2', 'Бюджет Q4.xlsx', 860 * 1024, ME, 'Сегодня, 10:05', 11, null, ['recent']),
  file('f3', 'Презентация для клиента.pptx', 14.6 * MB, ME, 'Вчера, 18:22', 10, null, ['recent']),
  file('f4', 'Договор (черновик).pdf', 2.4 * MB, ME, '28 сент., 09:15', 9, null),
  file('f11', 'Скрипт выгрузки.xyz', 34 * 1024, ME, '20 сент., 17:31', 2, null),
  folder('fo1', 'Проекты', ME, 'Вчера, 09:12', 8.5, null, ['favorites']),
  folder('fo2', 'Договоры', ME, '26 сент., 15:40', 5.5, null),
  // Проекты › Чаты › Макеты
  folder('fo1a', 'Чаты', ME, '29 сент., 18:03', 6.5, 'fo1'),
  file('f13', 'Требования к чатам.docx', 780 * 1024, ME, '29 сент., 11:20', 6.4, 'fo1'),
  file('f14', 'Сводка по метрикам недели.xlsx', 1.1 * MB, ME, '27 сент., 10:00', 5.4, 'fo1'),
  folder('fo1a1', 'Макеты', ME, '29 сент., 18:03', 6.6, 'fo1a'),
  file('f15', 'Сценарии Диска.pdf', 3.2 * MB, ME, '29 сент., 17:45', 6.7, 'fo1a'),
  file('f16', 'Обзор макетов.pptx', 9.8 * MB, ME, '28 сент., 12:30', 6.3, 'fo1a1'),
  file('f17', 'Карточки вложений.pdf', 4.4 * MB, ME, '28 сент., 12:10', 6.2, 'fo1a1'),
  file('f18', 'Договор оказания услуг.pdf', 1.9 * MB, ME, '26 сент., 15:40', 5.6, 'fo2'),
  file('f19', 'Акт выполненных работ.docx', 310 * 1024, ME, '26 сент., 15:41', 5.7, 'fo2'),
  // Доступные мне
  file('f5', 'Исследование пользователей.pdf', 5.1 * MB, 'Иванова Анна', 'Сегодня, 09:30', 8, null, ['shared', 'recent']),
  file('f6', 'Roadmap 2027.pptx', 8.3 * MB, 'Петров Михаил', 'Вчера, 14:02', 7, null, ['shared', 'favorites']),
  file('f7', 'Сводка по метрикам.xlsx', 3.7 * MB, 'Смирнова Ольга', '27 сент., 16:48', 6, null, ['shared']),
  file('f12', 'Сценарии тестирования.docx', 1.9 * MB, 'Иванова Анна', '18 сент., 12:12', 1, null, ['shared', 'recent']),
  // Общие диски
  drive('dr1', 'Маркетинг'),
  drive('dr2', 'Продукт'),
  drive('dr3', 'Общий архив'),
  file('f8', 'Гайд по бренду.pdf', 22.4 * MB, 'Кузнецова Мария', '25 сент., 11:10', 5, 'dr1', ['favorites']),
  folder('dfo1', 'Кампании', 'Кузнецова Мария', '24 сент., 13:55', 4, 'dr1'),
  file('f9', 'Шаблон отчёта.docx', 420 * 1024, 'Кузнецова Мария', '24 сент., 13:55', 4.1, 'dr1'),
  file('f20', 'Осенняя кампания.pptx', 12.5 * MB, 'Глухих Иван', '23 сент., 17:00', 3.5, 'dfo1'),
  file('f10', 'Регламент согласования.docx', 610 * 1024, 'Орлов Алексей', '22 сент., 10:00', 3, 'dr2'),
  file('f21', 'Дорожная карта.docx', 540 * 1024, 'Орлов Алексей', '21 сент., 08:15', 2.5, 'dr2'),
  file('f22', 'Архив 2025.pdf', 6.6 * MB, 'Орлов Алексей', '01 июля, 09:00', 0.5, 'dr3'),
]

export const byId = (id: string) => diskFiles.find((file) => file.id === id)

export const isContainer = (node: DiskFile) => node.kind === 'folder' || node.kind === 'drive'

/** Лежит ли объект в общих дисках: идём по цепочке родителей до корня. */
export function isInDrives(id: string | null): boolean {
  let cursor = id
  while (cursor) {
    const node = byId(cursor)
    if (!node) return false
    if (node.kind === 'drive') return true
    cursor = node.parentId
  }
  return false
}

/** Цепочка от корня раздела до папки включительно (диск в «Общих дисках» — первое звено). */
export function pathTo(id: string | null): Array<{ id: string; name: string }> {
  const path: Array<{ id: string; name: string }> = []
  let cursor = id
  while (cursor) {
    const node = byId(cursor)
    if (!node) break
    path.unshift({ id: node.id, name: node.name })
    cursor = node.parentId
  }
  return path
}

/** Содержимое раздела или папки: `folderId === null` — корень раздела. */
export function listFolder(tab: DiskTab, folderId: string | null): DiskFile[] {
  if (folderId) return diskFiles.filter((node) => node.parentId === folderId)
  if (tab === 'common') return diskFiles.filter((node) => node.kind === 'drive')
  if (tab === 'mine') return diskFiles.filter((node) => node.parentId === null && node.kind !== 'drive' && !node.tabs.includes('shared'))
  return diskFiles.filter((node) => node.tabs.includes(tab))
}

/** Поиск идёт по всему Диску, а не по открытой папке; сами диски в выдачу не попадают. */
export function searchDisk(query: string): DiskFile[] {
  const needle = query.trim().toLowerCase()
  return needle ? diskFiles.filter((node) => node.kind !== 'drive' && node.name.toLowerCase().includes(needle)) : []
}

/** Файл, к которому у пользователя нет прав: в общем списке не показывается, доступен только по ссылке. */
export const forbiddenFile = { id: 'x1', name: 'Финансовая модель.xlsx', size: 4 * MB, owner: 'Волкова Елена' }
export const forbiddenUrl = diskFileUrl(forbiddenFile.id)

export type ResolvedLink = { title: string; meta: string; extension: string; status: 'ready' | 'forbidden' | 'external' }

const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']

/**
 * Имитация разбора ссылки. Баннер-карточка нужна только для документов: файлы Диска
 * и любые ссылки на PDF, Word, Excel и PowerPoint. Остальные ссылки остаются текстом.
 */
/**
 * Документы МТС Линк: тип файла определяется первым сегментом пути (`/docs/<id>`, `/sheets/<id>`, `/slides/<id>`).
 * Допущение прототипа: реальные названия не запрашиваются, берутся из мока по хэшу id.
 */
const MTS_LINK_KINDS: Record<string, { extension: string; titles: string[] }> = {
  docs: { extension: 'docx', titles: ['Требования к продукту', 'Протокол встречи', 'Бриф на редизайн'] },
  sheets: { extension: 'xlsx', titles: ['Бюджет проекта', 'Бэклог задач', 'Метрики недели'] },
  slides: { extension: 'pptx', titles: ['Презентация для клиента', 'Roadmap', 'Итоги квартала'] },
}
const isMtsLinkHost = (host: string) => host === 'mts-link.ru' || host.endsWith('.mts-link.ru')
const hashOf = (text: string) => [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7)

export function resolveLink(url: string): ResolvedLink | undefined {
  if (url.startsWith(`${DISK_ORIGIN}/f/`)) {
    const id = url.slice(`${DISK_ORIGIN}/f/`.length).split(/[/?#]/)[0]
    if (id === forbiddenFile.id) return { title: 'Нет доступа к файлу', meta: 'МТС Диск', extension: 'unk', status: 'forbidden' }
    const file = byId(id)
    if (!file || file.kind !== 'file') return { title: 'Файл не найден', meta: 'МТС Диск', extension: 'unk', status: 'forbidden' }
    return { title: file.name, meta: `МТС Диск · ${file.owner}`, extension: extensionOf(file.name), status: 'ready' }
  }
  let parsed: URL
  try { parsed = new URL(url) } catch { return undefined }
  if (isMtsLinkHost(parsed.hostname)) {
    const [kindKey, id = ''] = parsed.pathname.split('/').filter(Boolean)
    const kind = MTS_LINK_KINDS[kindKey]
    if (!kind) return undefined
    return { title: `${kind.titles[hashOf(id) % kind.titles.length]}.${kind.extension}`, meta: parsed.hostname, extension: kind.extension, status: 'external' }
  }
  const name = decodeURIComponent(parsed.pathname.split('/').filter(Boolean).pop() ?? '')
  const extension = extensionOf(name)
  if (!DOCUMENT_EXTENSIONS.includes(extension)) return undefined
  return { title: name, meta: parsed.hostname, extension, status: 'external' }
}

export const isUrl = (text: string) => /^https?:\/\/\S+$/i.test(text.trim())

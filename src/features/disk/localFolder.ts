import { DISK_LIMITS, extensionOf } from './model'
import type { DiskErrorKind } from './model'

/** Локальная папка целиком: в чат она уходит одним объектом, а не набором файлов. */
export type LocalFolder = { name: string; size: number; count: number; files: File[] }

const toFolder = (name: string, files: File[]): LocalFolder => ({ name, files, count: files.length, size: files.reduce((sum, file) => sum + file.size, 0) })

/** Папки из `<input webkitdirectory>`: корень берётся из первого сегмента `webkitRelativePath`. */
export function foldersFromInput(list: FileList | File[]): LocalFolder[] {
  const groups = new Map<string, File[]>()
  for (const file of Array.from(list)) {
    const root = file.webkitRelativePath.split('/')[0]
    if (!root) continue
    groups.set(root, [...(groups.get(root) ?? []), file])
  }
  return [...groups].map(([name, files]) => toFolder(name, files))
}

const readEntries = (reader: FileSystemDirectoryReader) => new Promise<FileSystemEntry[]>((resolve, reject) => reader.readEntries(resolve, reject))
const readFile = (entry: FileSystemFileEntry) => new Promise<File>((resolve, reject) => entry.file(resolve, reject))

async function collect(entry: FileSystemEntry): Promise<File[]> {
  if (entry.isFile) return [await readFile(entry as FileSystemFileEntry)]
  const reader = (entry as FileSystemDirectoryEntry).createReader()
  const files: File[] = []
  for (;;) {
    const batch = await readEntries(reader)
    if (!batch.length) break
    for (const child of batch) files.push(...await collect(child))
  }
  return files
}

/** Перетаскивание: папки собираются обходом дерева, одиночные файлы остаются файлами. */
export async function readDropped(transfer: DataTransfer): Promise<{ files: File[]; folders: LocalFolder[] }> {
  const entries = Array.from(transfer.items ?? []).map((item) => (typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null))
  if (!entries.some((entry) => entry?.isDirectory)) return { files: Array.from(transfer.files), folders: [] }
  const files: File[] = []
  const folders: LocalFolder[] = []
  for (const entry of entries) {
    if (!entry) continue
    if (entry.isDirectory) folders.push(toFolder(entry.name, await collect(entry)))
    else files.push(...await collect(entry))
  }
  return { files, folders }
}

/** Демо-правила для папки: как для файла, но по сумме, плюс запрещённый формат внутри. Пустую папку не загружаем. */
export function validateLocalFolder(folder: LocalFolder): DiskErrorKind | undefined {
  if (/gone|удал/i.test(folder.name)) return 'gone'
  if (folder.files.some((file) => DISK_LIMITS.blockedExtensions.includes(extensionOf(file.name) as never))) return 'type'
  if (folder.size > DISK_LIMITS.maxFileBytes) return 'size'
  if (folder.size > DISK_LIMITS.freeQuotaBytes) return 'quota'
  return undefined
}

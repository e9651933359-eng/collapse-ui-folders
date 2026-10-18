/** Технические допущения: реальные лимиты и домен Диска придут от продукта. */
export const DISK_ORIGIN = 'https://disk.mts.ru'

const MB = 1024 * 1024

export const DISK_LIMITS = {
  maxFileBytes: 100 * MB,
  /** Свободное место в квоте демо-аккаунта: файл крупнее — ошибка квоты. */
  freeQuotaBytes: 50 * MB,
  maxSelection: 10,
  blockedExtensions: ['exe', 'bat', 'cmd', 'msi', 'scr'],
  /** Паузы авто-повтора при обрыве связи: 2, 5 и 10 секунд. */
  retryDelaysMs: [2000, 5000, 10000],
} as const

export type DiskErrorKind = 'size' | 'quota' | 'type' | 'network' | 'gone'

export const DISK_ERROR_TEXT: Record<DiskErrorKind, string> = {
  size: 'Файл слишком большой',
  quota: 'Недостаточно места',
  type: 'Формат не поддерживается',
  network: 'Не удалось загрузить',
  gone: 'Файл недоступен',
}

export function extensionOf(name: string) {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < MB) return `${Math.round(bytes / 1024)} КБ`
  if (bytes < 1024 * MB) return `${(bytes / MB).toLocaleString('ru', { maximumFractionDigits: 1 })} МБ`
  return `${(bytes / (1024 * MB)).toLocaleString('ru', { maximumFractionDigits: 1 })} ГБ`
}

export function diskFileUrl(id: string) {
  return `${DISK_ORIGIN}/f/${id}`
}

export function diskFolderUrl(id: string) {
  return `${DISK_ORIGIN}/folders/${id}`
}

export async function copyLink(url: string, notify: (message: string) => void) {
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    /* Буфер обмена может быть недоступен: прототип всё равно подтверждает действие. */
  }
  notify('Ссылка скопирована')
}

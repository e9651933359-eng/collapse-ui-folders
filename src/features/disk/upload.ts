import { DISK_LIMITS, extensionOf } from './model'
import type { DiskErrorKind } from './model'

export type UploadCallbacks = {
  onProgress: (progress: number) => void
  onRetry: (attempt: number) => void
  onDone: () => void
  onError: (kind: DiskErrorKind) => void
}

/**
 * Демо-правила проверки локального файла перед загрузкой на Диск.
 * Обрыв связи вызывается именем файла: «network» или «сеть».
 */
export function validateLocalFile(file: Pick<File, 'name' | 'size'>): DiskErrorKind | undefined {
  if (/gone|удал/i.test(file.name)) return 'gone'
  if (DISK_LIMITS.blockedExtensions.includes(extensionOf(file.name) as never)) return 'type'
  if (file.size > DISK_LIMITS.maxFileBytes) return 'size'
  if (file.size > DISK_LIMITS.freeQuotaBytes) return 'quota'
  return undefined
}

const failsOnNetwork = (file: Pick<File, 'name'>) => /network|сеть/i.test(file.name)

/**
 * Имитация загрузки на Диск: прогресс, проверки и авто-повтор при обрыве (2, 5, 10 с).
 * `manual` — ручной повтор после ошибки, он всегда проходит. Возвращает функцию отмены.
 */
/** Цель загрузки: файл или папка. Для папки итог проверок считается заранее (`folder.error`). */
export type UploadTarget = Pick<File, 'name' | 'size'> & { folder?: { error?: DiskErrorKind } }

export function simulateUpload(file: UploadTarget, callbacks: UploadCallbacks, { manual = false } = {}) {
  const timers: number[] = []
  const later = (fn: () => void, delay: number) => { timers.push(window.setTimeout(fn, delay)) }

  const invalid = file.folder ? file.folder.error : validateLocalFile(file)
  if (invalid) {
    later(() => callbacks.onError(invalid), 350)
    return () => timers.forEach(window.clearTimeout)
  }

  const attempt = (number: number) => {
    callbacks.onProgress(6)
    later(() => callbacks.onProgress(28), 300)
    later(() => callbacks.onProgress(46), 800)
    if (!manual && failsOnNetwork(file)) {
      later(() => {
        const delay = DISK_LIMITS.retryDelaysMs[number]
        if (delay === undefined) { callbacks.onError('network'); return }
        callbacks.onRetry(number + 1)
        later(() => attempt(number + 1), delay)
      }, 1100)
      return
    }
    later(() => callbacks.onProgress(74), 1500)
    later(() => { callbacks.onProgress(100); callbacks.onDone() }, 2300)
  }
  attempt(0)
  return () => timers.forEach(window.clearTimeout)
}

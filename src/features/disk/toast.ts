const EVENT = 'collapse:disk-toast'

/** Показывает тост в ближайшем DiskToastHost. Нужен, чтобы редактор и сообщения не хранили тосты сами. */
export function notify(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }))
}

export const DISK_TOAST_EVENT = EVENT

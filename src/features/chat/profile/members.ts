import type { Chat, ChatMember } from '../../../types/chat'

const pool: Array<[string, string, string]> = [
  ['Анна Филиппова', 'АФ', '#dce8ff'], ['Татьяна Смирнова', 'ТС', '#e8ddff'], ['Наталья Федорова', 'НФ', '#ffe2d8'],
  ['Борис Агафонов', 'БА', '#d8f1e2'], ['Виктор Ильин', 'ВИ', '#f2ddff'], ['Галина Орлова', 'ГО', '#e3f7cb'],
  ['Денис Крылов', 'ДК', '#dce8ff'], ['Екатерина Носова', 'ЕН', '#ffe2d8'], ['Ирина Воронова', 'ИВ', '#e8ddff'],
  ['Кирилл Белов', 'КБ', '#d8f1e2'], ['Лариса Жукова', 'ЛЖ', '#f2ddff'], ['Максим Тихонов', 'МТ', '#e3f7cb'],
  ['Олег Зайцев', 'ОЗ', '#dce8ff'], ['Полина Ершова', 'ПЕ', '#ffe2d8'], ['Роман Герасимов', 'РГ', '#e8ddff'],
  ['Светлана Дорофеева', 'СД', '#d8f1e2'], ['Тимур Ахметов', 'ТА', '#f2ddff'], ['Юлия Мельникова', 'ЮМ', '#e3f7cb'],
]

function hash(value: string) {
  return [...value].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7)
}

/** Сравнение по алфавиту для русской локали: используется в списке участников. */
export function sortMembersByName(members: ChatMember[]) {
  return [...members].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
}

/**
 * Демо-участники обычных чатов. Допущение прототипа: в данных чатов нет списка участников,
 * поэтому состав детерминированно берётся из общего пула; число — из подзаголовка «N участников».
 */
export function getChatMembers(chat: Chat): ChatMember[] {
  if (chat.kind === 'direct') {
    const login = `user_${hash(chat.id) % 900 + 100}`
    return [{ id: chat.id, name: chat.title, initials: chat.avatar, tone: chat.avatarTone, image: chat.avatarImage, email: `${login}@mts-link.ru`, phone: `+7 900 ${String(hash(chat.id) % 900 + 100)}-${String(hash(chat.title) % 90 + 10)}-${String(hash(chat.subtitle) % 90 + 10)}` }]
  }
  const declared = Number(/^(\d+)\s+участ/.exec(chat.subtitle)?.[1])
  const count = declared || 4 + (hash(chat.id) % 9)
  const start = hash(chat.id) % pool.length
  return Array.from({ length: Math.min(count, pool.length) }, (_, index) => {
    const [name, initials, tone] = pool[(start + index) % pool.length]
    return { id: `${chat.id}-m${index}`, name, initials, tone, adminRole: index === 0 ? 'Владелец' : undefined }
  })
}

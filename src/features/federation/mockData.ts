import type { Chat } from '../../types/chat'

const federationChatSeeds: Chat[] = [
  {
    id: 'federation-albina',
    title: 'Альбина Бахматулина',
    subtitle: 'Альфа-Банк · другая организация',
    avatar: 'АБ',
    avatarImage: 'assets/avatars/albina.png',
    avatarTone: '#e8ddff',
    avatarFilled: false,
    kind: 'direct',
    federation: true,
    unread: 1,
    messages: [
      { id: 'fa-1', author: 'other', sender: 'Альбина Бахматулина', avatar: 'АБ', avatarImage: 'assets/avatars/albina.png', federation: true, text: 'Добрый день! Отправила финальную версию документов для согласования.', time: '12:06' },
    ],
  },
  {
    id: 'federation-product',
    title: 'Запуск общего продукта',
    subtitle: '8 участников',
    avatar: 'ЗП',
    avatarImage: 'assets/avatars/product-launch.png',
    avatarTone: '#f1d8ff',
    avatarFilled: false,
    kind: 'group',
    federation: true,
    pinned: true,
    unread: 4,
    messages: [
      { id: 'fp-1', author: 'other', sender: 'Степан Васта · Альфа-Банк', avatar: 'СВ', federation: true, text: 'Коллеги, собрал вопросы к совместному запуску. Давайте сверим владельцев задач.', time: '11:46' },
      { id: 'fp-2', author: 'me', text: 'Да, пройдёмся по списку сегодня после статуса.', time: '11:49' },
      { id: 'fp-3', author: 'other', sender: 'Анна Иванова · MTS Link', avatar: 'АИ', text: 'Добавила в описание чата актуальные сроки и контакты команд.', time: '11:52' },
    ],
  },
  {
    id: 'federation-launch',
    title: 'Интеграция доставки',
    subtitle: '12 участников',
    avatar: 'ИД',
    avatarImage: 'assets/avatars/delivery-integration.png',
    avatarTone: '#dce8ff',
    avatarFilled: false,
    kind: 'group',
    federation: true,
    unread: 2,
    messages: [
      { id: 'fl-1', author: 'other', sender: 'Максим Орлов · Ozon', avatar: 'МО', federation: true, text: 'Тестовый контур готов. Можно подключать команду аналитики.', time: '10:18' },
    ],
  },
  {
    id: 'federation-support',
    title: 'Поддержка партнёров',
    subtitle: '6 участников',
    avatar: 'ПП',
    avatarImage: 'assets/avatars/partner-support.png',
    avatarTone: '#0dc268',
    kind: 'channel',
    federation: true,
    muted: true,
    messages: [
      { id: 'fs-1', author: 'other', sender: 'Ирина Смирнова · VK', avatar: 'ИС', federation: true, text: 'Передала кейс второй линии. Вернусь с результатом проверки.', time: 'Вчера' },
    ],
  },
  {
    id: 'research-sync', title: 'Синхронизация исследований', subtitle: '9 участников', avatar: '🔬', avatarTone: '#d8f1e2', kind: 'group', federation: true, unread: 3,
    messages: [{ id: 'rs-1', author: 'other', sender: 'Мария Лебедева · VK', avatar: 'МЛ', federation: true, text: 'Собрала выводы по интервью и добавила их в общий документ.', time: '09:42' }],
  },
  {
    id: 'anton-direct', title: 'Антон Крылов', subtitle: 'Личный чат', avatar: 'АК', avatarTone: '#e3f7cb', avatarFilled: false, kind: 'direct',
    messages: [{ id: 'ad-1', author: 'other', sender: 'Антон Крылов', avatar: 'АК', text: 'Посмотри, пожалуйста, обновлённый план встречи.', time: '09:30' }],
  },
  {
    id: 'partner-analytics', title: 'Аналитика партнёров', subtitle: 'Новый отчёт', avatar: '📊', avatarTone: '#dce8ff', kind: 'channel', federation: true, unread: 7,
    messages: [{ id: 'pa-1', author: 'other', sender: 'Максим Орлов · Ozon', avatar: 'МО', federation: true, text: 'Опубликовали отчёт за неделю и обновили основные метрики.', time: '09:18' }],
  },
  {
    id: 'mobile-team', title: 'Мобильная команда', subtitle: '11 участников', avatar: '📱', avatarTone: '#f2ddff', kind: 'group', unread: 2,
    messages: [{ id: 'mt-1', author: 'other', sender: 'Евгения', avatar: 'ЕВ', text: 'Новая сборка готова для внутреннего тестирования.', time: '09:05' }],
  },
  {
    id: 'elena-direct', title: 'Елена Левина', subtitle: 'Ozon · другая организация', avatar: 'ЕЛ', avatarTone: '#f2ddff', avatarFilled: false, kind: 'direct', federation: true,
    messages: [{ id: 'ed-1', author: 'other', sender: 'Елена Левина', avatar: 'ЕЛ', federation: true, text: 'Отправила варианты экранов для совместного сценария.', time: 'Вчера' }],
  },
  {
    id: 'design-system', title: 'Дизайн-система', subtitle: 'Обновлены компоненты', avatar: '🧩', avatarTone: '#e8ddff', kind: 'channel', unread: 5,
    messages: [{ id: 'ds-1', author: 'other', sender: 'Команда дизайна', avatar: 'КД', text: 'Добавили новые состояния компонентов и примеры использования.', time: 'Вчера' }],
  },
  {
    id: 'release-team', title: 'Команда релиза', subtitle: '7 участников', avatar: '🚀', avatarTone: '#ffe2d8', kind: 'group',
    messages: [{ id: 'rt-1', author: 'other', sender: 'Николай', avatar: 'НИ', text: 'Релизное окно подтверждено на четверг.', time: 'Вчера' }],
  },
  {
    id: 'irina-direct', title: 'Ирина Воронова', subtitle: 'Личный чат', avatar: 'ИВ', avatarTone: '#d8f1e2', avatarFilled: false, kind: 'direct', unread: 1,
    messages: [{ id: 'id-1', author: 'other', sender: 'Ирина Воронова', avatar: 'ИВ', text: 'Можно перенести нашу встречу на вторую половину дня?', time: 'Вчера' }],
  },
  {
    id: 'payments-integration', title: 'Интеграция платежей', subtitle: '14 участников', avatar: '💳', avatarTone: '#dce8ff', kind: 'group', federation: true, unread: 6,
    messages: [{ id: 'pi-1', author: 'other', sender: 'Олег Морозов · Альфа-Банк', avatar: 'ОМ', federation: true, text: 'Тестовые платежи проходят, ждём финальное подтверждение.', time: 'Пн' }],
  },
  {
    id: 'platform-releases', title: 'Релизы платформы', subtitle: 'Версия 4.8', avatar: '📦', avatarTone: '#e3f7cb', kind: 'channel',
    messages: [{ id: 'pr-1', author: 'other', sender: 'Команда платформы', avatar: 'КП', text: 'Версия 4.8 доступна на тестовом контуре.', time: 'Пн' }],
  },
  {
    id: 'marketing-campaign', title: 'Маркетинговая кампания', subtitle: '10 участников', avatar: '📣', avatarTone: '#ffe2d8', kind: 'group', unread: 4,
    messages: [{ id: 'mc-1', author: 'other', sender: 'Светлана', avatar: 'СВ', text: 'Обновила медиаплан и сроки запуска.', time: 'Пн' }],
  },
  {
    id: 'andrey-direct', title: 'Андрей Звонов', subtitle: 'Альфа-Банк · другая организация', avatar: 'АЗ', avatarTone: '#e6e0ff', avatarFilled: false, kind: 'direct', federation: true, unread: 2,
    messages: [{ id: 'az-1', author: 'other', sender: 'Андрей Звонов', avatar: 'АЗ', federation: true, text: 'Подтвердили состав рабочей группы со своей стороны.', time: 'Пн' }],
  },
  {
    id: 'security-review', title: 'Проверка безопасности', subtitle: '8 участников', avatar: '🛡️', avatarTone: '#d8f1e2', kind: 'group', federation: true,
    messages: [{ id: 'sr-1', author: 'other', sender: 'Антон Вершинин · Альфа-Банк', avatar: 'АВ', federation: true, text: 'Список замечаний сократился до двух пунктов.', time: 'Пт' }],
  },
  {
    id: 'customer-research', title: 'Исследования клиентов', subtitle: 'Новые интервью', avatar: '🎤', avatarTone: '#f2ddff', kind: 'channel', federation: true, unread: 8,
    messages: [{ id: 'cr-1', author: 'other', sender: 'Мария Лебедева · VK', avatar: 'МЛ', federation: true, text: 'Добавили пять новых интервью с партнёрами.', time: 'Пт' }],
  },
  {
    id: 'backend-guild', title: 'Backend-гильдия', subtitle: '16 участников', avatar: '⚙️', avatarTone: '#dce8ff', kind: 'group',
    messages: [{ id: 'bg-1', author: 'other', sender: 'Роман', avatar: 'РО', text: 'Следующий технический разбор проведём во вторник.', time: 'Пт' }],
  },
  {
    id: 'marina-direct', title: 'Марина Кузнецова', subtitle: 'Личный чат', avatar: 'МК', avatarTone: '#e8ddff', avatarFilled: false, kind: 'direct', unread: 1,
    messages: [{ id: 'md-1', author: 'other', sender: 'Марина Кузнецова', avatar: 'МК', text: 'Собрала вопросы к завтрашнему созвону.', time: 'Чт' }],
  },
  {
    id: 'partner-onboarding', title: 'Онбординг партнёров', subtitle: '13 участников', avatar: '🤝', avatarTone: '#e3f7cb', kind: 'group', federation: true, unread: 3,
    messages: [{ id: 'po-1', author: 'other', sender: 'Ирина Смирнова · VK', avatar: 'ИС', federation: true, text: 'Гайд обновлён, можно отправлять новым участникам.', time: 'Чт' }],
  },
  {
    id: 'company-news', title: 'Новости команды', subtitle: 'Еженедельный дайджест', avatar: '📰', avatarTone: '#ffe2d8', kind: 'channel', unread: 12,
    messages: [{ id: 'cn-1', author: 'other', sender: 'Редакция', avatar: 'РЕ', text: 'Опубликовали дайджест за эту неделю.', time: 'Чт' }],
  },
  {
    id: 'qa-team', title: 'Команда тестирования', subtitle: '9 участников', avatar: '🧪', avatarTone: '#d8f1e2', kind: 'group',
    messages: [{ id: 'qt-1', author: 'other', sender: 'Ольга', avatar: 'ОЛ', text: 'Регресс завершён, критичных ошибок не найдено.', time: 'Ср' }],
  },
  {
    id: 'boris-direct', title: 'Борис Агафонов', subtitle: 'Альфа-Банк · другая организация', avatar: 'БА', avatarTone: '#f1d8ff', avatarFilled: false, kind: 'direct', federation: true, unread: 1,
    messages: [{ id: 'bd-1', author: 'other', sender: 'Борис Агафонов', avatar: 'БА', federation: true, text: 'Готов обсудить результаты пилота сегодня после трёх.', time: 'Ср' }],
  },
]

const conversationTemplates = {
  direct: [
    ['other', 'Привет! Удобно сейчас обсудить детали?'],
    ['me', 'Да, я на связи. Что нужно уточнить?'],
    ['other', 'Сверяю последние изменения и пришлю короткий список.'],
    ['me', 'Хорошо, посмотрю сразу после встречи.'],
    ['other', 'Готово. Отметил самое важное в начале.'],
    ['me', 'Спасибо! Первые два пункта уже можно брать в работу.'],
    ['other', 'Отлично, тогда зафиксирую договорённости.'],
    ['me', 'Договорились. Вернёмся к этому завтра утром.'],
  ],
  group: [
    ['other', 'Коллеги, обновил статус по задачам на сегодня.'],
    ['me', 'Спасибо. По моей части всё идёт по плану.'],
    ['other', 'Есть один вопрос по срокам второй итерации.'],
    ['me', 'Давайте оставим текущую дату и проверим прогресс вечером.'],
    ['other', 'Добавил комментарии и свежие материалы в описание.'],
    ['me', 'Вижу. Возьму два пункта и вернусь с ответом.'],
    ['other', 'Следующий короткий созвон предлагаю завтра в 11:00.'],
    ['me', 'Подходит, добавил встречу в календарь.'],
  ],
  channel: [
    ['other', 'Опубликовано новое обновление для команды.'],
    ['other', 'Внутри — основные изменения и полезные ссылки.'],
    ['me', 'Спасибо, сохранил. Передам коллегам.'],
    ['other', 'Дополнительно собрали ответы на частые вопросы.'],
    ['other', 'Материалы доступны всем участникам канала.'],
    ['me', 'Отлично, как раз пригодится для общей встречи.'],
    ['other', 'Следующее обновление планируем в конце недели.'],
    ['other', 'Если появятся вопросы, оставляйте их прямо здесь.'],
  ],
} as const

const demoImages = [
  { src: 'assets/figma/message-avatar-photo.png', alt: 'Фотография с рабочего обсуждения' },
  { src: 'assets/avatars/product-launch.png', alt: 'Иллюстрация запуска продукта' },
  { src: 'assets/avatars/delivery-integration.png', alt: 'Иллюстрация интеграции доставки' },
] as const

export const federationChats: Chat[] = federationChatSeeds.map((chat, chatIndex) => {
  const kind = chat.kind ?? 'group'
  const template = conversationTemplates[kind]
  const sender = chat.messages.find((message) => message.author === 'other')?.sender ?? chat.title
  const avatar = chat.messages.find((message) => message.author === 'other')?.avatar ?? chat.avatar
  const targetCount = 18 + chatIndex % 13
  const generated = Array.from({ length: Math.max(0, targetCount - chat.messages.length) }, (_, messageIndex) => {
    const [author, text] = template[messageIndex % template.length]
    const round = Math.floor(messageIndex / template.length) + 1
    const timestamp = 12 * 60 + messageIndex * 7 + chatIndex
    return {
    id: `${chat.id}-demo-${messageIndex + 1}`,
    author,
    sender: author === 'other' ? sender : undefined,
    avatar: author === 'other' ? avatar : undefined,
    federation: author === 'other' ? chat.federation : undefined,
    text: `${text}${round > 1 ? ` Этап ${round} сверки для «${chat.title}».` : ''}`,
    time: `${Math.floor(timestamp / 60)}:${String(timestamp % 60).padStart(2, '0')}`,
    images: messageIndex === 4 && chatIndex % 3 === 0 ? [demoImages[chatIndex % demoImages.length]] : undefined,
    reply: messageIndex === 5 ? { sender: sender ?? chat.title, text: template[4][1] } : undefined,
    reactions: messageIndex === targetCount - chat.messages.length - 2 ? [{ emoji: '👍', count: 2 + chatIndex % 4, reacted: chatIndex % 2 === 0 }] : undefined,
  }
  }) satisfies Chat['messages']

  return { ...chat, messages: [...chat.messages, ...generated] }
})

import type { Chat } from '../../types/chat'

const chatSeeds: Chat[] = [
  {
    id: 'design', title: 'Дизайн', subtitle: 'Ольга: передала макеты в разработку', avatar: '🎨', kind: 'channel',
    avatarTone: 'linear-gradient(145deg,#007fff,#ffce4a)', pinned: true, unread: 3,
    messages: [
      { id: 'd1', author: 'other', sender: 'Ольга', avatar: 'ОК', text: 'Доброе утро! Обновила состояния списка чатов и собрала отдельный экран для пустой папки.', time: '09:16' },
      { id: 'd2', author: 'other', sender: 'Антон', avatar: 'АВ', text: 'Посмотрел. В узком списке длинные названия корректно уходят в многоточие 👍', time: '09:24' },
      { id: 'd3', author: 'me', text: 'Проверю ещё состояние с двумя каунтерами и закреплённым чатом.', time: '09:31', reply: { sender: 'Антон', text: 'В узком списке длинные названия корректно уходят в многоточие' } },
      { id: 'd4', author: 'other', sender: 'Ольга', avatar: 'ОК', text: 'Добавила спецификацию по отступам. Все значения привязаны к токенам Collapse.', time: '10:02', attachments: [{ id: 'design-spec', name: 'chat-list-spec.pdf', size: 1843200, type: 'application/pdf' }] },
      { id: 'd5', author: 'other', sender: 'Лена', avatar: 'ЛМ', text: 'Для активной строки оставляем текущую светло-фиолетовую подложку?', time: '10:18' },
      { id: 'd6', author: 'me', text: 'Да, оставляем. Она уже совпадает с состоянием Selected в библиотеке.', time: '10:21' },
      { id: 'd7', author: 'other', sender: 'Ольга', avatar: 'ОК', text: 'Тогда передаю макеты в разработку. Если появятся расхождения, отмечайте прямо в треде.', time: '10:36', pinned: true, reactions: [{ emoji: '👍', count: 6, reacted: true }, { emoji: '🎨', count: 3 }] },
    ],
  },
  {
    id: 'team', title: 'Команда', subtitle: '15 участников', avatar: '◒', kind: 'group',
    avatarTone: 'linear-gradient(145deg,#ff215d,#ff7c47 35%,#7047fe 68%,#00c8ff)', pinned: true,
    messages: [
      { id: 't1', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: 'Коллеги, привет! Уже можно посмотреть первый вариант навигации по папкам.', time: '10:05' },
      { id: 't2', author: 'other', sender: 'Михаил', avatarImage: 'assets/figma/message-avatar-photo.png', text: 'Открыл на большом экране. Перетягивание границы списка работает ожидаемо.', time: '10:12' },
      { id: 't3', author: 'me', text: 'Отлично. После обеда проверю крайние ширины и клавиатурное управление.', time: '10:17', reply: { sender: 'Михаил', text: 'Перетягивание границы списка работает ожидаемо' } },
      { id: 't4', author: 'other', sender: 'Мария', avatar: 'МА', text: 'Я собрала короткий список сценариев для проверки папок.', time: '10:40', attachments: [{ id: 'team-checklist', name: 'folder-checklist.docx', size: 286720, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }] },
      { id: 't5', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: 'Напомню: сегодня фиксируем только критичные замечания, косметику вынесем отдельно.', time: '11:03', pinned: true },
      { id: 't6', author: 'me', text: 'Принято. Основной сценарий уже стабильный, осталось пройти пустые состояния.', time: '11:11' },
      { id: 't7', author: 'other', sender: 'Михаил', avatarImage: 'assets/figma/message-avatar-photo.png', text: 'Тогда встречаемся на синке в 15:30. Я покажу сборку и список известных ограничений.', time: '11:26', reactions: [{ emoji: '👍', count: 8, reacted: true }, { emoji: '🔥', count: 2 }] },
    ],
  },
  {
    id: 'mts', title: 'МТС', subtitle: 'Мария: презентация готова', avatar: 'М Т С', avatarTone: '#e93347', kind: 'group', unread: 10, muted: true,
    messages: [
      { id: 'm1', author: 'other', sender: 'Мария', avatar: 'МА', text: 'Коллеги, собрала материалы к ежемесячному обзору продукта.', time: '08:42' },
      { id: 'm2', author: 'other', sender: 'Игорь', avatar: 'ИП', text: 'Добавил цифры по активным командам и использованию видеовстреч.', time: '08:55' },
      { id: 'm3', author: 'me', text: 'Спасибо! Проверю слайды про чаты — там вчера обновляли данные.', time: '09:02' },
      { id: 'm4', author: 'other', sender: 'Мария', avatar: 'МА', text: 'Да, на слайде 12 уже новая диаграмма. Старую версию можно не учитывать.', time: '09:08', reply: { sender: 'Я', text: 'Проверю слайды про чаты' } },
      { id: 'm5', author: 'other', sender: 'Игорь', avatar: 'ИП', text: 'Проверил формулировки — теперь везде одинаковые названия функций.', time: '09:27' },
      { id: 'm6', author: 'other', sender: 'Мария', avatar: 'МА', text: 'Финальная презентация готова. До встречи оставила её только на чтение.', time: '09:46', attachments: [{ id: 'mts-deck', name: 'product-review-september.pdf', size: 4823449, type: 'application/pdf' }], reactions: [{ emoji: '👍', count: 5 }, { emoji: '✨', count: 2 }] },
    ],
  },
  {
    id: 'updates', title: 'Обновления продукта', subtitle: 'Сегодня, 09:40', avatar: '👀', avatarTone: '#53c985', kind: 'channel', unread: 33,
    messages: [
      { id: 'u1', author: 'other', sender: 'Команда продукта', avatar: 'КП', text: '**Обновление чатов уже доступно.** Теперь системные и пользовательские папки можно настраивать в одном окне.', time: '09:40', pinned: true },
      { id: 'u2', author: 'other', sender: 'Команда продукта', avatar: 'КП', text: 'Список чатов адаптируется по ширине: потяните за правую границу панели, чтобы освободить больше места для названий.', time: '09:41' },
      { id: 'u3', author: 'other', sender: 'Команда продукта', avatar: 'КП', text: 'Также улучшили работу с непрочитанными сообщениями и добавили быстрые действия для папок.', time: '09:42' },
      { id: 'u4', author: 'other', sender: 'Никита', avatar: 'НС', text: 'Обновление появится у всех пользователей постепенно в течение дня.', time: '09:50' },
      { id: 'u5', author: 'me', text: 'Отличная новость! Уже попробовал новую навигацию — стало заметно удобнее.', time: '10:04' },
      { id: 'u6', author: 'other', sender: 'Команда продукта', avatar: 'КП', text: 'Спасибо за обратную связь. Если заметите проблему, пришлите снимок экрана в канал «Баги».', time: '10:18', reactions: [{ emoji: '👍', count: 24, reacted: true }, { emoji: '🔥', count: 11 }, { emoji: '🎉', count: 7 }] },
    ],
  },
  {
    id: 'ops', title: 'Операционные вопросы', subtitle: 'Алексей: встреча в 16:00', avatar: '✏️', avatarTone: '#ffd154', kind: 'group', unread: 11,
    messages: [
      { id: 'o1', author: 'other', sender: 'Алексей', avatar: 'АК', text: 'Доброе утро. Сегодняшнюю рабочую встречу перенесли на 16:00.', time: '09:18', pinned: true },
      { id: 'o2', author: 'other', sender: 'Светлана', avatar: 'СН', text: 'Переговорная на пятом этаже свободна, поставила бронь на час.', time: '09:22' },
      { id: 'o3', author: 'me', text: 'Спасибо. Подключусь удалённо, ссылку возьму из приглашения.', time: '09:25' },
      { id: 'o4', author: 'other', sender: 'Алексей', avatar: 'АК', text: 'На встрече пройдём статусы по задачам и план на следующую неделю.', time: '09:47' },
      { id: 'o5', author: 'other', sender: 'Светлана', avatar: 'СН', text: 'Добавила в повестку вопрос по доступам для новых участников команды.', time: '10:03' },
      { id: 'o6', author: 'me', text: 'Хорошо, я заранее соберу список тех, кому ещё нужен доступ.', time: '10:09', reactions: [{ emoji: '👍', count: 3 }] },
    ],
  },
  {
    id: 'project', title: 'Проектная группа', subtitle: '5 участников', avatar: '🖊️', avatarTone: '#fb4a3f', kind: 'group',
    messages: [
      { id: 'p1', author: 'other', sender: 'Ирина', avatar: 'ИК', text: 'План работ на эту неделю закрепила в чате.', time: '09:05', pinned: true },
      { id: 'p2', author: 'other', sender: 'Денис', avatar: 'ДС', text: 'Я беру интеграцию поиска и проверку пустых результатов.', time: '09:14' },
      { id: 'p3', author: 'me', text: 'Тогда на мне остаются папки, контекстные меню и финальная сборка.', time: '09:20' },
      { id: 'p4', author: 'other', sender: 'Ирина', avatar: 'ИК', text: 'Да. По папкам важно проверить создание, редактирование, удаление и изменение порядка.', time: '09:33', reply: { sender: 'Я', text: 'На мне остаются папки и контекстные меню' } },
      { id: 'p5', author: 'other', sender: 'Денис', avatar: 'ДС', text: 'Поиск готов. Вечером отправлю ссылку на сборку для общего прогона.', time: '13:11' },
      { id: 'p6', author: 'me', text: 'Отлично, добавлю результаты в общий чек-лист.', time: '13:18', reactions: [{ emoji: '👍', count: 4, reacted: true }] },
    ],
  },
  {
    id: 'news', title: 'Новости компании', subtitle: 'Редакция: итоги месяца', avatar: '🔔', avatarTone: '#ffd154', kind: 'channel',
    messages: [
      { id: 'n1', author: 'other', sender: 'Редакция', avatar: 'РК', text: 'Доброе утро! Опубликовали итоги месяца и главные новости команд.', time: '09:00', pinned: true },
      { id: 'n2', author: 'other', sender: 'Редакция', avatar: 'РК', text: 'В новом выпуске: обновление продукта, интервью с командой поддержки и календарь внутренних событий.', time: '09:01' },
      { id: 'n3', author: 'other', sender: 'Екатерина', avatar: 'ЕВ', text: 'Особенно советую интервью — коллеги поделились хорошими практиками работы с обратной связью.', time: '09:12' },
      { id: 'n4', author: 'me', text: 'Спасибо! Добавил выпуск в список для чтения.', time: '09:26' },
      { id: 'n5', author: 'other', sender: 'Редакция', avatar: 'РК', text: 'Следующий выпуск выйдет через две недели. Темы и короткие заметки можно присылать редакции до пятницы.', time: '09:45', reactions: [{ emoji: '👏', count: 18 }, { emoji: '❤️', count: 9, reacted: true }] },
    ],
  },
  {
    id: 'dev', title: 'Разработка', subtitle: 'Сергей: сборка готова к проверке', avatar: '⚙️', avatarTone: '#438ce8', kind: 'group',
    messages: [
      { id: 'r1', author: 'other', sender: 'Сергей', avatar: 'СЕ', text: 'Утреннюю сборку выложил. В ней уже есть изменение ширины списка чатов.', time: '09:32' },
      { id: 'r2', author: 'other', sender: 'Павел', avatar: 'ПН', text: 'Проверил в Chrome и Safari — граница двигается плавно, ошибок в консоли нет.', time: '09:48' },
      { id: 'r3', author: 'me', text: 'А с клавиатуры граница тоже меняется?', time: '09:51' },
      { id: 'r4', author: 'other', sender: 'Павел', avatar: 'ПН', text: 'Да: стрелки меняют ширину по шагам, Home и End ставят минимальное и максимальное значение.', time: '09:56', reply: { sender: 'Я', text: 'А с клавиатуры граница тоже меняется?' } },
      { id: 'r5', author: 'other', sender: 'Сергей', avatar: 'СЕ', text: 'Добавил ещё проверку сборки Storybook. Все текущие истории проходят.', time: '10:20' },
      { id: 'r6', author: 'me', text: 'Отлично. Тогда после визуального прогона можно публиковать.', time: '10:27' },
      { id: 'r7', author: 'other', sender: 'Сергей', avatar: 'СЕ', text: 'Сборка готова к проверке.', time: '10:42', reactions: [{ emoji: '👍', count: 5, reacted: true }, { emoji: '🔥', count: 2 }] },
    ],
  },
  {
    id: 'dev-chats', title: 'dev_chats_navigation_team', subtitle: 'Команда навигации', avatar: '🦖', avatarTone: 'linear-gradient(145deg,#342f45,#b43f45)', kind: 'group',
    messages: [
      { id: 'dc1', author: 'other', sender: 'Вадим', avatar: 'ВК', text: 'Предлагаю сегодня закрыть поведение системных папок и больше не менять порядок сегментов.', time: '10:08' },
      { id: 'dc2', author: 'other', sender: 'Настя', avatar: 'НА', text: 'Согласна. После включения папка должна сразу появляться в конце списка.', time: '10:13' },
      { id: 'dc3', author: 'me', text: 'Это уже работает. Ещё проверю сценарий, когда активную папку скрывают через контекстное меню.', time: '10:20' },
      { id: 'dc4', author: 'other', sender: 'Вадим', avatar: 'ВК', text: 'В таком случае нужно переходить во «Все», чтобы пользователь не оставался на скрытом сегменте.', time: '10:25', reply: { sender: 'Я', text: 'Проверю сценарий, когда активную папку скрывают' } },
      { id: 'dc5', author: 'other', sender: 'Настя', avatar: 'НА', text: 'Добавила этот пункт в критерии приёмки.', time: '10:39', attachments: [{ id: 'dc-criteria', name: 'navigation-acceptance.md', size: 18432, type: 'text/markdown' }] },
      { id: 'dc6', author: 'me', text: 'Спасибо. После обеда пришлю результат полного прогона.', time: '10:44', reactions: [{ emoji: '🦖', count: 4 }, { emoji: '👍', count: 3 }] },
    ],
  },
  {
    id: 'ideas', title: 'Идеи', subtitle: 'Лена: быстрые реакции', avatar: '📝', avatarTone: '#5fcf80', kind: 'channel',
    messages: [
      { id: 'i1', author: 'other', sender: 'Лена', avatar: 'ЛМ', text: 'Идея: показывать несколько последних реакций прямо над полем ввода.', time: '09:34' },
      { id: 'i2', author: 'other', sender: 'Роман', avatar: 'РТ', text: 'Полезно для небольших команд, но в крупных каналах панель может стать слишком шумной.', time: '09:46' },
      { id: 'i3', author: 'me', text: 'Можно ограничить панель тремя реакциями и позволить скрыть её в настройках.', time: '09:52' },
      { id: 'i4', author: 'other', sender: 'Лена', avatar: 'ЛМ', text: 'Хорошая мысль. Ещё вариант — поднимать наверх реакции, которыми человек пользуется чаще.', time: '10:01', reply: { sender: 'Я', text: 'Ограничить панель тремя реакциями' } },
      { id: 'i5', author: 'other', sender: 'Роман', avatar: 'РТ', text: 'Давайте сначала проверим простой вариант на прототипе, без персонализации.', time: '10:16' },
      { id: 'i6', author: 'me', text: 'Записал. Подготовлю небольшой интерактивный пример к следующему обсуждению.', time: '10:22', reactions: [{ emoji: '💡', count: 7, reacted: true }, { emoji: '👍', count: 5 }] },
    ],
  },
  {
    id: 'bugs', title: 'Баги', subtitle: 'QA: открыто 7', avatar: '🐞', avatarTone: '#ffc64c', kind: 'channel',
    messages: [
      { id: 'b1', author: 'other', sender: 'QA', avatar: 'QA', text: 'Нашли проблему: после быстрого переключения папок иногда сохранялся предыдущий список чатов.', time: '09:12' },
      { id: 'b2', author: 'other', sender: 'Сергей', avatar: 'СЕ', text: 'Воспроизвёл. Причина в состоянии фильтра, исправление уже в работе.', time: '09:28' },
      { id: 'b3', author: 'me', text: 'Проверьте, пожалуйста, ещё поиск внутри пользовательской папки.', time: '09:33' },
      { id: 'b4', author: 'other', sender: 'QA', avatar: 'QA', text: 'Проверили: поиск работает корректно, пустой результат отображается.', time: '09:51', reply: { sender: 'Я', text: 'Проверьте ещё поиск внутри пользовательской папки' } },
      { id: 'b5', author: 'other', sender: 'Сергей', avatar: 'СЕ', text: 'Исправление фильтра добавлено в новую сборку.', time: '10:24' },
      { id: 'b6', author: 'other', sender: 'QA', avatar: 'QA', text: 'Повторно проверили десять переключений подряд — проблема больше не воспроизводится.', time: '10:47', reactions: [{ emoji: '✅', count: 4, reacted: true }, { emoji: '👍', count: 2 }] },
      { id: 'b7', author: 'me', text: 'Отлично, закрываем. Остальные семь замечаний остаются в списке на следующий прогон.', time: '10:53' },
    ],
  },
  {
    id: 'marketing', title: 'Маркетинг', subtitle: 'Кампания стартует в понедельник', avatar: '📣', avatarTone: '#ff7a59', kind: 'group', unread: 6,
    messages: [
      { id: 'mk1', author: 'other', sender: 'Алина', avatar: 'АЛ', text: 'Финальные баннеры согласованы, можно готовить размещения.', time: '09:10' },
      { id: 'mk2', author: 'other', sender: 'Кирилл', avatar: 'КН', text: 'Медиаплан обновил. Основной запуск поставил на понедельник, 10:00.', time: '09:22' },
      { id: 'mk3', author: 'me', text: 'Проверю тексты для продуктовой страницы и вернусь с комментариями до обеда.', time: '09:31' },
      { id: 'mk4', author: 'other', sender: 'Алина', avatar: 'АЛ', text: 'Отлично, тогда вечером собираем финальный пакет.', time: '09:37', reactions: [{ emoji: '🚀', count: 4 }, { emoji: '👍', count: 3 }] },
    ],
  },
  {
    id: 'support-team', title: 'Команда поддержки', subtitle: 'Наталья: обновили шаблоны ответов', avatar: '🛟', avatarTone: '#36b7a5', kind: 'group', unread: 4,
    messages: [
      { id: 'sp1', author: 'other', sender: 'Наталья', avatar: 'НВ', text: 'Обновили шаблоны ответов по папкам и переносу чатов.', time: '09:44' },
      { id: 'sp2', author: 'other', sender: 'Олег', avatar: 'ОС', text: 'Добавил пример для ситуации, когда пользователь случайно скрыл системную папку.', time: '09:51' },
      { id: 'sp3', author: 'me', text: 'Хорошо. Давайте ещё добавим короткую инструкцию про восстановление папки через настройки.', time: '10:03' },
      { id: 'sp4', author: 'other', sender: 'Наталья', avatar: 'НВ', text: 'Готово, статья уже ушла на проверку редактору.', time: '10:16', reactions: [{ emoji: '✅', count: 5 }] },
    ],
  },
  {
    id: 'alexey-smirnov', title: 'Алексей Смирнов', subtitle: 'Договорились созвониться после обеда', avatar: 'АС', avatarTone: '#8b6cf6', kind: 'direct',
    messages: [
      { id: 'as1', author: 'other', sender: 'Алексей Смирнов', avatar: 'АС', text: 'Привет! Посмотрел прототип, есть пара вопросов по поведению каналов.', time: '10:11' },
      { id: 'as2', author: 'me', text: 'Привет! Давай разберём. Могу подключиться после 14:00.', time: '10:15' },
      { id: 'as3', author: 'other', sender: 'Алексей Смирнов', avatar: 'АС', text: 'Подойдёт 14:30. Я заранее пришлю два сценария.', time: '10:18' },
      { id: 'as4', author: 'me', text: 'Отлично, поставил встречу в календарь.', time: '10:20', reactions: [{ emoji: '👍', count: 1, reacted: true }] },
    ],
  },
  {
    id: 'hr-questions', title: 'HR-вопросы', subtitle: 'Светлана: встреча для новичков', avatar: '👥', avatarTone: '#ee6b9c', kind: 'group', muted: true,
    messages: [
      { id: 'hr1', author: 'other', sender: 'Светлана', avatar: 'СН', text: 'В четверг проведём короткую встречу для новых коллег.', time: '10:26' },
      { id: 'hr2', author: 'other', sender: 'Роман', avatar: 'РТ', text: 'Добавьте, пожалуйста, блок про внутренние сервисы и доступы.', time: '10:34' },
      { id: 'hr3', author: 'me', text: 'Могу показать чаты, задачи и базу знаний. На это хватит десяти минут.', time: '10:41' },
      { id: 'hr4', author: 'other', sender: 'Светлана', avatar: 'СН', text: 'Спасибо, добавила тебя в программу.', time: '10:45' },
    ],
  },
  {
    id: 'mobile-app', title: 'Мобильное приложение', subtitle: '8 участников', avatar: '📱', avatarTone: '#4d8cff', kind: 'group', unread: 2,
    messages: [
      { id: 'ma1', author: 'other', sender: 'Виктор', avatar: 'ВЛ', text: 'Собрал тестовую версию с новой навигацией по чатам.', time: '11:02' },
      { id: 'ma2', author: 'other', sender: 'Юлия', avatar: 'ЮК', text: 'На небольшом экране список выглядит хорошо, но нужно проверить длинные названия.', time: '11:09' },
      { id: 'ma3', author: 'me', text: 'Возьму устройства с двумя размерами экрана и сделаю сравнение.', time: '11:13' },
      { id: 'ma4', author: 'other', sender: 'Виктор', avatar: 'ВЛ', text: 'Спасибо. Сборку закрепил в описании чата.', time: '11:21', pinned: true },
    ],
  },
  {
    id: 'research', title: 'Исследование навигации', subtitle: 'Полина: готовы первые выводы', avatar: '🔍', avatarTone: '#6f73d9', kind: 'group', unread: 5,
    messages: [
      { id: 'rs1', author: 'other', sender: 'Полина', avatar: 'ПГ', text: 'Провели первые пять интервью по навигации в чатах.', time: '11:24' },
      { id: 'rs2', author: 'other', sender: 'Глеб', avatar: 'ГМ', text: 'Пользователи быстро находят папки, но не сразу замечают возможность менять их порядок.', time: '11:32' },
      { id: 'rs3', author: 'me', text: 'Интересно. Можно проверить более заметное состояние при перетаскивании.', time: '11:39' },
      { id: 'rs4', author: 'other', sender: 'Полина', avatar: 'ПГ', text: 'Да, добавим это в следующий раунд тестов.', time: '11:45', reactions: [{ emoji: '💡', count: 4 }] },
    ],
  },
  {
    id: 'partner-launch', title: 'Запуск с партнёром', subtitle: 'Статус: подготовка демо', avatar: '🚀', avatarTone: '#ef5b5b', kind: 'group', unread: 7,
    messages: [
      { id: 'pl1', author: 'other', sender: 'Тимур', avatar: 'ТБ', text: 'Демо для партнёра запланировали на среду.', time: '11:50' },
      { id: 'pl2', author: 'other', sender: 'Вера', avatar: 'ВР', text: 'Я подготовлю сценарий: создание канала, приглашение участников и обмен файлами.', time: '11:58' },
      { id: 'pl3', author: 'me', text: 'Добавлю отдельный пример с папками, чтобы показать организацию рабочих чатов.', time: '12:04' },
      { id: 'pl4', author: 'other', sender: 'Тимур', avatar: 'ТБ', text: 'Отлично. Генеральную репетицию проведём во вторник вечером.', time: '12:12', reactions: [{ emoji: '🚀', count: 6 }] },
    ],
  },
  {
    id: 'finance-planning', title: 'Финансовое планирование', subtitle: 'Ирина: таблица обновлена', avatar: '📊', avatarTone: '#28a879', kind: 'group', muted: true,
    messages: [
      { id: 'fp1', author: 'other', sender: 'Ирина', avatar: 'ИК', text: 'Обновила прогноз расходов на следующий квартал.', time: '12:16' },
      { id: 'fp2', author: 'other', sender: 'Максим', avatar: 'МЛ', text: 'Вижу изменения. По исследованиям оставил резерв на два дополнительных теста.', time: '12:23' },
      { id: 'fp3', author: 'me', text: 'Проверю строку по внешним подрядчикам и подтвержу сумму сегодня.', time: '12:28' },
      { id: 'fp4', author: 'other', sender: 'Ирина', avatar: 'ИК', text: 'Хорошо, после подтверждения зафиксирую версию.', time: '12:33' },
    ],
  },
  {
    id: 'content-team', title: 'Контент-команда', subtitle: 'Новый гайд готов к публикации', avatar: '✍️', avatarTone: '#d96fa8', kind: 'group', unread: 3,
    messages: [
      { id: 'ct1', author: 'other', sender: 'Елена', avatar: 'ЕА', text: 'Гайд по работе с каналами прошёл редактуру.', time: '12:38' },
      { id: 'ct2', author: 'other', sender: 'Артур', avatar: 'АО', text: 'Добавил снимки экрана и подписи к основным действиям.', time: '12:44' },
      { id: 'ct3', author: 'me', text: 'Проверю терминологию: «чат», «группа» и «канал» должны использоваться последовательно.', time: '12:49' },
      { id: 'ct4', author: 'other', sender: 'Елена', avatar: 'ЕА', text: 'Отлично, после этого можно публиковать.', time: '12:56', reactions: [{ emoji: '👍', count: 3 }] },
    ],
  },
  {
    id: 'daria-petrova', title: 'Дарья Петрова', subtitle: 'Дарья: спасибо за помощь!', avatar: 'ДП', avatarTone: '#f18a4f', kind: 'direct',
    messages: [
      { id: 'dp1', author: 'other', sender: 'Дарья Петрова', avatar: 'ДП', text: 'Привет! Подскажи, как вернуть папку «Новые», если я её скрыла?', time: '13:03' },
      { id: 'dp2', author: 'me', text: 'Открой настройки папок через иконку рядом с сегментами и включи «Новые».', time: '13:06' },
      { id: 'dp3', author: 'other', sender: 'Дарья Петрова', avatar: 'ДП', text: 'Нашла, папка сразу появилась в конце списка.', time: '13:09' },
      { id: 'dp4', author: 'me', text: 'Да, теперь её можно перетащить на нужное место.', time: '13:12', reactions: [{ emoji: '🙏', count: 1 }] },
    ],
  },
  {
    id: 'release-notes', title: 'Релизы', subtitle: 'Версия 2.18 опубликована', avatar: '📦', avatarTone: '#5f7ae8', kind: 'channel', unread: 12,
    messages: [
      { id: 'rl1', author: 'other', sender: 'Release Bot', avatar: 'RB', text: '**Версия 2.18 опубликована.** В неё вошли папки чатов и обновлённый редактор сообщений.', time: '09:05', pinned: true },
      { id: 'rl2', author: 'other', sender: 'Release Bot', avatar: 'RB', text: 'Также исправили поиск, счётчики непрочитанных и отображение длинных названий.', time: '09:06' },
      { id: 'rl3', author: 'other', sender: 'Дмитрий', avatar: 'ДО', text: 'Развёртывание прошло успешно, показатели стабильны.', time: '09:18' },
      { id: 'rl4', author: 'me', text: 'Проверил основную сборку — всё работает.', time: '09:25', reactions: [{ emoji: '🎉', count: 14 }, { emoji: '👍', count: 9 }] },
    ],
  },
  {
    id: 'design-system', title: 'Дизайн-система', subtitle: 'Новый компонент добавлен в Storybook', avatar: '🧩', avatarTone: '#7958d8', kind: 'channel', unread: 8,
    messages: [
      { id: 'ds1', author: 'other', sender: 'DS Team', avatar: 'DS', text: 'В Storybook добавили варианты списка файлов и состояния загрузки.', time: '09:30' },
      { id: 'ds2', author: 'other', sender: 'Ольга', avatar: 'ОК', text: 'Проверила размеры и токены — локальных значений в компоненте нет.', time: '09:41' },
      { id: 'ds3', author: 'me', text: 'Хорошо. Добавлю компонент в следующий пример Message Editor.', time: '09:47' },
      { id: 'ds4', author: 'other', sender: 'DS Team', avatar: 'DS', text: 'Документацию тоже обновили.', time: '09:54', reactions: [{ emoji: '✅', count: 7 }] },
    ],
  },
  {
    id: 'analytics', title: 'Аналитика', subtitle: 'Отчёт за неделю готов', avatar: '📈', avatarTone: '#2ea78d', kind: 'channel', unread: 15,
    messages: [
      { id: 'an1', author: 'other', sender: 'Команда аналитики', avatar: 'КА', text: 'Готов еженедельный отчёт по активности в чатах.', time: '10:00' },
      { id: 'an2', author: 'other', sender: 'Команда аналитики', avatar: 'КА', text: 'Чаще всего пользователи создают папки для проектов, команд и важных каналов.', time: '10:01' },
      { id: 'an3', author: 'other', sender: 'Илья', avatar: 'ИБ', text: 'В следующем отчёте добавим сравнение до и после запуска новой навигации.', time: '10:12' },
      { id: 'an4', author: 'me', text: 'Отлично, это поможет оценить влияние обновления.', time: '10:19', reactions: [{ emoji: '📊', count: 6 }] },
    ],
  },
  {
    id: 'user-research', title: 'Исследования пользователей', subtitle: 'Набор на интервью открыт', avatar: '🎧', avatarTone: '#cc6f9f', kind: 'channel',
    messages: [
      { id: 'ur1', author: 'other', sender: 'Research Team', avatar: 'RT', text: 'Открыли набор на интервью по ежедневной работе с чатами.', time: '10:24' },
      { id: 'ur2', author: 'other', sender: 'Полина', avatar: 'ПГ', text: 'Ищем пользователей, у которых больше двадцати активных переписок.', time: '10:31' },
      { id: 'ur3', author: 'me', text: 'Передал приглашение коллегам из двух проектных команд.', time: '10:38' },
      { id: 'ur4', author: 'other', sender: 'Research Team', avatar: 'RT', text: 'Спасибо! Регистрация открыта до пятницы.', time: '10:44' },
    ],
  },
  {
    id: 'backend-status', title: 'Статус сервисов', subtitle: 'Все системы работают штатно', avatar: '🛠️', avatarTone: '#4d7c9f', kind: 'channel', muted: true,
    messages: [
      { id: 'bs1', author: 'other', sender: 'Status Bot', avatar: 'SB', text: 'Плановые работы завершены.', time: '10:50' },
      { id: 'bs2', author: 'other', sender: 'Status Bot', avatar: 'SB', text: 'Доставка сообщений, файлы и уведомления работают штатно.', time: '10:51' },
      { id: 'bs3', author: 'other', sender: 'Андрей', avatar: 'АП', text: 'Метрики вернулись к обычным значениям.', time: '11:03' },
      { id: 'bs4', author: 'me', text: 'Принято, спасибо за обновление.', time: '11:08', reactions: [{ emoji: '✅', count: 11 }] },
    ],
  },
  {
    id: 'events', title: 'События и митапы', subtitle: 'Регистрация на встречу открыта', avatar: '🎟️', avatarTone: '#e56c5b', kind: 'channel', unread: 9,
    messages: [
      { id: 'ev1', author: 'other', sender: 'Оргкомитет', avatar: 'ОР', text: 'Открыли регистрацию на продуктовый митап в следующую среду.', time: '11:12' },
      { id: 'ev2', author: 'other', sender: 'Оргкомитет', avatar: 'ОР', text: 'В программе три коротких доклада и открытая сессия вопросов.', time: '11:13' },
      { id: 'ev3', author: 'other', sender: 'Марина', avatar: 'МР', text: 'Запись будет доступна участникам после мероприятия.', time: '11:25' },
      { id: 'ev4', author: 'me', text: 'Зарегистрировался, спасибо!', time: '11:31', reactions: [{ emoji: '🙌', count: 8 }] },
    ],
  },
  {
    id: 'education', title: 'Обучение', subtitle: 'Новый курс уже доступен', avatar: '🎓', avatarTone: '#8768d6', kind: 'channel', unread: 5,
    messages: [
      { id: 'ed1', author: 'other', sender: 'Команда обучения', avatar: 'КО', text: 'Опубликовали короткий курс по организации коммуникаций в команде.', time: '11:36' },
      { id: 'ed2', author: 'other', sender: 'Команда обучения', avatar: 'КО', text: 'Внутри есть уроки про папки, каналы, упоминания и уведомления.', time: '11:37' },
      { id: 'ed3', author: 'other', sender: 'Анна', avatar: 'АК', text: 'Прошла первый модуль — примеры понятные и короткие.', time: '11:49' },
      { id: 'ed4', author: 'me', text: 'Добавил курс в план на эту неделю.', time: '11:56' },
    ],
  },
  {
    id: 'knowledge-base', title: 'База знаний', subtitle: 'Обновлён раздел про чаты', avatar: '📚', avatarTone: '#3f91b8', kind: 'channel',
    messages: [
      { id: 'kb1', author: 'other', sender: 'Редакция базы знаний', avatar: 'БЗ', text: 'Обновили раздел про чаты и каналы.', time: '12:02' },
      { id: 'kb2', author: 'other', sender: 'Редакция базы знаний', avatar: 'БЗ', text: 'Добавили пошаговые инструкции для папок и контекстных меню.', time: '12:03' },
      { id: 'kb3', author: 'other', sender: 'Олег', avatar: 'ОС', text: 'Все ссылки из поддержки проверены, ошибок нет.', time: '12:14' },
      { id: 'kb4', author: 'me', text: 'Отлично, теперь можно использовать раздел в ответах пользователям.', time: '12:20', reactions: [{ emoji: '👍', count: 6 }] },
    ],
  },
  {
    id: 'integrations', title: 'Интеграции', subtitle: 'Календарь снова доступен', avatar: '🔌', avatarTone: '#287fa8', kind: 'channel', unread: 4,
    messages: [
      { id: 'in1', author: 'other', sender: 'Integration Bot', avatar: 'IB', text: 'Обновили подключение к календарю.', time: '12:25' },
      { id: 'in2', author: 'other', sender: 'Integration Bot', avatar: 'IB', text: 'Создание встреч из чата снова доступно всем пользователям.', time: '12:26' },
      { id: 'in3', author: 'other', sender: 'Пётр', avatar: 'ПЛ', text: 'Проверил на тестовом аккаунте — приглашения приходят корректно.', time: '12:37' },
      { id: 'in4', author: 'me', text: 'Спасибо, отмечаю проверку завершённой.', time: '12:43', reactions: [{ emoji: '✅', count: 5 }] },
    ],
  },
  {
    id: 'random', title: 'Обо всём', subtitle: 'Кофейная пауза в 15:00', avatar: '☕', avatarTone: '#ad744b', kind: 'channel', unread: 18,
    messages: [
      { id: 'rd1', author: 'other', sender: 'Лиза', avatar: 'ЛА', text: 'Кто сегодня идёт на кофейную паузу?', time: '12:48' },
      { id: 'rd2', author: 'other', sender: 'Макс', avatar: 'МХ', text: 'Я буду. Предлагаю встретиться у кухни в 15:00.', time: '12:51' },
      { id: 'rd3', author: 'me', text: 'Присоединюсь после звонка, возможно на пару минут позже.', time: '12:55' },
      { id: 'rd4', author: 'other', sender: 'Лиза', avatar: 'ЛА', text: 'Договорились, подождём 🙂', time: '12:58', reactions: [{ emoji: '☕', count: 9 }, { emoji: '🙂', count: 4 }] },
    ],
  },
]

const continuationTemplates = {
  direct: [
    ['other', 'Проверил детали и собрал короткое резюме.'],
    ['me', 'Спасибо, посмотрю и отмечу, если понадобится уточнение.'],
    ['other', 'Добавил ссылку на актуальную версию материалов.'],
    ['me', 'Вижу ссылку. Вернусь с ответом после проверки.'],
    ['other', 'Тогда зафиксирую это как следующий шаг.'],
    ['me', 'Договорились, держу вопрос в работе.'],
  ],
  group: [
    ['other', 'Обновил статус по текущим задачам.'],
    ['me', 'Спасибо, по моей части всё идёт по плану.'],
    ['other', 'Добавил детали и ссылки в описание обсуждения.'],
    ['me', 'Принято, проверю это до следующего синка.'],
    ['other', 'Остался один вопрос, его вынесем в отдельный пункт.'],
    ['me', 'Хорошо, возьму его в работу и вернусь с результатом.'],
  ],
  channel: [
    ['other', 'Опубликовали уточнение и дополнили материалы.'],
    ['other', 'В записи собраны актуальные ссылки и короткая инструкция.'],
    ['me', 'Спасибо, сохранил обновление для команды.'],
    ['other', 'Обратную связь и вопросы можно оставить в ответах.'],
    ['other', 'Следующее обновление появится после сверки результатов.'],
    ['me', 'Понятно, буду следить за продолжением.'],
  ],
} as const

const contextFor = (chat: Chat) => chat.kind === 'channel'
  ? `в канале «${chat.title}»`
  : chat.kind === 'direct'
    ? 'по нашему вопросу'
    : `для команды «${chat.title}»`

export const initialChats: Chat[] = chatSeeds.map((chat, chatIndex) => {
  const targetCount = 18 + chatIndex % 13
  const template = continuationTemplates[chat.kind ?? 'group']
  const sender = chat.messages.find((message) => message.author === 'other')?.sender ?? chat.title
  const avatar = chat.messages.find((message) => message.author === 'other')?.avatar ?? chat.avatar
  const additionalCount = Math.max(0, targetCount - chat.messages.length)
  const generated = Array.from({ length: additionalCount }, (_, messageIndex) => {
    const [author, text] = template[messageIndex % template.length]
    const round = Math.floor(messageIndex / template.length) + 1
    const timestamp = 13 * 60 + messageIndex * 9 + chatIndex * 3
    return {
      id: `${chat.id}-continuation-${messageIndex + 1}`,
      author,
      sender: author === 'other' ? sender : undefined,
      avatar: author === 'other' ? avatar : undefined,
      text: `${text} — ${contextFor(chat)}${round > 1 ? ` Этап ${round} сверки.` : ''}`,
      time: `${Math.floor(timestamp / 60)}:${String(timestamp % 60).padStart(2, '0')}`,
      reply: messageIndex === 4 ? { sender, text: template[2][1] } : undefined,
      reactions: messageIndex === additionalCount - 2 ? [{ emoji: '👍', count: 2 + chatIndex % 5, reacted: chatIndex % 2 === 0 }] : undefined,
    }
  }) satisfies Chat['messages']

  return { ...chat, messages: [...chat.messages, ...generated] }
})

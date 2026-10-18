# Collapse Base

Основной источник: [Figma Base](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base). Core-токены: [`CORE.md`](CORE.md). Фактическое покрытие: [`COMPONENT_INVENTORY.md`](COMPONENT_INVENTORY.md).

## Единый источник истины

- React-компоненты находятся в `src/components/ui`, Feedback — в `src/components/feedback`, Option Menu — в `src/components/option-menu`.
- Стили Base находятся в `src/components/ui/ui.css` и используют `--collapse-*`.
- Размеры компонентов определены в `src/theme/core/dimensions.css`; локальные экраны не копируют padding, gap, radius и border.
- Исправление визуального состояния сначала делается в компоненте и Storybook, затем проверяется в прототипе.

## Партия 1: actions, inputs, selection, avatar

### Button и IconButton

Источник: [Buttons, 1114:642](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-642).

- Button: Priority `Primary / Accent / Secondary / Tertiary`, Size `S 40 / M 48 / L 56`, состояния Enabled, Hovered, Pressed, Disabled, Loading; Type Default, Error, Success.
- IconButton: те же Priority, Size, State и Type. Floating Button: S 40, M 48, L 56. Все икон-кнопки в продуктовых композициях, включая закрытие модальных окон, используют этот компонент. Hover — `StateLayers/OnBase/Secondary` и compact Shadow02.
- Hover, pressed, focus-visible, disabled и loading реализованы в базовых компонентах.
- Button Split и Hyper-link вынесены в отдельные компоненты в партии 4–5.

### TextButton

- `TextButton` — текстовое действие без заливки для «Изменить», «Создать папку» и сходных компактных действий. Доступны `accent`, `base`, `error`, hover, pressed, focus-visible и disabled.
- Цвет берётся из Core `Text/Solid/Accent/Primary`, а состояния — из общих State Layers; локальные экраны цвет не переопределяют.
- Источник продукта: [chat folders, 40000004:30791](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000004-30791). Узел не вернулся через Figma MCP; подтверждены приложенный макет и существующие Core-токены.
- Storybook: `UI/TextButton / States`.

### TextField и TextArea

Источники: [Text field, 1114:414](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-414), [Text area, 12861:2982](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12861-2982).

- TextField: Default/Hover/Active/Disabled, error, placeholder/text, leading/trailing, supporting и counter.
- TextArea: Enabled/Hovered/Selected/Disabled, error, leading/trailing, supporting и counter; min-height 76, max-height 156.
- Поле имеет min-width 110, высоту 56, radius 24, border 2; focus — accent border 2.5.
- PIN-field реализован отдельно; chips content для TextArea остаётся редкой неподтверждённой SLOT-комбинацией.

### CheckBox, Radio, Switch

Источники: [CheckBox / Radio, 1114:428](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-428), [Switch, 1114:400](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-400).

- CheckBox: M 44/20, S 32/18, selected, indeterminate, ellipse, disabled, loading.
- Radio: M/S, selected, disabled, loading.
- Нативная клавиатура: Tab и Space; label переключает значение один раз; mixed передаётся через `indeterminate`.
- Для кликабельных строк `CheckBox visualOnly` отображает состояние без вложенного интерактивного элемента; роль и переключение принадлежат родительской строке.
- Switch: 52×28, On/Off, Hover, Pressed через native active или демонстрационный `pressed`, Disabled, focus-visible; `role=switch`, `aria-checked`. Off использует обводку 2 и handle 12; On — accent track без обводки и handle 20 с отступом 4. Handle во всех состояниях центрируется по вертикали; Pressed — handle 24. Hover подсвечивает весь трек внешним accent state layer, но не меняет выбранное значение.
- Серверный optimistic update и rollback принадлежат продукту и не встроены в Base.

### Avatar

Источник: [Avatar, 1114:526](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-526).

- User/ORG, icon/monogram/image, default/expressive shapes, uploader overlay и status.
- Сохранено правило чатов: user/group — круг, channel — squircle 16; border только у фотографии.
- User monogram поддерживает подтверждённые `Filled=false` и `Filled=true`. Unfilled: accent tint-dim фон и тёмный accent-текст; filled: accent primary фон и белый текст. Типографика — `Paragraph/M/Medium` 16/22.
- Сообщения используют тот же `Avatar`: светлая монограмма для пользователя без фото и фото с полупрозрачной обводкой. Отдельного локального avatar-стиля у `MessageBubble` нет.
- Цвет монограммы задаёт только вариант `Avatar`; текстовые стили родительской композиции не должны переопределять его. Поэтому один avatar в списке и шапке выглядит одинаково.
- Полная палитра Color 1–8 и AI ещё не сопоставлена с публичным API React.

### MessageBubble media

- Bubble поддерживает необязательные изображения перед текстом. Для демо используются локальные ассеты, lazy loading и размеры из `--collapse-size-message-media-*`.
- Точный media-вариант Bubble в доступной Figma-документации не найден. Ограничение изображения 320×220 px — техническое допущение для прокручиваемой демо-переписки, а не правило Collapse.
- Storybook: `Chat/MessageBubble / WithImage`.

### SegmentControls и системные папки

Источники: [SegmentControls, 1114:513](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-513), [логика системных папок, 8335:172698](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-172698).

- Компонент разделяет `tabs="fill"` (равная ширина тегов, заполнение области) и `tabs="dynamic"` (Hug: ширина по содержимому). По умолчанию Dynamic; общий `ChatList` явно выбирает Dynamic для папок и федерации. Режим ширины независим от `displayMode`.
- В Dynamic теги, текст, иконки, счётчики и SettingsAction не сжимаются. Узкая панель обрезает полосу по границе контейнера; скрытые сегменты доступны горизонтальной прокруткой и через Tab. Без текста тег уменьшается до ширины иконки с отступами, но не ниже 40 px. Длинное название не накладывается на соседний тег.
- При выборе частично видимого сегмента или изменении списка активный сегмент доскролливается до ближайшего края без лишнего центрирования. Ручная позиция сохраняется до следующего изменения, требующего автодоскролла. Вертикальный wheel преобразуется в горизонтальный только пока полоса может двигаться в его направлении; на границе событие остаётся вертикальному скроллу страницы. Storybook: `HorizontalOverflow`, `RestoredOverflowSelection`.
- S: полоса 32 px, тег 24 px, padding полосы и gap тегов 4 px; padding тега по горизонтали 10 px, gap внутри 8 px, иконка 20 px. Размеры подтверждены [макетом с отступами, 2149:17602](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2149-17602); обрезка — [2149:17603](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2149-17603). Base-страница `1114:513` не вернулась через MCP; названия вариантов Fill/Dynamic подтверждены запросом и приложенным скриншотом свойств, а не восстановлены из недоступной страницы.
- Все стили SegmentControls находятся в общем `ui.css`; экран задаёт только внешнее размещение. Storybook: `DynamicHug`, `Fill` (изменяемая ширина), `DynamicLongLabels`, `NamesAndIcons`, `IconsOnly`.
- «Все» — фиксированный первый сегмент и не участвует в перестановке.
- Базовый набор эмодзи хранится в `ui/folderEmoji.ts`: «Все» 🗂️, «Новые» 🔔, «Чаты» 💬, «Каналы» 📢, пользовательская папка по умолчанию 📂. Набор утверждён пользовательским комментарием, это продуктовая настройка, а не восстановленное правило Figma. Один набор используется в папках, федерации, форме создания и управлении папками. Пустая строка и отсутствие эмодзи дают 📂; выбранная пользователем эмодзи сохраняется. В режиме «Только название» эмодзи скрываются как и другие иконки. Нативный вид эмодзи зависит от ОС.
- Системная папка появляется сразу после включения. Каждая новая включённая папка добавляется в конец; порядок равен последовательности включения. Отключение удаляет сегмент.
- Остальные сегменты можно переставлять drag-and-drop. Для клавиатуры используется `Alt + ArrowLeft/ArrowRight`; перестановка сопровождается Core motion и отключается через `prefers-reduced-motion`.
- Порядок и видимость хранятся продуктовым экраном и передаются в `SegmentControls` и `FolderManagementModal`; компоненты не поддерживают независимые копии состояния.
- Счётчик папки показывает количество непрочитанных чатов, а не сумму непрочитанных сообщений. Чаты с выключенными уведомлениями (`muted`) в него не входят; если в папке непрочитаны только muted-чаты, счётчик папки не показывается. Собственный unread-счётчик muted-чата остаётся серым (`default`), активного — фиолетовым (`accent`).
- После открытия чата из «Новых» его собственный счётчик сразу обнуляется, а счётчик папки пересчитывается. Сам выбранный чат остаётся в «Новых» до выбора другого чата или перехода в другой сегмент; это удержание хранится только продуктовым экраном, а не в `SegmentControls`.
- Режим отображения папок предлагает три продуктовых значения: «Только название», «Название и иконки», «Только иконки». Этот список подтверждён дизайнерским комментарием; исходный Figma-узел показывал только первое значение.
- Режим отображения хранится экраном и одним значением управляет одновременно `FolderManagementModal` и `SegmentControls`; поэтому переключение сразу меняет список папок.
- Минимальная ширина каждого сегмента — `--collapse-size-control-s` (40 px), включая режим «Только иконки». Источник: дизайнерский комментарий к [40000059:22115](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000059-22115).
- `SettingsAction` справа сразу открывает `FolderManagementModal`; у неё нет контекстного меню. Контекстное меню вызывается только на самой папке: правым кликом либо `Shift + F10`/клавишей контекстного меню. Оно использует общий `Menu`: для «Все» — «Управлять папками»; для системной папки — «Скрыть папку» и, только при наличии непрочитанных, «Пометить как прочитанное»; для пользовательской — «Редактировать папку», условное «Пометить как прочитанное» и «Удалить папку». `Escape` закрывает меню и возвращает фокус на папку; после удаления открывается «Все».
- Контекстное меню выравнивается по левому краю вызвавшего сегмента и открывается в состоянии Enabled: hover появляется только после движения указателя или клавиатурной навигации.
- Источник сценариев: [8318:167378](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8318-167378).
- Storybook: `UI/SegmentControls`, `Shell/ChatList / FolderCounterRules`, `Shell/ChatList / NewFolderKeepsSelected`.

### Пользовательские папки

- В `FolderManagementModal` пользовательские папки отображаются над системными. Строка содержит emoji, название и `IcDragIndicatorFilled`; порядок меняется drag-and-drop или `Alt + ArrowUp/ArrowDown`.
- Выбор emoji в форме собран из существующего `EmojiPicker`; отдельная копия пикера не создаётся. Источники: [создание, 8281:73064](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8281-73064), [управление и DnD, 8683:161798](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8683-161798).
- В форме выбора сначала показана категория «Папки» с базовым набором; остальные категории общего пикера остаются доступными. Storybook: `UI/SegmentControls / DefaultFolderEmoji`, `UI/FolderManagementModal / Interactive` (папка без выбранной эмодзи).
- Форма создания использует основное действие «Создать папку», форма редактирования — «Сохранить». Storybook: `UI/FolderManagementModal / EditExistingFolder`.
- Пустая пользовательская папка показывает подтверждённый текст и действие «Выбрать чаты и каналы», которое открывает тот же экран редактирования: [8611:35248](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8611-35248), [8614:35830](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8614-35830).
- Удаление подтверждается общей композицией `ConfirmDialog`; Storybook: `UI/ConfirmDialog / DeleteFolder`.

### Message Editor

Источник: [Local DS Чаты, 337:1351](https://www.figma.com/design/EyCGbFUOroCmeeGpFT5NQ5/?node-id=337-1351).

- Редактор использует подтверждённые композиции `Input`, `MarkdownPanel`, `BottomPanel`, `AttachContainer`, `SendButton` и запись голосового сообщения. Контейнер имеет radius 24, поле — минимальную высоту 52, панели — высоту 44, действия — 32; значения вынесены в `--collapse-*` tokens.
- Редактор занимает всю доступную ширину до `--collapse-size-message-editor-max` (700 px) и центрируется; на узком экране сжимается до ширины родителя. В `ChatWorkspace` его горизонтальные отступы совпадают с отступами шапки — `Spacing/L` (16 px). Лимит 700 px — продуктовое требование из пользовательского комментария, а не восстановленное правило Figma. Storybook: `Chat/MessageEditor / MaxWidth`.
- Панель поддерживает жирный, курсив, зачёркивание, подчёркивание, ссылку, строчный и блочный код. Enter отправляет сообщение, Shift+Enter добавляет строку.
- Emoji открывает общий `EmojiPicker`; упоминания вставляются из списка участников; скрепка запускает нативный выбор нескольких файлов. Drag-and-drop использует тот же сценарий.
- Вложения показываются общим `ListItemFile` размера S. Пока файл загружается, отображаются статичная иконка файла и прогресс без вращения; готовый файл можно удалить или отправить.
- При пустом редакторе показан микрофон. Запись можно отменить или отправить; максимальная длительность — 5 минут.
- Storybook: `Chat/MessageEditor / Empty`, `Filled`, `Interactive`.
- Файлы с МТС Диска включены во всех чатах (в том числе `/chats` и Федерация): кнопка папки открывает выбор с Диска, локальные файлы «загружаются на Диск» с ошибками, повтором и тостом, права в чате не проверяются, вставленная ссылка получает превью. Правила и демо-триггеры — в [`DISK.md`](DISK.md). Storybook: `Chat/MessageEditor / DiskScenarios`, `DiskInFederation`.
- Технические допущения прототипа: загрузка файла и запись голоса локальные и имитируются без сервера; список участников демонстрационный; markdown преобразуется на клиенте в поддерживаемые безопасные элементы.

### ModalPage и SearchField

- Общие `collapse-modal-scrim` и `collapse-modal-surface` задают всем модальным сценариям минимальный отступ 16 px и максимальную высоту `--collapse-size-modal-max-height` (700 px). На экране ниже 732 px поверхность занимает доступную высоту внутри отступов, а содержимое прокручивается внутри модалки. Лимит 700 px — продуктовое требование из пользовательского комментария, а не восстановленное правило Figma.
- `ModalPage` — общая оболочка продуктовых модальных сценариев: заголовок, back/close actions, прокручиваемое содержимое и footer-slot. Поддерживает центрированное размещение, правую панель профиля и высоту `viewport` в пределах общего ограничения.
- Клик по затемнению закрывает `ModalPage`; клик внутри поверхности модалки не закрывает её.
- По умолчанию (`scroll="body"`) прокручивается весь body модалки. В режиме `scroll="content"` body не прокручивается, а его единственный дочерний блок занимает всю высоту body. Это нужно, чтобы поиск и фильтры над длинным списком оставались на месте, а прокручивался только список со своим overflow. Шапка и footer не прокручиваются в обоих режимах. Storybook: `UI/ModalPage / ContentScroll`.
- Общий `ModalHeader` повторяет `TitleModal` из Figma: между элементами используется `Spacing/S Nudge` 6 px, текстовый слот имеет дополнительный левый `Spacing/S` 8 px, а заголовок всегда выровнен по левому краю. `ModalPage` и модальные окна управления папками используют этот компонент.
- `SearchField` — общий компактный поиск высотой 44 px. Федерация использует его в выборе сотрудников; продуктовая логика фильтрации остаётся в feature-модуле.
- Источники: [создание группового чата](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6786-80704), [профили](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6825-16657).
- Storybook: `UI/ModalHeader`, `UI/ModalPage`, `UI/FolderManagementModal / Interactive`, `UI/SearchField`.

## Партия 2: chips, status, tabs, counters, progress

- [Chips, 1114:470](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-470): Filter, Assistive, Multiple, List, Open; базовые размеры, tones и состояния. Полные SLOT-комбинации частичны.
- [Status, 1114:580](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-580): XS/S/M/L, bullet/icon, шесть tones, filled.
- [Counter, 1114:592](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-592): S/M, Negative/Accent/Warning/Default, Primary/Secondary/Tertiary. `Shape=Default` — базовое значение компонента и круглая форма с `CornerRadius/None`. Подтверждённые варианты: [M / 1–9, 5417:8796](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=5417-8796) — `20 × 20`, `Caption/L/Medium`, line-height `16`, отступы `2 × 4`; [S / 1–9, 6488:3956](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=6488-3956) — `16 × 16`, `Caption/M/Medium`, line-height `12`, отступ `2`. Варианты `10+` используют увеличенный горизонтальный отступ: [M, 10394:7640](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10394-7640), [S, 10394:7644](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10394-7644). В списке чатов активный unread использует `accent`, muted — `default`; сегменты папок используют M / `Shape=Default`.
- [Loader, 1114:616](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-616): 16/20/24/32, Accent/Light/AI.
- Progress реализован по `linear-determinate` и `linear-indeterminate` с этой же страницы; отдельная страница Progress пуста.
- [Tabs, 12622:647](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12622-647): Accent/Default, selected/hover/disabled/focus, icon/counter; `type="line"` — табы с подчёркиванием (14589:3328), horizontal overflow, ArrowLeft/ArrowRight/Home/End.

## Партия 3: supporting Base

- [Uploader, 15552:4393](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=15552-4393): enabled/hovered/pressed/disabled/error, click и drop.
- [List item, 1114:456](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-456): M/L, hover/pressed/disabled, leading/content/trailing/divider. Hover использует скруглённый `StateLayers/OnBase/Tertiary`, pressed — `StateLayers/OnBase/Secondary`; disabled не получает state layer.
- ListItemFile дополнен необязательными `errorText`, `onRetry` (кнопка повтора в `error`, корзина в `error` видна и у Secondary), `moreContent` (меню «Ещё» через Popover) и `morePlacement`; без них поведение прежнее. `FileCard` — баннер-карточка документа или ссылки в сообщении (`UI/FileCard`) с миниатюрой-заглушкой `FilePreviewStub`; размеры (424 / 76 / 56 px) взяты из компонента Figma `8678:102365`, который привязан к дублю ДС.
- [ListItemFile, 4386:2897](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=4386-2897): M/L, enabled/loading/error, default/secondary, delete/more. В loading иконка файла статична, состояние передаётся прогрессом. Цвет тега расширения повторяет `FileType`: DOC/EXE/JPG/DMG/ICO — accent, PPT/PDF — error, HTML/CSS/XLS/CSV/JAVA/JSON — success; родственные DOCX/PPTX/XLSX используют цвет своего семейства. Для Secondary удаление показывается как `IcCancelFilled` поверх правого верхнего угла только при hover или фокусе; корзина остаётся действием Default-варианта.
- [Rate, 3110:8538](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3110-8538): S/M/L, 0–5, клавиатурно доступные radio-кнопки.
- [ActionCard, 7850:9955](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=7850-9955): S/M, Top/Bottom/Circular, Default/Accent/Success/Warning/Error; составные раскладки описаны в партии 4.
- [Surface, 9722:12170](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9722-12170): Default/Left/Right и Primary/Clear; Header и BottomNavSurface описаны в партии 4.

## Партия 4: composite actions and navigation

### ProductRail

- Общий продуктовый сайдбар использует `shell/ProductRail` во всех чат-сценариях.
- Отдельной точки входа «Каналы» в сайдбаре нет; каналы доступны через системный фильтр общего списка чатов.
- Storybook: `Shell/ProductRail / Default`.

- [Button Split, 1787:4324](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1787-4324): S/M/L, независимые действия двух частей, Default/Error/Warning/Success, hover/pressed/disabled/focus.
- [PIN Field, 1919:4389](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1919-4389): 4/6 цифр, masked/number, active/filled/completed, ввод одной доступной native-точкой.
- [Navigation / NavList, 9631:6818](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9631-6818): segment/button, selected, user/org/icon slots, supporting/status, badge/call/pin/counter.

### FederationTag, ListItem view-only, Avatar 124

- `FederationTag` — warning-плашка с `FederationIcon` слева (Figma 40000074:62321, 6932:42733); фон `--collapse-color-background-opacity-warning-primary`. Storybook: `Base/FederationTag`.
- `ListItem interactive={false}` — статичная строка (`<div>`, `is-static`) без hover/active; `overline` — подпись Caption/M над значением. Storybook: `Base/ListItem / ViewOnly`.
- `Avatar size={124}` — токен `--collapse-size-avatar-profile` (Figma 40000074:62316), типографика Head/S.

### ChatListItem / контекстное меню

- Продуктовая композиция `features/chat/ChatListItem` использует общие `Avatar`, `IconButton` и `Option Menu`; отдельные копии этих компонентов не создаются.
- Общий `shell/ChatList` всегда выводит закреплённые чаты первыми после применения поиска или фильтра. Новый закреплённый чат становится первым в списке. Закреплённые чаты можно менять местами drag-and-drop или `Alt + ArrowUp/ArrowDown`; незакреплённая группа сохраняет исходный порядок.
- Выбор чата сразу обнуляет его счётчик непрочитанных в состоянии текущей страницы. В демо состояние не сохраняется между загрузками: после обновления страницы исходные счётчики снова берутся из mock-данных.
- В trailing-слоте непрочитанный каунтер имеет приоритет над пином: у закреплённого чата с непрочитанными показывается только каунтер; после прочтения на его месте появляется пин.
- Строка — 304×48 px. На hover и `:focus-visible` от клавиатуры trailing pin/counter заменяется круглым `IconButton` 40×40 с иконкой `IcMoreHorizontalOutline`. Обычный мышиный фокус после выбора чата не удерживает hover-состояние.
- Меню содержит подтверждённые действия: «Закрепить»/«Открепить», «Пометить как прочитанное», «Выключить уведомления», «Добавить в папку». «Управлять папками» доступно только из контекстного меню сегмента «Все».
- «Пометить как прочитанное» не рендерится, если у чата нет непрочитанных сообщений; disabled-строка для этого состояния не используется.
- «Добавить в папку» открывает вложенный `Menu`: текущие папки отмечены чекбоксом; выбор добавляет или удаляет чат и закрывает меню после одной операции. Высота меню ограничена токеном 400 px; при переполнении работает прокрутка.
- «Создать папку» открывает существующий экран создания папки. При запуске из контекстного меню чата или канала вызвавшая строка уже выбрана и показана в области «Выбранные чаты и каналы». При десяти папках действие скрывается — это правило подтверждено документацией макета.
- Подтверждённый источник: [добавление и удаление через контекстное меню, 8335:171757](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-171757).
- Storybook: `Chat/ChatListItem / HoverAndContextMenu`.
- Техническое допущение: после выключения уведомлений обратное действие называется «Включить уведомления»; обратное состояние в исходном фрейме не показано.
- [Header и BottomNavSurface, 9722:12170](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9722-12170): back, leading, title/supporting, actions, content slot; Default/Accent/Clear для нижней поверхности.
- [ActionCard layouts, 7850:9955](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=7850-9955): Full(4), ProminentBottom(3), Split(2).

## Партия 5: data and rich selection

- [EmojiPicker, 11923:77179](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=11923-77179): 352×340, поиск, категории, scroll/segment sync, empty, выбор, скрытая полоса прокрутки, tooltip delay 1000 ms.
- [Table, 19031:5188](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=19031-5188): Default/Radio/CheckBox, header/content, selected/disabled, строки 62, горизонтальная прокрутка.
- [ChipsField, 1114:470](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-470): добавление Enter/запятая, независимое удаление, Backspace, error/disabled/focus.
- [Hyper-link, 1940:2001](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1940-2001): S/M/L, Accent/Default/Secondary, regular/medium, enabled/hovered/visited/disabled.

## Технические допущения

- CSS-анимация Loader и indeterminate Progress используется вместо четырёх статичных фаз Figma.
- Surface Gradient собран из подтверждённых Surface Primary/Secondary; точное направление градиента не подтверждено.
- Uploader вызывает `onFiles`; загрузка, лимиты, валидация и сообщения сервера принадлежат продукту.
- ActionCardGroup намеренно остаётся отдельной композицией над единичным ActionCard.
- EmojiPicker поставляется с демонстрационным набором emoji; полный каталог и локализованный поисковый индекс — данные продукта.
- Table использует семантический HTML table; ширины колонок распределяются браузером, если продукт не передал свой layout.
- PIN Field не содержит таймер повторной отправки и сетевую проверку кода — это поведение продукта.
- Motion duration/easing продолжают использовать ранее отмеченные технические tokens Core.

## Федеративное расширение чатов

- `FederationIcon` использует точный SVG `IcFederationOutline` из Figma в размерах XS/S/M. `FederationLabel` даёт общую композицию «текст + иконка».
- `ListItem` управляет позицией и размером федеративной иконки через `federationIconPosition` и `federationIconSize`; значения по умолчанию сохраняют прежний вид.
- `ListItem`, `NavListItem`, `AppHeader`, `Status`, `OptionMenuItem`, `Table`, `ChatListItem`, `MessageBubble` и `MessageEditor` принимают необязательный `federation`; по умолчанию он выключен.
- В `ChatListItem` федеративный индикатор занимает слот перед названием чата. Остальные компоненты управляют позицией через собственную композицию.
- `MessageEditor` принимает общий slot `topPanel`; федеративное содержание остаётся в `features/federation`.
- `ChatList` принимает заголовок и функцию рендера индикатора, поэтому федеративный экран не копирует список чатов.
- Условия доступности и метаданные организаций находятся только в `features/federation`.
- Storybook: `UI/FederationIcon`, federation-варианты общих компонентов, `Federation/FederationNotice`.
- `ConfirmDialog` поддерживает нейтральное подтверждение `intent="default"` для предупреждения о доступе внешнего сотрудника; удаление папки по умолчанию сохраняет `intent="error"`.
- Подробности и допущения: [`FEDERATION.md`](FEDERATION.md).

## FileTypeIcon: папка

`FileTypeIcon extension="folder"` рисует иконку папки из Figma 8734:83895 (карточка 40×40, папка 28 px, `assets/figma/file-type-folder.svg`). Остальные расширения без изменений.

# Collapse Base — component inventory

Статус означает фактическое покрытие React + Storybook, а не наличие одноимённого файла. Приоритет: P0 — экран чатов, P1 — ближайшие прототипы, P2 — остальные Base.

| Группа / компонент | Figma | React / Storybook | Покрытие и пробелы | Приоритет | Статус |
|---|---|---|---|---:|---|
| Tooltip | [1002:6](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1002-6) | `feedback/Tooltip` | варианты и интерактивность | P1 | готов |
| Info Bar | [1002:5](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1002-5) | `feedback/InfoBar` | варианты | P1 | готов |
| Toast | [1114:366](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-366) | `feedback/Toast` | состояния и timer | P1 | готов |
| Popover | [1114:369](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-369) | `feedback/Popover` | open/close/focus/Escape | P1 | готов |
| SnackBar | [1114:368](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-368) | `feedback/SnackBar` | действия и закрытие | P1 | готов |
| Skeleton | [1114:370](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-370) | `feedback/Skeleton` | shapes/sizes | P1 | готов |
| PasswordHint | [5134:2310](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=5134-2310) | `feedback/PasswordHint` | варианты | P1 | готов |
| Slider | [1114:385](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-385) | — | страница без компонентов | P2 | заблокирован |
| Switch | [1114:400](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-400) | `ui/Switch` | On/Off, hover, pressed, disabled, focus | P0 | готов |
| Uploader | [15552:4393](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=15552-4393) | `ui/Uploader` | пять состояний, click/drop; backend вне Base | P1 | готов |
| EmojiPicker | [11923:77179](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=11923-77179) | `ui/EmojiPicker` | Default/empty, search, segments, scroll sync, tooltip delay; полный каталог — данные продукта | P1 | готов |
| ListItemFile | [4386:2897](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=4386-2897) | `ui/ListItemFile` | M/L, enabled/loading/error, backgrounds; 16 file icons не перенесены | P1 | частично готов |
| TextArea | [12861:2982](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12861-2982) | `ui/TextArea` | states/error/elements/support/counter; chips SLOT нет | P0 | частично готов |
| TextField / PIN | [1114:414](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-414) | `ui/TextField`, `ui/PinField` | field states и PIN 4/6, dot/number, progress/completed | P0 | готов |
| ComboBox | [1700:10579](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1700-10579) | `ui/ComboBox` | enabled/active, выбор, keyboard, Escape | P0 | готов |
| List item | [1114:456](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-456) | `ui/ListItem` | M/L, slots, states; ListContainerButton нет | P0 | частично готов |
| CheckBox / Radio | [1114:428](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-428) | `ui/CheckBox`, `ui/Radio` | основные варианты и loading | P0 | готов |
| Chips + ChipsField | [1114:470](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-470) | `ui/Chip`, `ui/ChipsField` | пять семейств, field add/remove/error/disabled; редкие SLOT-комбинации частичны | P0 | частично готов |
| Pagination | [1114:486](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-486) | — | страница без компонентов | P2 | заблокирован |
| SideBar | [2286:2557](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=2286-2557) | `shell/ProductRail` | chat prototype соответствует 64px rail; generic API нет | P0 | частично готов |
| Navigation / NavList | [9631:6818](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9631-6818), [chat context flow 8335:171757](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-171757) | `ui/NavListItem`, `shell/ChatList`, `features/chat/ChatListItem` | generic segment/button; hover/focus menu trigger; product menu, nested folder selection, keyboard/Escape; Storybook `Chat/ChatListItem` | P0 | готов |
| Surface / Header | [9722:12170](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9722-12170) | `ui/Surface`, `ui/AppHeader`, `ui/BottomNavSurface` | Surface, Header slots, BottomNav Default/Accent/Clear | P0 | готов |
| Breadcrumbs | [1114:500](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-500) | — | отдельная страница пуста | P2 | заблокирован |
| SegmentControls | [1114:513](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-513) | `ui/SegmentControls` | переключение/settings, counters, меню папки, fixed item, DnD и keyboard reorder | P0 | готов |
| Tabs | [12622:647](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12622-647) | `ui/Tabs` | Accent/Default (плашки) и Line (подчёркивание, 14589:3328), states, overflow, keyboard | P0 | готов |
| Table | [19031:5188](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=19031-5188) | `ui/Table` | Default/Radio/CheckBox, selected/disabled, header/cell; custom SLOT через render | P2 | готов |
| Avatar | [1114:526](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-526) | `ui/Avatar` | round/squircle, Filled true/false, photo border, status/uploader; color matrix partial | P0 | частично готов |
| Bubble | [3953:21293](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3953-21293) | `features/chat/MessageBubble` | варианты чатов и отдельные stories | P0 | частично готов |
| FileCard / FilePreviewStub | [8678:102365](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8678-102365) | `ui/FileCard`, `ui/FilePreviewStub` | баннер-карточка документа: миниатюра-заглушка (xls/doc/ppt/pdf), строка с иконкой типа, папкой/доменом и меню; состояния enabled/forbidden; настоящий рендер содержимого отсутствует | P1 | частично готов |
| Message Editor | [Local DS 337:1351](https://www.figma.com/design/EyCGbFUOroCmeeGpFT5NQ5/?node-id=337-1351) | `features/chat/MessageEditor` | input, markdown, emoji, mentions, file picker/drop, выбор с МТС Диска, превью ссылок, ошибки загрузки (мок, см. DISK.md), voice state; backend отсутствует | P0 | готов |
| Tag | [1114:566](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-566) | — | страница без компонентов | P1 | заблокирован |
| Status | [1114:580](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-580) | `ui/Status` | sizes/tones/leading/filled | P0 | готов |
| Counter | [1114:592](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-592) | `ui/Counter` | sizes/state/type/shape | P0 | готов |
| Progress | [1114:604](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-604) | `ui/Progress` | отдельная страница пуста; восстановлен из Loader linear | P1 | частично готов |
| Loader | [1114:616](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-616) | `ui/Loader` | 4 sizes, 3 tones; phases заменены CSS motion | P0 | готов |
| Rate | [3110:8538](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3110-8538) | `ui/Rate` | 0–5, S/M/L, keyboard radio | P2 | готов |
| Option Menu / Drop Field | [1114:630](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-630) | `option-menu/*` | menu/list item/drop field/nested/error/scroll | P0 | готов |
| Buttons / IconButton | [1114:642](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-642) | `ui/Button`, `ui/IconButton`, `ui/TextButton`, `ui/SplitButton`, `ui/HyperLink` | base matrix, hover/pressed/disabled, текстовое действие, Split и Hyper-link | P0 | готов |
| FederationTag | [40000074:62321](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000074-62321), 6932:42733 | `ui/FederationTag` | плашка признака федерации (профиль участника и чата) | P0 | готов |
| ChatProfile / ChatMembers / UserProfile | 6932:42733, 6932:39360, 40000074:62312 | `features/chat/profile/*` | профиль чата и канала, все участники по алфавиту, профиль пользователя | P0 | готов |
| FederationIcon / FederationLabel | [Federation Desktop 6747:20952](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6747-20952) | `ui/FederationIcon`, `ui/FederationLabel` | точный SVG `IcFederationOutline`, S/M, общий label; federation props в ListItem, NavListItem, AppHeader, Status, Menu и Table | P0 | готов |
| ActionCard | [7850:9955](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=7850-9955) | `ui/ActionCard`, `ui/ActionCardGroup` | одиночная карточка и layouts 2/3/4 | P1 | готов |
| Action bar | [1114:664](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-664) | — | страница без компонентов | P2 | заблокирован |

## Оставшаяся очередь

1. Полная Avatar Color 1–8/AI matrix и 16 файловых пиктограмм — после отдельного чтения Assets/variable mapping.
2. Редкие SLOT-комбинации TextArea/ListItem/Chips — по мере появления продуктовых сценариев.
3. Slider, Pagination, Breadcrumbs, Tag, отдельный Progress и Action bar — после появления читаемых компонентов на пустых страницах Figma.

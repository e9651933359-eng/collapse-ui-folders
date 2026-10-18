# Collapse Core / Atoms

Основной источник: [my Core — Atoms, node 1014:2](https://www.figma.com/design/kHQPmXo5JpTDJhOvZXVuzp/my-Core?node-id=1014-2).

Этот документ — единый источник правил Core для React-прототипа. CSS-реализация находится в `src/theme/core`, а `src/theme/tokens.css` экспортирует совместимые aliases для уже существующих компонентов.

## Статус источника

Figma MCP видит canvas `Atoms` и опубликованную библиотеку `my Core`, но canvas возвращается без дочерних узлов. Поиск библиотеки раскрывает имена, типы, scopes, коллекции и описания; `get_variable_defs` раскрывает точные effective values только для токенов, реально использованных в доступных компонентах и макетах. Названия режимов, вся примитивная палитра, полная типографическая шкала, layout-guidelines и motion-guidelines не отдаются. Эти данные не восстановлены догадками.

Коллекции, подтверждённые MCP: `Theme`, `Content Tokens`, `BackgroundArea Tokens`, `Layout tokens`, `Typography Brand`, `Effects tokens`. Доступен только effective light-контекст; названия и значения других modes не подтверждены.

Дополнительные узлы, по которым проверены effective values:

- [основной экран чатов](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2073-76175);
- [экран с модальным окном](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2073-76252);
- [BASE Button](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1141-249);
- [BASE ComboBox](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1802-5066);
- [BASE Bubble](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10100-75894).

## Инвентаризация проекта

До восстановления существовали: один плоский `tokens.css`, UI-компоненты `Avatar`, `Button`, `ComboBox`, `FolderManagementModal`, `IconButton`, `SegmentControls`, shell-компоненты, чат-компоненты и их Storybook stories. Правила компонентов находились в `src/theme/design-system.md`. Они перенесены ниже, а старый файл удалён, чтобы не создавать второй источник истины.

Исправлено: Core разделён по областям, подтверждённые Figma-имена отражены в CSS custom properties, общие transition/типографика/цвета вынесены из локальных стилей. API и структура компонентов не менялись.

## 1. Colors — частично восстановлено

Формат CSS: Figma `Text/Solid/Base/Primary` → `--collapse-color-text-solid-base-primary`.

| Figma variable | Effective value |
| --- | --- |
| `Text/Solid/Base/Primary` | `#1f1d23` |
| `Text/Solid/Base/Secondary` | `#474351` |
| `Text/Solid/Accent/Accent` | `#272040` |
| `Text/Opacity/Base/Primary` | `#282635f5` |
| `Text/Opacity/Base/Secondary` | `#282635b8` |
| `Text/Opacity/Base/Tertiary` | `#2826358f` |
| `Text/Opacity/Base/Disabled` | `#28263566` |
| `Background/Solid/Secondary/Type8` (маркер Федерации) | `#e94a24` |
| `Surface/Solid/Foundation` | `#ebedf3` |
| `Surface/Solid/Primary` | `#f9fafc` |
| `Background/Solid/Accent/Primary` | `#7047fe` |
| `Background/Solid/Error/Primary` | `#fe4f45` |
| `Background/Solid/Success/Primary` | `#0dc268` |
| `Background/Opacity/Base/Secondary` | `#2826350f` |
| `Background/Opacity/Base/SecondaryTint` | `#2826350a` |
| `Background/Opacity/Base/ContainerGroup` | `#2826350a` |
| `Background/Opacity/Base/Light/Primary` | `#ffffffa3` |
| `Background/Opacity/Base/Light/PrimaryDim` | `#ffffffe0` |
| `Background/Opacity/Scrim/Default` | `#28263529` |
| `Border/Opacity/Base/Tertiary` | `#28263514` |
| `Border/Opacity/Base/TertiaryDim` | `#28263529` |
| `Border/Opacity/Base/SecondaryDimVariant` | `#28263566` |
| `StateLayers/OnBase/Tertiary` | `#2826350f` |
| `StateLayers/OnBase/Secondary` | `#2826351a` |
| `StateLayers/OnAccent/Primary` | `#7047fe29` |
| `StateLayers/OnAccent/Secondary` | `#7047fe1a` |

Search также подтверждает семейства `Colors/Solid/{Brand,Accent,Error,Success,Surface}` и `Colors/Opacity/{Light,Scrim,Error}`, но MCP не возвращает их полный состав и значения. Поэтому примитивная палитра считается неполной. Градиент исходящего сообщения остаётся chat-specific alias: опубликованной Core variable для него не найдено.

## 2. Typography — частично восстановлено

Семейство — `Inter Variable`. Подтверждённые стили:

| Style | Size / line | Weight | Tracking |
| --- | --- | --- | --- |
| `Title/L/SemiBold` | `20 / 28 px` | `600` | `0.16 px` |
| `Paragraph/L/SemiBold` | `17 / 22 px` | `600` | `0.1 px` |
| `Paragraph/M/Medium` | `16 / 22 px` | `500` | `0.14 px` |
| `Paragraph/S/Regular` | `15 / 20 px` | `400` | `0.12 px` |
| `Paragraph/S/Medium` | `15 / 20 px` | `500` | `0.12 px` |
| `Paragraph/S/SemiBold` | `15 / 20 px` | `600` | `0.12 px` |
| `Caption/L/Regular` | `13 / 20 px` | `400` | `0.1 px` |
| `Caption/L/Medium` | `13 / 20 px` | `500` | `0.1 px` |
| `Caption/M/Regular` | `12 / 18 px` | `400` | `0.15 px` |
| `Caption/M/Medium` | `12 / 18 px` | `500` | `0.15 px` |

Поиск библиотеки видит дополнительные `Head`, `Title`, `Paragraph`, `Caption`, но значения полного набора не раскрывает.

## 3. Surface & Effects — частично восстановлено

| Style / variable | Значение / правило |
| --- | --- |
| `Effects/Shadows/02` | `0 10 20 #2826350f`, `0 4 90 #28263514` |
| `Blur/Background/Default` | `64 px` |
| `Blur/Background/Accent` | `128 px` |
| `Effects/ShadowsBlur Default/02` | Shadow02 + background blur 64 px |
| compact hover, ранее подтверждённый в BASE | тени 10/45 px + blur 32 px |

В библиотеке найдены `Effects/Shadows/{02,04,08,16,32,64}`, `ShadowsBlur Default`, `ShadowsBlur Accent`, `Blur/Layer`, `Blur/Background/{01,02,03,04,08}`. Описания подтверждают: `02` — popup/modal/scrim/floating, `04` — большие surface, `08` — floating light, `16` — floating accent. Точные параметры, кроме `02` и двух blur variables, недоступны.

## 4. Spacing / Radius / border-width — частично восстановлено

Подтверждённые `spacingHorizontal`: `None 0`, `XXS 2`, `XS 4`, `S Nudge 6`, `S 8`, `M Nudge 10`, `M 12`, `L 16`, `XXL 24`, `XXXL 32` px.

Подтверждённые stroke-width: `XThin 1`, `Thin 1.5`, `Thick 2`, `XThick 2.5` px. Имена `2XThin`, `Thicker`, `XThicker` найдены, но их значения недоступны.

Поиск `Layout tokens` находит `Spacing/{2XS,XS,S,SM,M,LM,L,XM,2XM,3XM,XL,3XL,4XL,5XL}` и `Corner radius/{5XS,3XS,XS,S,SM,M,SL,L,XSL,XM,2XM,XL,2XL}` без effective values. Поэтому текущие radii зафиксированы как подтверждённые компонентами, а не как сопоставление размерных labels: squircle `16`, control `24`, container `32`, modal `36`, full `9999` px.

## 5. Layouts — частично, технический слой

Опубликованные layout variables/components по запросу MCP не найдены. В коде заведены только отношения на базе подтверждённых spacing: compact gutter `12`, default gutter `16`, section gap `24` px. Сетки, breakpoints, max-width и правила адаптивности Core не объявляются подтверждёнными.

## 6. Animation — технический слой, Figma недоступна

Поиск `Animation`, `Motion`, `Duration`, `Easing` не возвращает variables или styles. Существующие значения прототипа централизованы без изменения поведения: fast `140 ms`, default `160 ms`, slow `180 ms`, easing `ease`. Это техническое допущение, не Collapse Core. Для `prefers-reduced-motion` длительности становятся `1 ms`.

## Использование в React

```tsx
export function Panel({ children }: { children: React.ReactNode }) {
  return <section className="panel">{children}</section>
}
```

```css
.panel {
  padding: var(--collapse-spacing-horizontal-l);
  border-radius: var(--collapse-radius-control);
  background: var(--collapse-color-surface-solid-primary);
  color: var(--collapse-color-text-solid-base-primary);
  box-shadow: var(--collapse-effect-shadow-02);
}
```

Новый UI должен использовать `--collapse-*`. Старые краткие aliases сохраняются только для совместимости существующего прототипа.

## Правила компонентов, сохранённые из предыдущей документации

### Один источник истины

- Визуальные состояния, размеры и поведение задаются в базовом компоненте и токенах.
- Экраны выбирают вариант компонента и не переопределяют его локально.
- Визуальная правка сначала проверяется в Storybook, затем в собранном экране.

### ChatList

- Вертикальная прокрутка работает, системная полоса визуально скрыта во всех браузерах.

### IconButton

- Плавающая поверхность использует `variant="floating"`.
- Hover использует `StateLayers/OnBase/Secondary`, compact Shadow02 и background blur 32 px. Источник: [BASE IconButton](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1323-6125).

### Button

- Текстовые действия используют общий `Button`.
- `Secondary / S`: высота 40 px, горизонтальные отступы 16 px, `Paragraph/S/SemiBold`.
- Surface — `Background/Opacity/Base/SecondaryTint`; hover — `StateLayers/OnBase/Tertiary`.
- Источник: [BASE Button](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1141-249).

### Строка системной папки

- Минимальная высота 56 px; padding 8/16 px; gap 16 px.
- Leading slot 40 px, иконка 24 px; text block минимум 40 px, supporting slot 18 px.
- Макет: [system folder row](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000004-47529).

### ComboBox

- Общий `ComboBox`, состояния `Enabled` и `Active`.
- Высота 56 px, радиус 24 px, padding-left 16 px, padding-right 4 px.
- Enabled: `Background/Opacity/Base/Light/Primary`, border 2 px `Border/Opacity/Base/Tertiary`.
- Active: accent border 2.5 px; menu padding 4 px, radius 24 px, blur 32 px, Shadow02.
- В модальном окне подтверждено только значение «Только названия».
- Источники: [BASE ComboBox](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1802-5066), [макет](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000004-6826).

### Аватары

- Личные и групповые чаты — круг; каналы — squircle 16 px при размере 40 px.
- Полупрозрачная обводка `Border/Opacity/Base/TertiaryDim` применяется только к фотографии.
- Монограммы, цветные заливки, иконки и emoji — без обводки.
- User monogram `Filled=false`: `Background/Solid/Accent/TintDim` + `Text/Solid/Accent/Accent`; `Filled=true`: `Background/Solid/Accent/Primary` + белый текст.
- Монограмма использует `Paragraph/M/Medium`: Inter Variable, 16/22 px, weight 500, tracking 0.14 px.
- В desktop-сообщении аватар 40 px находится снаружи bubble, выровнен по низу; gap 8 px.
- Источники: [Avatar Base](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-526), [desktop chat](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6922-22891).

### MessageBubble

- Имя внутри входящего bubble: `Paragraph/S/Medium`.
- Текст: `Text/Solid/Base/Primary`, `Paragraph/S/Regular`, Inter Variable 15/20, 400, tracking 0.12 px.
- Горизонтальные padding 12 px; верхний padding 10 px; после имени 4 px.
- Источники: [макет сообщения](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6922-22891), [BASE Bubble](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10100-75894).

## Неизвестные данные

- полный состав и modes коллекций;
- значения всей primitive palette;
- полная типографическая шкала;
- значения всех spacing/radius/effects;
- нормативные layout grids и breakpoints;
- Figma motion duration/easing/coordination.

До появления доступных узлов эти данные нельзя добавлять как подтверждённые Core tokens.

## Размеры, подтверждённые Base

`src/theme/core/dimensions.css` также содержит semantic size tokens компонентов Base: icons 16/20/24/28; controls 40/48/56; field 56; choice hit-area 32/44; switch 52×28; tabs, chips, counters, lists и cards. Их значения подтверждены соответствующими component sets Base и описаны в [`BASE.md`](BASE.md); это не расширение недоступной primitive-коллекции Core.

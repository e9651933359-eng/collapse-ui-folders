# Collapse / Option Menu & Drop Field

Источник: [Base — Option Menu / Drop Field](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-630).

Продуктовый пример: [контекстное меню чата, 8335:171757](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-171757) использует тот же `Menu` и `ListItemMenu`: четыре действия, вложенный список папок с checkbox-состоянием, высота до 400 px и закрытие после одного выбора. В актуальном продуктовом контексте первое действие — «Закрепить»/«Открепить»; «Управлять папками» показывается только в меню сегмента «Все».

Реализация находится в `src/components/option-menu`. Существующий `ComboBox` не дублирован и не изменён: Drop Field имеет другой подтверждённый состав и состояния.

## Инвентаризация Figma

| Элемент | Узел | Подтвержденные варианты |
|---|---|---|
| ListItemMenu | [2326:4563](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=2326-4563) | Enabled, Hovered, Pressed, Disabled; leading/trailing/divider on/off. State layer min-height 44, x-padding 12/10, gap 12, радиус 18. |
| Content | [2326:4124](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=2326-4124) | Fixed/Narrow, Error true/false, supporting on/off. Paragraph/S/Regular + Caption/M/Regular. |
| Trailing | [2326:4039](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=2326-4039) | Direct, CheckBox, Switch; shortcut, slot, caret, selected. |
| Leading | [2326:4057](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=2326-4057) | Icon 20 или Avatar 24. |
| Menu | [1958:11751](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1958-11751) | 0, 2, 3, 4, 5, 6, 7+ items; Items, loading, Fail, Scrolling_Loader; vertical scroll true/false. Ширина 298, поверхность Shadow02/blur. |
| Drop Field | [1536:7109](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1536-7109) | Default, Hover, Active, Disabled; Error true/false; Text true/false; label, leading icon, supporting, focus. Min-width 110, пример 201, control 48, full radius. |
| Drop Field Modules | [1802:3673](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1802-3673) | enabled, active_menu, active_menu_cascading, active_menu_cascading_2. |

## Правила

- Hover: `StateLayers/OnBase/Tertiary` `#2826350f`; pressed: Secondary `#2826351a`.
- Active Drop Field: stroke 2.5 Accent Primary, полупрозрачная светлая поверхность.
- Error Drop Field: Error Tint и текст ошибки; Disabled использует disabled text/icon/background.
- Длинное меню прокручивается внутри контейнера. Disabled-пункт не выбирается.
- При открытии ни один пункт визуально не находится в Hover. `autoFocus` сохраняет клавиатурный фокус на первом доступном пункте, а Active появляется после навигации или движения указателя.
- Pointer Hover хранится отдельно от клавиатурного Active и снимается сразу после ухода указателя с пункта.
- Критичное действие с отдельным подтверждением остаётся нейтральным. Красный применяется только к критичному действию, выполняемому сразу.

## Клавиатура

- `ArrowUp/ArrowDown`, `Home/End` перемещают фокус.
- `Enter/Space` выбирают пункт.
- `ArrowRight` открывает вложенное меню, `ArrowLeft` возвращает назад.
- `Escape` закрывает подменю или основное меню.
- Drop Field открывается Enter, Space и ArrowDown; клик снаружи закрывает.
- Меню `DropField` повторяет ширину своего поля; это правило принадлежит общему компоненту и не задаётся на уровне продуктового экрана.

## Технические допущения

- Figma не вернул motion tracks. Поворот chevron и spinner загрузки — минимальная реализация состояния; при reduced motion они отключаются.
- Точная задержка открытия вложенного меню и collision/flip не описаны. Подменю открывается сразу по hover, click или ArrowRight и располагается справа.
- Figma показывает scrollbar-вариант, но не задаёт браузерный стиль полосы. Используется нативная прокрутка.
- Loading/Fail имеют подтверждённые состояния, но текст загрузки и callback повтора — технический API React.

## React

```tsx
<DropField label="Режим" value={value} options={items} onChange={setValue} />
<Menu ariaLabel="Действия" items={items} onSelect={handleSelect} />
```

# Collapse / Feedback

Источник: [Base — Feedback](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1002-2).

Компоненты находятся в `src/components/feedback`. Они используют только Core-токены из `src/theme/core`.

## Подтверждено Figma

| Компонент | Узел | Варианты и правила |
|---|---|---|
| Tooltip | [3417:2179](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3417-2179) | `Cerner`: 13 положений, `Fix container`: true/false, всего 22 опубликованных сочетания. HUG или 260 px, радиус 16, stroke 1, Caption/L/Medium 13/20. Hover, focus и long-press запускаются продуктовой логикой. |
| Info Bar | [3145:3184](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3145-3184) | Default, Accent, Warning, Error, Success. Опциональны icon, slot, title, supporting, link, action и close. Padding 20, gap 10/20, радиус 24. |
| Toast | [9902:2330](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9902-2330) | Default, Success, Accent; короткий/длинный текст; fixed container. Min 180, max 500, высота от 64, padding 20, gap 12, icon 24, title max 420, радиус 40. Не стакается, исчезает через 3 секунды, emoji в тексте не поддерживаются. |
| Popover | [3578:2874](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3578-2874) | `Gap=Default/clear`, slot-контент. Default: x 4, y 10, gap 2, радиус 24, blur 32 от Core 64, Shadow02. |
| SnackBar | [4069:12210](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=4069-12210) | Default, Error, Warning; supporting on/off; loading; fixed; actions on/off. Width 380, min 180, max 500; action только одна плюс close. Не скрывается автоматически. Приоритет: Error → Warning → Default. |
| Skeleton | [5128:9172](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=5128-9172) | Block/Circle, размеры 8–96: 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 88, 96. Block: радиус 16 и подтвержденный статичный градиент. |
| PasswordHint | [5143:9417](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=5143-9417) | Zero, Low, Medium, High. Ширина 218, padding x 16, три полосы высотой 4 с gap 2, подпись Caption/M/Medium. |

## Интерактивность

- Tooltip открывается по hover/focus; Escape закрывает. На touch добавлен long-press.
- Toast по умолчанию закрывается через подтвержденные 3 секунды. `duration=0` нужен для статичных демонстраций.
- Продуктовое уведомление «Папка создана» использует Default Toast: `Background/Solid/Base/Accent` (`#2f2c35`), Shadow16 и `IcMessageCheckOutline`. Источник: [8463:184751](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8463-184751). Storybook: `Feedback/Toast / FolderCreated`.
- Popover и SnackBar закрываются по явному действию; Popover также по клику снаружи и Escape.
- Все действия доступны с клавиатуры и имеют общий focus ring.
- При `prefers-reduced-motion` технические анимации загрузчика отключены.

## Технические допущения

- `get_motion_context` вернул пустой список для всех семи наборов. Время переходов открытия/закрытия в Figma не подтверждено, поэтому новая декоративная анимация не добавлялась.
- Long-press Tooltip установлен в 500 ms: Figma описывает жест, но не его задержку.
- Позиционирование Popover реализовано минимально: четыре стороны start/end. Figma подтверждает поверхность и gap, но не публикует полный алгоритм collision/flip.
- Иконки — заменяемые React slots. Дефолтные иконки в исходнике Figma являются заглушками, поэтому код не закрепляет их как обязательную семантику.
- SnackBar-стек и LIFO описаны в Figma, но менеджер глобальной очереди не создавался: это продуктовый слой, а не визуальный компонент.

## React

```tsx
<Tooltip content="Подсказка"><button>Фокус</button></Tooltip>
<InfoBar type="warning" title="Внимание" supporting="Проверьте настройки" />
<SnackBar type="error" title="Не удалось сохранить" actionLabel="Повторить" />
```

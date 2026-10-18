import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SegmentControls, type SegmentDisplayMode, type SegmentTabsMode } from './SegmentControls'
import { folderEmoji, getCustomFolderEmoji } from './folderEmoji'

const options = [
  { value: 'all', label: 'Все', icon: folderEmoji.all, kind: 'fixed' as const },
  { value: 'new', label: 'Новые', icon: folderEmoji.new, counter: 3, kind: 'system' as const },
  { value: 'chats', label: 'Чаты', icon: folderEmoji.chats, kind: 'system' as const },
  { value: 'channels', label: 'Каналы', icon: folderEmoji.channels, counter: 2, kind: 'system' as const },
  { value: 'project', label: 'Проект', icon: '🔥', counter: 1, kind: 'custom' as const },
] as const

const overflowOptions = [
  ...options,
  { value: 'marketing', label: 'Маркетинг', icon: '📣', kind: 'custom' as const },
  { value: 'research', label: 'Исследования', icon: '🔎', counter: 8, kind: 'custom' as const },
]

function SegmentControlsDemo({ tabs = 'dynamic', displayMode = 'names', resizable = false }: { tabs?: SegmentTabsMode; displayMode?: SegmentDisplayMode; resizable?: boolean }) {
  const [value, setValue] = useState('all')
  const [orderedOptions, setOrderedOptions] = useState([...options])
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={`segment-controls-story ${resizable ? 'segment-controls-story--resizable' : ''}`}>
      <SegmentControls
        tabs={tabs}
        displayMode={displayMode}
        options={orderedOptions}
        value={value}
        onValueChange={setValue}
        fixedOptionValue="all"
        onOrderChange={(values) => setOrderedOptions(values.flatMap((optionValue) => options.find((option) => option.value === optionValue) ?? []))}
        getMenuItems={(option) => {
          if (option.value === 'all') return [{ id: 'manage', label: 'Управлять папками' }]
          if (option.kind === 'custom') return [
            { id: 'edit', label: 'Редактировать папку' },
            { id: 'mark-read', label: 'Пометить как прочитанное' },
            { id: 'delete', label: 'Удалить папку', error: true },
          ]
          return [
            { id: 'hide', label: 'Скрыть папку' },
            ...(option.counter ? [{ id: 'mark-read', label: 'Пометить как прочитанное' }] : []),
          ]
        }}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      <p aria-live="polite">{settingsOpen ? 'Управление папками открыто' : 'Контекстное меню: правый клик по папке'}</p>
      {resizable && <p>Потяните правый нижний угол: Dynamic сохраняет ширину тегов, Fill делит ширину поровну.</p>}
    </div>
  )
}

function HorizontalOverflowDemo({ initialValue = 'all' }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="segment-controls-story">
      <SegmentControls
        tabs="dynamic"
        displayMode="names-and-icons"
        options={overflowOptions}
        value={value}
        onValueChange={setValue}
      />
      <p>Прокрутите свайпом, trackpad или колесом и выберите частично видимый сегмент.</p>
    </div>
  )
}

const meta = {
  title: 'UI/SegmentControls',
  component: SegmentControls,
  parameters: { layout: 'centered' },
  argTypes: { tabs: { control: 'radio', options: ['dynamic', 'fill'] } },
} satisfies Meta<typeof SegmentControls>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  args: {
    options,
    value: 'all',
    onValueChange: () => undefined,
    fixedOptionValue: 'all',
    onOrderChange: () => undefined,
    getMenuItems: () => [{ id: 'manage', label: 'Управлять папками' }],
    onSettingsClick: () => undefined,
  },
  render: (args) => <SegmentControlsDemo tabs={args.tabs} displayMode={args.displayMode} />,
}

export const NamesAndIcons: Story = {
  args: {
    options,
    value: 'all',
    displayMode: 'names-and-icons',
    onValueChange: () => undefined,
  },
}

export const IconsOnly: Story = {
  args: {
    options,
    value: 'all',
    displayMode: 'icons',
    onValueChange: () => undefined,
  },
}

export const DynamicHug: Story = {
  args: { ...NamesAndIcons.args, tabs: 'dynamic' },
  render: (args) => <SegmentControlsDemo tabs={args.tabs} displayMode={args.displayMode} resizable />,
}

export const Fill: Story = {
  args: { ...NamesAndIcons.args, tabs: 'fill' },
  render: (args) => <SegmentControlsDemo tabs={args.tabs} displayMode={args.displayMode} resizable />,
}

export const FillNarrow: Story = {
  args: { ...NamesAndIcons.args, tabs: 'fill' },
  decorators: [(Story) => <div className="segment-controls-story"><Story /></div>],
}

export const DynamicLongLabels: Story = {
  args: {
    options: [...options, { value: 'long', label: '22222222211111', icon: folderEmoji.custom, counter: 26 }],
    value: 'all',
    tabs: 'dynamic',
    displayMode: 'names-and-icons',
    onValueChange: () => undefined,
    onSettingsClick: () => undefined,
  },
  decorators: [(Story) => <div className="segment-controls-story"><Story /></div>],
}

export const DefaultFolderEmoji: Story = {
  args: {
    ...NamesAndIcons.args,
    options: [...options, { value: 'default-folder', label: 'Моя папка', icon: getCustomFolderEmoji(), kind: 'custom' }],
  },
}

export const HorizontalOverflow: Story = {
  args: {
    options: overflowOptions,
    value: 'all',
    tabs: 'dynamic',
    displayMode: 'names-and-icons',
    onValueChange: () => undefined,
  },
  render: () => <HorizontalOverflowDemo />,
}

export const RestoredOverflowSelection: Story = {
  args: {
    ...HorizontalOverflow.args,
    value: 'research',
  },
  render: () => <HorizontalOverflowDemo initialValue="research" />,
}

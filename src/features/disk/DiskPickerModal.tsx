import { ArrowDown, ArrowLeft, ArrowUp, ChevronRight, HardDrive } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { FileTypeIcon } from '../../components/ui/FileTypeIcon'
import { ModalPage } from '../../components/ui/ModalPage'
import { SearchField } from '../../components/ui/SearchField'
import { CheckBox } from '../../components/ui/CheckBox'
import { IconButton } from '../../components/ui/IconButton'
import { Tabs } from '../../components/ui/Tabs'
import { TextButton } from '../../components/ui/TextButton'
import { byId, isContainer, isInDrives, listFolder, pathTo, searchDisk } from './mockDisk'
import type { DiskFile, DiskTab } from './mockDisk'
import { DISK_LIMITS, extensionOf, formatBytes } from './model'
import './disk.css'

const tabs: Array<{ value: DiskTab; label: string }> = [
  { value: 'mine', label: 'Мой диск' },
  { value: 'shared', label: 'Доступные мне' },
  { value: 'favorites', label: 'Избранное' },
  { value: 'recent', label: 'Недавние' },
  { value: 'common', label: 'Общие диски' },
]

type SortKey = 'name' | 'owner' | 'openedTs'

type DiskPickerModalProps = {
  open: boolean
  onClose: () => void
  onAttach: (files: DiskFile[]) => void
  /** Файлы, которые уже лежат в редакторе: их повторно выбрать нельзя. */
  attachedIds?: string[]
}

const rootName = (tab: DiskTab) => (tab === 'common' ? 'Общие диски' : 'Мой диск')

export function DiskPickerModal({ open, onClose, onAttach, attachedIds = [] }: DiskPickerModalProps) {
  const [tab, setTab] = useState<DiskTab>('mine')
  const [folderId, setFolderId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'openedTs', dir: 'desc' })
  const [selected, setSelected] = useState<string[]>([])
  /** Режим «Выбранные»: не вкладка и не папка, поэтому свой флаг — выход возвращает туда, откуда зашли. */
  const [showSelected, setShowSelected] = useState(false)
  /** Состав «Выбранных» снимается при входе и не перестраивается: снятая галочка не убирает строку из-под курсора. */
  const [selectedView, setSelectedView] = useState<string[]>([])

  useEffect(() => {
    if (open) { setTab('mine'); setFolderId(null); setQuery(''); setSelected([]); setShowSelected(false) }
  }, [open])

  const searching = !showSelected && query.trim().length > 0
  /** Верх «Общих дисков» — список самих дисков: строка здесь вход внутрь, а не объект выбора. */
  const atDriveList = !showSelected && !searching && tab === 'common' && folderId === null
  const insideFolder = !showSelected && !searching && folderId !== null

  const rows = useMemo(() => {
    const list = showSelected
      ? selectedView.map(byId).filter((node): node is DiskFile => Boolean(node) && selected.length > 0)
      : searching ? searchDisk(query) : listFolder(tab, folderId)
    const key = atDriveList ? 'name' : sort.key
    // Список дисков по умолчанию идёт А→Я: стартовая сортировка по времени открытия к нему не относится.
    const factor = atDriveList && sort.key !== 'name' ? 1 : sort.dir === 'asc' ? 1 : -1
    return [...list].sort((a, b) => {
      const left = a[key]
      const right = b[key]
      return (typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right), 'ru')) * factor
    })
  }, [atDriveList, folderId, query, searching, selected.length, selectedView, showSelected, sort, tab])

  const toggleSort = (key: SortKey) => setSort((current) => current.key === key ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'openedTs' ? 'desc' : 'asc' })
  const sortTitle = (key: SortKey, label: string) => (
    <button className="disk-picker__sort" type="button" onClick={() => toggleSort(key)} aria-label={`Сортировать: ${label}`}>
      {label}{(atDriveList ? key === 'name' : sort.key === key) && ((atDriveList && sort.key !== 'name') || sort.dir === 'asc' ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />)}
    </button>
  )
  const selectable = rows.filter((file) => file.kind !== 'drive' && !attachedIds.includes(file.id))
  const allSelected = selectable.length > 0 && selectable.every((file) => selected.includes(file.id))
  const someSelected = !allSelected && selectable.some((file) => selected.includes(file.id))
  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id].slice(0, DISK_LIMITS.maxSelection)
    setSelected(next)
  }
  const toggleAll = () => setSelected((current) => allSelected
    ? current.filter((id) => !selectable.some((file) => file.id === id))
    : [...new Set([...current, ...selectable.map((file) => file.id)])].slice(0, DISK_LIMITS.maxSelection))
  const attach = () => {
    onAttach(selected.map(byId).filter((node): node is DiskFile => Boolean(node)))
    onClose()
  }

  /** Заход в папку или диск. Из плоских вкладок, поиска и «Выбранных» ведёт в дерево: «Мой диск» или «Общие диски». */
  const openContainer = (node: DiskFile) => {
    setQuery('')
    setShowSelected(false)
    setTab(isInDrives(node.id) ? 'common' : 'mine')
    setFolderId(node.id)
  }
  const openSelected = () => { setQuery(''); setSelectedView([...selected]); setShowSelected(true) }
  const changeTab = (value: string) => { setTab(value as DiskTab); setFolderId(null) }

  const crumbs = (() => {
    const parts = [{ id: null as string | null, name: rootName(tab) }, ...pathTo(folderId)]
    // Путь схлопывается после второго уровня: корень › … › два последних звена.
    return parts.length > 3 ? { shown: [parts[0], ...parts.slice(-2)], collapsed: true } : { shown: parts, collapsed: false }
  })()

  const emptyText = showSelected ? 'Ничего не выбрано' : atDriveList ? 'Общих дисков нет' : 'В этой папке пусто'

  return (
    <ModalPage
      open={open}
      onClose={onClose}
      title="Выберите файлы"
      className="disk-picker-modal"
      height="viewport"
      scroll="content"
      footer={
        <div className="disk-picker__footer">
          <TextButton tone="base" className="disk-picker__counter" disabled={!selected.length || showSelected} onClick={openSelected} aria-live="polite">{selected.length} из {DISK_LIMITS.maxSelection}</TextButton>
          <Button priority="primary" size="m" disabled={!selected.length} onClick={attach}>Прикрепить</Button>
        </div>
      }
    >
      <div className="disk-picker">
        <SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по названию" label="Поиск файлов и папок на Диске" />
        {showSelected ? (
          <div className="disk-picker__bar">
            <IconButton label="Назад" icon={<ArrowLeft />} onClick={() => setShowSelected(false)} />
            <span className="disk-picker__bar-title">Выбранные</span>
          </div>
        ) : searching ? (
          <div className="disk-picker__bar"><span className="disk-picker__bar-title">Результаты поиска</span></div>
        ) : insideFolder ? (
          <nav className="disk-picker__bar disk-picker__crumbs" aria-label="Путь">
            {crumbs.shown.map((part, index) => {
              const last = index === crumbs.shown.length - 1
              return (
                <span className="disk-picker__crumb" key={part.id ?? 'root'}>
                  {index > 0 && <ChevronRight aria-hidden="true" />}
                  {last ? <span className="disk-picker__bar-title" aria-current="page">{part.name}</span> : <button type="button" onClick={() => setFolderId(part.id)}>{part.name}</button>}
                  {crumbs.collapsed && index === 0 && <><ChevronRight aria-hidden="true" /><span aria-hidden="true">…</span></>}
                </span>
              )
            })}
          </nav>
        ) : (
          <Tabs options={tabs} value={tab} onValueChange={changeTab} type="line" ariaLabel="Разделы Диска" />
        )}
        <div className="disk-picker__list">
          {rows.length ? (
            <div className={`disk-picker__table${atDriveList ? ' is-drives' : ''}`} role="table" aria-label="Файлы МТС Диска">
              <div className="disk-picker__row disk-picker__row--head" role="row">
                {!atDriveList && (
                  <span className="disk-picker__cell disk-picker__cell--check" role="columnheader">
                    <CheckBox aria-label="Выбрать все" size="m" checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  </span>
                )}
                <span className="disk-picker__cell" role="columnheader">{sortTitle('name', 'Название')}</span>
                {!atDriveList && <span className="disk-picker__cell" role="columnheader">{sortTitle('owner', 'Владелец')}</span>}
                {!atDriveList && <span className="disk-picker__cell disk-picker__cell--end" role="columnheader">{sortTitle('openedTs', 'Время открытия')}</span>}
              </div>
              {rows.map((file) => {
                const drive = file.kind === 'drive'
                const attached = attachedIds.includes(file.id)
                const checked = selected.includes(file.id)
                const container = isContainer(file)
                return (
                  <div
                    key={file.id}
                    className={`disk-picker__row${checked ? ' is-selected' : ''}${attached ? ' is-disabled' : ''}`}
                    role="row"
                    aria-selected={drive ? undefined : checked}
                    aria-disabled={attached || undefined}
                    tabIndex={attached ? -1 : 0}
                    title={container ? 'Двойной клик — открыть' : undefined}
                    onClick={() => { if (!attached && !drive) toggle(file.id) }}
                    onDoubleClick={() => { if (container && !attached) openContainer(file) }}
                    onKeyDown={(event) => {
                      if (attached) return
                      if (event.key === 'Enter' && container) { event.preventDefault(); openContainer(file) }
                      else if ((event.key === ' ' || event.key === 'Enter') && !drive) { event.preventDefault(); toggle(file.id) }
                    }}
                  >
                    {!atDriveList && <span className="disk-picker__cell disk-picker__cell--check" role="cell"><CheckBox visualOnly size="m" checked={checked} disabled={attached} aria-hidden="true" /></span>}
                    <span className="disk-picker__cell disk-picker__name" role="cell">
                      {drive ? <span className="disk-picker__drive" aria-hidden="true"><HardDrive /></span> : <FileTypeIcon extension={file.kind === 'folder' ? 'folder' : extensionOf(file.name)} />}
                      <span><span>{file.name}</span>{!drive && <small>{attached ? 'Уже прикреплён' : file.kind === 'folder' ? 'Папка' : formatBytes(file.size)}</small>}</span>
                    </span>
                    {!atDriveList && <span className="disk-picker__cell" role="cell">{file.owner}</span>}
                    {!atDriveList && <span className="disk-picker__cell disk-picker__cell--end" role="cell">{file.openedAt}</span>}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="disk-picker__empty">
              {searching ? <><strong>Ничего не найдено</strong><span>Измените поисковый запрос</span></> : <span>{emptyText}</span>}
            </div>
          )}
        </div>
      </div>
    </ModalPage>
  )
}

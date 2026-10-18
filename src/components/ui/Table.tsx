import type { ReactNode } from 'react'
import { CheckBox } from './CheckBox'
import { Radio } from './Radio'
import { FederationLabel } from './FederationLabel'

export type TableRow = { id: string; disabled?: boolean; federation?: boolean; [key: string]: ReactNode }
export type TableColumn = { key: string; title: ReactNode; description?: ReactNode; federation?: boolean; render?: (row: TableRow) => ReactNode }

type TableProps = {
  columns: TableColumn[]
  rows: TableRow[]
  selectionMode?: 'none' | 'radio' | 'checkbox'
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  label?: string
  className?: string
}

export function Table({ columns, rows, selectionMode = 'none', selectedIds = [], onSelectionChange, label = 'Таблица', className = '' }: TableProps) {
  const enabledIds = rows.filter((row) => !row.disabled).map((row) => row.id)
  const allSelected = selectionMode === 'checkbox' && enabledIds.length > 0 && enabledIds.every((id) => selectedIds.includes(id))
  const partiallySelected = selectionMode === 'checkbox' && !allSelected && enabledIds.some((id) => selectedIds.includes(id))
  const select = (row: TableRow) => {
    if (row.disabled) return
    if (selectionMode === 'radio') onSelectionChange?.([row.id])
    if (selectionMode === 'checkbox') onSelectionChange?.(selectedIds.includes(row.id) ? selectedIds.filter((id) => id !== row.id) : [...selectedIds, row.id])
  }
  return (
    <div className={`collapse-table-wrap ${className}`}>
      <table className={`collapse-table collapse-table--${selectionMode}`} aria-label={label}>
        <thead><tr>{selectionMode !== 'none' && <th className="collapse-table__select">{selectionMode === 'checkbox' && <CheckBox aria-label="Выбрать все" checked={allSelected} indeterminate={partiallySelected} onChange={() => onSelectionChange?.(allSelected ? [] : enabledIds)} />}</th>}{columns.map((column) => <th key={column.key}><span>{column.title}</span>{column.description && <small>{column.description}</small>}</th>)}</tr></thead>
        <tbody>{rows.map((row) => { const selected = selectedIds.includes(row.id); return <tr className={`${selected ? 'is-selected' : ''} ${row.disabled ? 'is-disabled' : ''}`} key={row.id} aria-selected={selected || undefined} onClick={() => select(row)}>{selectionMode !== 'none' && <td className="collapse-table__select" onClick={(event) => event.stopPropagation()}>{selectionMode === 'radio' ? <Radio name={`${label}-selection`} aria-label={`Выбрать ${row.id}`} checked={selected} disabled={row.disabled} onChange={() => select(row)} /> : <CheckBox aria-label={`Выбрать ${row.id}`} checked={selected} disabled={row.disabled} onChange={() => select(row)} />}</td>}{columns.map((column) => { const content = column.render ? column.render(row) : row[column.key]; return <td key={column.key}>{column.federation && row.federation ? <FederationLabel>{content}</FederationLabel> : content}</td> })}</tr> })}</tbody>
      </table>
    </div>
  )
}

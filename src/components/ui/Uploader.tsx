import { useRef, useState } from 'react'
import type { DragEvent, InputHTMLAttributes, ReactNode } from 'react'
import { Upload } from 'lucide-react'

type UploaderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  children?: ReactNode
  error?: boolean
  onFiles?: (files: FileList) => void
}

export function Uploader({ children, error = false, onFiles, className = '', disabled, accept, multiple, ...props }: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); setDragging(false)
    if (!disabled && event.dataTransfer.files.length) onFiles?.(event.dataTransfer.files)
  }
  return (
    <div className={`collapse-uploader ${dragging ? 'is-dragging' : ''} ${error ? 'is-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`} onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragging(true) }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
      <input ref={inputRef} type="file" tabIndex={-1} accept={accept} multiple={multiple} onChange={(event) => { if (event.target.files) onFiles?.(event.target.files) }} {...props} />
      <button className="collapse-uploader__trigger" type="button" disabled={disabled} onClick={() => inputRef.current?.click()}>
        {children ?? <><Upload aria-hidden="true" /><span><strong>Нажмите</strong> или перенесите файлы для загрузки</span></>}
        {error && <small>Не удалось распознать файл</small>}
      </button>
    </div>
  )
}

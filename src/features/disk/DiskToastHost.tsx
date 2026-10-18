import { useEffect, useState } from 'react'
import { Toast } from '../../components/feedback/Toast'
import { DISK_TOAST_EVENT } from './toast'
import './disk.css'

export function DiskToastHost() {
  const [toast, setToast] = useState<{ id: number; message: string }>()

  useEffect(() => {
    const show = (event: Event) => setToast({ id: Date.now(), message: (event as CustomEvent<string>).detail })
    window.addEventListener(DISK_TOAST_EVENT, show)
    return () => window.removeEventListener(DISK_TOAST_EVENT, show)
  }, [])

  if (!toast) return null
  return <Toast key={toast.id} className="disk-toast" duration={3000} icon={<img src="assets/figma/ic-message-check-outline.svg" alt="" aria-hidden="true" />} onClose={() => setToast(undefined)}>{toast.message}</Toast>
}

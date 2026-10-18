import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'
import { ModalPage } from '../../components/ui/ModalPage'
import './disk.css'

type DiskRedirectModalProps = { open: boolean; onClose: () => void }

/** Переход на Диск: права и доступы проверяет сам Диск, чат их не запрашивает. */
export function DiskRedirectModal({ open, onClose }: DiskRedirectModalProps) {
  return (
    <ModalPage open={open} onClose={onClose} title="МТС Диск">
      <div className="disk-redirect">
        <Loader size="large" label="Открывается Диск" />
        <p>Открывается Диск, где проверяются права и доступы</p>
        <Button priority="secondary" size="m" onClick={onClose}>Закрыть</Button>
      </div>
    </ModalPage>
  )
}

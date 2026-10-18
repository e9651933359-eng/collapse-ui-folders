import { FederationIcon } from '../../components/ui/FederationIcon'
import type { Chat } from '../../types/chat'
import { getParticipantWord } from './model'
import './federation.css'

type FederationNoticeProps = {
  externalParticipantCount?: number
  onOpenParticipants?: () => void
  variant?: 'compact' | 'details'
}

export function FederationNotice({ externalParticipantCount = 1, onOpenParticipants, variant = 'details' }: FederationNoticeProps) {
  if (variant === 'compact') {
    return <div className="federation-notice federation-notice--compact" role="status"><FederationIcon size="xs" /><span>Участник из другой организации</span></div>
  }
  return <button type="button" className="federation-notice federation-notice--compact federation-notice--action" aria-haspopup="dialog" onClick={onOpenParticipants}><FederationIcon size="xs" /><span className="federation-notice__copy"><strong>{externalParticipantCount} {getParticipantWord(externalParticipantCount)}</strong><span>из другой организации</span></span></button>
}

export function FederationChatIndicator({ chat }: { chat: Chat }) {
  return <FederationIcon size="s" aria-label={`Федеративный чат: ${chat.title}`} />
}

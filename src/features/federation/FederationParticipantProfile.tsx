import { FederationTag } from '../../components/ui'
import { UserProfile } from '../chat/profile/UserProfile'
import type { FederationParticipant } from './model'

type FederationParticipantProfileProps = {
  /** Возврат к списку, из которого открыт профиль (шапка Figma 40000074:62312 содержит «Назад»). */
  onBack?: () => void
  onClose: () => void
  open: boolean
  organization: string
  participant?: FederationParticipant
  variant?: 'full' | 'compact'
}

/** Профиль сотрудника другой организации: общий `UserProfile` с тегом Федерации. */
export function FederationParticipantProfile({ onBack, onClose, open, organization, participant, variant = 'full' }: FederationParticipantProfileProps) {
  return <UserProfile open={open} member={participant} organization={organization} variant={variant} onBack={onBack} onClose={onClose} tag={<FederationTag>Участник из другой организации</FederationTag>} />
}

import { useState, type ReactNode } from 'react'
import { Avatar } from '../ui/Avatar'
import { IconButton } from '../ui/IconButton'

type ProductRailItem = { id: string; label: string; icon: ReactNode }

const items: ProductRailItem[] = [
  { id: 'chats', label: 'Чаты', icon: <img className="rail-icon" src="assets/figma/ic-chat-filled.svg" alt="" /> },
  { id: 'messages', label: 'Обсуждения', icon: <img className="rail-icon" src="assets/figma/ic-messages-filled.svg" alt="" /> },
  { id: 'meetings', label: 'Встречи', icon: <img className="rail-icon" src="assets/figma/ic-video-filled.svg" alt="" /> },
  { id: 'webinars', label: 'Вебинары', icon: <img className="rail-icon" src="assets/figma/ic-webinar-filled.svg" alt="" /> },
  { id: 'tasks', label: 'Задачи', icon: <img className="rail-icon" src="assets/figma/ic-tasks-filled.svg" alt="" /> },
  { id: 'mail', label: 'Почта', icon: <img className="rail-icon" src="assets/figma/ic-mail-filled.svg" alt="" /> },
  { id: 'calendar', label: 'Календарь', icon: <img className="rail-icon" src="assets/figma/ic-calendar-filled.svg" alt="" /> },
  { id: 'services', label: 'Сервисы', icon: <img className="rail-icon" src="assets/figma/ic-services-filled.svg" alt="" /> },
]

export function ProductRail() {
  const [active, setActive] = useState('chats')

  return (
    <nav className="product-rail" aria-label="Разделы MTS Link">
      <div className="product-rail__profile"><Avatar label="Вячеслав" image="assets/figma/avatar-user.png" /></div>
      <div className="product-rail__items">
        {items.map(({ id, label, icon }) => (
          <IconButton key={id} label={label} icon={icon} selected={active === id} onClick={() => {
            setActive(id)
          }} />
        ))}
        <span className="product-rail__divider" />
        <IconButton label="Настройки" icon={<img className="rail-icon" src="assets/figma/ic-gear-filled.svg" alt="" />} />
      </div>
      <div className="product-rail__bottom">
        <IconButton label="AI-помощник" icon={<img className="rail-icon" src="assets/figma/ic-ai-filled.svg" alt="" />} />
        <Avatar label="Организация" size={44} tone="var(--collapse-color-background-solid-accent-primary)" shape="squircle" />
      </div>
    </nav>
  )
}

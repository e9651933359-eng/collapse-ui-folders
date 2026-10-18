import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Popover } from '../feedback/Popover'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { EmojiPicker, defaultEmojiCategories } from './EmojiPicker'
import { folderEmojiCategory, getCustomFolderEmoji } from './folderEmoji'
import { ModalHeader } from './ModalHeader'
import { TextButton } from './TextButton'
import { TextField } from './TextField'

export type FolderCandidate = {
  id: string
  label: string
  avatar?: string
  avatarTone?: string
  image?: string
  shape?: 'round' | 'squircle'
}

export type CreatedFolder = {
  label: string
  chatIds: string[]
  emoji?: string
}

type CreateFolderModalProps = {
  candidates: FolderCandidate[]
  initialFolder?: CreatedFolder
  initialSelectedIds?: readonly string[]
  mode?: 'create' | 'edit'
  onBack: () => void
  onClose: () => void
  onCreate: (folder: CreatedFolder) => void
}

const maxFolderNameLength = 12
const maxFolderItems = 100
const folderEmojiCategories = [folderEmojiCategory, ...defaultEmojiCategories]

export function CreateFolderModal({ candidates, initialFolder, initialSelectedIds = [], mode = 'create', onBack, onClose, onCreate }: CreateFolderModalProps) {
  const [view, setView] = useState<'form' | 'picker'>('form')
  const [name, setName] = useState(initialFolder?.label ?? '')
  const [emoji, setEmoji] = useState(initialFolder?.emoji ?? '')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>(initialFolder?.chatIds ?? [...initialSelectedIds])
  const [pickerIds, setPickerIds] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const invalidName = name.length > maxFolderNameLength
  const canCreate = name.trim().length > 0 && !invalidName
  const filteredCandidates = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru')
    return candidates.filter((candidate) => !needle || candidate.label.toLocaleLowerCase('ru').includes(needle))
  }, [candidates, query])

  const openPicker = () => {
    setPickerIds(selectedIds)
    setQuery('')
    setView('picker')
  }

  const toggleCandidate = (id: string) => {
    setPickerIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : current.length < maxFolderItems ? [...current, id] : current)
  }

  if (view === 'picker') {
    return (
      <section className="collapse-modal-surface folder-modal folder-create-modal folder-create-modal--picker" role="dialog" aria-modal="true" aria-labelledby="folder-picker-title">
        <ModalHeader
          closeIcon={<img src="assets/figma/ic-cancel-outline.svg" alt="" aria-hidden="true" />}
          onBack={() => setView('form')}
          onClose={onClose}
          title="Выберите чаты и каналы"
          titleId="folder-picker-title"
        />
        <div className="folder-picker__body">
          <label className="folder-picker__search">
            <Search aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск" aria-label="Поиск чатов и каналов" />
          </label>
          <div className="folder-picker__list" role="list" aria-label="Чаты и каналы">
            {filteredCandidates.map((candidate) => (
              <label className="folder-picker__row" key={candidate.id}>
                <Avatar label={candidate.label} emoji={candidate.avatar} image={candidate.image} tone={candidate.avatarTone} shape={candidate.shape} />
                <span>{candidate.label}</span>
                <CheckBox
                  aria-label={`Добавить ${candidate.label}`}
                  checked={pickerIds.includes(candidate.id)}
                  onChange={() => toggleCandidate(candidate.id)}
                />
              </label>
            ))}
          </div>
        </div>
        <footer className="folder-create-modal__footer">
          <span>{pickerIds.length} из {maxFolderItems}</span>
          <Button priority="accent" size="m" onClick={() => { setSelectedIds(pickerIds); setView('form') }}>
            {pickerIds.length ? `Добавить ${pickerIds.length}` : 'Добавить'}
          </Button>
        </footer>
      </section>
    )
  }

  const selectedCandidates = candidates.filter((candidate) => selectedIds.includes(candidate.id))

  return (
    <section className="collapse-modal-surface folder-modal folder-create-modal" role="dialog" aria-modal="true" aria-labelledby="folder-create-title">
      <ModalHeader
        closeIcon={<img src="assets/figma/ic-cancel-outline.svg" alt="" aria-hidden="true" />}
        onClose={onClose}
        title={mode === 'edit' ? 'Редактирование папки' : 'Новая папка'}
        titleId="folder-create-title"
      />
      <div className="folder-create-modal__body">
        <div className="folder-create-modal__name">
          <Popover
            gap="clear"
            open={emojiOpen}
            onOpenChange={setEmojiOpen}
            placement="bottom-start"
            content={<EmojiPicker categories={folderEmojiCategories} onSelect={(value) => { setEmoji(value); setEmojiOpen(false) }} />}
          >
            <button className="folder-create-modal__folder-icon" type="button" aria-label="Выбрать эмодзи папки">
              <span aria-hidden="true">{getCustomFolderEmoji(emoji)}</span>
            </button>
          </Popover>
          <TextField
            autoFocus
            label="Название *"
            value={name}
            error={invalidName}
            counter={`${name.length}/${maxFolderNameLength}`}
            supportingText={invalidName ? 'Не больше 12 символов' : undefined}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        {selectedCandidates.length ? (
          <section className="folder-create-modal__selection" aria-labelledby="selected-chats-title">
            <header>
              <h3 id="selected-chats-title">Выбранные чаты и каналы</h3>
              <TextButton onClick={openPicker}>Изменить</TextButton>
            </header>
            <div className="folder-create-modal__selected-list">
              {selectedCandidates.map((candidate) => (
                <div className="folder-create-modal__selected-row" key={candidate.id}>
                  <Avatar label={candidate.label} emoji={candidate.avatar} image={candidate.image} tone={candidate.avatarTone} shape={candidate.shape} />
                  <span>{candidate.label}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="folder-create-modal__empty">
            <p>Выберите чаты и каналы в папку.<br />Можно пропустить и сделать это позже</p>
            <Button leadingIcon={<Plus />} onClick={openPicker}>Выбрать чаты и каналы</Button>
          </div>
        )}
      </div>
      <footer className="folder-create-modal__footer folder-create-modal__footer--actions">
        <Button size="m" onClick={onBack}>Отмена</Button>
        <Button size="m" priority="accent" disabled={!canCreate} onClick={() => onCreate({ label: name.trim(), chatIds: selectedIds, emoji: emoji || undefined })}>{mode === 'edit' ? 'Сохранить' : 'Создать папку'}</Button>
      </footer>
    </section>
  )
}

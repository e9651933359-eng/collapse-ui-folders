import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from './Button'
import { ListItem } from './ListItem'
import { ModalPage } from './ModalPage'
import { SearchField } from './SearchField'
import { TextField } from './TextField'

function DismissibleModalPage() {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
      <ModalPage open={open} title="Новая группа" onClose={() => setOpen(false)}>
        <div className="ui-story-field"><TextField label="Название *" /></div>
      </ModalPage>
    </>
  )
}

const meta = {
  title: 'UI/ModalPage',
  component: ModalPage,
  parameters: { layout: 'fullscreen' },
  args: { open: true, title: 'Новая группа', onClose: () => undefined, children: <div className="ui-story-field"><TextField label="Название *" /></div>, footer: <><Button>Отмена</Button><Button priority="accent">Создать</Button></> },
} satisfies Meta<typeof ModalPage>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithBackAction: Story = {
  args: { title: 'Добавьте участников', onBack: () => undefined },
  parameters: { docs: { description: { story: 'Заголовок остаётся выровненным по левому краю текстового слота между кнопками.' } } },
}
export const ViewportHeight: Story = { args: { height: 'viewport' } }
export const ContentScroll: Story = {
  args: {
    height: 'viewport',
    scroll: 'content',
    title: 'Начните общение',
    footer: undefined,
    children: (
      <div className="ui-story-modal-scroll">
        <SearchField />
        <div className="ui-story-modal-scroll__list">
          {Array.from({ length: 30 }, (_, index) => <ListItem key={index} label={`Сотрудник ${index + 1}`} />)}
        </div>
      </div>
    ),
  },
  parameters: { docs: { description: { story: 'Body не прокручивается сам: поиск остаётся на месте, прокручивается только список со своим overflow.' } } },
}
export const DismissibleByScrim: Story = {
  render: () => <DismissibleModalPage />,
  parameters: { docs: { description: { story: 'Клик по затемнению закрывает модалку. Клик внутри модалки её не закрывает.' } } },
}

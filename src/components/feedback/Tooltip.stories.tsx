import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/Button'
import { Tooltip } from './Tooltip'

const meta = { title: 'Feedback/Tooltip', component: Tooltip, parameters: { layout: 'centered' }, args: { children: <Button>Триггер</Button>, content: 'Контекстная подсказка', fixedContainer: false, placement: 'top-center' } } satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>
const canvas = { borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }
export const Interactive: Story = { render: (args) => <div style={{ ...canvas, padding: 120 }}><Tooltip {...args}><Button>Наведите или сфокусируйте</Button></Tooltip></div> }
export const FixedLongText: Story = { args: { defaultOpen: true, fixedContainer: true, content: 'Длинный текст фиксируется в контейнере шириной 260 px и переносится на новую строку.', placement: 'bottom-start' }, render: (args) => <div style={{ ...canvas, padding: 120 }}><Tooltip {...args}><Button>Триггер</Button></Tooltip></div> }
export const Placements: Story = { render: () => <div style={{ ...canvas, width: 720, height: 420, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', placeItems: 'center' }}>{(['top-start','top-center','top-end','left-middle','none','right-middle','bottom-start','bottom-center','bottom-end'] as const).map((placement) => <Tooltip key={placement} content={placement} placement={placement} defaultOpen fixedContainer={false}><Button>{placement}</Button></Tooltip>)}</div> }

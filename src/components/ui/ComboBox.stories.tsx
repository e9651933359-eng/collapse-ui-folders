import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ComboBox } from './ComboBox'

const options = [
  { value: 'names', label: 'Только названия' },
]

function ComboBoxDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [value, setValue] = useState('names')
  return (
    <div className="combo-box-story-canvas">
      <div style={{ width: 428 }}>
        <ComboBox
          ariaLabel="Отображение папок"
          defaultOpen={defaultOpen}
          value={value}
          options={options}
          onChange={setValue}
        />
      </div>
    </div>
  )
}

const meta = {
  title: 'UI/ComboBox',
  component: ComboBox,
  args: { ariaLabel: 'Отображение папок', value: 'names', options },
} satisfies Meta<typeof ComboBox>

export default meta
type Story = StoryObj<typeof meta>

export const Enabled: Story = { render: () => <ComboBoxDemo /> }
export const Active: Story = { render: () => <ComboBoxDemo defaultOpen /> }

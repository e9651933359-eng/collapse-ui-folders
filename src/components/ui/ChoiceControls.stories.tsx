import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckBox } from './CheckBox'
import { Radio } from './Radio'

function InteractiveChoices() {
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState('one')
  return <div className="ui-story-grid"><CheckBox label="Независимый выбор" checked={checked} onChange={(event) => setChecked(event.target.checked)} /><CheckBox label="Частично выбрана группа" checked indeterminate /><CheckBox label="Недоступно" disabled /><CheckBox label="Сохранение" loading /><Radio name="example" value="one" label="Первый вариант" checked={radio === 'one'} onChange={() => setRadio('one')} /><Radio name="example" value="two" label="Второй вариант" checked={radio === 'two'} onChange={() => setRadio('two')} /></div>
}

const meta = { title: 'UI/Choice controls', component: CheckBox } satisfies Meta<typeof CheckBox>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveChoices /> }
export const SizesAndShapes: Story = { render: () => <div className="ui-story-row"><CheckBox size="s" label="S" defaultChecked /><CheckBox size="m" label="M" defaultChecked /><CheckBox shape="ellipse" label="Ellipse" defaultChecked /></div> }
export const VisualInsideClickableParent: Story = { render: () => <button type="button" aria-label="Выбранный пункт"><CheckBox size="s" visualOnly checked /></button> }

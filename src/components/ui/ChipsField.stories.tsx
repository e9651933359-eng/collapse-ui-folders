import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChipsField } from './ChipsField'

function InteractiveChipsField() { const [values, setValues] = useState(['Работа', 'Команда']); return <div className="ui-story-field"><ChipsField label="Темы" values={values} onValuesChange={setValues} placeholder="Добавить тему" /></div> }
const meta = { title: 'UI/ChipsField', component: ChipsField, args: { label: 'Темы', values: ['Работа'], onValuesChange: () => undefined } } satisfies Meta<typeof ChipsField>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveChipsField /> }
export const Error: Story = { args: { error: true, supportingText: 'Проверьте значение' } }
export const Disabled: Story = { args: { disabled: true } }

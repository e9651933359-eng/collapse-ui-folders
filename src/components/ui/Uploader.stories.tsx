import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Uploader } from './Uploader'

function InteractiveUploader() { const [name, setName] = useState(''); return <div className="ui-story-field"><Uploader onFiles={(files) => setName(files[0]?.name ?? '')} />{name && <p>{name}</p>}</div> }
const meta = { title: 'UI/Uploader', component: Uploader } satisfies Meta<typeof Uploader>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveUploader /> }
export const Error: Story = { args: { error: true } }
export const Disabled: Story = { args: { disabled: true } }

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from 'lucide-react'
import { HyperLink } from './HyperLink'

const meta = { title: 'UI/HyperLink', component: HyperLink, args: { children: 'Подробнее', href: '#', leadingIcon: <ExternalLink /> } } satisfies Meta<typeof HyperLink>
export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = { render: (args) => <div className="ui-story-row">{(['s', 'm', 'l'] as const).map((size) => <HyperLink {...args} key={size} size={size}>{size}</HyperLink>)}</div> }
export const Tones: Story = { render: (args) => <div className="ui-story-row">{(['accent', 'default', 'secondary'] as const).map((tone) => <HyperLink {...args} key={tone} tone={tone}>{tone}</HyperLink>)}</div> }
export const States: Story = { render: (args) => <div className="ui-story-row"><HyperLink {...args}>enabled</HyperLink><HyperLink {...args} visualState="hovered">hovered</HyperLink><HyperLink {...args} visualState="visited">visited</HyperLink><HyperLink {...args} disabled>disabled</HyperLink></div> }

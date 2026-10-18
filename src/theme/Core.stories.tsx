import type { Meta, StoryObj } from '@storybook/react-vite'
import './core-stories.css'

type Swatch = { name: string; token: string }

const colors: Swatch[] = [
  { name: 'Surface / Foundation', token: '--collapse-color-surface-solid-foundation' },
  { name: 'Surface / Primary', token: '--collapse-color-surface-solid-primary' },
  { name: 'Text / Base / Primary', token: '--collapse-color-text-solid-base-primary' },
  { name: 'Text / Base / Secondary', token: '--collapse-color-text-solid-base-secondary' },
  { name: 'Accent / Primary', token: '--collapse-color-background-solid-accent-primary' },
  { name: 'Error / Primary', token: '--collapse-color-background-solid-error-primary' },
  { name: 'Success / Primary', token: '--collapse-color-background-solid-success-primary' },
  { name: 'Warning / Primary', token: '--collapse-color-icon-solid-warning-primary' },
]

const spacing: Swatch[] = [
  { name: 'XXS · 2', token: '--collapse-spacing-horizontal-xxs' },
  { name: 'XS · 4', token: '--collapse-spacing-horizontal-xs' },
  { name: 'S nudge · 6', token: '--collapse-spacing-horizontal-s-nudge' },
  { name: 'S · 8', token: '--collapse-spacing-horizontal-s' },
  { name: 'M nudge · 10', token: '--collapse-spacing-horizontal-m-nudge' },
  { name: 'M · 12', token: '--collapse-spacing-horizontal-m' },
  { name: 'L · 16', token: '--collapse-spacing-horizontal-l' },
  { name: 'XXL · 24', token: '--collapse-spacing-horizontal-xxl' },
  { name: 'XXXL · 32', token: '--collapse-spacing-horizontal-xxxl' },
]

function CorePreview({ section }: { section: string }) {
  if (section === 'colors') {
    return <div className="core-story core-story__swatches">{colors.map(({ name, token }) => <article key={token}><span style={{ background: `var(${token})` }} /><strong>{name}</strong><code>{token}</code></article>)}</div>
  }

  if (section === 'typography') {
    return <div className="core-story core-story__type">
      <p className="core-type-title">Title / L / SemiBold — Заголовок раздела</p>
      <p className="core-type-paragraph-l">Paragraph / L / SemiBold — Основное действие</p>
      <p className="core-type-paragraph-s-medium">Paragraph / S / Medium — Имя участника</p>
      <p className="core-type-paragraph-s">Paragraph / S / Regular — Текст сообщения в Collapse</p>
      <p className="core-type-caption-l">Caption / L / Regular — Вспомогательный текст</p>
      <p className="core-type-caption-m">Caption / M / Medium — 12:32</p>
    </div>
  }

  if (section === 'effects') {
    return <div className="core-story core-story__effects">
      <article className="core-effect-shadow"><strong>Effects / Shadows / 02</strong><span>Popup, modal, floating surface</span></article>
      <article className="core-effect-blur"><strong>Blur / Background / Default</strong><span>64 px</span></article>
      <article className="core-effect-blur core-effect-blur--accent"><strong>Blur / Background / Accent</strong><span>128 px</span></article>
    </div>
  }

  if (section === 'dimensions') {
    return <div className="core-story core-story__dimensions">
      <section><h3>Spacing</h3>{spacing.map(({ name, token }) => <div className="core-space" key={token}><code>{name}</code><span style={{ width: `var(${token})` }} /></div>)}</section>
      <section><h3>Radius</h3><div className="core-radius-row"><span className="core-radius-squircle">16</span><span className="core-radius-control">24</span><span className="core-radius-container">32</span><span className="core-radius-full">Full</span></div><h3>Border width</h3><div className="core-border-row"><span>1</span><span>1.5</span><span>2</span><span>2.5</span></div></section>
    </div>
  }

  if (section === 'layouts') {
    return <div className="core-story core-layout-demo"><aside>Rail</aside><nav>List</nav><main><strong>Content</strong><div><span /><span /><span /></div></main></div>
  }

  return <div className="core-story core-story__motion"><div className="core-motion-dot" tabIndex={0} aria-label="Демонстрация transition" /><strong>Default transition · 160 ms</strong><span>Наведите курсор. Технический токен прототипа; значение Figma недоступно.</span></div>
}

const meta = {
  title: 'Core/Atoms',
  component: CorePreview,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CorePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = { args: { section: 'colors' } }
export const Typography: Story = { args: { section: 'typography' } }
export const SurfaceAndEffects: Story = { args: { section: 'effects' } }
export const SpacingRadiusAndBorderWidth: Story = { args: { section: 'dimensions' } }
export const Layouts: Story = { args: { section: 'layouts' } }
export const Animation: Story = { args: { section: 'animation' } }

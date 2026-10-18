import type { Preview } from '@storybook/react-vite'
import '../src/theme/tokens.css'
import '../src/styles.css'
import '../src/components/ui/ui.css'
import './preview.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    backgrounds: { default: 'collapse', values: [{ name: 'collapse', value: '#f9fafc' }] },
  },
}

export default preview

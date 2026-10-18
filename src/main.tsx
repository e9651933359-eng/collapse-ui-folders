import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyShellTheme, readShellTheme } from '@collapse/ui'
import '@collapse/ui/style.css'
import { App } from './App'

applyShellTheme(readShellTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

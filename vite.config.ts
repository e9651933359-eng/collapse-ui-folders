import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { collapseAssets } from '@collapse/ui/vite'

export default defineConfig({
  base: './',
  // Иллюстрации и фото библиотеки копируются в public/assets при запуске (в git не хранятся).
  plugins: [react(), collapseAssets()],
  // Один экземпляр React даже при локальной связке пакета (npm link / file:).
  resolve: { dedupe: ['react', 'react-dom', 'lucide-react'] },
})

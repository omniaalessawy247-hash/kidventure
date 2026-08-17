import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    force: true,
    hmr: true,
  },
  optimizeDeps: {
    force: true,
  },
  css: {
    devSourcemap: false,
  },
})
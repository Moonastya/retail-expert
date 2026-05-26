import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages: https://moonastya.github.io/retail-expert/
// Локально: npm run dev (base /)
// Сборка для Pages: npm run build:gh
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [vue()],
  server: {
    port: 5175,
    strictPort: false,
  },
})

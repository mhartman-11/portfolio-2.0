import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-2.0/',
  server: {
    port: 5173,
    host: true
  }
})

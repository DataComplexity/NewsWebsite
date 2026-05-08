import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/home': 'http://localhost:5500',
      '/topstories': 'http://localhost:5500',
      '/explore': 'http://localhost:5500',
      '/news': 'http://localhost:5500',
      '/auth': 'http://localhost:5500',
      '/stocks': 'http://localhost:5500',
      '/crypto': 'http://localhost:5500',
      '/weather': 'http://localhost:5500',
      '/currency': 'http://localhost:5500',
      '/guardian': 'http://localhost:5500',
      '/searchResults': 'http://localhost:5500',
      '/run': 'http://localhost:5500',
    }
  }
})

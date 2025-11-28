import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    fs: {
      allow: ['..', './public']
    },
    middlewareMode: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

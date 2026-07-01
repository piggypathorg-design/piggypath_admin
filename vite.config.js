import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/piggypath_admin/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
})

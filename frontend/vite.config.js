import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Custom domain at root (e.g. yoursite.com) → base: '/'. For github.io/Climate-Simulator/ use base: '/Climate-Simulator/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})

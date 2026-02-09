import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages: site is at https://username.github.io/Climate-Simulator/ so base must be '/Climate-Simulator/'
export default defineConfig({
  plugins: [react()],
  base: '/Climate-Simulator/',
})

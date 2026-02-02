import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages repo site: base = '/Climate-Simulator/'. For user site (username.github.io) use base = '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})

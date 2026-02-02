import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages repo site: base = '/Climate-Simulator/'. For user site (username.github.io) use base = '/'.
export default defineConfig({
  plugins: [react()],
  // './' = relative paths (works for reinventinggreen.site at root). For github.io/Climate-Simulator use: VITE_BASE_PATH=/Climate-Simulator/ npm run build
  base: process.env.VITE_BASE_PATH ?? './',
})

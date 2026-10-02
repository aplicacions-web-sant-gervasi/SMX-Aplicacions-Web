import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: funciona a l'arrel o a un subdirectori de GitHub Pages.
// fs.allow: els continguts viuen a ../continguts, fora de l'arrel de Vite.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { fs: { allow: ['..'] } },
})

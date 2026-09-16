import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // El juego se publica en https://nbeltranmoreno.github.io/pokemon-al-ataque/
  base: '/pokemon-al-ataque/',
})

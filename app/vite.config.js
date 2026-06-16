import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    // הגדרת המגבלה ל-700 קילובייט
    chunkSizeWarningLimit: 700,
  },
  plugins: [react()],
  base: mode === 'deploy' ? '/BringIt' : '',
})) 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Aapki GitHub repository ka jo sahi naam hai wo yahan likhein (bina spaces ke)
  base: "/the-ledger-guys/", 
})
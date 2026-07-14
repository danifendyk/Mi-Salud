import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MI SALUD',
        short_name: 'MI SALUD',
        description: 'Tu plan personal de comidas, gimnasio y progreso.',
        theme_color: '#0c1e1b',
        background_color: '#f3f6ef',
        display: 'standalone',
        lang: 'es',
        icons: [{ src: 'app-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
    }),
  ],
})

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
      workbox: {
        // The Spline scene is online-only, so keep its large renderer out of the initial PWA download.
        globIgnores: [
          '**/assets/SplineDecoration-*.js',
          '**/assets/physics-*.js',
          '**/assets/opentype-*.js',
          '**/assets/gaussian-splat-compression-*.js',
          '**/assets/ui-*.js',
          '**/assets/navmesh-*.js',
          '**/assets/boolean-*.js',
          '**/assets/process-*.js',
          '**/assets/howler-*.js',
        ],
      },
      manifest: {
        name: 'MI SALUD',
        short_name: 'MI SALUD',
        description: 'Tu plan personal de comidas, gimnasio y progreso.',
        theme_color: '#0c1e1b',
        background_color: '#f3f6ef',
        display: 'standalone',
        lang: 'es',
        icons: [
          { src: 'app-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'app-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})

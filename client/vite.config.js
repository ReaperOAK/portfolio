import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'vendor_three'
            if (id.includes('framer-motion')) return 'vendor_framer'
            if (id.includes('lucide-react')) return 'vendor_icons'
            if (id.includes('zustand')) return 'vendor_state'
            // fallback for other node_modules
            return 'vendor_misc'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}))

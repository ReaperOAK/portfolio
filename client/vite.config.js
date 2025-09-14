import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  build: {
    // emit a manifest mapping source files to output files so we can runtime-preload chunks
    manifest: true,
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
      ,
      // mark three as external so rollup doesn't include it in bundles
      external: ['three']
    }
    ,
    // Treat three as external to avoid bundling the big runtime library
    commonjsOptions: {
      ignoreTryCatch: []
    }
  },
  // Prevent Vite dev pre-bundling for three (we load via import map / CDN at runtime)
  optimizeDeps: {
    exclude: ['three']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}))

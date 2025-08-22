import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Make the visualizer plugin optional so missing dependency doesn't break dev.
export default defineConfig(async () => {
  const analyze = !!process.env.ANALYZE
  const extraPlugins = []

  if (analyze) {
    try {
      const { visualizer } = await import('rollup-plugin-visualizer')
      extraPlugins.push(
        visualizer({ filename: 'dist/bundle-stats.html', gzipSize: true, brotliSize: true })
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('ANALYZE flag set but rollup-plugin-visualizer not installed. Install with: npm i -D rollup-plugin-visualizer')
    }
  }

  return {
    plugins: [
      react(),
      ...extraPlugins
    ],
    build: {
      chunkSizeWarningLimit: 700, // temporarily raise after splitting
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom']
          }
        }
      }
    }
  }
})

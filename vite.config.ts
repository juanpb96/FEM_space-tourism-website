import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ 
  base: '/FEM_space-tourism-website/',
  plugins: [react()],
  build: { assetsDir: '' },
  css: {
    preprocessorOptions: {
      scss: {
        // Vite 6 uses the modern Sass API, which doesn't resolve imports from
        // the working directory anymore (e.g. `@use "src/styles/variables"`)
        loadPaths: [fileURLToPath(new URL('.', import.meta.url))],
      },
    },
  },
}));

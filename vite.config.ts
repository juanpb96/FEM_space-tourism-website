import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ 
  base: '/FEM_space-tourism-website/',
  plugins: [react()],
  build: { assetsDir: '' }
}));

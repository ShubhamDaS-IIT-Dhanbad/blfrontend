import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/url':'http://localhost:12000'
    }
  },
  plugins: [react()],
})

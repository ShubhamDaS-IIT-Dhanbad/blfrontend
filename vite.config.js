import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:12000'
    }
  },
  build: {
    outDir: 'dist', // Ensure the output directory is correctly specified
    rollupOptions: {
      // Ensure your entry point is specified correctly
      input: '/src/main.jsx'
    }
  }
});

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const port = process.env['PORT'] || 3000;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${port}`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://localhost:${port}`,
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/events': {
        target: 'http://localhost:3001', // Your backend server
        changeOrigin: true,
      },
      '/locations': {
        target: 'http://localhost:3001', // Proxy for locations
        changeOrigin: true,
      }
    }
  }
});

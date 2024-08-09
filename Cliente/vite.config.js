// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true
  },
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'),
  ],
  optimizeDeps: {
    exclude: ['jwt-decode']
  },
});

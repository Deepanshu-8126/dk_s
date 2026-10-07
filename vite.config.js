import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { uniqueDigitApiPlugin } from './server/vitePlugin.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    uniqueDigitApiPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
  define: {
    'import.meta.env.VITE_DEEPTREND_FEED_URL': JSON.stringify(process.env.DEEPTREND_FEED_URL || ''),
    'import.meta.env.VITE_PRODUCT_TREND_FEED_URL': JSON.stringify(process.env.PRODUCT_TREND_FEED_URL || ''),
    'import.meta.env.VITE_VIDEO_RENDERING_SERVICE_URL': JSON.stringify(process.env.VIDEO_RENDERING_SERVICE_URL || ''),
  },
});
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config';

const pwaConfig = {
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt'],
  workbox: {
    cleanupOutdatedCaches: true,
  },
  registerType: 'autoUpdate',
  manifest: {
    name: 'Name of your app',
    short_name: 'Short name of your app',
    description: 'Description of your app',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'logo192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  // plugins: [react(), VitePWA(pwaConfig)],
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => val.replace(/^~/, ''),
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

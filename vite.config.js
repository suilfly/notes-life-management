import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';

export default defineConfig({
  base: './',
  plugins: [react(), reactScopedCssPlugin()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: process.cwd() + '/src',
      },
    ],
  },
});

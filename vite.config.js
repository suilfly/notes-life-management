import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';

export default defineConfig({
  plugins: [react(), reactScopedCssPlugin()],
});

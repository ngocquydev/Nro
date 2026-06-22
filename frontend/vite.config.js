import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  envDir: '../',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // ... (giữ nguyên các alias khác của bạn)
      '@styles': path.resolve(__dirname, 'src/_styles'),
      '@images': path.resolve(__dirname, 'src/assets/Images'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@contans': path.resolve(__dirname, 'src/contans'),
      '@config': path.resolve(__dirname, 'src/_config'),
      '@util': path.resolve(__dirname, 'src/util'),
    },
  },
});

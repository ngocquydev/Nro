import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // Thêm cả recharts và react-is vào đây để Vite biên dịch lại
    include: ['recharts', 'react-is'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routers': path.resolve(__dirname, './src/routers'),
      '@styles': path.resolve(__dirname, 'src/_styles'),
      '@hook': path.resolve(__dirname, 'src/hook'),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: "all",
    // CẤU HÌNH PROXY TẠI ĐÂY
    proxy: {
      "/api": {
        target: "http://backend:3000", // Gọi đến service 'backend' trong docker-compose
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/_styles"),
      "@images": path.resolve(__dirname, "src/assets/Images"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@page": path.resolve(__dirname, "src/page"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contans": path.resolve(__dirname, "src/contans"),
      "@config": path.resolve(__dirname, "src/config"),
      "@util": path.resolve(__dirname, "src/util"),
    },
  },
});

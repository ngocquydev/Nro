import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
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

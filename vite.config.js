import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/roshan": {
        target: "https://harf.roshan-ai.ir",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/roshan/, ""),
      },
    },
  },
});

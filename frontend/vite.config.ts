import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:1080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

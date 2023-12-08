/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT = 4000 } = process.env;

export default defineConfig({
  plugins: [react({
      jsxRuntime: 'classic' // Add this line
    }
  )],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
    server: {
      port: 4000, // Example port, use the port your application is configured for
    },
    outDir: '../dist/app',
  },
});

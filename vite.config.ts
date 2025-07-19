/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/grams_converter/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
});

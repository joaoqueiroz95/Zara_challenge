import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "common",
        replacement: resolve(__dirname, "src/common")
      },
      { find: "/@", replacement: resolve(__dirname, "src") }
    ]
  },
  server: {
    port: 3001
  },
  plugins: [react()]
});

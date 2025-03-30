/** @format */

import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "nonadsp",
      project: "javascript-react",
    }),
    sentryVitePlugin({
      org: "nonadsp",
      project: "javascript-react",
    }),
  ],

  optimizeDeps: {
    exclude: ["lucide-react"],
  },

  build: {
    sourcemap: true,
  },
});

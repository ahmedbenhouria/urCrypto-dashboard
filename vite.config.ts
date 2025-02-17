import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "@svgr/rollup";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), svgr({
    exportType: "named",
    ref: true,
    svgo: false,
    dimensions: false,
    typescript: true,
  }),
]
});
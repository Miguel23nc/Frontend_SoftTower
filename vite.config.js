import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  cacheDir: ".vite-cache",
  build: {
    outDir: "dist",
  },
  base: "/", // <- Asegura que las rutas sean absolutas
});

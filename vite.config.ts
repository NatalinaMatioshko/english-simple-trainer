import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the app under /english-simple-trainer/; dev server and e2e stay at /
  base: command === "build" ? "/english-simple-trainer/" : "/",
}));

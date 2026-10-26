import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base defaults to "/" (Vercel, dev server, e2e).
// GitHub Pages builds pass --base=/english-simple-trainer/ (see deploy.yml and predeploy).
export default defineConfig({
  plugins: [react()],
});

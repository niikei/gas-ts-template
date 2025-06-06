import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

// Custom plugin to copy the GAS project manifest to the output directory
const copyAppsscriptJson = () => ({
  name: "copy-appsscript-json",
  writeBundle() {
    const src = path.resolve(__dirname, "appsscript.json");
    const destDir = path.resolve(__dirname, "dist");
    const dest = path.join(destDir, "appsscript.json");

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
    fs.copyFileSync(src, dest);
    console.log("✅ appsscript.json has been copied to dist folder");
  },
});

// --- Vite Configuration ---
export default defineConfig({
  plugins: [
    // Enables TypeScript support with Rollup
    typescript({
      tsconfig: "./tsconfig.json",
    }),

    // Copies appsscript.json into dist/ after build
    copyAppsscriptJson(),
  ],
  build: {
    target: "esnext", // Use modern JS syntax (e.g. async/await, const, etc.)
    sourcemap: true, // Generate source maps for easier debugging in GAS
    minify: false, // Prevent minification to retain function names for GAS globalThis
    emptyOutDir: true, // Clear the dist directory before each build

    rollupOptions: {
      input: "src/main.ts", // Entry point of your GAS script
      output: {
        dir: "dist", // Output directory
        entryFileNames: "main.gs", // Output file name
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows '@' to refer to the src/ directory
    },
  },
});

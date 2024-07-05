import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
// @@template
import wasmPack from "vite-plugin-wasm-pack";
// @@rust
// import wasmPack from "vite-plugin-wasm-pack";
// @@normal

export default defineConfig({
  // @@template
  worker: { format: "es" },
  plugins: [sveltekit(), wasmPack(["../rust_backend"], [])],
  optimizeDeps: { exclude: ["pyodide"] },
  // @@rust
  // worker: { format: "es" },
  // plugins: [sveltekit(), wasmPack(["../rust_backend"], [])],
  // @@python
  // worker: { format: "es" },
  // plugins: [sveltekit()],
  // optimizeDeps: { exclude: ["pyodide"] },
  // @@none
  // plugins: [sveltekit()],
  // @@normal
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});

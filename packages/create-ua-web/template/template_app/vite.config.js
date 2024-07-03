"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("@sveltejs/kit/vite");
const config_1 = require("vitest/config");
const vite_plugin_wasm_pack_1 = __importDefault(require("vite-plugin-wasm-pack"));
exports.default = (0, config_1.defineConfig)({
    worker: { format: "es" },
    plugins: [(0, vite_1.sveltekit)(), (0, vite_plugin_wasm_pack_1.default)(["../rust_backend"], [])],
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    optimizeDeps: { exclude: ["pyodide"] },
});

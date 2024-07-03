"use strict";
// This file has global state that can be used anywhere in the app, without plumbing props
Object.defineProperty(exports, "__esModule", { value: true });
exports.mode = exports.isLoaded = exports.backend = exports.map = void 0;
const store_1 = require("svelte/store");
// Using the MapLibre map directly isn't needed often; try to use
// svelte-maplibre components inside the "map" slot
exports.map = (0, store_1.writable)(null);
// TODO Does this need to be a store?
// This is the way to call the Rust backend
exports.backend = (0, store_1.writable)(null);
// Indicates the backend has a file loaded and is ready
exports.isLoaded = (0, store_1.writable)(false);
exports.mode = (0, store_1.writable)({ kind: "title" });

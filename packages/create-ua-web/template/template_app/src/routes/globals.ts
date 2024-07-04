// This file has global state that can be used anywhere in the app, without plumbing props

import type { Map } from "maplibre-gl";
import { writable, type Writable } from "svelte/store";
import * as Comlink from "comlink";
// @@start template
import { type RustBackend } from "./rust_worker";
import { type PythonBackend } from "./python_worker";
// @@end template
// @@start rust
// import { type RustBackend } from "./rust_worker";
// @@end rust
// @@start python
// import { type PythonBackend } from "./python_worker";
// @@end python

// Using the MapLibre map directly isn't needed often; try to use
// svelte-maplibre components inside the "map" slot
export const map: Writable<Map | null> = writable(null);

// This is the way to call the backend
// @@start template
export const rustBackend: Writable<Comlink.Remote<RustBackend> | null> =
  writable(null);
export const pythonBackend: Writable<Comlink.Remote<PythonBackend> | null> =
  writable(null);
// Indicates the backend has a file loaded and is ready
export const rustIsLoaded = writable(false);
export const pythonIsLoaded = writable(false);
// @@end template
// @@start rust
// export const rustBackend: Writable<Comlink.Remote<RustBackend> | null> = writable(null);
// // Indicates the backend has a file loaded and is ready
// export const rustIsLoaded = writable(false);
// @@end rust
// @@start python
// export const pythonBackend: Writable<Comlink.Remote<PythonBackend> | null> = writable(null);
// // Indicates the backend has a file loaded and is ready
// export const pythonIsLoaded = writable(false);
// @@end python

// Your app should be organized into distinct modes (think of as distinct pages
// of a site, sharing the same layout). These can have parameters by adding
// fields to each case.
export type Mode = { kind: "title" } | { kind: "triangle" };
export const mode: Writable<Mode> = writable({ kind: "title" });

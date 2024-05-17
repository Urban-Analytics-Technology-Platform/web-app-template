// This file has global state that can be used anywhere in the app, without plumbing props

import type { Map } from "maplibre-gl";
import { writable, type Writable } from "svelte/store";
import * as Comlink from "comlink";
import { type Backend } from "./worker";

// Using the MapLibre map directly isn't needed often; try to use
// svelte-maplibre components inside the "map" slot
export let map: Writable<Map | null> = writable(null);

// TODO Does this need to be a store?
// This is the way to call the Rust backend
export let backend: Writable<Comlink.Remote<Backend> | null> = writable(null);
// Indicates the backend has a file loaded and is ready
export let isLoaded = writable(false);

// Your app should be organized into distinct modes (think of as distinct pages
// of a site, sharing the same layout). These can have parameters by adding
// fields to each case.
export type Mode = { kind: "title" } | { kind: "triangle" };
export let mode: Writable<Mode> = writable({ kind: "title" });

import type { Map } from 'maplibre-gl';
import { writable, type Writable } from 'svelte/store';
import * as Comlink from 'comlink';
import { type Backend } from './worker';

export let map: Writable<Map | null> = writable(null);

// TODO Does this need to be a store?
export let backend: Writable<Comlink.Remote<Backend> | null> = writable(null);
// Indicates the backend is ready
export let isLoaded = writable(false);

export type Mode = { kind: 'title' } | { kind: 'triangle' };
export let mode: Writable<Mode> = writable({ kind: 'title' });

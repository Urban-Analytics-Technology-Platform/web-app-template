import { writable, type Writable } from "svelte/store";

export { default as Layout } from "./Layout.svelte";
export { default as SplitComponent } from "./SplitComponent.svelte";

export let sidebarContents: Writable<HTMLDivElement | null> = writable(null);
export let mapContents: Writable<HTMLDivElement | null> = writable(null);

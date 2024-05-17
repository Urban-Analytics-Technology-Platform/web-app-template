# UA web template

This repo contains 

- A set of Svelte components for building Urban Analytics applications
- An app template for getting started with these applications
- A sample Rust backend

There are some pnpm commands for making it easier to work with both 

```
    pnpm build_components # Build the component library
    pnpm dev_components # Run the component dev server
    pnpm dev_app  # Run the app template
```

## Developer guide

This section is intended for those working on this repo, not the users (who will ultimately create their own repo using this template).

To get started, you'll need:

- [pnpm](https://pnpm.io/installation)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

The development workflow:

- When anything in the component library changes, `pnpm build_components` from the root directory
- When any dependency is added to the template app, `cd template_app; pnpm i`
- When the Rust backend code changes, `cd template_app; pnpm wasm`
- To run the template app locally (which'll auto-reload any Svelte/TS changes within), `cd template; pnpm dev`

The repository structure:

- `ua_components`: reusable Svelte components for Urban Analytics apps
  - This is set up as a SvelteKit project in library mode. `routes` (the demo site associated with the library) is currently unused, but could be used to demonstrate the components
- `template_app`: an example app that can be copied and modified
  - This is a SvelteKit app using the static adaptor -- it builds to a set of statically hosted files, with no backend server.
  - It uses [svelte-maplibre](https://github.com/dimfeld/svelte-maplibre/) for declaratively managing the map
  - It includes a "backend" that's compiled to WASM and run locally in the browser. The WASM code runs in a web worker (off the main browser thread), and all interaction is done through async calls using [Comlink](https://github.com/GoogleChromeLabs/comlink).
- `rust_backend`: an example Rust backend that can be copied and modified
  - It contains useful setup for a WASM environment and an example of a long-running blocking computation

## User guide

TODO:

- explain initial setup (running an npm script, ultimately)
- basics of TS and Svelte
- how to do maplibre stuff (point to <https://svelte-maplibre.vercel.app/>)
- how to organize the app into Modes
- how to add and use a new Rust backend method

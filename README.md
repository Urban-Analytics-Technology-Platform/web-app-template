# UA web template

This repo contains several packages:

- `@uatp/components`: A library providing a set of Svelte components for building Urban Analytics web applications
- `@uatp/template`: A template which can be used as a starting point for new web apps
  - The sample app is deployed at <https://urban-analytics-technology-platform.github.io/web-app-template/>
  - The app comes with sample Rust and Python 'backends' which can be used with the app template
- `@uatp/create-web`: A script which generates a new web app for you using the template


## User guide

If you're reading this because you want to _use_ the web template, i.e. make a new app according to what's here, this section is for you.

### Getting started

Firstly, make sure you have both [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [`pnpm`](https://pnpm.io/installation) installed.
(You will need it to work on your web app anyway.)

```bash
npm create @uatp/web@latest
```

### Working with your new app

TODO

- basics of TS and Svelte, how to preview and build your app
- how to do maplibre stuff (point to <https://svelte-maplibre.vercel.app/>)
- how to organize the app into Modes
- how to add and use a new Rust backend method


## Developer guide

If you are looking to _develop_ the UA web template, i.e. make changes to the components, the app template, or the template generation script, this section is for you.

### Overview of repository structure

- `packages/components`: reusable Svelte components for Urban Analytics apps
  - This is set up as a SvelteKit project in library mode. `routes` (the demo site associated with the library) is currently unused, but could be used to demonstrate the components
- `packages/create-web`: a script which generates a new web app in a user-specified location from the template
- `packages/create-web/template/web`: the template itself
  - This directory contains a SvelteKit app using the static adaptor -- it builds to a set of statically hosted files, with no backend server. It uses [svelte-maplibre](https://github.com/dimfeld/svelte-maplibre/) for declaratively managing the map.
  - At the same level as this directory are `rust_backend` and `python_backend`, which are two "backends" that are compiled to WASM and run locally in the browser. The WASM code runs in a web worker (off the main browser thread), and all interaction is done through async calls using [Comlink](https://github.com/GoogleChromeLabs/comlink).

### Initial setup

To get started, you'll need:

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [pnpm](https://pnpm.io/installation)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

The first time you clone this repository, run from the top-level directory:

```bash
pnpm install
pnpm --filter @uatp/components build
pnpm --filter uatp_template wasm
pnpm --filter uatp_template build
```

The `--filter ...` flag is used to run a command in a specific package.
This allows you to run the pnpm commands from anywhere inside the repository.
If you are already in the same directory as the package you want to run a command in, you can omit the `--filter ...` flag.

In each of the subsequent sections, it is assumed that you are in the directory of the corresponding packages.
If you are not, you can always run the command with the `--filter` flag.

### `@uatp/components` library

If the dependencies change: `pnpm install`

If the library changes: `pnpm build`

Note that you have to build the library before you can see changes in the template app.

### `@uatp/template` template app

If the dependencies change: `pnpm install`

If any code in the Rust backend is changed: `pnpm rust`.
(You will have to restart your dev server if it's running.)

If any code in the Python backend is changed: `pnpm python`.

To run the template app locally (which'll auto-reload any Svelte/TS changes within, but not Rust changes): `pnpm dev`

### `@uatp/create-web` script

If the dependencies change: `pnpm install`

To run the script: `npm exec .`

(There's no build step for this script.)

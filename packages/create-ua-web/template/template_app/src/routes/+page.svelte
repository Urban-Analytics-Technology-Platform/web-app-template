<script lang="ts">
  import {
    Layout,
    mapContents,
    sidebarContents,
  } from "ua-components/two_column_layout";
  import { MapLibre } from "svelte-maplibre";
  import TitleMode from "./TitleMode.svelte";
  import TriangleMode from "./TriangleMode.svelte";
  // @@start template
  import { map as mapStore, rustBackend, pythonBackend, mode } from "./globals";
  // @@end template
  // @@start rust
  // import { map as mapStore, rustBackend, mode } from "./globals";
  // @@end rust
  // @@start python
  // import { map as mapStore, pythonBackend, mode } from "./globals";
  // @@end python

  import * as Comlink from "comlink";
  import { onMount } from "svelte";
  import type { Map } from "maplibre-gl";
  // @@start template
  import rustWorkerWrapper from "./rust_worker?worker";
  import { type RustBackend } from "./rust_worker";
  import pythonWorkerWrapper from "./python_worker?worker";
  import { type PythonBackend } from "./python_worker";
  // @@end template
  // @@start rust
  // import workerWrapper from "./rust_worker?worker";
  // import { type Backend } from "./rust_worker";
  // @@end rust
  // @@start python
  // import workerWrapper from "./python_worker?worker";
  // import { type Backend } from "./python_worker";
  // @@end python

  // Everything in this script section is boilerplate; you can ignore it

  // TODO Refactor this part if possible
  onMount(async () => {
    // If you get "import declarations may only appear at top level of a
    // module", then you need a newer browser.
    // https://caniuse.com/mdn-api_worker_worker_ecmascript_modules
    //
    // In Firefox 112, go to about:config and enable dom.workers.modules.enabled
    //
    // Note this should work fine in older browsers when doing 'npm run build'.
    // It's only a problem during local dev mode.
    interface RustWorkerConstructor {
      new (): RustBackend;
    }
    const MyRustWorker: Comlink.Remote<RustWorkerConstructor> = Comlink.wrap(
      new rustWorkerWrapper(),
    );
    let rustBackendWorker = await new MyRustWorker();
    rustBackend.set(rustBackendWorker);

    interface PythonWorkerConstructor {
      new (): PythonBackend;
    }
    const MyPythonWorker: Comlink.Remote<PythonWorkerConstructor> =
      Comlink.wrap(new pythonWorkerWrapper());
    let pythonBackendWorker = await new MyPythonWorker();
    pythonBackend.set(pythonBackendWorker);
  });

  let map: Map | undefined = undefined;
  $: if (map) {
    mapStore.set(map);
  }

  let sidebarDiv: HTMLDivElement;
  let mapDiv: HTMLDivElement;
  $: if (sidebarDiv && $sidebarContents) {
    sidebarDiv.innerHTML = "";
    sidebarDiv.appendChild($sidebarContents);
  }
  $: if (mapDiv && $mapContents) {
    mapDiv.innerHTML = "";
    mapDiv.appendChild($mapContents);
  }
</script>

<Layout>
  <div slot="left">
    <h1>App title</h1>
    <div bind:this={sidebarDiv}></div>
  </div>
  <div slot="main" style="position:relative; width: 100%; height: 100vh;">
    <MapLibre
      style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      standardControls
      hash
      bind:map
    >
      <div bind:this={mapDiv}></div>

      <!-- When you define new modes, you have to wire them up here -->
      {#if $mode.kind == "title"}
        <TitleMode />
      {:else if $mode.kind == "triangle"}
        <TriangleMode />
      {/if}
    </MapLibre>
  </div>
</Layout>

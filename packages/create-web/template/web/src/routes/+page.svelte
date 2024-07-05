<script lang="ts">
  import {
    Layout,
    mapContents,
    sidebarContents,
  } from "@uatp/components/two_column_layout";
  import { MapLibre } from "svelte-maplibre";
  import TitleMode from "./TitleMode.svelte";
  import ColourMode from "./ColourMode.svelte";
  import BubbleChart from "$lib/charts/BubbleChart.svelte";
  import BarChart from "$lib/charts/BarChart.svelte";
  import ApiBarChart from "$lib/charts/ApiBarChart.svelte";

  import { onMount } from "svelte";
  import type { Map } from "maplibre-gl";
  import * as Comlink from "comlink";

  // @@template
  import { map as mapStore, rustBackend, pythonBackend, mode } from "./globals";
  import rustWorkerWrapper from "$lib/rust_worker?worker";
  import { type RustBackend } from "$lib/rust_worker";
  import pythonWorkerWrapper from "$lib/python_worker?worker";
  import { type PythonBackend } from "$lib/python_worker";
  // @@rust
  // import { map as mapStore, rustBackend, mode } from "./globals";
  // import rustWorkerWrapper from "$lib/rust_worker?worker";
  // import { type RustBackend } from "$lib/rust_worker";
  // @@python
  // import { map as mapStore, pythonBackend, mode } from "./globals";
  // import pythonWorkerWrapper from "$lib/python_worker?worker";
  // import { type PythonBackend } from "$lib/python_worker";
  // @@none
  // import { map as mapStore, mode } from "./globals";
  // @@normal

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
    // @@template
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
    // @@rust
    // interface RustWorkerConstructor {
    //   new (): RustBackend;
    // }
    // const MyRustWorker: Comlink.Remote<RustWorkerConstructor> = Comlink.wrap(
    //   new rustWorkerWrapper(),
    // );
    // let rustBackendWorker = await new MyRustWorker();
    // rustBackend.set(rustBackendWorker);
    // @@python
    // interface PythonWorkerConstructor {
    //   new (): PythonBackend;
    // }
    // const MyPythonWorker: Comlink.Remote<PythonWorkerConstructor> =
    //   Comlink.wrap(new pythonWorkerWrapper());
    // let pythonBackendWorker = await new MyPythonWorker();
    // pythonBackend.set(pythonBackendWorker);
    // @@normal
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
    <h1>A new title!</h1>
    <div bind:this={sidebarDiv}></div>
    <div><BarChart title="A bar chart" /></div>
    <div><ApiBarChart title="A bar chart with data from an API" /></div>
    <div><BubbleChart title="A bubble chart with zoom" /></div>
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
      {:else if $mode.kind == "colour"}
        <ColourMode />
      {/if}
    </MapLibre>
  </div>
</Layout>

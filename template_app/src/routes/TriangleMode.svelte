<script lang="ts">
  import type { FeatureCollection } from "geojson";
  import { SplitComponent } from "ua-components/two_column_layout";
  import { map, mode, backend, isLoaded } from "./globals";
  import { DefaultMarker, GeoJSON, FillLayer } from "svelte-maplibre";

  // This is an example mode where the user can drag a marker around and change distance.

  let center: [number, number] = [-122.2993, 47.4464];
  let distanceMeters = 10000;

  let gj: FeatureCollection = { type: "FeatureCollection", features: [] };

  // Every time any of these two variables change, call the Rust backend
  // (asynchronously) and display something new.
  $: recalculate(center, distanceMeters);
  async function recalculate(_a: [number, number], _b: number) {
    gj.features = [
      await $backend!.exampleCall({
        center,
        distanceMeters,
      }),
    ];
    gj = gj;
  }

  async function resetMode() {
    await $backend!.unset();
    $isLoaded = false;
    $mode = { kind: "title" };
  }
</script>

<SplitComponent>
  <div slot="sidebar">
    <button on:click={resetMode}>Back to title screen</button>

    <div>
      <label>
        Distance (meters): {distanceMeters}
        <input type="range" min="0" max="100000" bind:value={distanceMeters} />
      </label>
    </div>
  </div>

  <div slot="map">
    <DefaultMarker bind:lngLat={center} draggable />

    <GeoJSON data={gj}>
      <FillLayer paint={{ "fill-color": "red", "fill-opacity": 0.5 }} />
    </GeoJSON>
  </div>
</SplitComponent>

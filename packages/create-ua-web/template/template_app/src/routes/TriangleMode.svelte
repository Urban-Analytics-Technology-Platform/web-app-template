<script lang="ts">
  import type { FeatureCollection } from "geojson";
  import { SplitComponent } from "ua-components/two_column_layout";
  import { mode, rustBackend, rustIsLoaded, pythonBackend } from "./globals";
  import { GeoJSON, FillLayer, LineLayer } from "svelte-maplibre";

  let gj: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  let fileInput: HTMLInputElement;
  // @@start template
  async function colourWithRust() {
    try {
      let file = fileInput.files![0];
      if (!file) {
        throw new Error("Please select a file first.");
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("loadend", async () => {
        if (!reader.result) {
          throw new Error("Couldn't read the file.");
        }
        await $rustBackend!.initialise();
        const new_gj = await $rustBackend!.addColours(
          JSON.parse(reader.result),
        );
        gj = new_gj;
      });
    } catch (err) {
      window.alert(`Couldn't open this file: ${err}`);
    }
  }
  async function colourWithPython() {
    try {
      let file = fileInput.files![0];
      if (!file) {
        throw new Error("Please select a file first.");
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("loadend", async () => {
        if (!reader.result) {
          throw new Error("Couldn't read the file.");
        }
        const loaded = await $pythonBackend!.isLoaded();
        if (!loaded) {
          await $pythonBackend!.initialise(window.location.pathname);
        }
        const new_gj = await $pythonBackend!.addColours(
          JSON.parse(reader.result as string),
        );
        console.log("new_gj", new_gj);
        gj = new_gj;
      });
    } catch (err) {
      window.alert(`Couldn't open this file: ${err}`);
    }
  }
  // @@end template
  // @@start rust
  // async function colourWithRust() {
  //   try {
  //     let file = fileInput.files![0];
  //     if (!file) {
  //         window.alert("Please select a file first.");
  //         return;
  //     }
  //     const reader = new FileReader();
  //     reader.readAsText(file);
  //     reader.addEventListener("load", async () => {
  //         await $rustBackend!.initialise();
  //         const new_gj = await $rustBackend!.addColours(JSON.parse(reader.result));
  //         gj = new_gj;
  //     });
  //   } catch (err) {
  //     window.alert(`Couldn't open this file: ${err}`);
  //   }
  // }
  // @@end rust
  // @@start python
  // @@end python

  async function resetMode() {
    await $rustBackend!.unset();
    $rustIsLoaded = false;
    $mode = { kind: "title" };
  }
</script>

<SplitComponent>
  <div slot="sidebar">
    <p>Upload a GeoJSON feature collection here:</p>

    <p><input bind:this={fileInput} type="file" /></p>

    <p>
      (Don't have one to hand? You can <a
        href="https://ckan.publishing.service.gov.uk/dataset/westminster-parliamentary-constituencies-july-2024-boundaries-uk-bsc"
        target="_blank">download one here</a
      >.)
    </p>

    <p>and colour it with...</p>

    <p>
      <button on:click={() => colourWithRust()}>Rust! 🦀</button>
      <button on:click={() => colourWithPython()}>Python! 🐍</button>
    </p>

    <p><button on:click={resetMode}>Back to Title Mode</button></p>
  </div>

  <div slot="map">
    <GeoJSON data={gj}>
      <FillLayer
        paint={{ "fill-color": ["get", "color"], "fill-opacity": 0.5 }}
      />

      <LineLayer paint={{ "line-color": "black", "line-width": 1 }} />
    </GeoJSON>
  </div>
</SplitComponent>

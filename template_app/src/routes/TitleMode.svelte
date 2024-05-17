<script lang="ts">
  import { SimpleComponent, Loading } from "ua-components";
  import { SplitComponent } from "ua-components/two_column_layout";
  import { backend, mode, isLoaded } from "./globals";
  import * as Comlink from "comlink";

  // This page has an example of picking a file and passing it to the Rust
  // backend. That setup usually takes a long time (in real cases), so
  // there's a loading screen.

  let loading: string[] = [];

  let fileInput: HTMLInputElement;
  async function loadFile(e: Event) {
    try {
      let file = fileInput.files![0];
      loading = [`Loading input from ${file.name}`];
      let buffer = await file.arrayBuffer();
      await $backend!.loadInput(
        new Uint8Array(buffer),
        Comlink.proxy(progressCb),
      );
      $isLoaded = true;
      $mode = { kind: "triangle" };
    } catch (err) {
      window.alert(`Couldn't open this file: ${err}`);
    }
    loading = [];
  }

  function progressCb(msg: string) {
    loading = [...loading, msg];
  }
</script>

<SplitComponent>
  <div slot="sidebar">
    <SimpleComponent name="Stu" />

    <div>
      <label>
        Load some large file to start:
        <input bind:this={fileInput} on:change={loadFile} type="file" />
      </label>
    </div>
  </div>
  <div slot="map"></div>
</SplitComponent>

<Loading {loading} />

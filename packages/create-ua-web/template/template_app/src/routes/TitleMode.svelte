<script lang="ts">
  import { SimpleComponent, Loading } from "ua-components";
  import { SplitComponent } from "ua-components/two_column_layout";
  // @@start template
  import {
    rustBackend,
    pythonBackend,
    mode,
    rustIsLoaded,
    pythonIsLoaded,
  } from "./globals";
  // @@end template
  // @@start rust
  // import { rustBackend, mode, rustIsLoaded } from "./globals";
  // @@end rust
  // @@start python
  // import { pythonBackend, mode, pythonIsLoaded } from "./globals";
  // @@end python
  import * as Comlink from "comlink";

  // This page has an example of picking a file and passing it to the Rust
  // backend. That setup usually takes a long time (in real cases), so
  // there's a loading screen.

  let loading: string[] = [];

  function progressCb(msg: string) {
    loading = [...loading, msg];
  }
</script>

<SplitComponent>
  <div slot="sidebar">
    <SimpleComponent name="Stu" />

    <button on:click={() => ($mode = { kind: "triangle" })}
      >Enter Triangle Mode</button
    >
  </div>
  <div slot="map"></div>
</SplitComponent>

<Loading {loading} />

<script lang="ts">
  import { SimpleComponent } from "@uatp/components";
  import { SplitComponent } from "@uatp/components/two_column_layout";
  import { mode } from "./globals";
</script>

<SplitComponent>
  <div slot="sidebar">
    <SimpleComponent name="Stu" />

    <button on:click={() => ($mode = { kind: "colour" })}
      >Enter Colour Mode</button
    >
  </div>
  <div slot="map"></div>
</SplitComponent>

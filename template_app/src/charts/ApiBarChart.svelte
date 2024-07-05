<script lang="ts">
  // Example from: https://www.chartjs.org/docs/latest/getting-started/usage.html
  import { Chart } from "chart.js/auto";
  import { getAquisitionsByYear } from "./api";
  import { onMount } from "svelte";
  export let title: string;

  let data: any;
  let canvas: HTMLCanvasElement;

  onMount(async () => {
    data = await getAquisitionsByYear();
    const options: any = {
      type: "bar",
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      data: {
        labels: data.map((row: any) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row: any) => row.count),
          },
        ],
      },
    };
    new Chart(canvas.getContext("2d")!, options);
  });
</script>

<!--
Best practice aims to use actions (see: https://learn.svelte.dev/tutorial/actions)
but since the API call will not provide the data immediately, we use `onMount` in the
TypeScript above and `bind:this{canvas}` below. `bind:this{canvas}` is preferable to
using `id` as another component could have the same named `id`.

See the non-API ./BarChart.svelte example demonstrating the use of
actions instead.
-->
<h3>{title}</h3>
<canvas bind:this={canvas} style="width: 100%; height: 200px;"></canvas>

<script lang="ts">
  // Example from: https://www.chartjs.org/docs/latest/getting-started/usage.html
  // and: https://www.chartjs.org/chartjs-plugin-zoom/latest/samples/drag/linear.html
  import { Chart, registerables } from "chart.js";
  import { getDimensions } from "./api";
  import { onMount } from "svelte";
  import zoomPlugin from "chartjs-plugin-zoom";

  export let title: string;

  let chartInstance;
  let canvas: HTMLCanvasElement;
  Chart.register(...registerables, zoomPlugin);

  onMount(async () => {
    // Get data
    const data = await getDimensions();

    // Sclaes config
    const scales = {
      x: {
        position: "bottom",
      },
      y: {
        position: "left",
      },
    };

    // Zoom options
    const zoomOptions = {
      zoom: {
        mode: "xy",
        drag: {
          enabled: true,
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          backgroundColor: "rgba(54, 162, 235, 0.3)",
        },
      },
    };

    // Combined chart config
    const config: any = {
      type: "bubble",
      data: {
        labels: data.map((x: any) => x.year),
        datasets: [
          {
            label: "Dimensions",
            data: data.map((row) => ({
              x: row.width,
              y: row.height,
              r: row.count,
            })),
            backgroundColor: "rgba(220, 50, 1, 0.4)",
          },
        ],
      },
      options: {
        scales: scales,
        plugins: {
          zoom: zoomOptions,
          title: {
            display: true,
            position: "bottom",
            text: (ctx: any) => "Zoom: " + zoomStatus(),
          },
        },
      },
    };
    const zoomStatus = () =>
      zoomOptions.zoom.drag.enabled ? "enabled" : "disabled";

    chartInstance = new Chart(canvas.getContext("2d")!, config);
  });
</script>

<h3>{title}</h3>
<canvas bind:this={canvas} style="width: 100%; height: 400px;"></canvas>

<script lang="ts">
  // Example from: https://www.chartjs.org/docs/latest/getting-started/usage.html
  // and: https://www.chartjs.org/chartjs-plugin-zoom/latest/samples/drag/linear.html
  import { Chart, registerables } from "chart.js";
  import { getDimensions } from "./api";
  import { onMount } from "svelte";
  import zoomPlugin from "chartjs-plugin-zoom";

  export let title: string;

  Chart.register(...registerables, zoomPlugin);
  let chartInstance;

  onMount(async () => {
    const data = await getDimensions();
    const scales = {
      x: {
        position: "top",
      },
      y: {
        position: "right",
      },
    };
    const options: any = {
      type: "bubble",
      data: {
        labels: data.map((x) => x.year),
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
      plugins: {
        scales: scales,
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            enabled: true,
            mode: "x",
            drag: true,
            onZoomComplete: ({ chart }) => {
              console.log('Zoom complete event triggered');
              const xAxis = chart.scales.x;
              const startValue = xAxis.getValueForPixel(xAxis.left);
              const endValue = xAxis.getValueForPixel(xAxis.right);
              console.log("Range subset selected:", startValue, endValue);
            },
          },
        },
      },
    };

    let ctx = (document.getElementById("myCanvas") as HTMLCanvasElement).getContext("2d")!
    chartInstance = new Chart(ctx, options);
  });
  // });
</script>

<h3>{title}</h3>
<canvas id="bubbleCanvas" style="width: 100%; height: 200px;"></canvas>

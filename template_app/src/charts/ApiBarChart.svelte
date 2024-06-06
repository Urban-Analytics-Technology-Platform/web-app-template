<script lang="ts">
  // Example from: https://www.chartjs.org/docs/latest/getting-started/usage.html
  import { Chart } from "chart.js/auto";
  import { getAquisitionsByYear } from "./api";
  import { onMount } from "svelte";
  export let title: string;
  let data: any;
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
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    };
    new Chart(document.getElementById("myCanvas").getContext("2d")!, options);
  });
</script>

<h3>{title}</h3>
<canvas id="myCanvas" style="width: 100%; height: 200px;"></canvas>

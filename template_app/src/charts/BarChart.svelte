<script lang="ts">
  import { Chart } from "chart.js/auto";

  export let title: string;

  function makeBarChart(canvas: HTMLCanvasElement) {
    const data: { year: number; count: number }[] = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    const options: any = {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: data.map((row) => row.count),
          },
        ],
      },
    };
    new Chart(canvas.getContext("2d")!, options);
  }
</script>

<h3>{title}</h3>
<canvas use:makeBarChart style="width: 100%; height: 200px;"></canvas>


<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';

  export let title: string;
  
  const data:{ year: number; count: number }[]  = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  let canvas: HTMLCanvasElement;

  const config: any = {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: data.map(row => row.count)
          }
        ]
      }
  };

  onMount(() => {
    const ctx = canvas.getContext('2d');
    new Chart(ctx!, config);
  });
</script>

<h3>{title}</h3>
<canvas bind:this={canvas}  style="width: 100%; height: 200px;"></canvas>
<!-- <canvas use:makeBarChart style="width: 100%; height: 300px;" /> -->

<style>
  canvas {
    max-width: 100%;
    height: auto;
  }
</style>

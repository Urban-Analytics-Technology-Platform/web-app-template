<script lang="ts">
	import { Layout, mapContents, sidebarContents } from 'ua-components/two_column_layout';
	import { MapLibre } from 'svelte-maplibre';
	import DemoMode from './DemoMode.svelte';

	let sidebarDiv: HTMLDivElement;
	let mapDiv: HTMLDivElement;
	$: if (sidebarDiv && $sidebarContents) {
		sidebarDiv.innerHTML = '';
		sidebarDiv.appendChild($sidebarContents);
	}
	$: if (mapDiv && $mapContents) {
		mapDiv.innerHTML = '';
		mapDiv.appendChild($mapContents);
	}
</script>

<Layout>
	<div slot="left">
		<h1>App title</h1>
		<div bind:this={sidebarDiv}></div>
	</div>
	<div slot="main" style="position:relative; width: 100%; height: 100vh;">
		<MapLibre
			style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
			standardControls
			hash
		>
			<div bind:this={mapDiv}></div>

			<DemoMode />
		</MapLibre>
	</div>
</Layout>

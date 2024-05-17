<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import { SplitComponent } from 'ua-components/two_column_layout';
	import { map, mode, backend, isLoaded } from './globals';
	import { DefaultMarker, GeoJSON, FillLayer } from 'svelte-maplibre';

	let center: [number, number] = [-122.2993, 47.4464];
	let distanceMeters = 10000;

	let gj: FeatureCollection = { type: 'FeatureCollection', features: [] };

	$: recalculate(center, distanceMeters);
	async function recalculate(_a: [number, number], _b: number) {
		gj.features = [
			await $backend!.exampleCall({
				center,
				distanceMeters
			})
		];
		gj = gj;
	}

	function resetMode() {
		$backend!.unset();
		$isLoaded = false;
		$mode = { kind: 'title' };
	}
</script>

<SplitComponent>
	<div slot="sidebar">
		<button on:click={resetMode}>Back to title screen</button>

		<div>
			<label>
				Distance (meters): {distanceMeters}
				<input type="range" min="0" max="100000" bind:value={distanceMeters} />
			</label>
		</div>
	</div>

	<div slot="map">
		<DefaultMarker bind:lngLat={center} draggable />

		<GeoJSON data={gj}>
			<FillLayer paint={{ 'fill-color': 'red', 'fill-opacity': 0.5 }} />
		</GeoJSON>
	</div>
</SplitComponent>

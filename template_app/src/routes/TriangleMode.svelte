<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import { SplitComponent } from 'ua-components/two_column_layout';
	import { mode, backend } from './globals';
	import { DefaultMarker, GeoJSON, FillLayer } from 'svelte-maplibre';

	let center: [number, number] = [-122.2993, 47.4464];
	let distanceMeters = 10;

	let gj: FeatureCollection = { type: 'FeatureCollection', features: [] };

	$: recalculate(center, distanceMeters);
	async function recalculate(_a: [number, number], _b: number) {
		gj.features = [
			await $backend!.exampleCall({
				center,
				distanceMeters
			})
		];
		console.log(JSON.stringify(gj));
		gj = gj;
	}
</script>

<SplitComponent>
	<div slot="sidebar">
		<button on:click={() => ($mode = { kind: 'title' })}>Back to title screen</button>

		<div>
			<label>
				Distance (meters): {distanceMeters}
				<input type="range" min="0" max="1000" bind:value={distanceMeters} />
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

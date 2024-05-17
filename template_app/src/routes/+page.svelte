<script lang="ts">
	import { MapLibre } from 'svelte-maplibre';
	import { SimpleComponent } from 'ua-components';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<MapLibre style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" standardControls />
<div id="float">
	<SimpleComponent name="Stu" />
</div>

<style>
	#float {
		position: absolute;
		top: 20px;
		right: 20px;
		background-color: white;
		padding: 20px;
	}
</style>

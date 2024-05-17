<script lang="ts">
	import { mapContents, sidebarContents } from './index.js';

	// The kinda weird hack is that this must itself be nested underneath the
	// MapLibre bit, so it has context. The sidebar is the "remote" part.
</script>

<div bind:this={$sidebarContents}>
	<slot name="sidebar" />
</div>
<div bind:this={$mapContents}>
	<slot name="map" />
</div>

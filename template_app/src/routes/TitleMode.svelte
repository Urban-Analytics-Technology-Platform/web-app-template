<script lang="ts">
	import { SimpleComponent } from 'ua-components';
	import { SplitComponent } from 'ua-components/two_column_layout';
	import { mode } from './globals';
</script>

<SplitComponent>
	<div slot="sidebar">
		<SimpleComponent name="Stu" />
		<button on:click={() => ($mode = { kind: 'triangle' })}>Triangle mode</button>
	</div>
	<div slot="map"></div>
</SplitComponent>

<script lang="ts">
	import { SimpleComponent } from 'ua-components';
	import { SplitComponent } from 'ua-components/two_column_layout';
</script>

<SplitComponent>
	<div slot="sidebar">
		<SimpleComponent name="Stu" />
	</div>
	<div slot="map"></div>
</SplitComponent>

<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import SearchGuide from "$lib/components/organisms/SearchGuide.svelte";
</script>

<Meta
	title="Organisms / Search Guide"
	component={SearchGuide} />

<Story name="Search Guide">
	<div>
		<SearchGuide />
	</div>
</Story>

<style>
	div {
		max-width: 400px;
	}
</style>

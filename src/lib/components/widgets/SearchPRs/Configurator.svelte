<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, PRSearchWidget } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { titleLens, searchQueryArgLens, withDefaultEmptyString } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import Input from "$lib/components/atoms/Input.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, PRSearchWidget>;

	const focusTitle = focus
		.composeLens(titleLens);

	const focusSearchQuery = focus
		.composeLens(searchQueryArgLens);

	$: console.log($configuration);

	let title: string = withDefaultEmptyString(focusTitle)($configuration);
	let searchQuery: string = withDefaultEmptyString(focusSearchQuery)($configuration);

	$: {
		configuration.update(focusTitle.set(title));
		configuration.update(focusSearchQuery.set(searchQuery));
	}
</script>

<Widget --height="auto">
	<form>
		<Input bind:value={title}>Title</Input>
		<Input bind:value={searchQuery}>Search Query</Input>
	</form>
</Widget>

<style>
	form {
		padding: var(--global-gutter);
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--global-gutter);
	}
</style>

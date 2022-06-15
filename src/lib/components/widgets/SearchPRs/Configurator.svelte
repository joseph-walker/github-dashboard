<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, PRSearchWidget } from "$lib/stores/configuration";

	import { createEventDispatcher, getContext } from "svelte";

	import { titleLens, searchQueryArgLens, withDefaultEmptyString } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import Input from "$lib/components/atoms/Input.svelte";
	import HoldButton from "$lib/components/molecules/HoldButton.svelte";

	const dispatch = createEventDispatcher();
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, PRSearchWidget>;

	const focusTitle = focus
		.composeLens(titleLens);

	const focusSearchQuery = focus
		.composeLens(searchQueryArgLens);

	let title: string = withDefaultEmptyString(focusTitle)($configuration);
	let searchQuery: string = withDefaultEmptyString(focusSearchQuery)($configuration);

	$: {
		configuration.update(focusTitle.set(title));
		configuration.update(focusSearchQuery.set(searchQuery));
	}
</script>

<section>
	<Input bind:value={title}>Title</Input>
	<Input bind:value={searchQuery}>Search Query</Input>
	<div class="actions">
		<HoldButton theme="danger" on:hold={() => dispatch("delete")}>Hold to Delete</HoldButton>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--global-gutter);
	}

	.actions {
		display: flex;
		flex-direction: row;
	}

	:global(.actions > *:first-child) {
		margin-left: auto;
	}
</style>

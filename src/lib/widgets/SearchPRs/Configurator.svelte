<script lang="ts">
	import type { Optional } from "monocle-ts";

	import { fold } from 'fp-ts/lib/Option.js';

	import { configuration, type WidgetConfig } from "$lib/stores/configuration";

	type ConfigBlock = WidgetConfig[string]['widgets'][number];

	export let configLens: Optional<WidgetConfig, ConfigBlock>;

	let newConfiguration = fold(
		() => { throw new Error("Attempting to configure non-existent element!") },
		(config: ConfigBlock) => config
	)(configLens.getOption($configuration));

	function saveChanges() {
		configuration.update(configLens.set(newConfiguration));
	}
</script>

<div class="search-prs-configurator">
	<label for="title">Title</label>
	<input id="title" type="text" bind:value={newConfiguration.args.title} />

	<label for="search-query">Search Query</label>
	<input id="search-query" type="text" bind:value={newConfiguration.args.searchQuery} />

	<label for="placement">Placement</label>
	<div id="placement" class="placement-array">
		<input type="text" bind:value={newConfiguration.placement[0]} />
		<input type="text" bind:value={newConfiguration.placement[1]} />
		<input type="text" bind:value={newConfiguration.placement[2]} />
		<input type="text" bind:value={newConfiguration.placement[3]} />
	</div>

	<button type="submit" on:click={saveChanges}>Save</button>
</div>

<style>
	.search-prs-configurator {
		padding: var(--padding);
		min-width: var(--min-width);
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 0.9rem;
		font-weight: bold;
		margin-bottom: 4px;
	}

	input[type="text"] {
		padding: 8px;
		flex: 1;
		background: white;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		margin-bottom: 16px;
	}

	.placement-array {
		display: flex;
		gap: 8px;
	}

	button {
		margin-left: auto;
		font-size: 0.9rem;
		padding: 6px 16px;
		border-radius: 4px;
		background: #2e86de;
		color: white;
		cursor: pointer;
	}
</style>

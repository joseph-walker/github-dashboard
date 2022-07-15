<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, PRSearchWidget } from "$lib/stores/configuration";

	import { createEventDispatcher, getContext } from "svelte";
	import { fold } from "fp-ts/lib/Option.js";

	import { emptyPRSearchWidget } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import Input from "$lib/components/atoms/Input.svelte";
	import HoldButton from "$lib/components/molecules/HoldButton.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { dispatchToast } from "$lib/components/organisms/ToastManager.svelte";

	const dispatch = createEventDispatcher();
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, PRSearchWidget>;

	const clean = focus.getOption($configuration);
	const dirty: PRSearchWidget = fold(
		() => emptyPRSearchWidget,
		(clone: PRSearchWidget) => clone
	)(clean);

	function saveChanges() {
		configuration.update(focus.set(dirty));
		dispatchToast("Saved", "Configuration successfully updated");
	}
</script>

<section>
	<Input bind:value={dirty.title}>Title</Input>
	<Input bind:value={dirty.args.searchQuery}>Search Query</Input>
	<Input type="number" bind:value={dirty.args.itemsPerPage} placeholder="5">Results Per Page</Input>
	<div class="actions">
		<Button theme="primary" on:click={saveChanges}>Save Changes</Button>
		<HoldButton theme="tertiary" on:hold={() => dispatch("delete")}>
			<img class="trashcan" src="/icons/trash-outline.svg" alt="Delete">
		</HoldButton>
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
		gap: var(--grid-1x);
	}

	.trashcan {
		width: var(--grid-2x);
		margin-bottom: -2px;
	}

	:global(.actions > *:first-child) {
		margin-left: auto;
	}
</style>

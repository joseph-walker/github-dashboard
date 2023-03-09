<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, ReviewBalanceWidget } from "$lib/stores/configuration";

	import { createEventDispatcher, getContext } from "svelte";
	import { fold } from "fp-ts/lib/Option.js";

	import { emptyReviewBalanceWidget } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import { dispatchToast } from "$lib/components/organisms/ToastManager.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import HoldButton from "$lib/components/molecules/HoldButton.svelte";
	import Button from "$lib/components/atoms/Button.svelte";

	const dispatch = createEventDispatcher();
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, ReviewBalanceWidget>;

	let clean: ReviewBalanceWidget;
	let dirty: ReviewBalanceWidget;

	function boot() {
		clean = fold(
			() => emptyReviewBalanceWidget,
			(id: ReviewBalanceWidget) => id
		)(focus.getOption($configuration));
		dirty = { ...clean };
	}

	function saveChanges() {
		configuration.update(focus.set(dirty));
		dispatchToast("Saved", "Widget configuration successfully updated");
	}

	boot();
</script>

<section>
	<Input bind:value={dirty.title}>Title</Input>
	<Input type="number" bind:value={dirty.args.sinceDays}>Date Range (Days)</Input>
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

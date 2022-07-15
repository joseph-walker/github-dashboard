<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Option } from "fp-ts/lib/Option.js";
	import type { Optional } from "monocle-ts";

	import { tabNameIsTaken, type HoardboardConfiguration, type PlacementType, type Tab } from "$lib/stores/configuration";

	import { createEventDispatcher, getContext } from "svelte";
	import { fold } from "fp-ts/lib/Option.js";

	import { emptyTab } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import { dispatchToast } from "$lib/components/organisms/ToastManager.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import HoldButton from "$lib/components/molecules/HoldButton.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import LayoutPreview from "$lib/components/atoms/LayoutPreview.svelte";

	const dispatch = createEventDispatcher();
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, Tab>;

	let clean: Tab;
	let dirty: Tab;
	let nameError: string;

	function boot() {
		clean = fold(
			() => emptyTab,
			(id: Tab) => id
		)(focus.getOption($configuration));
		dirty = { ...clean };
	}

	function setPlacementType(t: PlacementType) {
		return () => {
			dirty.placementType = t;
		};
	}

	function saveChanges() {
		console.log(clean);

		if (tabNameIsTaken(dirty.name)($configuration) && clean.name !== dirty.name) {
			nameError = `"${dirty.name}" is already in use`;
		} else if (dirty.name === "") {
			nameError = "Empty string is not a valid name";
		} else {
			nameError = null;
			configuration.update(focus.set(dirty));
			dispatchToast("Saved", "Widget configuration successfully updated");
			boot();
		}
	}

	boot();
</script>

<section>
	<Input bind:value={dirty.name} error={nameError}>Tab Name</Input>

	<!-- TODO: This should probably be a molecule/organism -->
	<div class="layout-picker">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Widget Layout</label>
		<button on:click={setPlacementType("1-col")} class:active={dirty.placementType === "1-col"}>
			<LayoutPreview layout="1-col" />
			<p>1 Column</p>
		</button>
		<button on:click={setPlacementType("2-col")} class:active={dirty.placementType === "2-col"}>
			<LayoutPreview layout="2-col" />
			<p>2 Column</p>
		</button>
		<button on:click={setPlacementType("3-col")} class:active={dirty.placementType === "3-col"}>
			<LayoutPreview layout="3-col" />
			<p>3 Column</p>
		</button>
		<button on:click={setPlacementType("custom")} class:active={dirty.placementType === "custom"}>
			<LayoutPreview layout="custom" />
			<p>Custom</p>
		</button>
	</div>

	<div class="actions">
		<Button theme="primary" on:click={saveChanges}>Save Changes</Button>
		<HoldButton theme="tertiary" on:hold={() => dispatch("delete")}>
			<img class="trashcan" src="/icons/trash-outline.svg" alt="Delete">
		</HoldButton>
	</div>
</section>

<style>
	label {
		display: block;
		margin-left: 2px;
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: var(--grid-4s);
	}

	.layout-picker {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--global-gutter);
	}

	.layout-picker label {
		flex-basis: 100%;
		margin-right: auto;
	}

	.layout-picker button {
		position: relative;
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--global-border-color);
		padding: var(--grid-2s);
		border-radius: var(--slightly-rounded);
		font-weight: bold;
		font-size: 0.8rem;
		cursor: pointer;
		transition: 0.1s ease-out box-shadow;
	}

	.layout-picker button.active {
		box-shadow: var(--light-green) 0px 3px;
	}

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

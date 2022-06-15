<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Option } from "fp-ts/lib/Option.js";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, Placement, PlacementType, Tab } from "$lib/stores/configuration";

	import { createEventDispatcher, getContext } from "svelte";

	import { tabNameLens, withDefaultEmptyString, placementTypeLens } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import Input from "$lib/components/atoms/Input.svelte";
	import HoldButton from "$lib/components/molecules/HoldButton.svelte";
	import LayoutPreview from "$lib/components/atoms/LayoutPreview.svelte";
	import RunOption from "$lib/components/atoms/RunOption.svelte";

	const dispatch = createEventDispatcher();
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, Tab>;

	const tabNameFocus = focus.composeLens(tabNameLens);
	const placementTypeFocus = focus.composeLens(placementTypeLens);

	let tabName: string = withDefaultEmptyString(tabNameFocus)($configuration);

	let maybePlacementType: Option<PlacementType>;
	$: maybePlacementType = placementTypeFocus.getOption($configuration);

	$: {
		configuration.update(tabNameFocus.set(tabName));
	}

	function setPlacementType(t: PlacementType) {
		return () => configuration.update(placementTypeFocus.set(t));
	}
</script>

<section>
	<Input bind:value={tabName}>Tab Name</Input>

	<!-- TODO: This should probably be a molecule/organism -->
	<div class="layout-picker">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Widget Layout</label>
		<RunOption option={maybePlacementType}>
			<svelte:fragment slot="some" let:some={placementType}>
				<button on:click={setPlacementType("1-col")} class:active={placementType === "1-col"}>
					<LayoutPreview layout="1-col" />
					<p>1 Column</p>
				</button>
				<button on:click={setPlacementType("2-col")} class:active={placementType === "2-col"}>
					<LayoutPreview layout="2-col" />
					<p>2 Column</p>
				</button>
				<button on:click={setPlacementType("3-col")} class:active={placementType === "3-col"}>
					<LayoutPreview layout="3-col" />
					<p>3 Column</p>
				</button>
				<button on:click={setPlacementType("custom")} class:active={placementType === "custom"}>
					<LayoutPreview layout="custom" />
					<p>Custom</p>
				</button>
			</svelte:fragment>
		</RunOption>
	</div>

	<div class="actions">
		<HoldButton theme="danger" on:hold={() => dispatch("delete")}>Hold to Delete</HoldButton>
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
	}

	:global(.actions > *:first-child) {
		margin-left: auto;
	}
</style>

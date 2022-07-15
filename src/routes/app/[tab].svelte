<script lang="ts">
	import type {
		HoardboardConfiguration,
		WidgetUnion,
		PlacementType,
		Placement
	} from "$lib/stores/configuration";
	import type { Writable } from "svelte/store";

	import { getContext } from "svelte";

	import { page } from "$app/stores";
	import { __configuration } from "$lib/stores/keys";
	import {
		getWidgetsInTab,
		getPlacementTypeForTab,
		oneColumnPlacementGenerator,
		twoColumnPlacementGenerator,
		threeColumnPlacementGenerator
	} from "$lib/stores/configuration";
	import { getWidgetImportPathSlug } from "$lib/getWidgetImportPathSlug";
	import WidgetContainer from "$lib/components/atoms/WidgetContainer.svelte";
	import MessageOverlay from "$lib/components/atoms/MessageOverlay.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	// TODO: Pretty sure I can use yield* here instead of a factory function
	function placementGenerator(widgetList: WidgetUnion[], placementType: PlacementType): Generator<Placement> {
		if (placementType === "custom") {
			return (function * (): Generator<Placement> {
				for (const widget of widgetList) {
					yield widget.placement;
				}
			})();
		} else {
			switch (placementType) {
				// TODO: Is this a memory leak? 🤔 How do generators work?
				case "1-col": return oneColumnPlacementGenerator();
				case "2-col": return twoColumnPlacementGenerator();
				case "3-col": return threeColumnPlacementGenerator();
				default: {
					const unknownPlacementType: never = placementType;
					throw new Error(`Unknown placement type: ${unknownPlacementType}`)
				}
			}
		}
	}

	$: placementType = getPlacementTypeForTab($page.params["tab"])($configuration);
	$: widgetsForTab = getWidgetsInTab($page.params["tab"])($configuration);

	$: widgetList = Promise.all(
		widgetsForTab.map(async function (config) {
			const component = await import(`../../lib/components/widgets/${getWidgetImportPathSlug(config.type)}/Widget.svelte`);

			return {
				...config,
				component: component.default
			};
		})
	);
</script>

<main class="dashboard-grid">
	{#await widgetList then widgets}
		{@const gen = placementGenerator(widgets, placementType)}
		{#each widgets as widget}
			{@const placement = gen.next().value}
			<WidgetContainer
				colStart={placement[0]}
				colEnd={placement[1]}
				rowStart={placement[2]}
				rowEnd={placement[3]}>
					<svelte:component this={widget.component} title={widget.title} {...widget.args}></svelte:component>
			</WidgetContainer>
		{:else}
			<WidgetContainer colStart={1} colEnd={7} rowStart={1} rowEnd={2}>
				<MessageOverlay icon="/icons/rocket-outline.svg">Empty Tab - Add a widget to get started</MessageOverlay>
			</WidgetContainer>
		{/each}
	{/await}
</main>

<style>
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--global-gutter);
		padding: var(--global-gutter);
		overflow-x: hidden;
	}
</style>

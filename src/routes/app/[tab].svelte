<script lang="ts">
	import type { HoardboardConfiguration, WidgetType } from "$lib/stores/configuration";
	import type { Writable } from "svelte/store";

	import { getContext } from "svelte";

	import { page } from "$app/stores";
	import { __configuration } from "$lib/stores/keys";
	import { getWidgetsInTab } from "$lib/stores/configuration";
	import WidgetContainer from "$lib/components/atoms/WidgetContainer.svelte";

	// TODO: Maybe use a actual folder name for descriminant so this isn't necessary?
	function getWidgetImportPath(widgetType: WidgetType) {
		switch (widgetType) {
			case "__PRSearchWidget": return 'SearchPRs';
			default: {
				const unknownWidgetType: never = widgetType;
				throw new Error(`Unknown widget type ${unknownWidgetType}`);
			}
		}
	}

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	$: widgetsForTab = getWidgetsInTab($page.params["tab"])($configuration);

	$: widgetList = Promise.all(
		widgetsForTab.map(async function (config) {
			const component = await import(`../../lib/components/widgets/${getWidgetImportPath(config.type)}/Widget.svelte`)

			return {
				...config,
				component: component.default
			};
		})
	);
</script>

<main class="dashboard-grid">
	{#await widgetList then widgets}
		{#each widgets as widget}
			<WidgetContainer
				colStart={widget.placement[0]}
				colEnd={widget.placement[1]}
				rowStart={widget.placement[2]}
				rowEnd={widget.placement[3]}>
					<svelte:component this={widget.component} title={widget.title} {...widget.args}></svelte:component>
			</WidgetContainer>
		{:else}
			<p>Empty Config</p>
		{/each}
	{/await}
</main>

<style>
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--global-gutter);
		padding: var(--global-gutter);
	}
</style>

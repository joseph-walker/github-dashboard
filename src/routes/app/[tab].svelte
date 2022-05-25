<script lang="ts">
	import type { HoardboardConfiguration, WidgetType } from "$lib/stores/configuration";
	import type { Writable } from "svelte/store";

	import { getContext } from "svelte";

	import { page } from "$app/stores";
	import { __configuration } from "$lib/stores/keys";
	import { getWidgetsInTab } from "$lib/stores/configuration";
	import WidgetContainer from "$lib/components/atoms/WidgetContainer.svelte";
	import { getWidgetImportPathSlug } from "$lib/getWidgetImportPathSlug";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

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
		overflow-x: hidden;
	}
</style>

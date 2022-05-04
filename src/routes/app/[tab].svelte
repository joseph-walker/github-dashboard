<script lang="ts">
	import type { WidgetConfig } from "$lib/stores/configuration";

	import { Lens } from 'monocle-ts'
	import { indexReadonlyArray } from 'monocle-ts/lib/Index/ReadonlyArray';

	import { page } from "$app/stores";
	import WidgetContainer from "$lib/components/atoms/WidgetContainer.svelte";
	import { configuration } from "$lib/stores/configuration";

	type Tab = WidgetConfig[string];
	type Widget = WidgetConfig[string]['widgets'];

	const widgetsInTabLens = Lens.fromProp<Tab>()("widgets");

	$: widgetList = Promise.all(
		($configuration[$page.params["tab"]]?.widgets ?? []).map(async function (config, i) {
			const tabLens = Lens.fromProp<WidgetConfig>()($page.params["tab"]);
			const widgetAtIndexLens = indexReadonlyArray<Widget[number]>().index(i);

			const configLens = tabLens
				.composeLens(widgetsInTabLens)
				.composeOptional(widgetAtIndexLens);

			const component = await import(`../../lib/widgets/${config.widget}/Widget.svelte`)

			return {
				...config,
				args: {
					...config.args,
					configLens
				},
				component: component.default
			};
		})
	);
</script>

<main class="dashboard-grid">
	{#await widgetList then widgets}
		{#each widgets as widget}
			<WidgetContainer colStart={widget.placement[0]} colEnd={widget.placement[1]} rowStart={widget.placement[2]} rowEnd={widget.placement[3]}>
				<svelte:component this={widget.component} {...widget.args}></svelte:component>
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
		gap: 16px;
		padding: 16px;
	}
</style>

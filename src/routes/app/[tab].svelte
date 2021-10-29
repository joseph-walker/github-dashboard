<script lang="ts">
	import { onMount } from 'svelte';

	import WidgetContainer from "$lib/components/WidgetContainer.svelte";

	type WidgetConfig = {
		widget: string,
		args: Record<string, string>,
		placement: [number, number, number, number]
	}[];

	let widgetConfig: WidgetConfig = [];

	onMount(function () {
		widgetConfig = JSON.parse(localStorage.getItem("widget_config")) || [];
	});

	$: widgetList = Promise.all(
		widgetConfig.map(async function (config) {
			const component = await import(`../../lib/widgets/${config.widget}/Widget.svelte`)

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

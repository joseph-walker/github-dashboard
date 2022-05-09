<script lang="ts">
	import { page } from "$app/stores";
	import { configuration } from "$lib/stores/configuration";
	import WidgetContainer from "$lib/components/atoms/WidgetContainer.svelte";

	$: widgetList = Promise.all(
		($configuration[$page.params["tab"]]?.widgets ?? []).map(async function (config, i) {
			const component = await import(`../../lib/components/widgets/${config.widget}/Widget.svelte`)

			return {
				...config,
				args: {
					...config.args
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
		gap: var(--global-gutter);
		padding: var(--global-gutter);
	}
</style>

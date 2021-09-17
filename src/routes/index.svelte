<script lang="ts">
	import { onMount } from "svelte";

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
			const component = await import(`../lib/widgets/${config.widget}/Widget.svelte`)

			return {
				...config,
				component: component.default
			};
		})
	);
</script>

<nav class="nav-bar">
	<h1><img class="logo" src="/logo-github.svg" alt="Github logo" />Github Dashboard</h1>
	<a href="/auth/logout">Log Out</a>
</nav>

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

	.nav-bar {
		display: flex;
		align-items: center;
		height: 48px;
		background: white;
		border-bottom: 1px solid var(--border-color);
		padding: 0 16px;
	}

	.nav-bar h1 {
		font-weight: var(--weight-bold);
		font-size: 1.3rem;
		display: flex;
		align-items: center;
	}

	.logo {
		height: 1.3rem;
		margin-right: 4px;
		margin-bottom: 2px;
	}

	.nav-bar a:first-of-type {
		margin-left: auto;
	}

	.nav-bar a {
		font-size: 0.9rem;
		padding: 8px 16px;
		cursor: pointer;
		background: #2e86de;
		color: white;
		border-radius: 8px;
	}
</style>

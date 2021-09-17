<script lang="ts">
	import { onMount } from "svelte";

	import WidgetContainer from "$lib/components/WidgetContainer.svelte";
	import { remaining } from "$lib/queryWithUtilization";

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
	<div class="resources">
		<p>Rate Limit:</p>
		<em>{$remaining} / 5000</em>
		<div class="hp-bar">
			<div class="hp" style={`width: ${((Number($remaining) || 2500) / 5000) * 100}px`}></div>
		</div>
	</div>
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

	h1 {
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

	a {
		font-size: 0.9rem;
		padding: 8px 16px;
		cursor: pointer;
		background: #2e86de;
		color: white;
		border-radius: 8px;
	}

	.resources {
		margin-left: auto;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		margin-right: 16px;
	}

	.resources p {
		margin-right: 4px;
	}

	.resources em {
		font-weight: var(--weight-bold);
	}

	.hp-bar {
		position: relative;
		width: 100px;
		height: 8px;
		background: var(--border-color);
		margin-left: 8px;
		border-radius: 4px;
	}

	.hp-bar .hp {
		background-color: #1dd1a1;
		height: 8px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		width: 32px;
	}
</style>

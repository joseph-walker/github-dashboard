<script lang="ts">
	import { onMount } from "svelte";

	import WidgetContainer from "$lib/components/WidgetContainer.svelte";
	import PullRequestUser from "$lib/widgets/PullRequestUser/Widget.svelte";

	type WidgetConfig = {
		widget: string,
		args: Record<string, string>,
		placement: [number, number, number, number]
	}[];

	let widgetConfig: WidgetConfig = [];

	onMount(function () {
		widgetConfig = JSON.parse(localStorage.getItem("widget_config")) || [];
	});
</script>

<nav class="nav-bar">
	<h1>Github Dashboard</h1>
	<a href="/auth/logout">Log Out</a>
</nav>

<main class="dashboard-grid">
	{#each widgetConfig as widget}
		<WidgetContainer colStart={widget.placement[0]} colEnd={widget.placement[1]} rowStart={widget.placement[2]} rowEnd={widget.placement[3]}>
			<PullRequestUser login={widget.args.login} />
		</WidgetContainer>
	{:else}
		<p>Empty Config</p>
	{/each}
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

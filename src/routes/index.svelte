<script lang="ts">
	import WidgetContainer from "$lib/components/WidgetContainer.svelte";
	import MeWidget from "$lib/widgets/PullRequestUser/Widget.svelte";
</script>

<nav class="nav-bar">
	<h1>Github Dashboard</h1>
	<a href="/auth/logout">Log Out</a>
</nav>

<main class="dashboard-grid">
	<WidgetContainer colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
		<MeWidget login="kmorales13" />
	</WidgetContainer>
	<WidgetContainer colStart={3} colEnd={4} rowStart={1} rowEnd={2}>
		<MeWidget login="tamars2" />
	</WidgetContainer>
	<WidgetContainer colStart={1} colEnd={2} rowStart={3} rowEnd={4}>
		<MeWidget login="gabepages" />
	</WidgetContainer>
	<WidgetContainer colStart={5} colEnd={5} rowStart={1} rowEnd={2}>
		<MeWidget login="joseph-walker" />
	</WidgetContainer>
</main>

<style>
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
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
		background: #546de5;
		color: white;
		border-radius: 8px;
	}
</style>

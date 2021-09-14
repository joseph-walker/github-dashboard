<script>
	import WidgetContainer from "$lib/components/WidgetContainer.svelte";
	import MeWidget from "$lib/widgets/PullRequestUser/Widget.svelte";
</script>

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
	<WidgetContainer colStart={3} colEnd={4} rowStart={3} rowEnd={4}>
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
</style>

<script lang="ts">
	import SearchPRs from "$lib/widgets/SearchPRs/Widget.svelte";
	import SearchGuide from "$lib/components/SearchGuide.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";

	let searchString: string = "";
	let searchQuery: string = "";

	function runSearch() {
		searchQuery = searchString;
	}
</script>

<main class="container">
	<section class="search-column">
		<form method="GET" action="/app" on:submit|preventDefault={runSearch}>
			<input type="text" bind:value={searchString} />
			<button>Search</button>
		</form>

		<SearchPRs {searchQuery} title="Search Results" withConfigurator={false} />
	</section>
	<aside class="docs-column">
		<Widget>
			<h2 slot="header"><b>Search Guide</b></h2>
			<div class="search-guide-wrapper">
				<SearchGuide />
			</div>
		</Widget>
	</aside>
</main>

<style>
	.container {
		display: flex;
		max-width: 1200px;
		margin: auto;
		margin-top: 32px;
		gap: 16px;
	}

	.docs-column {
		flex: 1;
	}

	.search-column {
		flex: 2;
	}

	.search-guide-wrapper {
		padding: 16px;
	}

	form {
		display: flex;
		margin-bottom: 16px;
	}

	input[type="text"] {
		padding: 8px;
		margin-right: 8px;
		flex: 1;
		background: white;
		border-radius: 4px;
		width: 100%;
		border: 1px solid var(--border-color);
	}

	button {
		font-size: 0.9rem;
		padding: 6px 16px;
		border-radius: 4px;
		background: #2e86de;
		color: white;
		cursor: pointer;
	}
</style>

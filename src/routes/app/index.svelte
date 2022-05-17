<script lang="ts">
	import SearchPRs from "$lib/components/widgets/SearchPRs/Widget.svelte";
	import SearchGuide from "$lib/components/molecules/SearchGuide.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";

	let searchString: string = "";
	let searchQuery: string = "";

	function runSearch() {
		searchQuery = searchString;
	}
</script>

<main class="container">
	<section class="search-column">
		<Widget class="search-container">
			<form method="GET" action="/app" on:submit|preventDefault={runSearch}>
				<Input bind:value={searchString}>Search Query</Input>
				<Button type="submit">Search</Button>
				<Button>Save Search</Button>
			</form>
		</Widget>
		<SearchPRs {searchQuery} title="Search Results" />
	</section>
	<aside class="docs-column">
		<SearchGuide />
	</aside>
</main>

<style>
	.container {
		--height: auto;

		display: flex;
		max-width: var(--non-grid-max-width);
		margin: auto;
		margin: var(--global-gutter) auto;
		gap: 16px;
	}

	.docs-column {
		flex: 1;
	}

	.search-column {
		flex: 2;
	}

	:global(.search-container) {
		margin-bottom: var(--global-gutter);
	}

	form {
		display: grid;
		align-items: end;
		grid-template-columns: 1fr auto auto;
		gap: var(--grid-1x);
	}
</style>

<script lang="ts">
	import SearchPRs from "$lib/widgets/SearchPRs/Widget.svelte";

	let searchString: string = "is:open is:pr author:joseph-walker archived:false";
	let searchQuery: string = "";

	function runSearch() {
		searchQuery = searchString;
	}
</script>

<section class="search">
	<form method="GET" action="/app" on:submit|preventDefault={runSearch}>
		<input type="text" bind:value={searchString} />
		<button>Search</button>
	</form>

	<SearchPRs {searchQuery} title="Search Results" />
</section>

<style>
	.search {
		width: 800px;
		margin: auto;
		margin-top: 32px;
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

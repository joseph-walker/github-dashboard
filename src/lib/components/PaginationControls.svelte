<script lang="ts">
	import type { Paginator } from "$lib/gql/makePaginator";

	export let paginator: Paginator;

	const pageInfo = paginator.pageInfo;
</script>

<section class="pagination-controls">
	<button class="prev" on:click={() => paginator.prevPage()} disabled={!$pageInfo.hasPrevPage}>Prev</button>
	<button class="next" on:click={() => paginator.nextPage()} disabled={!$pageInfo.hasNextPage}>Next</button>
</section>

<style>
	.pagination-controls {
		width: auto;
		display: flex;
		padding: 8px;
		padding-top: 0;
	}

	button {
		font-size: 0.9rem;
		padding: 6px 8px;
		border-radius: 4px;
		background: #2e86de;
		color: white;
		cursor: pointer;
	}

	button:disabled {
		cursor: initial;
		background: #f9f9f9;
		color: #d0d0d0;
	}

	.prev {
		margin-left: auto;
		margin-right: 8px;
	}
</style>

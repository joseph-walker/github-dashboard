<script lang="ts">
	import type { Paginator } from "$lib/gql/makePaginator";

	import Button from "../atoms/Button.svelte";

	export let paginator: Paginator;

	const pageInfo = paginator.pageInfo;
</script>

<section class="pagination-controls">
	<Button on:click={() => paginator.prevPage()} disabled={!$pageInfo.hasPrevPage}>Prev</Button>
	<Button on:click={() => paginator.nextPage()} disabled={!$pageInfo.hasNextPage}>Next</Button>
</section>

<style>
	.pagination-controls {
		width: auto;
		display: flex;
		gap: var(--grid-1x);
		justify-content: flex-end;
	}
</style>

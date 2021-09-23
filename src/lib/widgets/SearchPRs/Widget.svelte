<script lang="ts">
	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import PullRequest from '$lib/components/PullRequests/PullRequest.svelte';
	import Widget from '$lib/components/Widget.svelte';
	import PaginationControls from '$lib/components/PaginationControls.svelte';

	import { makeQuery } from './makeQuery';

	export let title: string = "Custom Search";
	export let searchQuery: string;

	const { query, paginator } = makeQuery(searchQuery, 5);

	queryWithUtilization(query);
</script>

<Widget>
	<h2 slot="header"><b>{title}</b></h2>
	<em slot="meta"><b>{$query.data?.search?.issueCount ?? "?"}</b> Result(s)</em>
	{#if $query.data}
		<ul>
			{#each $query.data.search.nodes as pr (pr.id)}
				<li><PullRequest owner={pr.repository.owner.login} repo={pr.repository.name} number={pr.number} /></li>
			{/each}
		</ul>
	{/if}
	<PaginationControls {paginator} />
</Widget>

<style>
	ul {
		flex: 1;
		list-style: none;
		padding: 8px;
	}

	ul li {
		margin-bottom: 8px;
	}

	ul li:last-of-type {
		margin-bottom: 0;
	}
</style>

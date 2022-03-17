<script lang="ts">
	import type { U } from "ts-toolbelt";

	import type { SearchPrQuery } from '$lib/generated/graphql';
	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import PullRequest from '$lib/components/PullRequests/PullRequest.svelte';
	import Widget from '$lib/components/Widget.svelte';
	import PaginationControls from '$lib/components/PaginationControls.svelte';
	import Spinner from "$lib/components/Spinner.svelte";

	import { makeQuery } from './makeQuery';

	export let title: string = "Custom Search";
	export let searchQuery: string;

	type PR = U.Select<
		SearchPrQuery["search"]["nodes"][number],
		{ __typename?: 'PullRequest' }
	>

	const { query, paginator } = makeQuery(searchQuery, 5);

	queryWithUtilization(query);

	$: {
		$query.variables.searchQuery = searchQuery;
    	$query.reexecute();
	}

	// The fetching set keeps track of which child widgets are currently load
	// If it contains _any_ entries, then the spinner on this component will spin
	let fetchingSet: Set<string> = new Set([]);
	const key = (pr: PR) => `${pr.repository.owner.login}/${pr.repository.name}/${pr.number}`;

	function addToFetchingSet(pr: PR) {
		const k = key(pr);
		return function () {
			fetchingSet.add(k);
			fetchingSet = fetchingSet;
		};
	}

	function removeFromFetchingSet(pr: PR) {
		const k = key(pr);
		return function () {
			fetchingSet.delete(k);
			fetchingSet = fetchingSet;
		};
	}

	$: isLoading = $query.fetching || fetchingSet.size > 0;
</script>

<Widget>
	<h2 slot="header"><b>{title}</b></h2>
	<em class="meta" slot="meta">
		<span><b>{$query.data?.search?.issueCount ?? "?"}</b> Result(s)</span>
		<Spinner {isLoading} />
	</em>
	{#if $query.data}
		<ul>
			{#each $query.data.search.nodes as pr (pr.id)}
				<li>
					<PullRequest
						onFetchStart={addToFetchingSet(pr)}
						onFetchEnd={removeFromFetchingSet(pr)}
						owner={pr.repository.owner.login}
						repo={pr.repository.name}
						number={pr.number} />
				</li>
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

	.meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>

<script lang="ts" context="module">
	import type { U } from "ts-toolbelt";
	import type { SearchPrQuery } from '$lib/generated/graphql';

	import { flow } from "fp-ts/lib/function.js";
	import { fold } from "fp-ts/lib/Option.js";
	import { Optional } from "monocle-ts";

	type SearchQuery = ReturnType<typeof import("./makeQuery")["makeQuery"]>["query"];

	type PR = U.Select<
		SearchPrQuery["search"]["nodes"][number],
		{ __typename?: 'PullRequest' }
	>;

	const issueCountOptional = Optional.fromPath<SearchQuery>()(['data', 'search', 'issueCount']);

	const issueCount = flow(
		issueCountOptional.getOption,
		fold(
			() => "?",
			(issueCount) => `${issueCount}`
		)
	);
</script>

<script lang="ts">
	import { queryWithUtilization } from '$lib/queryWithUtilization';

	import PullRequest from '$lib/components/organisms/PR/PullRequest.svelte';
	import Widget from '$lib/components/atoms/Widget.svelte';
	import PaginationControls from '$lib/components/molecules/PaginationControls.svelte';
	import Spinner from "$lib/components/atoms/Spinner.svelte";

	import { makeQuery } from './makeQuery';

	/** Props */
	export let title: string = "Custom Search";
	export let searchQuery: string;

	/** GraphQL Data */
	const { query, paginator } = makeQuery(searchQuery, 5);

	queryWithUtilization(query);

	$: {
		$query.variables.searchQuery = searchQuery;
    	$query.reexecute();
	}

	/** Local Logic */
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
	<div class="meta" slot="meta">
		<span><b>{issueCount($query)}</b> Result(s)</span>
		<Spinner {isLoading} />
	</div>
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
	<section class="pagination">
		<PaginationControls {paginator} />
	</section>
</Widget>

<style>
	.pagination {
		padding: var(--global-gutter);
	}

	ul {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	ul li {
		display: flex;
		border-bottom: 1px solid var(--global-border-color);
		padding: var(--global-gutter);
	}

	ul li:nth-child(2n) {
		background: var(--search-prs-widget-zebra-stripe-background);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: var(--global-gutter);
	}
</style>

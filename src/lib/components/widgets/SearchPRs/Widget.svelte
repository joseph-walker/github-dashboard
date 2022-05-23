<script lang="ts" context="module">
	// TODO: Can some of this stuff be moved to a lib file for this widget?
	// It's getting a bit cramped, and a lot of this stuff is point-free and could live somewhere else.
	import type { U } from "ts-toolbelt";
	import type { SearchPrQuery } from '$lib/generated/graphql';

	import { MonoidAll } from 'fp-ts/lib/boolean.js'
	import { concatAll } from 'fp-ts/lib/Monoid.js';
	import { flow } from "fp-ts/lib/function.js";
	import { fold as foldOption } from "fp-ts/lib/Option.js";
	import { Optional } from "monocle-ts";

	type SearchQuery = ReturnType<typeof import("./makeQuery")["makeQuery"]>["query"];

	type PR = U.Select<
		SearchPrQuery["search"]["nodes"][number],
		{ __typename?: 'PullRequest' }
	>;

	const issueCountOptional = Optional.fromPath<SearchQuery>()(['data', 'search', 'issueCount']);

	const issueCount = flow(
		issueCountOptional.getOption,
		foldOption(
			() => "?",
			(issueCount) => `${issueCount}`
		)
	);

	const getPrs = foldOption(
		() => [] as PR[],
		(prs: PR[]) => prs
	)

	// TODO: Is this the best way to determine if something is a PR?
	// Maybe URQL can pass through the __typename property
	const isPr = (pr: any): boolean => {
		return (
			'id' in pr &&
			'number' in pr &&
			'owner' in pr.repository
		 );
	}

	const searchNodesIncludesOnlyPRs = function (prList: any[]): prList is PR[] {
		return concatAll(MonoidAll)(prList.map(isPr));
	}
</script>

<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import type { Either } from "fp-ts/lib/Either.js";

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { some, none, chain, isNone } from "fp-ts/lib/Option.js";
	import { left, right, fold as foldEither } from "fp-ts/lib/Either.js";

	import { queryWithUtilization } from '$lib/queryWithUtilization';

	import PullRequest from '$lib/components/organisms/PR/PullRequest.svelte';
	import Widget from '$lib/components/atoms/Widget.svelte';
	import PaginationControls from '$lib/components/molecules/PaginationControls.svelte';
	import Spinner from "$lib/components/atoms/Spinner.svelte";
	import ErrorOverlay from "$lib/components/atoms/ErrorOverlay.svelte";
	import MessageOverlay from "$lib/components/atoms/MessageOverlay.svelte";

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

	let error: string = "";
	let prs: Option<PR[]> = none;

	const impurelySquashError = foldEither(
		(left: string) => {
			error = left;
			return none;
		},
		(right: PR[]) => {
			error = "";
			return some(right);
		}
	);

	$: {
		let queryResult: Option<Either<string, PR[]>>;

		if ($query.fetching && isNone(prs)) {
			queryResult = none;
		} else if ($query.error) {
			queryResult = some(
				left($query.error.message)
			);
		} else if (!searchNodesIncludesOnlyPRs($query.data.search.nodes)) {
			queryResult = some(
				left("There were github issue tickets in these search results. Did you include an 'is:pr' search term in your search query?")
			);
		} else {
			queryResult = some(
				right($query.data.search.nodes)
			);
		}

		prs = chain(impurelySquashError)(queryResult);
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
	<div class="meta" slot="meta">
		<span><b>{issueCount($query)}</b> Result(s)</span>
		<Spinner {isLoading} />
	</div>
	{#if error !== ""}
		<section>
			<ErrorOverlay {error} />
		</section>
	{:else if $query.data}
		<ul>
			{#each getPrs(prs) as pr, i (pr.id)}
				<li in:fly={{ duration: 250, delay: i * 50, x: 25, easing: quintOut }}>
					<PullRequest
						onFetchStart={addToFetchingSet(pr)}
						onFetchEnd={removeFromFetchingSet(pr)}
						owner={pr.repository.owner.login}
						repo={pr.repository.name}
						number={pr.number} />
				</li>
			{:else}
				<MessageOverlay>There doesn't seem to be anything here.</MessageOverlay>
			{/each}
		</ul>
	{/if}
	<section>
		<PaginationControls {paginator} />
	</section>
</Widget>

<style>
	ul {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--global-gutter);
		position: relative;
	}

	ul li {
		display: block;
		border-bottom: 1px solid var(--global-border-color);
		padding: var(--global-gutter);
		margin: 0 calc(var(--global-gutter) * -1);
	}

	ul li:first-child {
		padding-top: 0;
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

<script lang="ts">
	import type { U } from "ts-toolbelt";
	import type { Optional } from "monocle-ts";

	import type { WidgetConfig } from "$lib/stores/configuration";
	import type { SearchPrQuery } from '$lib/generated/graphql';

	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import PullRequest from '$lib/components/PullRequests/PullRequest.svelte';
	import Widget from '$lib/components/Widget.svelte';
	import PaginationControls from '$lib/components/PaginationControls.svelte';
	import Spinner from "$lib/components/Spinner.svelte";
	import Modal from "$lib/components/Modal.svelte";

	import Configurator from "./Configurator.svelte";
	import { makeQuery } from './makeQuery';

	type PR = U.Select<
		SearchPrQuery["search"]["nodes"][number],
		{ __typename?: 'PullRequest' }
	>

	/** Props */
	export let title: string = "Custom Search";
	export let searchQuery: string;
	export let withConfigurator: boolean = true;
	export let configLens: Optional<WidgetConfig, WidgetConfig[string]['widgets'][number]> | undefined = undefined;

	/** Local State */
	let configuring: boolean = false;
	let configModal;

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

	function configWidget() {
		configModal.openModal();
	}

	$: isLoading = $query.fetching || fetchingSet.size > 0;
</script>

<Widget>
	<h2 slot="header"><b>{title}</b></h2>
	<div class="meta" slot="meta">
		<span><b>{$query.data?.search?.issueCount ?? "?"}</b> Result(s)</span>
		<Spinner {isLoading} />
		{#if (withConfigurator && configLens)}
			<button class="open-configurator" on:click={configWidget}>
				<img class="icon" src="/hammer-outline.svg" alt="summary-icon" />
			</button>
		{/if}
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
	<PaginationControls {paginator} />
	{#if (withConfigurator && configLens)}
		<Modal bind:this={configModal} title="Configure Search PRs">
			<Configurator --padding="16px" --min-width="512px" configLens={configLens} />
		</Modal>
	{/if}
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

	.open-configurator {
		height: 1.2rem;
    	width: 1.2rem;
		cursor: pointer;
		display: grid;
		place-items: center;
	}
</style>

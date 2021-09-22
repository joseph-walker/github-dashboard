<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { makeQuery } from "./makeQuery";

	import Changes from "./SummaryLines/Changes.svelte";
	import Labels from "./SummaryLines/Labels.svelte";
	import Reviews from "./SummaryLines/Reviews.svelte";

	export let owner: string;
	export let repo: string;
	export let number: number;

	const me = getContext<Writable<string>>("me");
	const pullRequestQuery = makeQuery(owner, repo, number);

	queryWithUtilization(pullRequestQuery);

	$: pr = $pullRequestQuery.data
		? $pullRequestQuery.data.repository.pullRequest
		: undefined;
</script>

{#if pr}
	<div class="pr-card">
		<h3>
			<a href={pr.url} target="_blank" rel="noopener noreferrer">{pr.title}</a>
			<span class="repo-name">{pr.repository.name}</span>
		</h3>

		<Changes
			changedFiles={pr.changedFiles}
			additions={pr.additions}
			deletions={pr.deletions} />

		<Labels
			labels={pr.labels.nodes} />

		<Reviews
			reviews={pr.latestReviews.nodes}
			me={$me} />
	</div>
{:else}
	...
{/if}

<style>
	.pr-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		box-shadow: var(--border-color) 1px 1px 0px;
		padding: 6px;
		border-radius: 4px;
	}

	h3 {
		font-weight: var(--weight-bold);
	}

	h3 .repo-name {
		margin-left: 8px;
		color: var(--font-color-light);
		font-weight: var(--weight-normal);
	}
</style>

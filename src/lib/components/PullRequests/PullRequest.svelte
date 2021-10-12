<script lang="ts">
	import type { Writable } from "svelte/store";
	import { getContext, onDestroy } from "svelte";
	import { map, some, none } from "fp-ts/lib/Option.js";

	import type { PullRequestQuery } from "$lib/generated/graphql";
	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { makeQuery } from "./makeQuery";

	import Changes from "./SummaryLines/Changes.svelte";
	import Labels from "./SummaryLines/Labels.svelte";
	import Reviews from "./SummaryLines/Reviews.svelte";
	import LineSkeleton from "../Skeletons/LineSkeleton.svelte";

	type PR = PullRequestQuery["repository"]["pullRequest"];

	let fetching = false;

	export let onFetchStart = () => {};
	export let onFetchEnd = () => {};
	export let owner: string;
	export let repo: string;
	export let number: number;

	const me = getContext<Writable<string>>("me");
	const pullRequestQuery = makeQuery(owner, repo, number);

	queryWithUtilization(pullRequestQuery);

	const title = map((pr: PR) => {
		return {
			url: pr.url,
			title: pr.title,
			repo: pr.repository.name
		};
	});

	const changedFiles = map((pr: PR) => pr.changedFiles);
	const additions = map((pr: PR) => pr.additions);
	const deletions = map((pr: PR) => pr.deletions);
	const labels = map((pr: PR) => pr.labels.nodes);
	const latestReviews = map((pr: PR) => pr.latestReviews.nodes);

	$: pr = $pullRequestQuery.data
		? some($pullRequestQuery.data.repository.pullRequest)
		: none;

	$: {
		// When fetching state changes, call either onFetchStart() or onFetchEnd()
		if (fetching !== $pullRequestQuery.fetching) {
			fetching = $pullRequestQuery.fetching;
			fetching
				? onFetchStart()
				: onFetchEnd();
		}
	}

	onDestroy(function () {
		// If the component is destroyed while it is still fetching,
		// be sure to clean up and call unFetchEnd() before it disappears
		if (fetching === true) {
			fetching = false;
			onFetchEnd();
		}
	});
</script>

<div class="pr-card">
	<h3>
		<LineSkeleton await={title(pr)} let:ready={pr} width={32}>
			<a href={pr.url} target="_blank" rel="noopener noreferrer">{pr.title}</a>
			<span class="repo-name">
				{pr.repo}
			</span>
		</LineSkeleton>
	</h3>

	<Changes
		changedFiles={changedFiles(pr)}
		additions={additions(pr)}
		deletions={deletions(pr)} />

	<Labels
		labels={labels(pr)} />

	<Reviews
		reviews={latestReviews(pr)}
		me={$me} />
</div>

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

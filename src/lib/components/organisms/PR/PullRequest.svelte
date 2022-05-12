<script lang="ts">
	import type { CombinedError } from "@urql/svelte";
	import type { Option } from "fp-ts/lib/Option.js";
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import { onDestroy } from "svelte";
	import { map, some, none, chain } from "fp-ts/lib/Option.js";
	import { left, right, fold as foldEither } from "fp-ts/lib/Either.js";

	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { makeQuery } from "./makeQuery";
	import Changes from "./summaryLines/Changes.svelte";
	import Labels from "./summaryLines/Labels.svelte";
	import Reviews from "./summaryLines/Reviews.svelte";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import ErrorOverlay from "$lib/components/atoms/ErrorOverlay.svelte";

	type PR = PullRequestQuery["repository"]["pullRequest"];

	let fetching = false;

	export let onFetchStart = () => {};
	export let onFetchEnd = () => {};
	export let owner: string;
	export let repo: string;
	export let number: number;

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

	// Purity is for chumps.
	const impurelySquashError = foldEither(
		(left: CombinedError) => {
			error = left.message;
			return none;
		},
		(right: PR) => {
			error = "";
			return some(right);
		}
	);

	let error: string = "";
	let pr: Option<PR>;

	$: {
		const queryResult = $pullRequestQuery.fetching
			? none
			: some(
				$pullRequestQuery.error
					? left($pullRequestQuery.error)
					: right($pullRequestQuery.data.repository.pullRequest)
			);

		pr = chain(impurelySquashError)(queryResult);
	}

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
		reviews={latestReviews(pr)} />

	{#if error !== ""}
		<ErrorOverlay --position="absolute" {error} />
	{/if}
</div>

<style>
	.pr-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--grid-1x);
	}

	h3 {
		font-weight: var(--weight-bold);
	}

	h3 .repo-name {
		margin-left: var(--grid-1x);
		color: var(--font-color-light);
		font-weight: var(--weight-normal);
	}
</style>

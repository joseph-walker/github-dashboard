<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";

	import type { PullRequestQuery } from "$lib/generated/graphql";
	import LineSkeleton from "$lib/components/Skeletons/LineSkeleton.svelte";
	import SummaryLine from "../../SummaryLine.svelte";

	type Review = PullRequestQuery["repository"]["pullRequest"]["latestReviews"]["nodes"][number];

	export let me: string;
	export let reviews: Option<Review[]>;

	const numReviews = map((reviews: Review[]) => reviews.length);

	$: reviewsReady = match(
		() => [],
		identity
	)(reviews) as Review[];
</script>

<SummaryLine icon="/chatbubbles-outline.svg">
	<LineSkeleton await={numReviews(reviews)} let:ready={numReviews} width={42}>
		<b>{numReviews}</b>&nbsp;Review(s)
	</LineSkeleton>
	<ul class="reviews" slot="meta">
		{#each reviewsReady as review}
			<li class:me={review.author.login === me}>
				<a href={review.url} target="_blank" rel="noopener noreferrer">
					{#if review.state === "APPROVED"}
						<img class="icon approved" src="/checkmark-circle-outline.svg" alt="approved" />
					{:else if review.state === "COMMENTED"}
						<img class="icon commented" src="/alert-circle-outline.svg" alt="commented" />
					{:else}
						<img class="icon not-approved" src="/close-circle-outline.svg" alt="not-approved" />
					{/if}
					<em>
						{review.author.login}
					</em>
				</a>
			</li>
		{/each}
	</ul>
</SummaryLine>

<style>
	.reviews {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
	}

	.reviews .icon {
		height: 100%;
		padding: 2px;
		margin: 0;
		filter: invert(100%);
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.reviews li a {
		display: flex;
		align-items: center;
		background: #f9f9f9;
		font-size: 0.8rem;
		cursor: pointer;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		height: var(--summary-line-height);
	}

	.reviews li a em {
		border-left: 1px solid var(--border-color);
		padding: 0 6px;
	}

	.icon.approved {
		background: #ef537b;
	}

	.icon.commented {
		background: #0060bc;
	}

	.icon.not-approved {
		background: #11adac;
	}

	.reviewers li.me a {
		font-weight: var(--weight-bold);
		color: #2e86de;
	}
</style>

<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { writable } from "svelte/store";

	const now = writable(new Date());

	if (browser) {
		setInterval(function () {
			now.set(new Date());
		}, 60000); // 1 Minute
	}
</script>

<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";
	import { intervalToDuration } from "date-fns"

	import type { PullRequestQuery } from "$lib/generated/graphql";
	import LineSkeleton from "$lib/components/Skeletons/LineSkeleton.svelte";
	import SummaryLine from "../../SummaryLine.svelte";

	type Review = PullRequestQuery["repository"]["pullRequest"]["latestReviews"]["nodes"][number];

	export let me: string;
	export let reviews: Option<Review[]>;

	function formatDistanceShort(now: Date, updatedAtRaw: any) {
		const updatedAt = new Date(updatedAtRaw);
		const delta = intervalToDuration({
			start: updatedAt,
			end: now
		});

		if (delta.years > 0) {
			return `>${delta.years}y`;
		} else if (delta.months > 0) {
			return `>${delta.months}m`;
		} else if (delta.weeks > 0) {
			return `${delta.weeks}w`;
		} else if (delta.days > 0) {
			return `${delta.days}d`;
		} else if (delta.hours > 0) {
			return `${delta.hours}h`;
		} else if (delta.minutes > 0) {
			return `${delta.minutes}m`;
		} else {
			return `<1m`;
		}
	}

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
						<img class="icon approved" src="/checkmark.svg" alt="approved" />
					{:else if review.state === "COMMENTED"}
						<img class="icon commented" src="/alert.svg" alt="commented" />
					{:else}
						<img class="icon not-approved" src="/close.svg" alt="not-approved" />
					{/if}
					<em>
						{review.author.login}<span class="time">&nbsp;-&nbsp;{formatDistanceShort($now, review.updatedAt)}</span>
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
		display: flex;
		align-items: center;
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

	.me a {
		font-weight: var(--weight-bold);
		color: #2e86de;
	}

	.time {
		font-size: 0.7rem;
		font-weight: bold;
		color: #9d9d9d;
	}
</style>

<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Option } from "fp-ts/lib/Option.js";
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { getContext } from "svelte";
	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";

	import { __me } from "$lib/stores/keys";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components//molecules/SummaryLine.svelte";
	import ReviewPill from "$lib/components/molecules/ReviewPill.svelte";

	type Review = PullRequestQuery["repository"]["pullRequest"]["latestReviews"]["nodes"][number];

	export let reviews: Option<Review[]>;

	const me: Writable<string> = getContext(__me);
	const numReviews = map((reviews: Review[]) => reviews.length);

	$: reviewsReady = match(
		() => [],
		identity
	)(reviews) as Review[];
</script>

<SummaryLine icon="/icons/chatbubbles-outline.svg">
	<LineSkeleton await={numReviews(reviews)} let:ready={numReviews} width={42}>
		<b>{numReviews}</b>&nbsp;Review(s)
	</LineSkeleton>
	<ul class="reviews" slot="meta">
		{#each reviewsReady as review, i}
			<li in:fly={{ duration: 250, delay: i * 50, x: 25, easing: quintOut }}>
				<ReviewPill
					isMe={review.author.login === $me}
					author={review.author.login}
					url={review.url}
					state={review.state}
					updatedAt={review.updatedAt} />
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
		gap: var(--grid-1x);
	}

	.reviews li {
		display: block;
	}
</style>

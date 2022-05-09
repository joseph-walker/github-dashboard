<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";
	import { intervalToDuration } from "date-fns"

	import { me } from "$lib/stores/me";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components//molecules/SummaryLine.svelte";
	import ReviewPill from "$lib/components/molecules/ReviewPill.svelte";

	type Review = PullRequestQuery["repository"]["pullRequest"]["latestReviews"]["nodes"][number];

	export let reviews: Option<Review[]>;

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
		{#each reviewsReady as review}
			<li>
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
</style>

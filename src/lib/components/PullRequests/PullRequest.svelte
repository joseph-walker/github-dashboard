<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { makeQuery } from "./makeQuery";

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
		<p class="summary-line changes">
			<img class="file icon" src="/document-outline.svg" alt="files" />
			<span><b>{pr.changedFiles}</b>&nbsp;Changed File(s)</span>
			<span class="additions">+{pr.additions}</span>
			<span class="deletions">-{pr.deletions}</span>
		</p>
		<section class="comments">
			<p class="summary-line">
				<img class="comments icon" src="/chatbubble-outline.svg" alt="files" />
				<b>{pr.comments.totalCount}</b>&nbsp;Comment(s)
				{#if pr.comments.totalCount > 0}
					<button class="inline-action">Show</button>
				{/if}
			</p>
		</section>
		<section class="reviews">
			<p class="summary-line">
				<img class="reviews icon" src="/chatbubbles-outline.svg" alt="files" />
				<b>{pr.latestReviews.totalCount}</b>&nbsp;Review(s)
			</p>
			{#if pr.latestReviews.totalCount > 0}
				<ul class="reviewers">
					{#each pr.latestReviews.nodes as review}
						<li class:me={review.author.login === $me}>
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
			{/if}
		</section>
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

	a:visited {
		color: inherit;
	}

	.summary-line {
		display: flex;
		align-items: center;
	}

	.icon {
		height: 1.2rem;
		margin-right: 4px;
		/* Adjust icon placement for spacing issues */
		margin-bottom: 2px;
		margin-left: -2px;
	}

	.inline-action {
		font-size: 0.9rem;
		color: var(--font-color-light);
		cursor: pointer;
		margin-left: 8px;
	}

	.additions {
		color: #10ac84;
		font-weight: var(--weight-bold);
		margin-left: 8px;
	}

	.deletions {
		margin-left: 4px;
		color: #ee5253;
		font-weight: var(--weight-bold);
	}

	.reviewers {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
		margin-top: 6px;
	}

	.reviewers .icon {
		height: 1.3rem;
		padding: 2px;
		margin: 0;
		filter: invert(100%);
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.reviewers li a {
		display: flex;
		align-items: center;
		background: #f9f9f9;
		font-size: 0.8rem;
		cursor: pointer;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}

	.reviewers li a em {
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

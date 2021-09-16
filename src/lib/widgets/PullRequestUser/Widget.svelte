<script lang="ts">
	import { query } from '@urql/svelte';

	import { makeQuery } from './makeQuery';

	export let login: string;

	const { query: pullRequestUserQuery, pullRequestPaginator } = makeQuery(login, 5);

	query(pullRequestUserQuery);
</script>

<div class="pull-requests-for-user-widget">
	{#if $pullRequestUserQuery.data}
		<header>
			<img class="avatar" src={$pullRequestUserQuery.data.user.avatarUrl} alt="avatar" />
			<h2>Pull Requests for <b>{login}</b></h2>
			<div class="meta-data">
				<em><b>{$pullRequestUserQuery.data.user.pullRequests.totalCount}</b> Open PRs</em>
			</div>
		</header>
		<ul>
			{#each $pullRequestUserQuery.data.user.pullRequests.nodes as pr}
				<li class="pr-card">
					<h3>
						<a href={pr.url} target="_blank" rel="noopener noreferrer">{pr.title}</a>
						<span class="repo-name">{pr.repository.name}</span>
					</h3>
					<p class="summary-line changes">
						<img class="file icon" src="/document-outline.svg" alt="files" />
						<span><b>{pr.changedFiles}</b> Changed File(s)</span>
						<span class="additions">+{pr.additions}</span>
						<span class="deletions">-{pr.deletions}</span>
					</p>
					<div class="comments">
						<p class="summary-line">
							<img class="comments icon" src="/chatbubble-outline.svg" alt="files" />
							<b>{pr.comments.totalCount}</b>&nbsp;Comment(s)
							{#if pr.comments.totalCount > 0}
								<button class="inline-action">Show</button>
							{/if}
						</p>
					</div>
					<div class="reviews">
						<p class="summary-line">
							<img class="reviews icon" src="/chatbubbles-outline.svg" alt="files" />
							<b>{pr.latestReviews.totalCount}</b>&nbsp;Review(s)
							{#if pr.latestReviews.totalCount > 0}
								<button class="inline-action">Show</button>
							{/if}
						</p>
					</div>
				</li>
			{:else}
				<li class="no-content">No open PRs</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.pull-requests-for-user-widget {
		height: 100%; /* 100% of grid row - makes all widgets on a row the same height */
		background: white;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		font-size: 1rem;
		border-bottom: 1px solid var(--border-color);
		padding: 8px;
	}

	.meta-data {
		margin-left: auto;
	}

	.no-content {
		color: var(--font-color-light);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pr-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		box-shadow: var(--border-color) -1px 1px 0px;
		padding: 6px;
		margin-bottom: 8px;
		border-radius: 4px;
	}

	.pr-card:last-child {
		margin-bottom: 0;
	}

	.avatar {
		margin-right: 8px;
		border-radius: 100%;
		max-width: 24px;
		border: 1px solid var(--border-color);
	}

	b {
		font-weight: var(--weight-bold);
	}

	ul {
		flex: 1;
		list-style: none;
		padding: 8px;
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
</style>

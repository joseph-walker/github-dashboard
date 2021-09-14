<script lang="ts">
	import { query } from '@urql/svelte';

	import { makeQuery } from './makeQuery';

	export let login: string;

	const { query: pullRequestUserQuery, paginator } = makeQuery(login, 5);

	query(pullRequestUserQuery);
</script>

<div class="pull-requests-for-user-widget">
	{#if $pullRequestUserQuery.data}
		<header>
			<img src={$pullRequestUserQuery.data.user.avatarUrl} alt="avatar" />
			<h2>Pull Requests for <b>{login}</b></h2>
			<div class="meta-data">
				<em><b>{$pullRequestUserQuery.data.user.pullRequests.totalCount}</b> Open PRs</em>
			</div>
		</header>
		<ul>
			{#each $pullRequestUserQuery.data.user.pullRequests.nodes as pr}
				<li class="pr-card">
					<h3>{pr.title}<span class="repo-name">{pr.repository.name}</span></h3>
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
		display: block;
		box-shadow: var(--border-color) -1px 1px 0px;
		padding: 6px;
		margin-bottom: 6px;
		border-radius: 4px;
	}

	.pr-card:last-child {
		margin-bottom: 0;
	}

	img {
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
</style>

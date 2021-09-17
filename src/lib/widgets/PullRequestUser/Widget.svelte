<script lang="ts">
	import { query } from '@urql/svelte';

	import { makeQuery } from './makeQuery';
	import PullRequest from '$lib/components/PullRequest.svelte';

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
				<li><PullRequest {pr} /></li>
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
		height: 41px;
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

	.avatar {
		margin-right: 8px;
		border-radius: 100%;
		max-width: 24px;
		border: 1px solid var(--border-color);
	}

	ul {
		flex: 1;
		list-style: none;
		padding: 8px;
	}

	ul li {
		margin-bottom: 8px;
	}

	ul li:last-of-type {
		margin-bottom: 0;
	}
</style>

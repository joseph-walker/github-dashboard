<script lang="ts">
	import { makeRepoNameIso } from '$lib/gql/repoNameIso';
	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import { makeQuery, PullRequestAssignmentsQuery } from './makeQuery';
	import AssignedPullRequest from './AssignedPullRequest.svelte';

	const login = "joseph-walker";
	const repos = [["rentpath", "rent"], ["rentpath", "ag.js"]] as [string, string][];

	const repoIso = makeRepoNameIso(repos.map(rs => rs[1]));
	const assignedQuery = makeQuery(repos, repoIso);

	queryWithUtilization(assignedQuery);

	let assignedToMe: PullRequestAssignmentsQuery[string]["pullRequests"]["nodes"] = [];

	$: {
		if ($assignedQuery.data) {
			assignedToMe = [];

			for (const [_, repo] of repos) {
				assignedToMe = assignedToMe.concat(
					$assignedQuery
						.data[repoIso.safeName(repo)]
						.pullRequests
						.nodes
						.filter(pr => pr
							.assignees
							.nodes
							.map(a => a.login)
							.includes(login)
						)
					)
			}

			assignedToMe = assignedToMe;
		}
	}
</script>

<div class="assigned-prs-widget">
	<header>
		<h2><b>joseph-walker</b>'s Assigned PRs</h2>
		<div class="meta-data">
			<em><b>{assignedToMe.length}</b> Assigned PRs</em>
		</div>
	</header>
	<ul>
		{#each assignedToMe as pr}
			<li><AssignedPullRequest owner={pr.repository.owner.login} repo={pr.repository.name} prNumber={pr.number} /></li>
		{/each}
	</ul>
</div>

<style>
	.assigned-prs-widget {
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

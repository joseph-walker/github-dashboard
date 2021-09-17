<script lang="ts">
	import PullRequest from '$lib/components/PullRequest.svelte';
	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import { makeAssignedPullRequestQuery } from './makeQuery';

	export let owner: string;
	export let repo: string;
	export let prNumber: number;

	const prQuery = makeAssignedPullRequestQuery(owner, repo, prNumber);

	queryWithUtilization(prQuery);
</script>

{#if $prQuery.data}
	<PullRequest pr={prQuery.data.repository.pullRequest} />
{/if}

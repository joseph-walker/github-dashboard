<script lang="ts">
	import { query } from '@urql/svelte';

	import PullRequest from '$lib/components/PullRequest.svelte';
	import { makeAssignedPullRequestQuery } from './makeQuery';

	export let owner: string;
	export let repo: string;
	export let prNumber: number;

	const prQuery = makeAssignedPullRequestQuery(owner, repo, prNumber);

	query(prQuery);
</script>

{#if $prQuery.data}
	<PullRequest pr={prQuery.data.repository.pullRequest} />
{/if}

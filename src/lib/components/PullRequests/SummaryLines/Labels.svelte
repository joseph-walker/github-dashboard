<script lang="ts">
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import SummaryLine from "./SummaryLine.svelte";

	export let labels: PullRequestQuery["repository"]["pullRequest"]["labels"]["nodes"][number][];
</script>

<SummaryLine icon="/document-outline.svg">
	<b>{labels.length}</b>&nbsp;Label(s)
	<ul class="labels" slot="meta">
		{#each labels as label}
			<div class="label">
				<em class="flag" style={`background: #${label.color};`}></em>
				{label.name}
			</div>
		{/each}
	</ul>
</SummaryLine>

<style>
	.labels {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 8px;
	}

	.label {
		display: flex;
		align-items: center;
		background: #f9f9f9;
		font-size: 0.8rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		height: var(--summary-line-height);
		padding: 0 6px;
	}

	.flag {
		width: 10px;
		height: 10px;
		border-radius: 100%;
		display: block;
		margin-right: 6px;
		border: 1px solid var(--border-color);
	}
</style>

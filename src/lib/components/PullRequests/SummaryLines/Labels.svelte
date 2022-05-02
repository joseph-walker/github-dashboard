<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";

	import type { PullRequestQuery } from "$lib/generated/graphql";
	import LineSkeleton from "$lib/components/Skeletons/LineSkeleton.svelte";
	import SummaryLine from "../../molecules/SummaryLine.svelte";

	type Label = PullRequestQuery["repository"]["pullRequest"]["labels"]["nodes"][number];

	export let labels: Option<Label[]>;

	const numLabels = map((labels: Label[]) => labels.length);

	$: labelsReady = match(
		() => [],
		identity
	)(labels) as Label[];
</script>

<SummaryLine icon="/document-outline.svg">
	<LineSkeleton await={numLabels(labels)} let:ready={numLabels} width={28}>
		<b>{numLabels}</b>&nbsp;Label(s)
	</LineSkeleton>
	<ul class="labels" slot="meta">
		{#each labelsReady as label}
			<li class="label">
				<em class="flag" style={`background: #${label.color};`}></em>
				{label.name}
			</li>
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

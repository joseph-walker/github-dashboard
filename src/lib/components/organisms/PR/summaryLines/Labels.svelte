<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";

	import LabelPill from "$lib/components/molecules/LabelPill.svelte";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components/molecules/SummaryLine.svelte";

	type Label = PullRequestQuery["repository"]["pullRequest"]["labels"]["nodes"][number];

	export let labels: Option<Label[]>;

	const numLabels = map((labels: Label[]) => labels.length);

	$: labelsReady = match(
		() => [],
		identity
	)(labels) as Label[];
</script>

<SummaryLine icon="/icons/document-outline.svg">
	<LineSkeleton await={numLabels(labels)} let:ready={numLabels} width={28}>
		<b>{numLabels}</b>&nbsp;Label(s)
	</LineSkeleton>
	<ul class="labels" slot="meta">
		{#each labelsReady as label}
			<li>
				<LabelPill name={label.name} --flag-color={`#${label.color}`} />
			</li>
		{/each}
	</ul>
</SummaryLine>

<style>
	.labels {
		list-style: none;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: var(--grid-1x);
	}
</style>

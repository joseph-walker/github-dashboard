<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";
	import type { PullRequestQuery } from "$lib/generated/graphql";

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { identity } from "fp-ts/lib/function.js";
	import { map, match } from "fp-ts/lib/Option.js";

	import LabelPill from "$lib/components/molecules/LabelPill.svelte";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components/molecules/SummaryLine.svelte";
	import UpCounter from "$lib/components/atoms/UpCounter.svelte";

	type Label = PullRequestQuery["repository"]["pullRequest"]["labels"]["nodes"][number];

	export let labels: Option<Label[]>;

	const numLabels = map((labels: Label[]) => labels.length);

	$: labelsReady = match(
		() => [],
		identity
	)(labels) as Label[];
</script>

<SummaryLine icon="/icons/pricetag-outline.svg">
	<LineSkeleton await={numLabels(labels)} let:ready={numLabels} width={28}>
		<b><UpCounter countTo={numLabels} /></b>&nbsp;Label(s)
	</LineSkeleton>
	<ul class="labels" slot="meta">
		{#each labelsReady as label, i}
			<li in:fly={{ duration: 250, delay: i * 50, x: 25, easing: quintOut }}>
				<LabelPill name={label.name} --flag-color={`#${label.color}`} />
			</li>
		{/each}
	</ul>
</SummaryLine>

<style>
	.labels {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: var(--grid-1x);
	}

	.labels li {
		display: block;
	}
</style>

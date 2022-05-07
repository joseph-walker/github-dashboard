<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";

	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components/molecules/SummaryLine.svelte";

	export let changedFiles: Option<number>;
	export let additions: Option<number>;
	export let deletions: Option<number>;
</script>

<SummaryLine icon="/icons/document-outline.svg">
	<LineSkeleton await={changedFiles} let:ready={changedFiles} width={10}>
		<b>{changedFiles}</b>&nbsp;Changed File(s)
	</LineSkeleton>
	<svelte:fragment slot="meta">
		<LineSkeleton await={additions} let:ready={additions} width={3} --skeleton-color="var(--pr-diff-additions)">
			<b class="additions">+{additions}</b>
		</LineSkeleton>
		<LineSkeleton await={deletions} let:ready={deletions} width={3} --skeleton-color="var(--pr-diff-deletions)">
			<b class="deletions">-{deletions}</b>
		</LineSkeleton>
	</svelte:fragment>
</SummaryLine>

<style>
	.additions {
		color: var(--pr-diff-additions);
	}

	.deletions {
		color: var(--pr-diff-deletions);
	}
</style>

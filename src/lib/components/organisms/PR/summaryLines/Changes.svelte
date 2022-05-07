<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";

	import Text from "$lib/components/atoms/Text.svelte";
	import LineSkeleton from "$lib/components/atoms/LineSkeleton.svelte";
	import SummaryLine from "$lib/components/molecules/SummaryLine.svelte";

	export let changedFiles: Option<number>;
	export let additions: Option<number>;
	export let deletions: Option<number>;
</script>

<SummaryLine icon="/icons/document-outline.svg">
	<LineSkeleton await={changedFiles} let:ready={changedFiles} width={10}>
		<Text>
			<Text role="emphasis" bold>{changedFiles}</Text>&nbsp;Changed File(s)
		</Text>
	</LineSkeleton>
	<svelte:fragment slot="meta">
		<LineSkeleton await={additions} let:ready={additions} width={3} --skeleton-color="var(--pr-diff-additions)">
			<Text role="emphasis" bold --color="var(--pr-diff-additions)">+{additions}</Text>
		</LineSkeleton>
		<LineSkeleton await={deletions} let:ready={deletions} width={3} --skeleton-color="var(--pr-diff-deletions)">
			<Text role="emphasis" bold --color="var(--pr-diff-deletions)">-{deletions}</Text>
		</LineSkeleton>
	</svelte:fragment>
</SummaryLine>

<script lang="ts">
	import type { Option } from "fp-ts/Option";

	import LineSkeleton from "$lib/components/Skeletons/LineSkeleton.svelte";
	import SummaryLine from "./SummaryLine.svelte";

	export let changedFiles: Option<number>;
	export let additions: Option<number>;
	export let deletions: Option<number>;
</script>

<SummaryLine icon="/document-outline.svg">
	<LineSkeleton await={changedFiles} let:ready={changedFiles} width={10}>
		<b>{changedFiles}</b>&nbsp;Changed File(s)
	</LineSkeleton>
	<svelte:fragment slot="meta">
		<span class="additions">
			<LineSkeleton await={additions} let:ready={additions} width={3} color="#10ac84">
				+{additions}
			</LineSkeleton>
		</span>
		<span class="deletions">
			<LineSkeleton await={deletions} let:ready={deletions} width={3} color="#ee5253">
				-{deletions}
			</LineSkeleton>
		</span>
	</svelte:fragment>
</SummaryLine>

<style>
	.additions {
		color: #10ac84;
		font-weight: var(--weight-bold);
	}

	.deletions {
		color: #ee5253;
		font-weight: var(--weight-bold);
	}
</style>

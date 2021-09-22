<script lang="ts">
	import SummaryLine from "./SummaryLine.svelte";

	export let changedFiles: number;
	export let additions: number;
	export let deletions: number;
</script>

<SummaryLine icon="/document-outline.svg">
	<b>{changedFiles}</b>&nbsp;Changed File(s)
	<svelte:fragment slot="meta">
		<span class="additions">+{additions}</span>
		<span class="deletions">-{deletions}</span>
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

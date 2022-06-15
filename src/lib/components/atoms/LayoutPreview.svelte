<script lang="ts">
	export let layout: "1-col" | "2-col" | "3-col" | "custom";
</script>

{#if layout === "1-col"}
	<svg viewBox="0 0 110 110">
		<rect x="5" y="5" class="window" width="100" height="100" rx="3" />
		<rect x="10" y="10" class="widget" width="90" height="26.6666666667" rx="3" />
		<rect x="10" y="41.6666666667" class="widget" width="90" height="26.6666666667" rx="3" />
		<rect x="10" y="73.3333333334" class="widget" width="90" height="26.6666666667" rx="3" />
	</svg>
{:else if layout === "2-col"}
	<svg viewBox="0 0 110 110">
		<rect x="5" y="5" class="window" width="100" height="100" rx="3" />
		<rect x="10" y="10" class="widget" width="42.5" height="42.5" rx="3" />
		<rect x="57.5" y="10" class="widget" width="42.5" height="42.5" rx="3" />
		<rect x="10" y="57.5" class="widget" width="42.5" height="42.5" rx="3" />
		<rect x="57.5" y="57.5" class="widget" width="42.5" height="42.5" rx="3" />
	</svg>
{:else if layout === "3-col"}
	<svg viewBox="0 0 110 110">
		<rect x="5" y="5" class="window" width="100" height="100" rx="3" />
		<rect x="10" y="10" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="41.6666666667" y="10" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="73.3333333334" y="10" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="10" y="57.5" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="41.6666666667" y="57.5" class="widget" width="26.6666666667" height="42.5" rx="3" />
	</svg>
{:else}
	<svg viewBox="0 0 110 110">
		<rect x="5" y="5" class="window" width="100" height="100" rx="3" />
		<rect x="10" y="10" class="widget" width="58.3333333334" height="42.5" rx="3" />
		<rect x="10" y="57.5" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="41.6666666667" y="57.5" class="widget" width="26.6666666667" height="42.5" rx="3" />
		<rect x="73.3333333334" y="10" class="widget" width="26.6666666667" height="90" rx="3" />
	</svg>
{/if}

<style>
	.window {
		stroke: var(--global-border-color);
		stroke-width: 1pt;
		fill: var(--body-bg);
	}

	.widget {
		stroke: var(--global-border-color);
		stroke-width: 1pt;
		fill: var(--widget-background);
	}

	.text {
		text-anchor: middle;
	}
</style>

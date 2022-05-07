<script lang="ts">
	export let name: string;
</script>

<div class="label">
	<em class="flag"></em>
	<p>{name}</p>
</div>

<style>
	.label {
		display: inline-flex;
		align-items: center;
		background: var(--pill-background);
		font-size: 0.8rem;
		border: 1px solid var(--pill-border);
		border-radius: var(--pill-roundness);
		height: var(--summary-line-height);
		padding: 0 var(--grid-1x);
	}

	.flag {
		background-color: var(--flag-color);
		width: var(--off-grid);
		height: var(--off-grid);
		border-radius: 100%;
		display: block;
		margin-right: var(--grid-1x);
		border: 1px solid var(--pill-border);
	}
</style>

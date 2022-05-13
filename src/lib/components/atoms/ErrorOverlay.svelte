<script lang="ts">
	export let error: string;
</script>

<div class="error-overlay">
	<img src="/icons/bug-outline.svg" alt="error" />
	<p>
		<slot>Uh oh, something went wrong.</slot>
	</p>
	<code>{error}</code>
</div>

<style>
	.error-overlay {
		position: var(--position, static);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: var(--pr-error-overlay-background);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 0.8rem;
		gap: var(--grid-1x);
	}

	.error-overlay img {
		width: var(--grid-3x);
		height: var(--grid-3x);
	}

	.error-overlay code {
		font-family: monospace;
		background: var(--body-bg);
		border: 1px dashed var(--global-border-color);
		border-radius: var(--widget-roundness);
		padding: var(--grid-2x);
	}
</style>

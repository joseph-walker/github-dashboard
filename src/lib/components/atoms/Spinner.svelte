<script lang="ts">
	export let isLoading = false;
</script>

<div class="loader" class:isLoading />

<style>
	.loader {
		display: inline-block;
		width: var(--grid-2x);
		height: var(--grid-2x);
		border: var(--loading-spinner-thiccness) solid var(--loading-spinner-passive-color);
		border-radius: 100%;
		border-top-color: var(--loading-spinner-active-color);
		animation: spin 0.5s linear infinite;
		animation-play-state: paused;
	}

	.isLoading {
		animation-play-state: running;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

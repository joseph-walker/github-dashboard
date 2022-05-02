<script lang="ts">
	export let isLoading = false;
</script>

<div class="loader" class:isLoading />

<style>
	.loader {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 3px solid var(--border-color);
		border-radius: 100%;
		border-top-color: #2e86de;
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

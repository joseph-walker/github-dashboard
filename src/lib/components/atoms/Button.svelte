<script lang="ts">
	export let disabled: boolean = false;
</script>

<button on:click {disabled}>
	<slot></slot>
</button>

<style>
	button {
		font-size: 0.9rem;
		padding: 8px var(--global-gutter);
		border-radius: 4px;
		background: var(--button-color-primary);
		color: var(--button-text-primary);
		cursor: pointer;
	}

	button:disabled {
		cursor: initial;
		background: var(--button-color-disabled);
		color: var(--button-text-disabled);
	}
</style>

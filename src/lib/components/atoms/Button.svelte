<script lang="ts">
	export let disabled: boolean = false;
</script>

<button on:click {disabled}>
	<slot></slot>
</button>

<style>
	button {
		font-size: 0.9rem;
		padding: 8px var(--gutter-common);
		border-radius: 4px;
		background: var(--primary-blue);
		color: white;
		cursor: pointer;
	}

	button:disabled {
		cursor: initial;
		background: #f9f9f9;
		color: #d0d0d0;
	}
</style>

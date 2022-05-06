<script lang="ts">
	export let role: "button" | "link" = "button";
	export let disabled: boolean = false;
	export let href: string = "";
</script>

{#if role === "button"}
	<button on:click {disabled}>
		<slot></slot>
	</button>
{:else if role === "link"}
	<a {href}>
		<slot></slot>
	</a>
{/if}

<style>
	a,
	button {
		font-size: 0.9rem;
		padding: var(--grid-1x) var(--grid-2x);
		border-radius: var(--button-roundness);
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

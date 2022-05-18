<script lang="ts">
	export let role: "button" | "link" = "button";
	export let disabled: boolean = false;
	export let href: string = "";
	export let type: string | undefined = undefined;
</script>

{#if role === "button"}
	<button on:click {disabled} {type}>
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
		padding: 0 var(--grid-2x);
		height: var(--form-element-height);
		display: grid;
		place-items: center;
		border-radius: var(--button-roundness);
		background: var(--button-color-primary);
		color: var(--button-text-primary);
		cursor: pointer;

		/* Theme Easing */
		transition: background var(--theme-switch-easing),
			color var(--theme-switch-easing);
	}

	button:disabled {
		cursor: initial;
		background: var(--button-color-disabled);
		color: var(--button-text-disabled);
	}
</style>

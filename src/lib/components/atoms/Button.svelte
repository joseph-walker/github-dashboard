<script lang="ts">
	export let role: "button" | "link" = "button";
	export let disabled: boolean = false;
	export let href: string = "";
	export let type: string | undefined = undefined;
	export let theme: "primary" | "secondary" | "danger" = "primary";
</script>

{#if role === "button"}
	<button on:click on:mousedown on:mouseup {disabled} {type} class={theme}>
		<slot></slot>
	</button>
{:else if role === "link"}
	<a {href} class={theme}>
		<slot></slot>
	</a>
{/if}

<style>
	a,
	button {
		position: relative;
		font-size: 0.9rem;
		padding: 0 var(--grid-2x);
		height: var(--form-element-height);
		display: grid;
		place-items: center;
		border-radius: var(--button-roundness);
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

	.primary {
		background: var(--button-color-primary);
		color: var(--button-text-primary);
	}

	.secondary {
		background: var(--button-color-secondary);
		color: var(--button-text-secondary);
	}

	.danger {
		background: var(--button-color-danger);
		color: var(--button-text-danger);
	}
</style>

<script lang="ts">
	export let value: string | number;
	export let error: string = null;
	export let type: "text" | "number" = "text";
	export let placeholder: string = "";
</script>

<div class="field">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		{#if error === null}
			<slot></slot>
		{:else}
			{error}
		{/if}
	</label>
	{#if type === "text"}
		<input bind:value {placeholder} type="text" class:error />
	{:else if type === "number"}
		<input bind:value {placeholder} type="number" class:error />
	{/if}
</div>

<style>
	label {
		display: block;
		margin-left: 2px; /* Scoot over a smidge to make text visually lign up better */
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: var(--grid-4s);
	}

	input {
		height: var(--form-element-height);
		padding: 0 var(--grid-1x);
		background: var(--input-background);
		border-radius: var(--widget-roundness);
		width: 100%;
		border: 1px solid var(--global-border-color);
		box-shadow: rgba(255, 255, 255, 0) 0px 0px 0px 0px;
		transition: 0.1s ease-out box-shadow;
	}

	input:focus {
		box-shadow: var(--light-green) 0px 3px;
	}

	input.error {
		box-shadow: var(--red) 0px 3px;
	}
</style>

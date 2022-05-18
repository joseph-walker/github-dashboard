<script lang="ts">
	let className: string = undefined;

	export { className as class };
</script>

<div class={["widget", className].filter(c => c !== undefined).join(" ")}>
	{#if $$slots.header || $$slots.meta}
		<header>
			<slot name="header"></slot>
			<div class="meta">
				<slot name="meta"></slot>
			</div>
		</header>
	{/if}
	<slot></slot>
</div>

<style>
	.widget {
		height: var(--height, 100%); /* 100% of grid row - makes all widgets on a row the same height */
		background: var(--widget-background);
		border-radius: var(--widget-roundness);
		box-shadow: var(--widget-box-shadow);
		display: flex;
		flex-direction: column;
		padding: var(--global-gutter);

		/* Theme Easing */
		transition: background var(--theme-switch-easing);
	}

	header {
		display: flex;
		align-items: center;
		font-size: 1rem;
		border-bottom: 1px solid var(--global-border-color);
		margin: calc(var(--global-gutter) * -1);
		margin-bottom: var(--global-gutter);
		padding: var(--widget-title-bar-spacing) var(--global-gutter);
	}

	.meta {
		margin-left: auto;
	}
</style>

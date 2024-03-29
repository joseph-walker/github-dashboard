<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import Button from "$lib/components/atoms/Button.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";

	export let options: any[] | ReadonlyArray<any>;
	export let align: "left" | "right" = "left";
	export let theme: "primary" | "secondary" | "danger" = "primary";

	const dispatch = createEventDispatcher();

	let isOpen: boolean = false;

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function handleOnClickOption(option: any) {
		return () => {
			isOpen = false;
			dispatch('click-option', option);
		};
	}
</script>

<div class="placement-wrapper">
	<Button on:click={toggleOpen} {theme}>
		<div class="container-for-arrow">
			<slot></slot>
			<img src="/icons/chevron-down-outline.svg" alt="Options" />
		</div>
	</Button>
	{#if isOpen}
		<aside class:left={align === "left"} class:right={align === "right"}>
			<Widget>
				<ul class="options">
					{#each options as option}
						<li on:click={handleOnClickOption(option)}>
							<slot name="option" {option}></slot>
						</li>
					{/each}
				</ul>
			</Widget>
		</aside>
	{/if}
</div>

<style>
	.placement-wrapper {
		position: relative;
		display: inline-block;
	}

	.container-for-arrow {
		display: flex;
		align-items: center;
		gap: var(--grid-1x);
	}

	.options {
		margin: calc(var(--global-gutter) * -1);
	}

	.options li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--global-border-color);
    	height: var(--form-element-height);
		padding: 0 var(--global-gutter);
		cursor: pointer;
		white-space: nowrap;
	}

	.options li:hover {
		background: var(--button-color-primary);
		color: var(--button-text-primary);
	}

	.options li:first-child {
		border-top-left-radius: var(--widget-roundness);
		border-top-right-radius: var(--widget-roundness);
	}

	.options li:last-child {
		border-bottom-left-radius: var(--widget-roundness);
		border-bottom-right-radius: var(--widget-roundness);
		border-bottom: none;
	}

	aside {
		min-width: 100%;
		max-width: 512px;
		position: absolute;
		top: calc(100% + var(--grid-1x));
		z-index: 10;
	}

	aside.left {
		left: 0;
	}

	aside.right {
		right: 0;
	}

	img {
		width: var(--grid-2x);
		filter: invert(1);
	}
</style>

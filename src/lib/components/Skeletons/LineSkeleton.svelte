<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";

	import { identity } from "fp-ts/lib/function.js";
	import { match } from "fp-ts/lib/Option.js";

	const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

	export let color = "var(--border-color)";
	export let width = 10;

	const skeletonText = placeholder.slice(0, width);

	let option: Option<any>; export { option as await };

	$: ready = match(
		() => undefined,
		identity
	)(option) as any;
</script>

{#if ready !== undefined}
	<slot {ready}></slot>
{:else}
	<span style={`background: ${color};`}>{skeletonText}</span>
{/if}

<style>
	span {
		color: transparent;
		border-radius: 4px;
	}
</style>

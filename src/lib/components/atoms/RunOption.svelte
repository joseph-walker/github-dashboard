<script lang="ts">
	import type { Option } from "fp-ts/lib/Option.js";

	import { fold } from "fp-ts/lib/Option.js";

	export let option: Option<any>;

	$: [tag, some] = fold(
		() => ["none", undefined],
		s => ["some", s]
	)(option);
</script>

{#if tag == "none"}
	<slot name="none"></slot>
{:else}
	<slot name="some" {some}></slot>
{/if}

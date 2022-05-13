<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { __configuration } from "$lib/stores/keys";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);
</script>

<pre>Application Configuration:<br />{JSON.stringify($configuration, null, 4)}</pre>

<style>
	pre {
		white-space: pre;
		background: var(--slate);
		color: var(--white);
		font-family: monospace;
		margin-top: var(--global-gutter);
		padding: var(--global-gutter);
		border-radius: var(--slightly-rounded);
		box-shadow: rgba(34, 47, 62, 0.4) 5px 5px,
			rgba(34, 47, 62, 0.3) 10px 10px,
			rgba(34, 47, 62, 0.2) 15px 15px,
			rgba(34, 47, 62, 0.1) 20px 20px,
			rgba(34, 47, 62, 0.05) 25px 25px;
	}
</style>

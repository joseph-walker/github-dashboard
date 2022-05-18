<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Lens } from "monocle-ts";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { themeLens } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import ThemeSwitcher from "$lib/components/atoms/ThemeSwitcher.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Lens<HoardboardConfiguration, HoardboardConfiguration>;

	const themeFocus = focus
		.composeLens(themeLens);

	let theme = themeFocus.get($configuration);

	$: {
		configuration.update(themeFocus.set(theme));
	}
</script>

<ThemeSwitcher bind:theme />

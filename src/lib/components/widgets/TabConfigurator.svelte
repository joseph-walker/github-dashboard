<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Optional } from "monocle-ts";

	import type { HoardboardConfiguration, Tab } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { tabNameLens, withDefaultEmptyString } from "$lib/stores/configuration";
	import { __configuration } from "$lib/stores/keys";
	import Input from "$lib/components/atoms/Input.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	export let focus: Optional<HoardboardConfiguration, Tab>;

	const tabNameFocus = focus
		.composeLens(tabNameLens);

	let tabName: string = withDefaultEmptyString(tabNameFocus)($configuration);

	$: {
		configuration.update(tabNameFocus.set(tabName));
	}
</script>

<form>
	<Input bind:value={tabName}>Tab Name</Input>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--global-gutter);
	}
</style>

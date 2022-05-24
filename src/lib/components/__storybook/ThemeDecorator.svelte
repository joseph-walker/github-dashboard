<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { __configuration } from "$lib/stores/keys";
	import Button from "$lib/components/atoms/Button.svelte";
	import ThemeController from "$lib/components/organisms/ThemeController.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	function toggleTheme() {
		if ($configuration.theme === "light") {
			$configuration.theme = "dark";
		} else {
			$configuration.theme = "light";
		}
	}
</script>

<slot></slot>

<div class="fix">
	<Button on:click={toggleTheme}>Toggle Theme</Button>
</div>

<ThemeController synchronize={false} />

<style>
	.fix {
		position: absolute;
		bottom: 16px;
		right: 16px;
	}
</style>

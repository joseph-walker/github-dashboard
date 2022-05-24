<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext, onMount } from "svelte";

	import { __configuration } from "$lib/stores/keys";

	import DarkTheme from "$lib/components/molecules/DarkTheme.svelte";
	import LightTheme from "$lib/components/molecules/LightTheme.svelte";

	export let synchronize: boolean = true;

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	$: activeTheme = $configuration.theme;

	onMount(function () {
		if (!synchronize) return;

		let debounce: NodeJS.Timeout;

		configuration.subscribe(function (nextConfig) {
			if (activeTheme != nextConfig.theme) {
				if (debounce) clearTimeout(debounce);

				debounce = setTimeout(function () {
					fetch("/app/syncThemeToSession", {
						method: "POST",
						body: nextConfig.theme
					}).catch(() => {});
				}, 250);
			}
		});

		return () => debounce && clearTimeout(debounce);
	});
</script>

{#if activeTheme === "light"}
	<LightTheme />
{:else}
	<DarkTheme />
{/if}

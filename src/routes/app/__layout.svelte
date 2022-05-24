<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async function load(request) {
		if (!request.session.accessToken) {
			return {
				status: 301,
				redirect: "/"
			}
		}

		return {
			props: {
				// @ts-ignore
				token: request.session.accessToken,
				theme: request.session.theme ?? "light"
			}
		};
	}
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { gql, operationStore, initClient, dedupExchange, fetchExchange } from '@urql/svelte';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { devtoolsExchange } from '@urql/devtools';

	import { emptyConfiguration, type HoardboardConfiguration } from "$lib/stores/configuration";
	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { me } from "$lib/stores/me";
	import { remaining } from "$lib/stores/remaining";
	import { __configuration, __me, __remaining } from "$lib/stores/keys";

	import NavBar from "$lib/components/organisms/NavBar.svelte";
	import DarkTheme from "$lib/components/organisms/DarkTheme.svelte";
	import LightTheme from "$lib/components/organisms/LightTheme.svelte";

	export let theme: HoardboardConfiguration["theme"];
	export let token: string;

	const configuration = writable<HoardboardConfiguration>({
		...emptyConfiguration,
		theme
	});

	$: activeTheme = $configuration.theme;

	setContext(__configuration, configuration);
	setContext(__remaining, remaining);
	setContext(__me, me);

	initClient({
		url: 'https://api.github.com/graphql',
		exchanges: [
			devtoolsExchange,
			dedupExchange,
			cacheExchange({}),
			fetchExchange
		],
		fetchOptions: () => {
			return {
				headers: { authorization: `Bearer ${token}` }
			};
		}
	});

	onMount(function () {
		let debounce: NodeJS.Timeout;

		const localConfig = localStorage.getItem("widget_config");

		if (localConfig) {
			configuration.set(JSON.parse(localConfig) as HoardboardConfiguration);
		}

		configuration.subscribe(function (nextConfig) {
			window.localStorage.setItem("widget_config", JSON.stringify(nextConfig));

			if (activeTheme != nextConfig.theme) {
				if (debounce) clearTimeout(debounce);

				debounce = setTimeout(function () {
					fetch("/app/syncThemeToSession", {
						method: "POST",
						body: nextConfig.theme
					});
				}, 250);
			}
		});

		return () => debounce && clearTimeout(debounce);
	});

	const meQuery = operationStore(gql`
		query WhoAmI {
			viewer {
				login
			}
		}
	`);

	queryWithUtilization(meQuery);

	$: {
		if ($meQuery.data) {
			$me = $meQuery.data.viewer.login;
		}
	}
</script>

{#if activeTheme === "light"}
	<LightTheme />
{:else}
	<DarkTheme />
{/if}

<NavBar />

<slot></slot>

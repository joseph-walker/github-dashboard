<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async function load(request) {
		// @ts-ignore
		if (!request.session?.accessToken) {
			return {
				status: 301,
				redirect: "/"
			}
		}

		return {
			props: {
				// @ts-ignore
				token: request.session?.accessToken
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { gql, operationStore, initClient, dedupExchange, fetchExchange } from '@urql/svelte';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { devtoolsExchange } from '@urql/devtools';

	import { configuration, type WidgetConfig } from "$lib/stores/configuration";
	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import { me } from "$lib/stores/me";

	import NavBar from "$lib/components/organisms/NavBar.svelte";

	export let token: string;

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
		configuration.set(JSON.parse(localStorage.getItem("widget_config")) || {} as WidgetConfig);
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

<NavBar />
<slot></slot>

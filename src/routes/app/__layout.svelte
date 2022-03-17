<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async function load(request) {
		return {
			props: {
				token: request.session.accessToken
			}
		};
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { gql, operationStore, initClient, dedupExchange, fetchExchange } from '@urql/svelte';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { devtoolsExchange } from '@urql/devtools';

	import { AuthenticationError } from "$lib/AuthenticationError";
	import GithubAuth from "$lib/components/GithubAuth.svelte";
	import { queryWithUtilization } from "$lib/queryWithUtilization";
	import NavBar from "$lib/components/NavBar.svelte";

	export let token: string;

	let authenticated = false;

	if (!token) {
		throw new AuthenticationError();
	}

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

	authenticated = true;

	const me = writable<string | undefined>(undefined);
	setContext("me", me);

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
			me.set($meQuery.data.viewer.login);
		}
	}
</script>

{#if authenticated}
	<NavBar />
	<slot></slot>
{:else}
	<GithubAuth />
{/if}

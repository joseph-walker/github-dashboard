<script>
	import { setContext } from "svelte";
	import { initClient, dedupExchange, fetchExchange } from '@urql/svelte';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { devtoolsExchange } from '@urql/devtools';

	import { __configuration, __remaining } from "$lib/stores/keys";
	import { configuration } from "$lib/components/__storybook/fixtures/configuration";
	import { remaining } from "$lib/components/__storybook/fixtures/remaining";

	// @ts-ignore
	const token = GITHUB_AUTH_TOKEN_FOR_STORYBOOK;

	setContext(__configuration, configuration);
	setContext(__remaining, remaining);

	// TODO: Move this to a function so the prod app and storybook can use the same client?
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
</script>

<slot></slot>

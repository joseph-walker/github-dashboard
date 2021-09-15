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
	import { initClient, defaultExchanges } from '@urql/svelte';
	import { devtoolsExchange } from '@urql/devtools';

	import GithubAuth from "$lib/components/GithubAuth.svelte";

	export let token: string;

	let authenticated = false;

	if (token) {
		initClient({
			url: 'https://api.github.com/graphql',
			exchanges: [devtoolsExchange, ...defaultExchanges],
			fetchOptions: () => {
				return {
					headers: { authorization: `Bearer ${token}` }
				};
			}
		});

		authenticated = true;
	}
</script>

{#if authenticated}
	<slot></slot>
{:else}
	<GithubAuth />
{/if}

<svelte:head>
	<style>
		@namespace svg "http://www.w3.org/2000/svg";

		:not(svg|*) {
			all: unset;
			display: revert;
			box-sizing: border-box;
		}
	</style>
</svelte:head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

	:global(html) {
		font-size: 14px;
	}

	:global(body) {
		font-weight: 400;
		background: var(--body-bg);
		color: var(--font-color);
		font-family: 'Nunito', sans-serif;
	}

	:global(html, body, #svelte) {
		height: 100%;
	}

	:root {
		--body-bg: #f7f7f7;
		--border-color: #ebebeb;
		--font-color: #333;
		--font-color-light: #999;
		--weight-normal: 400;
		--weight-bold: 700;
	}
</style>

<script lang="ts">
	import { initClient, defaultExchanges } from '@urql/svelte';
	import { devtoolsExchange } from '@urql/devtools';

	initClient({
		url: 'https://api.github.com/graphql',
		exchanges: [devtoolsExchange, ...defaultExchanges],
		fetchOptions: () => {
			const token = '';

			return {
				headers: { authorization: `Bearer ${token}` }
			};
		}
	});
</script>

<slot></slot>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
	@namespace svg "http://www.w3.org/2000/svg";

	:global(:not(svg|*)) {
		all: unset;
		display: revert;
		box-sizing: border-box;
	}

	:global(html) {
		font-size: 14px;
	}

	:global(body) {
		font-weight: 400;
		background: var(--body-bg);
		color: var(--font-color);
		font-family: 'Nunito', sans-serif;
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

import { readable } from 'svelte/store';

/** @type {typeof import('$app/stores')['page']} */
export const page = readable({
	url: {
		pathname: "/app/storybook"
	}
})

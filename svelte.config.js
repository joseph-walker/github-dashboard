import netlifyAdapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: netlifyAdapter(),
		vite: {
			optimizeDeps: {
				exclude: ['svelte-kit-cookie-session'],
			},
		},
	}
};

export default config;

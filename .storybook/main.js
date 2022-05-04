const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const preprocess = require('svelte-preprocess');

module.exports = {
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: [/\.stories\.js$/, /index\.js$/],
			use: [require.resolve('@storybook/source-loader')],
			include: [path.resolve(__dirname, '../src')],
			enforce: 'pre'
		});

		config.resolve.alias = {
			...config.resolve.alias,
			$lib: path.resolve(__dirname, '../src/lib'),
			$app: path.resolve(__dirname, '../.storybook/app/')
		};

		config.plugins.push(
			new webpack.DefinePlugin({
				ICONS_FROM_WEBPACK_INTROSPECTION: JSON.stringify(
					fs.readdirSync(path.join(__dirname, "../static/icons"))
				)
			})
		);

		return config;
	},
	stories: [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-svelte-csf"
	],
	framework: "@storybook/svelte",
	staticDirs: [
		"../static"
	],
	svelteOptions: {
		"preprocess": preprocess()
	}
}

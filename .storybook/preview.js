import StorybookDecorator from "$lib/components/__storybook/StorybookDecorator.svelte";

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};

export const decorators = [() => StorybookDecorator];

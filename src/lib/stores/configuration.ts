import { writable } from 'svelte/store';

export type WidgetConfig = {
	[slug: string]: {
		tabName: string,
		widgets: ReadonlyArray<{
			widget: string,
			args: Record<string, string>,
			placement: [number, number, number, number]
		}>
	}
};

export const configuration = writable<WidgetConfig>({} as WidgetConfig);

configuration.subscribe(function (nextConfig) {
	// TODO: Revisit this
	if (window && Object.keys(nextConfig).length) {
		window.localStorage.setItem("widget_config", JSON.stringify(nextConfig));
	}
});

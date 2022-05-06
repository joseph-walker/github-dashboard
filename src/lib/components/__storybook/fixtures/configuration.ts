import type { WidgetConfig } from '$lib/stores/configuration';

import { writable } from 'svelte/store';

const storybookConfig: WidgetConfig = {
	['storybook']: {
		tabName: "Storybook",
		widgets: []
	}
}

export const configuration = writable<WidgetConfig>(storybookConfig as WidgetConfig);

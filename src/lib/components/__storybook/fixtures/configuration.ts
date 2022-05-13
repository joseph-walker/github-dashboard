import type { HoardboardConfiguration } from '$lib/stores/configuration';

import { writable } from 'svelte/store';

const storybookConfig: HoardboardConfiguration = {
	tabs: [
		{
			name: "Storybook",
			widgets: [
				{
					type: "__PRSearchWidget",
					placement: [1, 3, 1, 2],
					title: "Storybook",
					args: {
						"searchQuery": "is:pr"
					}
				}
			]
		}
	]
};

export const configuration = writable<HoardboardConfiguration>(storybookConfig);

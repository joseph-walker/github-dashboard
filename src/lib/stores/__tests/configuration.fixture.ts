import type { HoardboardConfiguration } from "../configuration";

export const mockConfiguration: HoardboardConfiguration = {
	theme: "light",
	tabs: [
		{
			name: "Test A | 3 Rows",
			widgets: [
				{
					type: "__PRSearchWidget",
					title: "Search A",
					placement: [1, 7, 1, 2],
					args: {
						searchQuery: ""
					}
				},
				{
					type: "__PRSearchWidget",
					title: "Search B",
					placement: [1, 7, 2, 3],
					args: {
						searchQuery: ""
					}
				},
				{
					type: "__PRSearchWidget",
					title: "Search C",
					placement: [1, 7, 3, 4],
					args: {
						searchQuery: ""
					}
				}
			]
		},
		{
			name: "Test B | 2 Columns",
			widgets: [
				{
					type: "__PRSearchWidget",
					title: "Search A",
					placement: [1, 4, 1, 2],
					args: {
						searchQuery: ""
					}
				},
				{
					type: "__PRSearchWidget",
					title: "Search B",
					placement: [4, 7, 1, 2],
					args: {
						searchQuery: ""
					}
				}
			]
		}
	]
};

import type { WidgetType } from "$lib/stores/configuration";

// TODO: Maybe use a actual folder name for descriminant so this isn't necessary?
export function getWidgetImportPathSlug(widgetType: WidgetType) {
	switch (widgetType) {
		case "__PRSearchWidget": return 'SearchPRs';
		default: {
			const unknownWidgetType: never = widgetType;
			throw new Error(`Unknown widget type ${unknownWidgetType}`);
		}
	}
}

import type { WidgetType } from "$lib/stores/configuration";

// TODO: Maybe use a actual folder name for descriminant so this isn't necessary?
// Future Me: No, I don't think I will.
export function getWidgetImportPathSlug(widgetType: WidgetType) {
	switch (widgetType) {
		case "__PRSearchWidget": return 'SearchPRs';
		case "__ReviewBalanceWidget": return 'ReviewBalance';
		default: {
			const unknownWidgetType: never = widgetType;
			throw new Error(`Unknown widget type ${unknownWidgetType}`);
		}
	}
}

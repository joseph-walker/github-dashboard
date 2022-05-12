import type { Eq } from 'fp-ts/lib/Eq';

import { writable } from 'svelte/store';
import { fromTraversable, Lens, Prism } from "monocle-ts";
import { indexReadonlyArray } from "monocle-ts/lib/Index/ReadonlyArray";
import { Traversable as readonlyArrayTraversableInstance, uniq, map } from "fp-ts/lib/ReadonlyArray";
import { Eq as stringEq, replace, toLowerCase, trim } from "fp-ts/lib/string";
import { flow } from "fp-ts/lib/function";

type Placement = [number, number, number, number];

type BaseWidget<T extends string> = {
    type: T;
    title: string;
    placement: Placement;
}

type PRSearchWidget = BaseWidget<"__PRSearchWidget"> & {
    args: {
        searchQuery: string;
    }
}

type WidgetUnion
    = PRSearchWidget;

export type WidgetType =
	WidgetUnion['type']

export type Tab = {
	name: string;
	widgets: ReadonlyArray<WidgetUnion>;
}

export type HoardboardConfiguration = {
    tabs: ReadonlyArray<Tab>;
}

// Lenses
// Generic Lenses
export const allTabsLens = Lens.fromProp<HoardboardConfiguration>()('tabs');
export const widgetsLens = Lens.fromProp<Tab>()('widgets');
const tabNameLens = Lens.fromProp<Tab>()('name');
const titleLens = Lens.fromProp<WidgetUnion>()('title');
const placementLens = Lens.fromProp<WidgetUnion>()('placement');

// Type-Specific Lenses: PRSearch
const prSearchArgsLens = Lens.fromProp<PRSearchWidget>()('args');
const searchStringLens = Lens.fromProp<PRSearchWidget['args']>()('searchQuery');

// Traversals
const widgetsTraversal = fromTraversable(readonlyArrayTraversableInstance)<WidgetUnion>();
const tabsTraversal = fromTraversable(readonlyArrayTraversableInstance)<Tab>();
const widgetAt = indexReadonlyArray<WidgetUnion>();

// Prisms
const prSearchPrism = Prism.fromPredicate<WidgetUnion, PRSearchWidget>(
    (unknownWidget): unknownWidget is PRSearchWidget => unknownWidget.type === "__PRSearchWidget"
);

// Instances
const tabEq: Eq<string> = {
	equals: (tabA, tabB) => tabA === tabB || tabToSlug(tabA) === tabToSlug(tabB)
};

export const tabToSlug = flow(
    toLowerCase,
    replace(/\s+/, "-"),
    trim
);

// Convenient Compositions
const tabsLens = allTabsLens
    .composeTraversal(tabsTraversal);

export const getTabs = flow(
    tabsLens
		.composeLens(tabNameLens)
		.asFold()
		.getAll,
    uniq(stringEq)
);

export const getTabsAndSlugs = flow(
	getTabs,
	map(
		tab => ({ tab, slug: tabToSlug(tab) })
	)
);

export const getWidgetsInTab = (tab: string) => allTabsLens
    .composeTraversal(tabsTraversal)
    	.filter(refinement => tabEq.equals(refinement.name, tab))
	.composeLens(widgetsLens)
	.composeTraversal(widgetsTraversal)
    .asFold()
    .getAll;

export const widgetAtIndexOptional = (idx: number) => widgetsLens
    .composeOptional(widgetAt.index(idx));

const emptyConfiguration: HoardboardConfiguration = {
	tabs: []
};

export const configuration = writable<HoardboardConfiguration>(emptyConfiguration);

// TODO: This broke with new config format
// configuration.subscribe(function (nextConfig) {
// 	if (typeof window !== 'undefined' && Object.keys(nextConfig).length) {
// 		window.localStorage.setItem("widget_config", JSON.stringify(nextConfig));
// 	}
// });

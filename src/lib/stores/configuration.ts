import type { Eq } from 'fp-ts/Eq';

import { writable } from 'svelte/store';
import { fromTraversable, Lens, Optional, Prism } from "monocle-ts";
import { indexReadonlyArray } from "monocle-ts/lib/Index/ReadonlyArray";
import { Traversable as readonlyArrayTraversableInstance, uniq, map } from "fp-ts/ReadonlyArray";
import { Eq as stringEq, replace, toLowerCase, trim } from "fp-ts/string";
import { flow } from "fp-ts/function";
import { getOrElse } from 'fp-ts/Option';

type Placement = [number, number, number, number];

type BaseWidget<T extends string> = {
    type: T;
    title: string;
    placement: Placement;
}

export type PRSearchWidget = BaseWidget<"__PRSearchWidget"> & {
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
export const tabNameLens = Lens.fromProp<Tab>()('name');
export const titleLens = Lens.fromProp<WidgetUnion>()('title');
export const placementLens = Lens.fromProp<WidgetUnion>()('placement');
export const argsLens = Lens.fromProp<WidgetUnion>()('args');

// Type-Specific Lenses: PRSearch
const prSearchArgsLens = Lens.fromProp<PRSearchWidget>()('args');
const searchQueryLens = Lens.fromProp<PRSearchWidget['args']>()('searchQuery');
export const searchQueryArgLens = prSearchArgsLens
	.composeLens(searchQueryLens);

// Traversals
const widgetsTraversal = fromTraversable(readonlyArrayTraversableInstance)<WidgetUnion>();
const tabsTraversal = fromTraversable(readonlyArrayTraversableInstance)<Tab>();
const widgetAt = indexReadonlyArray<WidgetUnion>();
const tabAt = indexReadonlyArray<Tab>();

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
export const tabsLens = allTabsLens
    .composeTraversal(tabsTraversal);

export const tabAtIndexOptional = (i: number) => allTabsLens
	.composeOptional(tabAt.index(i));

export const widgetAtIndexInTabOptional = (i: number) => (tabLens: ReturnType<typeof tabAtIndexOptional>) => tabLens
	.composeLens(widgetsLens)
	.composeOptional(widgetAt.index(i));

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

// Convenient Helpers
export const withDefaultEmptyString = (option: Optional<HoardboardConfiguration, string>) => flow(
	option.getOption,
	getOrElse(() => "")
);

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

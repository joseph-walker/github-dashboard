import type { Eq } from 'fp-ts/Eq';

import { fromTraversable, Lens, Optional, Prism } from "monocle-ts";
import { id } from "monocle-ts/lib/Lens.js";
import { indexReadonlyArray } from "monocle-ts/lib/Index/ReadonlyArray.js";
import { Traversable as readonlyArrayTraversableInstance, map, mapWithIndex, deleteAt, head } from "fp-ts/lib/ReadonlyArray.js";
import { replace, toLowerCase, trim } from "fp-ts/lib/string.js";
import { flow } from "fp-ts/lib/function.js";
import { getOrElse } from 'fp-ts/lib/Option.js';
import { max, concatAll } from "fp-ts/lib/Monoid.js";
import { Bounded } from "fp-ts/lib/number.js";
import { elem } from 'fp-ts/lib/Array';

export type PlacementType = "1-col" | "2-col" | "3-col" | "custom";
export type Placement = [number, number, number, number];
export type Theme = "light" | "dark";

type BaseWidget<T extends string, Args extends {}> = {
    type: T;
    title: string;
    placement: Placement;
	args: Args;
}

export type PRSearchWidget = BaseWidget<"__PRSearchWidget", {
    searchQuery: string;
}>

export type WidgetUnion
    = PRSearchWidget;

export type WidgetType =
	WidgetUnion['type']

export type Tab = {
	name: string;
	widgets: ReadonlyArray<WidgetUnion>;
	placementType: PlacementType;
}

export type HoardboardConfiguration = {
	theme: Theme;
    tabs: ReadonlyArray<Tab>;
}

const rootId = id<HoardboardConfiguration>();

/** rootId :: Lens HoardboardConfiguration HoardboardConfiguration */
export const hoardboardRootConfigIdentityLens = new Lens(rootId.get, rootId.set);

/** allTabsLens :: Lens HoardboardConfiguration Tab[] */
export const allTabsLens = Lens.fromProp<HoardboardConfiguration>()('tabs');

/** widgetsLens :: Lens Tab PRSearchWidget[] */
export const widgetsLens = Lens.fromProp<Tab>()('widgets');

/** tabNameLens :: Lens Tab string */
export const tabNameLens = Lens.fromProp<Tab>()('name');

/** titleLens :: Lens PRSearchWidget string */
export const titleLens = Lens.fromProp<WidgetUnion>()('title');

/** placementLens :: Lens PRSearchWidget Placement */
export const placementLens = Lens.fromProp<WidgetUnion>()('placement');

/** argsLens :: Args a => Lens WidgetUnion a */
export const argsLens = Lens.fromProp<WidgetUnion>()('args');

/** widgetTypeLens :: Lens PRSearchWidget, WidgetType> */
export const widgetTypeLens = Lens.fromProp<WidgetUnion>()('type');

/** themeLens :: Lens HoardboardConfiguration Theme */
export const themeLens = Lens.fromProp<HoardboardConfiguration>()('theme');

/** placementTypeLens :: Lens Tab PlacementType */
export const placementTypeLens = Lens.fromProp<Tab>()("placementType");

/** prSearchArgsLens :: Lens PRSearchWidget PRSearchArgs */
const prSearchArgsLens = Lens.fromProp<PRSearchWidget>()('args');

/** searchQueryLens :: Lens PRSearchArgs string */
const searchQueryLens = Lens.fromProp<PRSearchWidget['args']>()('searchQuery');

/** searchQueryArgLens :: Lens PRSearchWidget string */
export const searchQueryArgLens = prSearchArgsLens
	.composeLens(searchQueryLens);

/** widgetsTraversal :: Traversal PRSearchWidget[] PRSearchWidget */
const widgetsTraversal = fromTraversable(readonlyArrayTraversableInstance)<WidgetUnion>();

/** tabsTraversal :: Traversal Tab[] Tab */
const tabsTraversal = fromTraversable(readonlyArrayTraversableInstance)<Tab>();

/** widgetAt :: Index PRSearchWidget[] number PRSearchWidget */
export const widgetAt = indexReadonlyArray<WidgetUnion>();

/** tabAt :: Index Tab[] number Tab */
export const tabAt = indexReadonlyArray<Tab>();

/** instance Eq Tab */
export const tabEq: Eq<string> = {
	equals: (tabA, tabB) => tabA === tabB || tabToSlug(tabA) === tabToSlug(tabB)
};

/** tabToSlug :: string -> string */
export const tabToSlug = flow(
    toLowerCase,
    trim,
    replace(/[^\w]+/g, "-")
);

/** tabsLens :: Traversal HoardboardConfiguration Tab */
export const tabsLens = allTabsLens
    .composeTraversal(tabsTraversal);

/** tabAtIndexOptional :: Int -> Optional HoardboardConfiguration Tab */
export const tabAtIndexOptional = (i: number) => allTabsLens
	.composeOptional(tabAt.index(i));

/** widgetsInTabAtIndexOptional :: Int -> Optional HoardboardConfiguration PRSearchWidget[] */
export const widgetsInTabAtIndexOptional = (i: number) => tabAtIndexOptional(i)
	.composeLens(widgetsLens);

/** widgetAtIndexInTabOptional :: Int -> Optional HoardboardConfiguration Tab => Optional HoardboardConfiguration WidgetUnion */
export const widgetAtIndexInTabOptional = (i: number) => (tabLens: ReturnType<typeof tabAtIndexOptional>) => tabLens
	.composeLens(widgetsLens)
	.composeOptional(widgetAt.index(i));

/**
 * getTabs :: HoardboardConfiguration -> string[]
 *
 * Get all the tabs in the configuration as a list of strings
 *
 * @param configuration
 * @returns
 */
export const getTabs = tabsLens
	.composeLens(tabNameLens)
	.asFold()
	.getAll;

/** getTabsWithIdxs :: HoardboardConfiguration -> (Int, string)[] */
export const getTabsWithIdxs = flow(
	getTabs,
	mapWithIndex((idx, tab: string) => [idx, tab] as const)
);

/**
 * getTabsAndSlugs :: HoardboardConfiguration -> { tab: string; slug: string; }[]
 *
 * Extract all the tabs from the configuration and get their slugs too.
 *
 * @param configuration
 * @returns
 */
export const getTabsAndSlugs = flow(
	getTabs,
	map(
		tab => ({ tab, slug: tabToSlug(tab) })
	)
);

/**
 * tabByName :: string -> Traversal HoardboardConfiguration Tab
 *
 * Given a tab name, return the tab traveral that narrows to it.
 *
 * @param tab
 * @returns
 */
export const tabByName = (tab: string) => allTabsLens
	.composeTraversal(tabsTraversal)
		.filter(refinement => tabEq.equals(refinement.name, tab))

/**
 * getWidgetsInTab :: string -> HoardboardConfiguration -> WidgetUnion[]
 *
 * Given a tab name, return all the widgets in that tab.
 *
 * @param tab
 * @returns
 */
export const getWidgetsInTab = (tab: string) => tabByName(tab)
	.composeLens(widgetsLens)
	.composeTraversal(widgetsTraversal)
    .asFold()
    .getAll;

/**
 * getPlacementTypeForTab :: string -> HoardboardConfiguration -> PlacementType
 *
 * Given a tab name, return the placement type for it - used to determine
 * how to lay out the widgets on this tab.
 *
 * @param tab
 * @returns
 */
export const getPlacementTypeForTab = (tab: string): (configuration: HoardboardConfiguration) => PlacementType => flow(
	tabByName(tab)
		.composeLens(placementTypeLens)
		.asFold()
		.getAll,
	head,
	getOrElse(() => "custom" as PlacementType)
);

/**
 * insertWidgetAtTab :: Int -> WidgetUnion -> HoardboardConfiguration -> HoardboardConfiguration
 *
 * Given a tab name and a new widget, insert the widget into it.
 *
 * @param tab
 * @param newWidget
 * @returns
 */
export const insertWidgetAtTab = (tabIdx: number) => (newWidget: WidgetUnion) => tabAtIndexOptional(tabIdx)
	.composeLens(widgetsLens)
	.modify(function (widgets) {
		return widgets.concat(newWidget);
	});

/**
 * insertWidgetAtTabWithAutoPlacement :: Int -> WidgetUnion -> HoardboardConfiguration -> HoardboardConfiguration
 *
 * Given a tab name and a new widget, insert the widget into it by calculating
 * its placement in the tab automatically.
 *
 * @param tab
 * @returns
 */
export const insertWidgetAtTabWithAutoPlacement = (tabIdx: number) => (newWidget: Omit<WidgetUnion, "placement">) => tabAtIndexOptional(tabIdx)
	.composeLens(widgetsLens)
	.modify(function (widgets) {
		return widgets.concat({
			...newWidget,
			placement: calculateNextPlacement(widgets)
		});
	});

/** insertWidgetInNewTab :: string -> WidgetUnion -> HoardboardConfiguration -> HoardboardConfiguration */
export const insertWidgetInNewTab = (tabName: string) => (newWidget: WidgetUnion) => allTabsLens
	.modify(function (tabsList) {
		return tabsList.concat({
			name: tabName,
			placementType: "1-col",
			widgets: [newWidget]
		});
	});

/**
 * widgetAtIndexOptional :: Int -> Optional Tab PRSearchWidget
 *
 * Given an index in a tab, return the widget at that index - or none.
 *
 * @param idx
 * @returns
 */
export const widgetAtIndexOptional = (idx: number) => widgetsLens
    .composeOptional(widgetAt.index(idx));

/**
 * withDefaultEmptyString :: a => Optional a string -> a -> string
 *
 * Folds over an Optional<string> optic from Monocle and evaluates it - if it is none,
 * the return value is empty string.
 *
 * @param option
 * @returns
 */
export const withDefaultEmptyString = <T>(option: Optional<T, string>) => flow(
	option.getOption,
	getOrElse(() => "")
);

/**
 * calculateNextPlacement :: WidgetUnion[] -> Placement
 *
 * Given an array of Widgets, calculate the next placement
 *
 * @param widgets
 * @returns
 */
export const calculateNextPlacement: (widgets: ReadonlyArray<WidgetUnion>) => Placement = flow(
	map(({ placement: [_1, _2, _3, r] }) => r),
	concatAll(max(Bounded)),
	n => n === -Infinity
		? [1, 7, 1, 2]
		: [1, 7, n, n + 1]
);

/**
 * getNextPlacementInTab :: Int -> HoardboardConfiguration -> Placement
 *
 * Given a specific tab to focus on, evaluate all the placements in the widgets
 * in that tab and determine the next placement that would place a new widget
 * on the next row underneath all the existing widgets.
 *
 * @param idx
 * @returns
 */
export const getNextPlacementInTab = (idx: number) => flow(
    tabAtIndexOptional(idx)
        .composeLens(widgetsLens)
        .composeTraversal(widgetsTraversal)
        .asFold()
        .getAll,
	calculateNextPlacement
);

/**
 * removeWidgetLeaf :: Int -> Int -> HoardboardConfiguration -> HoardboardConfiguration
 *
 * Given a specific tab index and a specific widget index, delete that widget.
 *
 * @param tabIdx
 * @returns
 */
export const removeWidgetLeaf = (tabIdx: number) => (widgetIdx: number) => widgetsInTabAtIndexOptional(tabIdx)
	.modify(
		flow(
			deleteAt(widgetIdx),
			getOrElse(() => [] as ReadonlyArray<WidgetUnion>)
		)
	);

/**
 * removeTabLeaf :: Int -> HoardboardConfiguration -> HoardboardConfiguration
 *
 * Given a specific tab index, delete that tab.
 *
 * @param tabIdx
 * @returns
 */
export const removeTabLeaf = (tabIdx: number) => allTabsLens
	.modify(
		flow(
			deleteAt(tabIdx),
			getOrElse(() => [] as ReadonlyArray<Tab>)
		)
	);

export const tabNameIsTaken = (tabName: string) => flow(
	tabsLens
		.composeLens(tabNameLens)
		.asFold()
		.getAll,
	elem(tabEq)(tabName)
);

export function * oneColumnPlacementGenerator(): Generator<Placement> {
	let row = 1;

	while (true) {
		yield [1, 7, row , ++row];
	}
}

export function * twoColumnPlacementGenerator(): Generator<Placement> {
	let col = 1;
	let row = 1;

	while (true) {
		yield [1, col + 3, row , row + 1];
		yield [col + 3, col + 6, row, row + 1];

		col = 1;
		row++;
	}
}

export function * threeColumnPlacementGenerator(): Generator<Placement> {
	let col = 1;
	let row = 1;

	while (true) {
		yield [1, col + 2, row , row + 1];
		yield [col + 2, col + 4, row, row + 1];
		yield [col + 4, col + 6, row, row + 1];

		col = 1;
		row++;
	}
}

export const emptyPlacement: Placement = [1, 7, 1, 2];

export const emptyConfiguration: HoardboardConfiguration = {
	theme: "light",
	tabs: []
};

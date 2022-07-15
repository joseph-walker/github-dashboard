import { Optional } from "monocle-ts";

import { mockConfiguration } from "./configuration.fixture";
import {
	tabToSlug,
	tabEq,
	getTabs,
	getTabsAndSlugs,
	withDefaultEmptyString,
	oneColumnPlacementGenerator,
	twoColumnPlacementGenerator,
	threeColumnPlacementGenerator,
	uniqueTabNameGenerator,
	getUniqueTabName,
	tabNameIsTaken
} from "../configuration";

describe("tabToSlug Utility", function () {
	it("converts identity", () => expect(tabToSlug("foo")).toEqual("foo"));
	it("converts casing", () => expect(tabToSlug("FoO")).toEqual("foo"));
	it("converts spaces", () => expect(tabToSlug("foo bar")).toEqual("foo-bar"));
	it("handles special characters", () => expect(tabToSlug("foo|bar")).toEqual("foo-bar"));
	it("trims", () => expect(tabToSlug("   foo   ")).toEqual("foo"));
});

describe("Tab Equality Typeclass", function () {
	it("compares tabs as slugs", () => expect(tabEq.equals("foo-bar   ", "fOo-BAR")).toBe(true));
});

describe("getTabs Utility", function () {
	it("gets all the tabs in a configuration object", () => expect(
		getTabs(mockConfiguration)
	).toEqual(["Test A | 3 Rows", "Test B | 2 Columns"]));
});

describe("getTabsAndSlugs Utility", function () {
	it("gets all the tabs and accompanying slugs in a configuration object", () => expect(
		getTabsAndSlugs(mockConfiguration)
	).toEqual([
		{ tab: "Test A | 3 Rows", slug: "test-a-3-rows" },
		{ tab: "Test B | 2 Columns", slug: "test-b-2-columns" }
	]));
});

describe("withDefaultEmptyString Utility", function () {
	it("folds over an Optional optic by defaulting to empty string", function () {
		const fixture = {
			foo: "bar"
		};

		const justFoo = Optional.fromNullableProp<typeof fixture>()("foo");
		const nothing = Optional.fromNullableProp<typeof fixture & { bar?: string }>()("bar");

		expect(withDefaultEmptyString(justFoo)(fixture)).toEqual("bar");
		expect(withDefaultEmptyString(nothing)(fixture)).toEqual("");
	});
});

describe("placement generators", function () {
	describe("one column generator", function () {
		it("generates one a column layout", function () {
			const gen = oneColumnPlacementGenerator();

			expect(gen.next().value).toEqual([1, 7, 1, 2]);
			expect(gen.next().value).toEqual([1, 7, 2, 3]);
			expect(gen.next().value).toEqual([1, 7, 3, 4]);
		});
	});

	describe("two column generator", function () {
		it("generates two a column layout", function () {
			const gen = twoColumnPlacementGenerator();

			expect(gen.next().value).toEqual([1, 4, 1, 2]);
			expect(gen.next().value).toEqual([4, 7, 1, 2]);
			expect(gen.next().value).toEqual([1, 4, 2, 3]);
			expect(gen.next().value).toEqual([4, 7, 2, 3]);
		});
	});

	describe("three column generator", function () {
		it("generates three a column layout", function () {
			const gen = threeColumnPlacementGenerator();

			expect(gen.next().value).toEqual([1, 3, 1, 2]);
			expect(gen.next().value).toEqual([3, 5, 1, 2]);
			expect(gen.next().value).toEqual([5, 7, 1, 2]);
			expect(gen.next().value).toEqual([1, 3, 2, 3]);
			expect(gen.next().value).toEqual([3, 5, 2, 3]);
		});
	});
});

describe("unique tab name generation", function () {
	describe("tabNameIsTaken", function () {
		it("correctly identifies already used names", function () {
			expect(tabNameIsTaken("Test A | 3 Rows")(mockConfiguration)).toBe(true);
			expect(tabNameIsTaken("foobar")(mockConfiguration)).toBe(false);
		});
	});

	describe("uniqueTabNameGenerator", function () {
		it("generates a unique tab name", function () {
			const gen = uniqueTabNameGenerator();

			expect(gen.next().value).toEqual("New Tab");
			expect(gen.next().value).toEqual("New Tab (1)");
			expect(gen.next().value).toEqual("New Tab (2)");
			expect(gen.next().value).toEqual("New Tab (3)");
		});
	});

	describe("getUniqueTabName", function () {
		it("returns the first available unique tab name", function () {
			let mockConfigurationWithExtraNewTabs = {
				...mockConfiguration,
			};

			mockConfigurationWithExtraNewTabs.tabs = [
				{
					placementType: "custom",
					name: "New Tab",
					widgets: [],
				},
				{
					placementType: "custom",
					name: "New Tab (1)",
					widgets: [],
				},
				...mockConfigurationWithExtraNewTabs.tabs,
			];

			const nextTabName = getUniqueTabName(mockConfigurationWithExtraNewTabs);

			expect(nextTabName).toEqual("New Tab (2)");
		});
	});
});

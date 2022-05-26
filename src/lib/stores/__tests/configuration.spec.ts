import { Optional } from "monocle-ts";

import { mockConfiguration } from "./configuration.fixture";
import {
	tabToSlug,
	tabEq,
	getTabs,
	getTabsAndSlugs,
	withDefaultEmptyString
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

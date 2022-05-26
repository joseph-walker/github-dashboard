<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { __configuration } from "$lib/stores/keys";
	import {
		emptyPlacement,
		insertWidgetInNewTab,
		getTabsWithIdxs,
		insertWidgetAtTabWithAutoPlacement
	} from "$lib/stores/configuration";
	import SearchPRs from "$lib/components/widgets/SearchPRs/Widget.svelte";
	import SearchGuide from "$lib/components/molecules/SearchGuide.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import DropdownButton from "$lib/components/molecules/DropdownButton.svelte";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	let searchString: string = "";
	let searchQuery: string = "";

	function runSearch() {
		searchQuery = searchString;
	}

	function saveSearch(tab: CustomEvent<[number, string]>) {
		let newConfig: HoardboardConfiguration;
		let [idx, _] = tab.detail;

		const newWidget = {
			type: "__PRSearchWidget" as const,
			title: "New Search",
			args: {
				searchQuery
			}
		};

		if (idx === Infinity) {
			newConfig = insertWidgetInNewTab("New Tab")({ ...newWidget, placement: emptyPlacement })($configuration);
		} else {
			newConfig = insertWidgetAtTabWithAutoPlacement(idx)(newWidget)($configuration);
		}

		$configuration = newConfig;
	}

	$: tabs = getTabsWithIdxs($configuration).concat([[Infinity, "New Tab"]]);
</script>

<main class="container">
	<section class="search-column">
		<Widget class="search-container">
			<form method="GET" action="/app" on:submit|preventDefault={runSearch}>
				<Input bind:value={searchString}>Search Query</Input>
				<Button type="submit">Search</Button>
				<DropdownButton options={tabs} align="right" on:click-option={saveSearch}>
					Save Search
					<svelte:fragment slot="option" let:option>{option[1]}</svelte:fragment>
				</DropdownButton>
			</form>
		</Widget>
		<SearchPRs {searchQuery} title="Search Results" />
	</section>
	<aside class="docs-column">
		<SearchGuide />
	</aside>
</main>

<style>
	.container {
		--height: auto;

		display: flex;
		max-width: var(--non-grid-max-width);
		margin: auto;
		margin: var(--global-gutter) auto;
		gap: 16px;
	}

	.docs-column {
		flex: 1;
	}

	.search-column {
		flex: 2;
	}

	:global(.search-container) {
		margin-bottom: var(--global-gutter);
	}

	form {
		display: grid;
		align-items: end;
		grid-template-columns: 1fr auto auto;
		gap: var(--grid-1x);
	}
</style>

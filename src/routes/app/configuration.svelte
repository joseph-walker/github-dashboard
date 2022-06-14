<script lang="ts">
	import type { Lens, Optional } from "monocle-ts";
	import type { Option } from "fp-ts/lib/Option.js";
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration, Tab, WidgetType, WidgetUnion } from "$lib/stores/configuration";

	import { getContext } from "svelte";
	import { flow } from "fp-ts/lib/function.js";
	import { map, none, some, getOrElse } from "fp-ts/lib/Option.js";

	import { __configuration, __me } from "$lib/stores/keys";
	import {
		allTabsLens,
		tabToSlug,
		tabAtIndexOptional,
		widgetsLens,
		widgetAt,
		widgetTypeLens,
		hoardboardRootConfigIdentityLens
	} from "$lib/stores/configuration";
	import RunOption from "$lib/components/atoms/RunOption.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import MessageOverlay from "$lib/components/atoms/MessageOverlay.svelte";
	import TreeView from "$lib/components/atoms/TreeView.svelte";
	import ConfigurationLeaf from "$lib/components/molecules/ConfigurationLeaf.svelte";
	import RootConfigurator from "$lib/components/widgets/RootConfigurator.svelte";
	import TabConfigurator from "$lib/components/widgets/TabConfigurator.svelte";
	import SearchPRsConfigurator from "$lib/components/widgets/SearchPRs/Configurator.svelte";

	type ConfiguratorType
		= "Root"
		| "Tab"
		| WidgetType;

	type Focus
		= Optional<HoardboardConfiguration, WidgetUnion>
		| Optional<HoardboardConfiguration, Tab>
		| Lens<HoardboardConfiguration, HoardboardConfiguration>;

	function getConfiguratorForType(type: ConfiguratorType) {
		switch(type) {
			case "Root": {
				return RootConfigurator;
			}
			case "Tab": {
				return TabConfigurator;
			}
			default: {
				// TODO: Expand this when new widget types are introduced
				return SearchPRsConfigurator;
			}
		}
	}

	// TODO: There's a super edge-case here where the configuration won't load on the first tick
	// The configuration is booted with an empty state, because local-storage can't be read until the application
	// mounts (i.e. not on the server).
	// This is manifested as a flash on page load; it's obnoxious in general, but here causes an actual issue.
	// When the component mounts, if first tick hasn't happened yet the Optionals will read the empty configuration
	// and default to their empty-string values.
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	let maybeFocusedIdx: Option<[number | number, number | null]> = none;

	// Derived from maybeFocusedIdx - don't set them directly except in reactive statements
	let configurator: Option<any> = none; // This is a Svelte component, which don't have well-defined compile time types
	let focus: Focus = null;

	$: tabs = allTabsLens.get($configuration);

	$: nodeIsInFocus = (tabIndex: number | null, widgetIndex: number | null) => {
		return flow(
			map(focusedIdx => tabIndex === focusedIdx[0] && widgetIndex === focusedIdx[1]),
			getOrElse(() => false)
		)(maybeFocusedIdx);
	}

	$: {
		const focusedIdx = getOrElse(() => null)(maybeFocusedIdx);

		if (Array.isArray(focusedIdx)) {
			if (focusedIdx[0] !== null && focusedIdx[1] !== null) {
				focus = tabAtIndexOptional(focusedIdx[0])
					.composeLens(widgetsLens)
					.composeOptional(widgetAt.index(focusedIdx[1]));

				configurator = flow(
					(focus as Optional<HoardboardConfiguration, WidgetUnion>)
						.composeLens(widgetTypeLens)
						.getOption,
					map(getConfiguratorForType)
				)($configuration);
			} else if (focusedIdx[0] !== null && focusedIdx[1] === null) {
				focus = tabAtIndexOptional(focusedIdx[0]);

				configurator = some(getConfiguratorForType("Tab"));
			} else if (focusedIdx[0] === null && focusedIdx[1] === null) {
				focus = hoardboardRootConfigIdentityLens;

				configurator = some(getConfiguratorForType("Root"));
			} else {
				configurator = none;
			}
		}
	}

	function setFocus(nextTabFocus: number | null, nextWidgetFocus: number | null) {
		return function () {
			maybeFocusedIdx = some([nextTabFocus, nextWidgetFocus]);
		}
	}
</script>

<main>
	<div class="configuration-view">
		<TreeView leaves={tabs}>
			<ConfigurationLeaf
				slot="root"
				title="My Hoardboard"
				leafType="Root"
				selected={nodeIsInFocus(null, null)}
				on:click={setFocus(null, null)} />
			<svelte:fragment slot="leaf" let:leaf={tab} let:idx={tabIdx}>
				{#if tab.widgets?.length}
					<TreeView leaves={tab.widgets} --line-color="var(--green)">
						<ConfigurationLeaf
							slot="root"
							title={tab.name}
							leafType="Tab"
							selected={nodeIsInFocus(tabIdx, null)}
							on:click={setFocus(tabIdx, null)}>
								<span>/app/{tabToSlug(tab.name)}</span>
						</ConfigurationLeaf>
						<ConfigurationLeaf
							slot="leaf"
							let:leaf={widget}
							let:idx={widgetIdx}
							title={widget.title}
							leafType={widget.type}
							selected={nodeIsInFocus(tabIdx, widgetIdx)}
							on:click={setFocus(tabIdx, widgetIdx)}> <!-- TODO: WHY IS THIS A TYPE ERROR IT'S CORRECT -->
								<span>{widget.args.searchQuery}</span>
						</ConfigurationLeaf>
					</TreeView>
				{/if}
			</svelte:fragment>
		</TreeView>
	</div>
	<div class="configurator">
		<Widget --height="auto">
			{#key maybeFocusedIdx}
				<RunOption option={configurator}>
					<div slot="none" class="no-selection">
						<MessageOverlay icon="/icons/arrow-undo-outline.svg" --position="absolute">Select a node from the left to configure it.</MessageOverlay>
					</div>
					<svelte:fragment slot="some" let:some={component}>
						<svelte:component {focus} this={component} />
					</svelte:fragment>
				</RunOption>
			{/key}
		</Widget>
	</div>
</main>

<style>
	main {
		display: flex;
		max-width: var(--non-grid-max-width);
		margin: var(--global-gutter) auto;
		gap: var(--global-gutter);
	}

	.configurator,
	.configuration-view {
		flex: 1;
	}

	.no-selection {
		min-height: 128px;
	}

	:global(.configurator .widget) {
		position: sticky;
		top: 16px;
	}
</style>

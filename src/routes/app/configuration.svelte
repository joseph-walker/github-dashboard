<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { __configuration, __me } from "$lib/stores/keys";
	import { allTabsLens, tabToSlug, tabAtIndexOptional, widgetsLens, widgetAt } from "$lib/stores/configuration";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import MessageOverlay from "$lib/components/atoms/MessageOverlay.svelte";
	import TreeView from "$lib/components/atoms/TreeView.svelte";
	import PRSearchConfigurator from "$lib/components/widgets/SearchPRs/Configurator.svelte";

	// TODO: There's a super edge-case here where the configuration won't load on the first tick
	// The configuration is booted with an empty state, because local-storage can't be read until the application
	// mounts (i.e. not on the server).
	// This is manifested as a flash on page load; it's obnoxious in general, but here causes an actual issue.
	// When the component mounts, if first tick hasn't happened yet the Optionals will read the empty configuration
	// and default to their empty-string values.

	const me: Writable<string> = getContext(__me);
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	let focus = null;
	let focusedIdx: [number | number, number | null] = [null, null];

	$: tabs = allTabsLens.get($configuration);

	$: {
		if (focusedIdx[0] !== null && focusedIdx[1] !== null) {
			focus = tabAtIndexOptional(focusedIdx[0])
				.composeLens(widgetsLens)
				.composeOptional(widgetAt.index(focusedIdx[1]))
		}
	}

	$: widgetInFocus = (tabIndex: number, widgetIndex: number) => {
		return tabIndex === focusedIdx[0] && widgetIndex === focusedIdx[1];
	}

	function setFocus(nextFocus: [number | number, number | null]) {
		return function () {
			focusedIdx = nextFocus;
		}
	}
</script>

<main>
	<div class="configuration-view">
		<TreeView leaves={tabs}>
			<div class="config-leaf" slot="root">
				<b>My Hoardboard</b>
				<super class="root">Root</super>
			</div>
			<svelte:fragment slot="leaf" let:leaf={tab} let:idx={tabIndex}>
				{#if tab.widgets?.length}
					<TreeView leaves={tab.widgets} --line-color="var(--green)">
						<div class="config-leaf" slot="root">
							<b>{tab.name}</b>
							<p>/app/{tabToSlug(tab.name)}</p>
							<super class="tab">Tab</super>
						</div>
						<div
							class:selected={widgetInFocus(tabIndex, widgetIndex)}
							class="config-leaf"
							slot="leaf"
							let:leaf={widget}
							let:idx={widgetIndex}
							on:click={setFocus([tabIndex, widgetIndex])}>
								<b>{widget.title}</b>
								<p>{widget.args.searchQuery}</p>
								<super class={`widget ${widget.type}`}>{widget.type}</super>
						</div>
					</TreeView>
				{:else}
					<div class="config-leaf">
						<b>{tab.name}</b>
						<super class="tab">Tab</super>
					</div>
				{/if}
			</svelte:fragment>
		</TreeView>
	</div>
	<div class="configurator">
		<Widget --height="auto">
			{#key focusedIdx}
				{#if focus === null}
					<div class="no-selection">
						<MessageOverlay icon="/icons/arrow-undo-outline.svg" --position="absolute">Select a node from the left to configure it.</MessageOverlay>
					</div>
				{:else}
					<PRSearchConfigurator {focus} />
				{/if}
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

	.config-leaf {
		padding: var(--global-gutter);
    	border-radius: var(--slightly-rounded);
	}

	.config-leaf.selected {
		box-shadow: var(--green) 0px 0px 0px 1px, inset var(--green) 0px 0px 0px 2px;
	}

	.config-leaf b {
		display: block;
		margin-bottom: 2px;
	}

	.config-leaf p {
		font-size: 0.8rem;
	}

	super {
		font-size: 0.7rem;
		position: absolute;
		top: var(--grid-1x);
		right: var(--grid-1x);
		padding: 2px 8px;
		border-radius: var(--slightly-rounded);
	}

	super.root {
		background: var(--light-slate);
		color: var(--white);
	}

	super.tab {
		background: var(--blue);
		color: var(--white);
	}

	super.__PRSearchWidget {
		background: var(--green);
		color: var(--white);
	}
</style>

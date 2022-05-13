<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import { __configuration, __me } from "$lib/stores/keys";
	import { allTabsLens, tabToSlug, tabAtIndexOptional, widgetAtIndexInTabOptional } from "$lib/stores/configuration";
	import TreeView from "$lib/components/atoms/TreeView.svelte";
	import PRSearchConfigurator from "$lib/components/widgets/SearchPRs/Configurator.svelte";

	// TODO: There's a super edge-case here where the configuration won't load on the first ticket
	// The configuration is booted with an empty state, because local-storage can't be read until the application
	// mounts (i.e. not on the server).
	// This is manifested as a flash on page load; it's obnoxious in general, but here causes an actual issue.
	// When the component mounts, if first tick hasn't happened yet the Optionals will read the empty configuration
	// and default to their empty-string values.
	const tabFocus = tabAtIndexOptional(0);
	const widgetFocus = widgetAtIndexInTabOptional(0)(tabFocus);

	const me: Writable<string> = getContext(__me);
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	$: tabs = allTabsLens.get($configuration);
</script>

<main>
	<div class="configuration-view">
		<TreeView leaves={tabs}>
			<div class="config-leaf" slot="root">
				<b>My Hoardboard</b>
				<super class="root">Root</super>
			</div>
			<svelte:fragment slot="leaf" let:leaf={tab}>
				{#if tab.widgets?.length}
					<TreeView leaves={tab.widgets} --line-color="var(--green)">
						<div class="config-leaf" slot="root">
							<b>{tab.name}</b>
							<p>/app/{tabToSlug(tab.name)}</p>
							<super class="tab">Tab</super>
						</div>
						<div class="config-leaf" slot="leaf" let:leaf={widget}>
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
		<!-- <div class="no-selection">
			<img src="/icons/arrow-undo-outline.svg" alt="Select a node" />
			<p>Click on a node from your configuration to edit its settings.</p>
		</div> -->
		<PRSearchConfigurator focus={widgetFocus} />
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

	:global(.configurator .widget) {
		position: sticky;
		top: 16px;
	}

	.no-selection {
		display: grid;
		place-items: center;
		padding: 32px;
		background: var(--neutral-light-gray);
		margin: 32px;
		border: 1px dashed var(--neutral-dark-gray);
		color: #666;
		border-radius: var(--slightly-rounded);
	}

	.no-selection img {
		width: 24px;
		margin-bottom: 8px;
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

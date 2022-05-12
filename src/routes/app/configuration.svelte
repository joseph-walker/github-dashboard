<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import TreeView from "$lib/components/atoms/TreeView.svelte";
	import Widget from "$lib/components/atoms/Widget.svelte";
	import { allTabsLens, tabToSlug } from "$lib/stores/configuration";
	import { __configuration, __me } from "$lib/stores/keys";

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
							<p>{widget.args.searchQuery}}</p>
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
			<div class="no-selection">
				<img src="/icons/arrow-undo-outline.svg" alt="Select a node" />
				<p>Click on a node from your configuration to edit its settings.</p>
			</div>
		</Widget>
	</div>
</main>

<style>
	main {
		display: flex;
		max-width: var(--non-grid-max-width);
		margin: 16px auto;
		gap: 32px;

		/* TODO: Move these to the theme file */
		/* Should be even numbers as these values will be divided by 2 */
		--tree-line-width: 2px;
		--tree-line-color: var(--light-blue);
		--tree-child-inset: 32px;
		--tree-top-line-offset: 16px;
		--connection-dot-diameter: 6px;
		--connection-dot-border-size: 4px;
		--card-spacing: 16px;
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
		top: 4px;
		right: 4px;
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

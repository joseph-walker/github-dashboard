<script lang="ts">
	import type { Writable } from "svelte/store";

	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";

	import Widget from "$lib/components/atoms/Widget.svelte";
	import { allTabsLens } from "$lib/stores/configuration";
	import { __configuration, __me } from "$lib/stores/keys";

	const me: Writable<string> = getContext(__me);
	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);

	$: tabs = allTabsLens.get($configuration);
</script>

<main>
	<div class="treeview">
		<div class="root card">
			<em>My HoardBoard</em>
			<super class="root">Root</super>
		</div>
		<ul>
			{#each tabs as tab}
				<li>
					<div class="treeview">
						<div class="root card">
							<em>{tab.name}</em>
							<super class="tab">Tab</super>
						</div>
						<ul>
							{#each tab.widgets as widget}
								<li>
									<div class="card">
										<em>{widget.title}</em>
										<p>{widget.args.searchQuery}</p>
										<super class={widget.type}>{widget.type}</super>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ul>
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
	main > .treeview {
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

	.card {
		display: flex;
		flex-direction: column;
		gap: 2px;
		position: relative;
		padding: 16px;
		background: white;
		border-radius: var(--slightly-rounded);
		box-shadow: var(--widget-box-shadow);
		overflow: hidden;
	}

	.card p {
		font-size: 0.8rem;
	}

	.card em {
		font-weight: bold;
	}

	super {
		font-size: 0.7rem;
		position: absolute;
		top: 4px;
		right: 4px;
		color: white;
		padding: 2px 12px;
		border-radius: var(--slightly-rounded);
	}

	super.root {
		background: var(--neutral-dark-gray);
	}

	super.tab {
		background: var(--blue);
	}

	super.__PRSearchWidget {
		background: var(--green);
	}

	.root + ul .root:after,
	.card:before {
		z-index: 1;
		content: "";
		position: absolute;
		width: var(--connection-dot-diameter);
		height: var(--connection-dot-diameter);
		background: var(--blue);
		border: var(--connection-dot-border-size) solid var(--body-bg);
		border-radius: 100%;
	}

	.root:before {
		bottom: calc(var(--connection-dot-diameter) * -1);
		left: calc(var(--connection-dot-border-size) + var(--connection-dot-diameter));
	}

	.root + ul .root:after {
		top: calc(var(--connection-dot-border-size) + var(--connection-dot-diameter));
		left: calc(var(--connection-dot-diameter) * -1);
	}

	.treeview ul .card:not(.root):before {
		top: calc(var(--connection-dot-border-size) + var(--connection-dot-diameter));
		left: calc(var(--connection-dot-diameter) * -1);
	}

	.treeview ul {
		--margin-offset: calc(var(--tree-line-width) / 2);
		--margin: calc(var(--tree-child-inset) / 2 - var(--margin-offset));

		margin-left: var(--margin);
		padding-left: var(--margin);
		border-left: var(--tree-line-width) solid var(--tree-line-color);
		padding-top: var(--card-spacing);
	}

	.treeview li {
		position: relative;
		margin-bottom: var(--card-spacing);
	}

	.treeview li:before {
		content: "";
		position: absolute;
		width: calc(var(--tree-child-inset) / 2);
		height: var(--tree-line-width);
		background: var(--tree-line-color);
		left: calc(var(--tree-child-inset) / -2);
		top: var(--tree-top-line-offset);
	}

	.treeview li:last-child {
		margin-bottom: 0;
	}

	.treeview li:last-child:after {
		content: "";
		position: absolute;
		height: calc(100% - var(--tree-top-line-offset) + var(--tree-line-width));
		background: var(--body-bg);
		left: calc(var(--tree-child-inset) * -1);
		width: var(--tree-child-inset);
		top: calc(var(--tree-top-line-offset) + var(--tree-line-width));
	}
</style>

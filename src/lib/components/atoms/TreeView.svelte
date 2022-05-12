<script lang="ts">
	export let leaves: any[];

	let refs = [];

	// Leaves that contain subtrees need slightly different styles.
	// Unfortunately you can't do that with pure CSS, so we need some JS.
	$: containsSubtree = refs.map(function(element) {
		// If there isn't exactly 1 child, there's no way this can be a subtree
		if (element.children.length !== 1) {
			return false;
		}

		// If the child is a treeview, then we contain a subtree at this leaf
		// Because we allow --variables to be passed in, we technically need to check 2 layers of children
		// This is horrible, don't @ me
		// TODO: Make this less horrible
		return element.children[0].classList.contains("treeview")
			|| element.children[0].children[0]?.classList.contains("treeview");
	});
</script>

<div class="treeview">
	<div class="root leaf with-dot">
		<slot name="root"></slot>
	</div>
	<ul>
		{#each leaves as leaf,i}
			<li>
				<div class="with-dot" class:leaf={!containsSubtree[i]} bind:this={refs[i]}>
					<slot name="leaf" {leaf}></slot>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.treeview {
		/* TODO: Move these to the theme file */
		/* Should be even numbers as these values will be divided by 2 */
		--tree-line-width: 2px;
		--tree-line-color: var(--line-color, var(--light-blue));
		--tree-child-inset: 32px;
		--tree-top-line-offset: 16px;
		--connection-dot-diameter: 6px;
		--connection-dot-border-size: 4px;
		--card-spacing: 16px;
	}

	.with-dot,
	.leaf {
		position: relative;
	}

	.leaf {
		background-color: var(--widget-background);
		border-radius: var(--slightly-rounded);
		box-shadow: var(--widget-box-shadow);
	}

	.root + ul .root:after,
	.with-dot:before {
		z-index: 1;
		content: "";
		position: absolute;
		width: var(--connection-dot-diameter);
		height: var(--connection-dot-diameter);
		background: var(--tree-line-color);
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

	.treeview ul .with-dot:not(.root):before {
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
		height: calc(100% - var(--tree-top-line-offset) + var(--tree-line-width) - var(--tree-line-width) * 2);
		background: var(--body-bg);
		left: calc(var(--tree-child-inset) / -2 - 1px);
		width: var(--tree-line-width);
		top: calc(var(--tree-top-line-offset) + var(--tree-line-width));
	}
</style>

<script lang="ts">
	export let leaves: ReadonlyArray<any>;

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
		{#each leaves as leaf,idx}
			<li>
				<div class="with-dot" class:leaf={!containsSubtree[idx]} bind:this={refs[idx]}>
					<slot name="leaf" {leaf} {idx}></slot>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	/* Set up the CSS variables for controlling the treeview appearance */
	/* TODO: Move these to the theme file */
	/* Should be even numbers as these values will be divided by 2 */
	.treeview {
		--tree-line-width: 2px;
		--tree-line-color: var(--line-color, var(--light-blue));
		--tree-child-inset: 32px;
		--tree-top-line-offset: 16px;
		--connection-dot-diameter: 6px;
		--connection-dot-border-size: 4px;
		--card-spacing: 16px;
	}

	/* Not everything with a dot will be a leaf - both need to be positioned */
	.with-dot,
	.leaf {
		position: relative;
	}

	/* Leaves should look like widgets */
	.leaf {
		background-color: var(--widget-background);
		border-radius: var(--widget-roundness);
		box-shadow: var(--widget-box-shadow);
	}

	/* with-dots AND root elements of subtree should have dots */
	/* This rule does not position the dot - only draws it */
	:global(.treeview .root + ul .root:after),
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

	/* Root elements should position their dot at the bottom */
	/* This is a :before element, not an :after */
	/* Roots don't have :before selectors and rely on also having with-dot classes */
	.root:before {
		bottom: calc(var(--connection-dot-diameter) * -1);
		left: calc(var(--connection-dot-border-size) + var(--connection-dot-diameter));
	}

	/* with-dots AND root elements of subtree should position their dot to the left */
	:global(.treeview .root + ul .root:after),
	.treeview ul .with-dot:not(.root):before {
		top: calc(var(--connection-dot-border-size) + var(--connection-dot-diameter));
		left: calc(var(--connection-dot-diameter) * -1);
	}

	/* The list child of a treeview draws the vertical line as a border */
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

	/* List elements draw their horizontal line connecting to the vertical line */
	.treeview li:before {
		content: "";
		position: absolute;
		width: calc(var(--tree-child-inset) / 2);
		height: var(--tree-line-width);
		background: var(--tree-line-color);
		left: calc(var(--tree-child-inset) / -2);
		top: var(--tree-top-line-offset);
	}

	/* Remove the margin from the last child */
	.treeview li:last-child {
		margin-bottom: 0;
	}

	/* The last child of a tree view list draws an additional rectangle over the top of the left treeview border */
	/* This gives the illusion that the line stops; it doesn't. It's just covered up by another element that happens */
	/* to match the background color of whatever the treeview is drawn on */
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

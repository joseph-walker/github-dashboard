<script lang="ts">
	import Widget from "$lib/components/atoms/Widget.svelte";

	import { searchGuide } from "$lib/components/organisms/searchGuide";
</script>

<Widget>
	<h2 slot="header"><b>Search Guide</b></h2>
	<div class="guide">
		{#each searchGuide as guideSection}
			<h3>{guideSection.title}</h3>
			<ul class="queries">
				{#each guideSection.queries as query}
					<li class="query">
						<span class="query-item">{query.query}</span>
						<button class="expand-example">Example</button>
						<section class="examples">
							<ul class="examples">
								{#each query.examples as example}
									<li class="example">
										<p>{example}</p>
									</li>
								{/each}
							</ul>
						</section>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</Widget>

<style>
	h3 {
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: var(--grid-2s);
		border-bottom: 1px dashed var(--global-border-color);
		padding-bottom: var(--grid-2s);
	}

	.queries {
		margin-bottom: 8px;
	}

	.queries:last-of-type {
		margin-bottom: 0;
	}

	.query {
		cursor: pointer;
		font-weight: normal;
		display: grid;
		align-items: center;
		padding: 0 8px;
		margin-bottom: 4px;
		grid-template-columns: 1fr min-content;
		grid-template-areas:
			"q b"
			"e e";
		grid-template-rows: auto auto;
	}

	.query:hover {
		background: var(--neutral-light-gray);
	}

	.query-item {
		grid-area: q;
	}

	.examples {
		grid-area: e;
		font-family: monospace;
		font-size: 0.8rem;
		background-color: var(--neutral-light-gray);
		color: var(--slate);
		margin-left: -4px;
		margin-right: -4px;
	}

	.example {
		padding: 4px;
	}

	.guide {
		margin: calc(var(--global-gutter) * -1);
		padding: var(--global-gutter);
		max-height: 600px;
		overflow-y: scroll;
	}

	.expand-example {
		grid-area: b;
		margin-left: auto;
		font-size: 0.9rem;
		color: var(--neutral-dark-gray);
	}
</style>

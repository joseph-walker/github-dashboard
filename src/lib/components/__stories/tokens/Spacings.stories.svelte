<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
	import { evaluateCSSVariable } from "$lib/components/__storybook/evalueCSSVariable";

	const spacingTokens = [
		"--base-grid",
		"--off-grid",
		"--off-grid-2x",
		"--grid-4s",
		"--grid-2s",
		"--grid-1x",
		"--grid-2x",
		"--grid-4x",
		"--grid-8x",
		"--summary-line-height",
		"--global-gutter",
	];
</script>

<Meta title="Tokens / Spacings" />

<Story name="Spacings">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Spacings</h1>
			<ul class="spacings">
				{#each spacingTokens as spacing}
					<li>
						<div class="spacer" style={`width: var(${spacing});`} />
						<em>{spacing} ({evaluateCSSVariable(spacing)})</em>
					</li>
				{/each}
			</ul>
		</section>
	</WidgetBackgroundDecorator>
</Story>

<style>
	ul {
		list-style: none;
		margin-top: 16px;
	}

	h1 {
		font-size: 1.6rem;
		font-weight: bold;
	}

	em {
		color: #666;
		font-weight: bold;
	}

	.spacings {
		--dim-color: #333;

		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-left: 12px;
	}

	.spacings li {
		display: flex;
		align-items: center;
	}

	.spacer {
		height: 12px;
		position: relative;
		margin-right: 16px;
	}

	.spacer:before,
	.spacer:after {
		content: "";
		display: flex;
		position: absolute;
		align-items: center;
		width: 8px;
		font-size: 8px;
		color: var(--dim-color);
		height: 100%;
	}

	.spacer:before {
		content: "▶";
		border-right: 1px solid var(--dim-color);
		right: 100%;
	}

	.spacer:after {
		content: "◀";
		border-left: 1px solid var(--dim-color);
		left: 100%;
	}
</style>

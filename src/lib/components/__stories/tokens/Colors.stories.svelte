<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
	import { evaluateCSSVariable } from "$lib/components/__storybook/evalueCSSVariable";

	const colorTokens = [
		"--neutral-light-gray",
		"--neutral-gray",
		"--neutral-dark-gray",
		"--neutral-rich-black",
		"--light-pink",
		"--pink",
		"--light-yellow",
		"--yellow",
		"--light-red",
		"--red",
		"--light-cyan",
		"--cyan",
		"--light-green",
		"--green",
		"--light-emerald",
		"--emerald",
		"--light-blue",
		"--blue",
		"--light-indigo",
		"--indigo",
		"--light-gray",
		"--gray",
		"--light-slate",
		"--slate",
	];
</script>

<Meta title="Tokens / Colors" />

<Story name="Colors">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Colors</h1>
			<p>This is the Canadian palette from <a href="https://flatuicolors.com/palette/ca">https://flatuicolors.com/palette/ca</a></p>
			<p>Semantic assignments to components using values from the palette can be found in the theme.css file</p>
			<p>(There are too many to enumerate over them all)</p>
			<ul class="swatches">
				{#each colorTokens as color}
					<li>
						<div style={`background-color: var(${color});`}></div>
						<em>{color} ({evaluateCSSVariable(color)})</em>
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

	a {
		color: var(--blue);
	}

	.swatches  {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		flex-direction: column;
		gap: 8px;
	}

	.swatches li {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.swatches div {
		width: 24px;
		height: 24px;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	}
</style>

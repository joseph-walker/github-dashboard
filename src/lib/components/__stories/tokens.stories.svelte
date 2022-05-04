<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Text from "$lib/components/atoms/Text.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	const colorTokens = [
		"--body-bg",
		"--border-color",
		"--primary-blue",
		"--font-color",
		"--font-color-light",
	];

	// @ts-ignore
	const iconTokens = ICONS_FROM_WEBPACK_INTROSPECTION;

	function evaluateCSSVariable(variableName) {
		return getComputedStyle(document.documentElement)
			.getPropertyValue(variableName)
			.trim();
	}
</script>

<Meta title="Tokens" />

<Story name="Tokens">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Fonts</h1>
			<p>There's only one font used (Nunito) and it's applied globally, but it's loaded in two weights.</p>
			<ul class="fonts">
				<li>
					<em>Nunito | Weight 400 | --weight-normal ({evaluateCSSVariable("--weight-normal")})</em>
					<Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text>
				</li>
				<li>
					<em>Nunito | Weight 700 | --weight-bold ({evaluateCSSVariable("--weight-bold")})</em>
					<Text bold>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text>
				</li>
			</ul>
		</section>
		<section>
			<h1>Colors</h1>
			<ul class="swatches">
				{#each colorTokens as color}
					<li>
						<div style={`background-color: var(${color});`}></div>
						<em>{color} ({evaluateCSSVariable(color)})</em>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<h1>Icons</h1>
			<p>These are used at the src attribute of image tags</p>
			<ul class="icons">
				{#each iconTokens as icon}
					<li>
						<img src={`/icons/${icon}`} alt="An Icon" />
						<em class="smaller">{icon}</em>
					</li>
				{/each}
			</ul>
		</section>
	</WidgetBackgroundDecorator>
</Story>

<style>
	ul {
		list-style: none;
		margin-left: 8px;
		margin-top: 16px;
	}

	h1 {
		font-size: 1.6rem;
		font-weight: bold;
	}

	section {
		margin-bottom: 32px;
	}

	section:last-child {
		margin-bottom: 0;
	}

	em {
		color: #666;
		font-weight: bold;
	}

	em.smaller {
		font-size: 0.8rem;
	}

	.swatches,
	.fonts {
		display: flex;
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

	.icons {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 16px;
	}

	.icons li {
		display: flex;
		align-items: center;
	}

	.icons img {
		width: 24px;
		height: 24px;
		margin-right: 6px;
	}
</style>

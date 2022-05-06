<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Text from "$lib/components/atoms/Text.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
	import { evaluateCSSVariable } from "$lib/components/__storybook/evalueCSSVariable";
</script>

<Meta title="Tokens / Fonts" />

<Story name="Fonts">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Fonts</h1>
			<p>There's only one font used (Nunito) and it's applied globally, but it's loaded in two weights.</p>
			<p>The root font size is <Text role="emphasis" bold>{evaluateCSSVariable("--root-font-size")}</Text></p>
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

	.fonts {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>

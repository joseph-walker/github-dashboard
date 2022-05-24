<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
	import { evaluateCSSVariable } from "$lib/components/__storybook/evaluateCSSVariable";
</script>

<Meta title="Tokens / Fonts" />

<Story name="Fonts">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Fonts</h1>
			<p>There's only one font used (Nunito) and it's applied globally, but it's loaded in two weights.</p>
			<p>The root font size is <b>{evaluateCSSVariable("--root-font-size")}</b></p>
			<ul class="fonts">
				<li>
					<em>Nunito | Weight 400 | --weight-normal ({evaluateCSSVariable("--weight-normal")})</em>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
				</li>
				<li>
					<em>Nunito | Weight 700 | --weight-bold ({evaluateCSSVariable("--weight-bold")})</em>
					<b>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
				</li>
			</ul>
		</section>
	</WidgetBackgroundDecorator>
</Story>

<style>
	ul {
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

<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

	import WidgetContainer from "../../atoms/WidgetContainer.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Widget Container"
	component={WidgetContainer} />

<Template let:args>
	<div class="example-grid">
		<WidgetContainer {...args}>
			<WidgetBackgroundDecorator>
				<p>A widget container is a headless component that wraps its child in a grid placement container</p>
				<p>Placement args: [{args.colStart}, {args.colEnd}, {args.rowStart}, {args.rowEnd}]</p>
			</WidgetBackgroundDecorator>
		</WidgetContainer>
	</div>
</Template>

<Story
	name="Widget Container"
	args={{
		colStart: 1,
		colEnd: 3,
		rowStart: 1,
		rowEnd: 2
	}} />

<style>
	.example-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: auto;
	}
</style>

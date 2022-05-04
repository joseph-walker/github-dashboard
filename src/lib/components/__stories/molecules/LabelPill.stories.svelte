<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import LabelPill from "../../molecules/LabelPill.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Molecules / Pills / Label"
	component={LabelPill} />

<Story name="Label">
	<WidgetBackgroundDecorator>
		<p>Label Pills are inline elements - they need to be spaced appropriately by the consumer.</p>
		<LabelPill name="An Label" --flag-color="red" />
		<LabelPill name="An Other Label" --flag-color="green" />
	</WidgetBackgroundDecorator>
</Story>

<style>
	p {
		margin-bottom: 16px;
	}
</style>

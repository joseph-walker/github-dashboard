<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Text from "../../atoms/Text.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Text"
	component={Text} />

<Story name="Text">
	<WidgetBackgroundDecorator>
		<p>Normal body font:</p>
		<Text>Lorem ipsum dolor sit amet</Text>

		<p>Bold font:</p>
		<Text bold>Lorem ipsum dolor sit amet</Text>

		<p>Colored font:</p>
		<Text --color="green">Lorem ipsum dolor sit amet</Text>

		<p>Colored bold font:</p>
		<Text bold --color="green">Lorem ipsum dolor sit amet</Text>
	</WidgetBackgroundDecorator>
</Story>

<style>
	p {
		display: block;
		font-size: 12px;
		color: #999;
		margin-top: 16px;
	}

	p:first-of-type {
		margin-top: 0;
	}
</style>

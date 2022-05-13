<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Input from "$lib/components/atoms/Input.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

	let value = "";
</script>

<Meta
	title="Atoms / Input"
	component={Input} />

<Story name="Input">
	<WidgetBackgroundDecorator>
		<Input bind:value>A Storybook Text Input</Input>
		<p>Input reflection: {value}</p>
	</WidgetBackgroundDecorator>
</Story>

<style>
	p {
		margin-top: 16px;
	}
</style>

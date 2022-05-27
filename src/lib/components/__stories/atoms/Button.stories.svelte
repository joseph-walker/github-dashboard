<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Button from "../../atoms/Button.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Button"
	component={Button} />

<Story name="Button">
	<WidgetBackgroundDecorator>
		<div>
			<Button>An Button</Button>
			<Button theme="secondary">An Secondary Button</Button>
			<Button theme="danger">An Danger Button</Button>
		</div>
	</WidgetBackgroundDecorator>
</Story>

<style>
	div {
		display: flex;
		gap: 4px;
	}
</style>

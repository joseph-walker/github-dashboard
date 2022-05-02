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
		<Button>An Button</Button>
	</WidgetBackgroundDecorator>
</Story>

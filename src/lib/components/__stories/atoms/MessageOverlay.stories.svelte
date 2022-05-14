<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import MessageOverlay from "$lib/components/atoms/MessageOverlay.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

	let error = "[Error]: This is a sample Storybook error.";
	let informativeError = "You can also change this element's position using the --position variable.";
</script>

<Meta
	title="Atoms / Message Overlay"
	component={MessageOverlay} />

<Story name="Message Overlay">
	<WidgetBackgroundDecorator>
		<MessageOverlay>Hello Storybook</MessageOverlay>
	</WidgetBackgroundDecorator>
</Story>

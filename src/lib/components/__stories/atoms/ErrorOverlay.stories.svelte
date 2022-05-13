<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import ErrorOverlay from "$lib/components/atoms/ErrorOverlay.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

	let error = "[Error]: This is a sample Storybook error.";
	let informativeError = "You can also change this element's position using the --position variable.";
</script>

<Meta
	title="Atoms / Error Overlay"
	component={ErrorOverlay} />

<Story name="Default Message">
	<WidgetBackgroundDecorator>
		<ErrorOverlay {error} />
	</WidgetBackgroundDecorator>
</Story>

<Story name="Custom Message">
	<WidgetBackgroundDecorator>
		<ErrorOverlay error={informativeError}>You really screwed it up this time</ErrorOverlay>
	</WidgetBackgroundDecorator>
</Story>

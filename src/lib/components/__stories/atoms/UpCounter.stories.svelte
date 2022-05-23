<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import UpCounter from "$lib/components/atoms/UpCounter.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Up Counter"
	component={UpCounter} />

<Story name="Up Counter">
	<WidgetBackgroundDecorator>
		<UpCounter countTo={4} />
	</WidgetBackgroundDecorator>
</Story>

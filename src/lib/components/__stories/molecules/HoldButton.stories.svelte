<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import HoldButton from "$lib/components/molecules/HoldButton.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	function notify() {
		console.log("You did it!");
	}
</script>

<Meta
	title="Molecules / Hold Button"
	component={HoldButton} />

<Story name="Hold Button">
	<WidgetBackgroundDecorator>
		<div>
			<HoldButton on:hold={notify}>An Hold Button</HoldButton>
			<HoldButton theme="secondary" on:hold={notify}>An Secondary Hold Button</HoldButton>
			<HoldButton theme="danger" on:hold={notify}>An Danger Hold Button</HoldButton>
			<HoldButton theme="tertiary" on:hold={notify}>An Tertiary Hold Button</HoldButton>
		</div>
	</WidgetBackgroundDecorator>
</Story>

<style>
	div {
		display: flex;
		gap: 4px;
	}
</style>

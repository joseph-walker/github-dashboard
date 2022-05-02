<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

	import Spinner from "../../atoms/Spinner.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Spinner"
	component={Spinner}
	argTypes={{
		isLoading: { control: 'boolean' }
	}} />

<Template let:args>
	<WidgetBackgroundDecorator>
		<Spinner {...args} />
	</WidgetBackgroundDecorator>
</Template>

<Story name="Spinner" args={{ isLoading: true }} />

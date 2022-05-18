<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import ThemeSwitcher from "$lib/components/atoms/ThemeSwitcher.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	/** @type {"light" | "dark"} */
	let theme = "light";
</script>

<Meta
	title="Atoms / Theme Switcher"
	component={ThemeSwitcher} />

<Story name="Theme Switcher">
	<WidgetBackgroundDecorator>
		<ThemeSwitcher bind:theme />
	</WidgetBackgroundDecorator>
</Story>

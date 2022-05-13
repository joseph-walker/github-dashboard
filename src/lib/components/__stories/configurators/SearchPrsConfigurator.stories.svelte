<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import { tabAtIndexOptional, widgetAtIndexInTabOptional } from "$lib/stores/configuration";
	import SearchPRsConfigurator from "$lib/components/widgets/SearchPRs/Configurator.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
	import ConfigurationReflector from "$lib/components/__storybook/ConfigurationReflector.svelte";

	const tabFocus = tabAtIndexOptional(0);
	const widgetFocus = widgetAtIndexInTabOptional(0)(tabFocus);
</script>

<Meta
	title="Widgets / Search PRs"
	component={SearchPRsConfigurator} />

<Story name="Configurator">
	<ApplicationContextDecorator>
		<SearchPRsConfigurator focus={widgetFocus} />
		<ConfigurationReflector />
	</ApplicationContextDecorator>
</Story>

<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import NavBar from "$lib/components/organisms/NavBar.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
</script>

<Meta
	title="Organisms / Nav Bar"
	parameters={{ layout: 'fullscreen' }}
	component={NavBar} />

<Story name="Nav Bar">
	<ApplicationContextDecorator>
		<NavBar />
	</ApplicationContextDecorator>
</Story>

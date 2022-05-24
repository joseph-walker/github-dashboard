<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import NavBar from "$lib/components/organisms/NavBar.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
</script>

<Meta
	title="Organisms / Nav Bar"
	component={NavBar} />

<Story name="Nav Bar">
	<NavBar />
</Story>

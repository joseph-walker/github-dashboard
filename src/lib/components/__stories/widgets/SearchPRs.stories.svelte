<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

	import SearchPRsWidget from "$lib/components/widgets/SearchPRs/Widget.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
</script>

<Meta
	title="Widgets / Search PRs"
	component={SearchPRsWidget}
	argTypes={{
		searchQuery: { control: 'text' }
	}} />

<Template let:args>
	<ApplicationContextDecorator>
		<SearchPRsWidget {...args} />
	</ApplicationContextDecorator>
</Template>

<Story
	name="Search PRs"
	args={{
		searchQuery: 'is:open is:pr author:Rich-Harris archived:false '
	}} />

<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

	import PullRequest from "$lib/components/organisms/PR/PullRequest.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Organisms / Pull Request"
	component={PullRequest}
	argTypes={{
		owner: { control: 'text' },
		repo: { control: 'text' },
		number: { control: 'number' }
	}} />

<Template let:args>
	<WidgetBackgroundDecorator>
		<PullRequest {...args} />
	</WidgetBackgroundDecorator>
</Template>

<Story
	name="Happy Path"
	args={{
		owner: 'joseph-walker',
		repo: 'github-dashboard',
		number: 1
	}} />

<Story
	name="Error State"
	args={{
		owner: 'some-guy',
		repo: 'random-garbage',
		number: 69
	}} />

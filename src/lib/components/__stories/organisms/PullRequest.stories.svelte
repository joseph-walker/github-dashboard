<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import PullRequest from "$lib/components/organisms/PR/PullRequest.svelte";
	import ApplicationContextDecorator from "$lib/components/__storybook/ApplicationContextDecorator.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Organisms / Pull Request"
	component={PullRequest} />

<Story name="Pull Request">
	<ApplicationContextDecorator>
		<WidgetBackgroundDecorator>
			<PullRequest owner="joseph-walker" repo="github-dashboard" number={1} />
		</WidgetBackgroundDecorator>
	</ApplicationContextDecorator>
</Story>

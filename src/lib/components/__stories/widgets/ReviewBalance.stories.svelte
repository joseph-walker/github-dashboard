<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

	import ReviewBalanceWidget from "$lib/components/widgets/ReviewBalance/Widget.svelte";
</script>

<Meta
	title="Widgets / Review Balance"
	component={ReviewBalanceWidget} />

<Template let:args>
	<ReviewBalanceWidget {...args} />
</Template>

<Story name="Review Balance" />

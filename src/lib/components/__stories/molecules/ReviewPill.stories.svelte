<script>
	import { subDays, subMinutes } from "date-fns";
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import ReviewPill from "$lib/components/molecules/ReviewPill.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	const now = new Date();
	const thirtyMinutesAgo = subMinutes(now, 30);
	const oneDayAgo = subDays(now, 1);
</script>

<Meta
	title="Molecules / Pills / Review"
	component={ReviewPill} />

<Story name="Review">
	<WidgetBackgroundDecorator>
		<p>Review Pills are inline elements - they need to be spaced appropriately by the consumer.</p>
		<p>The reviewed time (following the dash) is updated in real time every 60 seconds.</p>
		<ReviewPill
			isMe={false}
			author="Some Guy"
			url="https://google.com"
			state="APPROVED"
			updatedAt={now} />

		<ReviewPill
			isMe={false}
			author="Some Other Guy"
			url="https://google.com"
			state="COMMENTED"
			updatedAt={thirtyMinutesAgo} />

		<ReviewPill
			isMe={true}
			author="Hey It's Me"
			url="https://google.com"
			state="CHANGES_REQUESTED"
			updatedAt={oneDayAgo} />
	</WidgetBackgroundDecorator>
</Story>

<style>
	p {
		margin-bottom: 16px;
	}
</style>

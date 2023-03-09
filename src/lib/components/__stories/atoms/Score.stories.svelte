<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Score from "$lib/components/atoms/Score.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Score"
	component={Score} />

<Story name="Score">
	<WidgetBackgroundDecorator>
		<Score score={3.141} grade="bad" />
		<Score score={2.718} grade="mid" />
		<Score score={1.618} grade="good" />
	</WidgetBackgroundDecorator>
</Story>

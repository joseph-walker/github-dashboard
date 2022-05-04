<script>
	import { some, none } from "fp-ts/lib/Option.js";
	import { Meta, Story, Template } from "@storybook/addon-svelte-csf";

	import LineSkeleton from "../../atoms/LineSkeleton.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

	const unresolvedOption = none;
	const resolvedOption = some("A line skeleton is intended for text content that fits on one line");
</script>

<Meta
	title="Atoms / Line Skeleton"
	component={LineSkeleton} />

<Template let:args>
	<WidgetBackgroundDecorator>
		<LineSkeleton
			await={args.isAwaiting ? unresolvedOption : resolvedOption}
			width={args.width || 40}
			let:ready={demoText}>
				<p>{demoText}</p>
		</LineSkeleton>
	</WidgetBackgroundDecorator>
</Template>

<Story name="Line Skeleton" args={{ isAwaiting: true, width: 40 }} />

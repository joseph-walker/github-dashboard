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
		<p>Note that Line Skeletons display as inline. If the content has a different display mode, odd layout shifting may occur.</p>
		<p>As a result, this should only be used for inline content.</p>
		<ul>
			<li>
				<LineSkeleton
					await={args.isAwaiting ? unresolvedOption : resolvedOption}
					width={args.width || 40}
					let:ready={demoText}>
						<span>{demoText}</span>
				</LineSkeleton>
			</li>
			<li>
				<LineSkeleton
					await={args.isAwaiting ? unresolvedOption : resolvedOption}
					width={10}
					--skeleton-color="var(--green)"
					let:ready={demoText}>
						<span>Skeletons can also have colors</span>
				</LineSkeleton>
			</li>
		</ul>
	</WidgetBackgroundDecorator>
</Template>

<Story name="Line Skeleton" args={{ isAwaiting: true, width: 40 }} />

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 16px;
	}
</style>

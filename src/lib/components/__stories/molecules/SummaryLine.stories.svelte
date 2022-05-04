<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Text from "../../atoms/Text.svelte";
	import SummaryLine from "../../molecules/SummaryLine.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

</script>

<Meta
	title="Molecules / Summary Line"
	component={SummaryLine} />

<Story name="Summary Line">
	<WidgetBackgroundDecorator>
		<p>Summary lines are groups of:</p>
		<ol>
			<li>One icon</li>
			<li>Some text</li>
			<li>Some optional metadata</li>
		</ol>
		<hr />
		<SummaryLine icon="/icons/pricetag-outline.svg">
			<Text>
				I am a <Text role="emphasis" bold>summary line</Text>
			</Text>
		</SummaryLine>
		<SummaryLine icon="/icons/document-outline.svg">
			<Text>
				I am a <Text role="emphasis" bold>summary line</Text>
			</Text>
			<Text slot="meta" --color="#ccc">with metadata</Text>
		</SummaryLine>
	</WidgetBackgroundDecorator>
</Story>

<style>
	p {
		margin-bottom: 16px;
	}

	ol {
		margin-left: 16px;
		list-style: numbered;
		margin-bottom: 16px;
	}

	hr {
		border-bottom: 1px solid #EEE;
		margin: 16px 0;
	}
</style>

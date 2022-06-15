<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import LayoutPreview from "$lib/components/atoms/LayoutPreview.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";
</script>

<Meta
	title="Atoms / Layout Preview"
	component={LayoutPreview} />

<Story name="Layout Preview">
	<WidgetBackgroundDecorator>
		<div class="previews">
			<div class="preview">
				<LayoutPreview layout="1-col" />
			</div>
			<div class="preview">
				<LayoutPreview layout="2-col" />
			</div>
			<div class="preview">
				<LayoutPreview layout="3-col" />
			</div>
			<div class="preview">
				<LayoutPreview layout="custom" />
			</div>
		</div>
	</WidgetBackgroundDecorator>
</Story>

<style>
	.previews {
		display: flex;
	}

	.preview {
		width: 100px;
	}
</style>

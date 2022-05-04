<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Widget from "../../atoms/Widget.svelte";
</script>

<Meta
	title="Atoms / Widget"
	component={Widget} />

<Story name="Widget without Meta">
	<Widget>
		<h2 slot="header"><b>Title</b></h2>
		<p style="padding: var(--global-gutter) var(--global-gutter) 0;">Widgets don't add padding to their content - the content needs to pad itself.</p>
		<p style="padding: var(--global-gutter) var(--global-gutter) 0;">The titles, however, do add padding.</p>
		<p style="padding: var(--global-gutter);">Use <code>var(--global-gutter)</code> to conform with the global padding.</p>
	</Widget>
</Story>

<Story name="Widget with Meta">
	<Widget>
		<h2 slot="header"><b>With Meta</b></h2>
		<div slot="meta">
			<p>Meta Text</p>
		</div>
		<p style="padding: var(--global-gutter);">You can shove anything into the <code>meta</code> slot. Be aware it may break the spacing - meta doesn't enforce <code>max-height</code>, the consumer must do that.</p>
	</Widget>
</Story>

<style>
	code {
		background: #EFEFEF;
		font-family: monospace;
		padding: 2px 4px;
	}
</style>

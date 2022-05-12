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
		<p>Widgets don't add padding to their content - the content needs to pad itself.</p>
		<p>The titles, however, do add padding.</p>
		<p>Use <code>var(--global-gutter)</code> to conform with the global padding.</p>
	</Widget>
</Story>

<Story name="Widget with Meta">
	<Widget>
		<h2 slot="header"><b>With Meta</b></h2>
		<div slot="meta">
			<span>Meta Text</span>
		</div>
		<p>You can shove anything into the <code>meta</code> slot. Be aware it may break the spacing - meta doesn't enforce <code>max-height</code>, the consumer must do that.</p>
	</Widget>
</Story>

<Story name="Headless Widget">
	<Widget>
		<p>If a <code>head</code> or <code>meta</code> slot is not defined, the widget will not render a title bar.</p>
	</Widget>
</Story>

<style>
	code {
		background: #EFEFEF;
		font-family: monospace;
		padding: 2px 4px;
	}

	p {
		margin: var(--global-gutter);
	}
</style>

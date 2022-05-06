<script>
	import Widget from "$lib/components/atoms/Widget.svelte";
	import Text from "$lib/components/atoms/Text.svelte";
</script>

<Widget>
	<Text slot="header" role="heading" bold>Example Widget</Text>
	<section>
		<slot></slot>
	</section>
</Widget>

<style>
	section {
		padding: 16px;
	}
</style>

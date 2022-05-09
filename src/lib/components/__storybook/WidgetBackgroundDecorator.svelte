<script>
	import Widget from "$lib/components/atoms/Widget.svelte";
</script>

<Widget>
	<h2 slot="header">Storybook</h2>
	<section>
		<slot></slot>
	</section>
</Widget>

<style>
	h2 {
		font-weight: var(--weight-bold);
	}

	section {
		padding: 16px;
	}
</style>

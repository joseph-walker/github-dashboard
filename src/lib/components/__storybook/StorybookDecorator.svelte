<script lang="ts">
	import ApplicationContextDecorator from "./ApplicationContextDecorator.svelte";
	import ThemeDecorator from "./ThemeDecorator.svelte";
</script>

<ApplicationContextDecorator>
	<ThemeDecorator>
		<slot></slot>
	</ThemeDecorator>
</ApplicationContextDecorator>

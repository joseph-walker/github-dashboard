<script>
	import { setContext } from "svelte";

	import { __configuration, __remaining } from "$lib/stores/keys";
	import { configuration } from "$lib/components/__storybook/fixtures/configuration";
	import { remaining } from "$lib/components/__storybook/fixtures/remaining";

	setContext(__configuration, configuration);
	setContext(__remaining, remaining);
</script>

<slot></slot>

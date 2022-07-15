<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Button from "$lib/components/atoms/Button.svelte";
	import { dispatchToast, default as ToastManager } from "$lib/components/organisms/ToastManager.svelte";
</script>

<Meta
	title="Organisms / Toast Manager"
	component={ToastManager} />

<Story name="Toast Manager">
	<ToastManager />
	<Button on:click={() => dispatchToast("Hello From Storybook", "lorem ipsum dolor sit amet", Math.random() * 5000)}>Emit a Toast</Button>
</Story>

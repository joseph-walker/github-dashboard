<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import Toast from "$lib/components/atoms/Toast.svelte";
</script>

<Meta
	title="Atoms / Toast"
	component={Toast} />

<Story name="Toast">
	<Toast life={5000} title="Storybook Toast" message="Lorem ipsum dolor ist amet"></Toast>
</Story>

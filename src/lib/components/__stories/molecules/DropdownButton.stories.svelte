<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import DropdownButton from "$lib/components/molecules/DropdownButton.svelte";
	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	let clicks = [];

	const options = [
		"Option 1",
		"Option Beta",
		"Option C"
	];

	function doOnClick(e) {
		clicks.push(e.detail);
		clicks = clicks;
	}
</script>

<Meta
	title="Molecules / Dropdown Button"
	component={DropdownButton} />

<Story name="Dropdown Button">
	<WidgetBackgroundDecorator>
		<DropdownButton {options} on:click-option={doOnClick}>
			An Dropdown Button
			<svelte:fragment slot="option" let:option>
				{option}
			</svelte:fragment>
		</DropdownButton>
		<ul>
			{#each clicks as click}
				<li>{click}</li>
			{:else}
				<li>Click the button!</li>
			{/each}
		</ul>
	</WidgetBackgroundDecorator>
</Story>

<style>
	ul {
		margin-top: var(--global-gutter);
	}
</style>

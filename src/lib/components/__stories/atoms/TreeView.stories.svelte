<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import TreeView from "$lib/components/atoms/TreeView.svelte";
	import Spinner from "../../atoms/Spinner.svelte";

	const leaves = ["foo", "bar"];
</script>

<Meta
	title="Atoms / Tree View"
	component={Spinner} />

<Story name="Flat">
	<TreeView {leaves} --line-color="var(--green)">
		<div class="storybook-leaf" slot="root">Tree View</div>
		<div class="storybook-leaf" slot="leaf" let:leaf>{leaf}</div>
	</TreeView>
</Story>

<Story name="Nested">
	<TreeView {leaves} --line-color="var(--yellow)">
		<div class="storybook-leaf" slot="root">Tree View</div>
		<svelte:fragment slot="leaf" let:leaf={branch}>
			{#if branch === "foo"}
				<TreeView slot="leaf" {leaves} --line-color="var(--light-red)">
					<div class="storybook-leaf" slot="root">Recursive Tree View</div>
					<div class="storybook-leaf" slot="leaf" let:leaf>{leaf}</div>
				</TreeView>
			{:else}
				<div class="storybook-leaf">{branch}</div>
			{/if}
		</svelte:fragment>
	</TreeView>
</Story>

<Story name="Deeply Nested">
	<TreeView {leaves}>
		<div class="storybook-leaf" slot="root">Tree View</div>
		<svelte:fragment slot="leaf" let:leaf={branch}>
			{#if branch === "foo"}
				<TreeView slot="leaf" {leaves} --line-color="var(--cyan)">
					<div class="storybook-leaf" slot="root">Recursive Tree View</div>
					<svelte:fragment slot="leaf" let:leaf={branch}>
						{#if branch === "foo"}
							<TreeView slot="leaf" {leaves} --line-color="var(--light-green)">
								<div class="storybook-leaf" slot="root">Very Recursive Tree View</div>
								<div class="storybook-leaf" slot="leaf" let:leaf>{leaf}</div>
							</TreeView>
						{:else}
							<div class="storybook-leaf">{branch}</div>
						{/if}
					</svelte:fragment>
				</TreeView>
			{:else}
				<div class="storybook-leaf">{branch}</div>
			{/if}
		</svelte:fragment>
	</TreeView>
</Story>

<style>
	.storybook-leaf {
		display: block;
		padding: 16px;
	}
</style>

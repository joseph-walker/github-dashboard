<script lang="ts">
	import Text from "../atoms/Text.svelte";

	export let name: string;
</script>

<div class="label">
	<em class="flag"></em>
	<Text>{name}</Text>
</div>

<style>
	.label {
		display: inline-flex;
		align-items: center;
		background: #f9f9f9;
		font-size: 0.8rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		height: var(--summary-line-height);
		padding: 0 6px;
	}

	.flag {
		background-color: var(--flag-color);
		width: 10px;
		height: 10px;
		border-radius: 100%;
		display: block;
		margin-right: 6px;
		border: 1px solid var(--border-color);
	}
</style>

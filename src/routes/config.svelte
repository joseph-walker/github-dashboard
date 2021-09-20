<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/env";

	let config;

	onMount(function () {
		config = localStorage.getItem("widget_config");
	});

	$: {
		if (browser && config) {
			localStorage.setItem("widget_config", config);
		}
	}
</script>

<div id="wrap">
	<textarea bind:value={config}></textarea>
</div>

<style>
	#wrap {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	textarea {
		all: revert;
		font-family: monospace;
		resize: none;
		margin: auto;
		width: 80vw;
		height: 80vh;
	}
</style>

<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { linear } from "svelte/easing";
	import { tweened } from "svelte/motion";

	export let life: number;
	export let title: string;
	export let message: string;

	let lifeTracker: NodeJS.Timeout;
	const dispatch = createEventDispatcher();

	// TODO: Use a CSS animation for this instead of a tween - more performant
	const remaining = tweened(100, {
		duration: life,
		easing: linear
	});

	remaining.set(0);

	onMount(function () {
		lifeTracker = setTimeout(expire, life);
	});

	function expire() {
		dispatch("expire");
		clearTimeout(lifeTracker);
	}
</script>

<div class="toast">
	<div class="hp-bar">
		<div class="fill" style={`height: ${$remaining}%`}></div>
	</div>
	<h3>{title}</h3>
	<p>{message}</p>
	<button on:click={expire}><img src="/icons/close.svg" alt="Close"></button>
</div>

<style>
	.toast {
		width: 420px;
		background: var(--widget-background);
		box-shadow: var(--widget-box-shadow);
		border-radius: var(--widget-roundness);
		display: grid;
		grid-template-rows: min-content auto auto;
		grid-template-columns: min-content 1fr 48px;
		grid-template-areas:
			"b t a"
			"b p a";
	}

	.hp-bar {
		grid-area: b;
		padding: 8px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.hp-bar .fill {
		background: var(--green);
		width: 6px;
		height: 100%;
		border-radius: var(--slightly-rounded);
	}

	h3 {
		grid-area: t;
		font-size: 1.1rem;
		font-weight: bold;
		margin-top: var(--grid-2x);
	}

	p {
		grid-area: p;
		font-size: 0.9rem;
		margin-bottom: var(--grid-2x);
	}

	button {
		grid-area: a;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button img {
		width: var(--grid-2x);
	}
</style>

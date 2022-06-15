<script lang="ts">
	import { createEventDispatcher, onDestroy } from "svelte";
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';

	import Button from "$lib/components/atoms/Button.svelte";

	export let holdDuration: number = 1000;
	export let resetHoldDuration: number = 2000;
	export let resetSpeed: number = 300;
	export let theme: "primary" | "secondary" | "danger" = "primary";

	const dispatch = createEventDispatcher();

	let locked: boolean = false;
	let heldComplete: boolean = false;
	let held: NodeJS.Timeout;
	let reset: NodeJS.Timeout;
	let unlock: NodeJS.Timeout;
	let width = bootTween(holdDuration);

	onDestroy(function () {
		clearTimeout(held);
		clearTimeout(reset);
		clearTimeout(unlock);
	});

	function bootTween(duration: number, initialValue: number = 0) {
		return tweened(initialValue, {
			duration,
			easing: linear
		});
	}

	function startHold() {
		if (locked) return;

		width = bootTween(holdDuration, $width);
		$width = 100;

		held = setTimeout(function () {
			dispatch("hold");

			heldComplete = true;

			reset = setTimeout(function () {
				heldComplete = false;

				width = bootTween(resetSpeed, $width);
				$width = 0;
			}, resetHoldDuration);
		}, holdDuration);
	}

	function endHold() {
		if (heldComplete) {
			return;
		}

		locked = true;

		width = bootTween(resetSpeed, $width);
		$width = 0;

		unlock = setTimeout(function () {
			locked = false;
		}, resetSpeed);

		clearTimeout(held);
	}
</script>

<Button on:mousedown={startHold} on:mouseup={endHold} {theme}>
	<div class={`${theme} fill-overlay`} style={`width: ${$width}%;`}></div>
	<div class="button-content">
		<slot></slot>
	</div>
</Button>

<style>
	.button-content {
		z-index: 2;
	}

	.fill-overlay {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		border-radius: var(--button-roundness);
		z-index: 1;
	}

	/* TODO: Move these to theme files */
	.fill-overlay.primary {
		background: var(--light-blue);
	}

	.fill-overlay.secondary {
		background: var(--light-green);
	}

	.fill-overlay.danger {
		background: var(--light-red);
	}
</style>

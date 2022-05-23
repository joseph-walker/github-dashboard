<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let countTo: number;
	export let duration: number = 500;
	export let jitter: number = 100;

	const count = tweened(0, {
		duration: duration + Math.round((Math.random() * jitter)),
		easing: cubicOut
	});

	count.set(countTo);
</script>

{Math.round($count)}

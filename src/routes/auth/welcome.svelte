<script lang="ts">
	import { onMount } from "svelte";
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	const DISPLAY_TIME = 2000;

	const percentage = tweened(0, {
		duration: DISPLAY_TIME,
		easing: cubicInOut
	});

	onMount(function () {
		percentage.set(100);

		setTimeout(function () {
			window.location.href = "/app";
		}, DISPLAY_TIME);
	});
</script>

<main>
	<div class="welcome">
		<img class="logo" src="/icons/dragon.svg" alt="Logo" />
		<h1>Hello There</h1>
		<div class="loader">
			<div class="indicator" style={`width: ${$percentage}%;`}></div>
		</div>
	</div>
</main>

<style>
	/* TODO: Move all this to the theme variables after Issue #23 */
	main {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}

	.loader {
		width: 256px;
		height: 8px;
		background: #f2f2f2;
		border-radius: 8px;
	}

	.indicator {
		height: 8px;
		border-radius: 8px;
		background: #10ac84;
	}

	.welcome {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 8px;
	}

	.logo {
		height: 2rem;
		margin-right: var(--grid-2s);
		filter: invert(0); /* Don't invert colors when switched to dark mode */
	}
</style>

<script lang="ts">
	export let theme: "light" | "dark";

	function toggleTheme() {
		theme = theme === "light"
			? "dark"
			: "light";
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>Theme</label>
<div class="theme-picker" class:light={theme === "light"} class:dark={theme === "dark"} on:click={toggleTheme}>
	<button class="switch"></button>
	<div class="dark mode">
		<img src="/icons/moon-outline.svg" alt="Dark Mode" />
	</div>
	<div class="light mode">
		<img src="/icons/sunny-outline.svg" alt="Light Mode" />
	</div>
</div>

<style>
	label {
		display: block;
		margin-left: 2px; /* Scoot over a smidge to make text visually lign up better */
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: var(--grid-4s);
	}

	.theme-picker {
		position: relative;
		background: var(--global-border-color);
		height: var(--form-element-height);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--slightly-rounded);
		max-width: 128px;
		cursor: pointer;
	}

	.switch {
		z-index: 1;
		position: absolute;
		height: calc(100% - 8px);
		background: white;
		top: 4px;
		left: 0;
		width: calc(50% - 8px);
		border-radius: var(--slightly-rounded);
		transition: transform 0.125s ease-out;
	}

	.theme-picker.dark .switch {
		transform: translate3d(4px, 0, 0);
	}

	.theme-picker.light .switch {
		transform: translate3d(calc(100% + 12px), 0, 0);
	}

	.mode {
		flex: 1;
		display: grid;
		place-items: center;
	}

	img {
		position: relative;
		width: var(--grid-2x);
		z-index: 2;
	}
</style>

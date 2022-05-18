<slot></slot>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
	</style>
</svelte:head>

<style>
	@namespace svg "http://www.w3.org/2000/svg";

	:global(:not(svg|*)) {
		all: unset;
		display: revert;
		box-sizing: border-box;

		/* Controls the gentle fade into a different theme */
		--theme-switch-easing: 0.5s ease-in-out;
	}

	:global(html) {
		font-size: var(--root-font-size);
	}

	:global(body) {
		font-weight: var(--weight-normal);
		background: var(--body-bg);
		color: var(--font-color);
		font-family: 'Nunito', serif;

		/* Theme Easing */
		transition: background var(--theme-switch-easing),
			color var(--theme-switch-easing);
	}

	:global(html, body, #svelte) {
		min-height: 100%;
	}

	:global(ul, ol) {
		list-style: none;
	}

	:global(a) {
		cursor: pointer;
	}

	:global(a:visited) {
		color: inherit;
	}

	:global(b) {
		font-weight: var(--weight-bold);
	}
</style>

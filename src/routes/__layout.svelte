<slot></slot>

<svelte:head>
	<style>
		@namespace svg "http://www.w3.org/2000/svg";

		:not(svg|*) {
			all: unset;
			display: revert;
			box-sizing: border-box;
		}
	</style>
</svelte:head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

	:global(html) {
		font-size: 14px;
	}

	:global(body) {
		font-weight: 400;
		background: var(--body-bg);
		color: var(--font-color);
		font-family: 'Nunito', sans-serif;
	}

	:global(html, body, #svelte) {
		height: 100%;
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

	:root {
		--body-bg: #f7f7f7;
		--border-color: #ebebeb;
		--font-color: #333;
		--font-color-light: #999;
		--weight-normal: 400;
		--weight-bold: 700;
		--summary-line-height: 21px;
	}
</style>

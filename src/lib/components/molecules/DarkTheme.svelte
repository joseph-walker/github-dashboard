<svelte:head>
	<style>
		:root {
			/* Canadian Palette: https://flatuicolors.com/palette/ca */
			--white: #fff;
			--neutral-light-gray: #f7f7f7;
			--neutral-gray: #ebebeb;
			--neutral-dark-gray: #999;
			--neutral-rich-black: #333;
			--true-black: #000;
			--light-pink: #ff9ff3;
			--pink: #f368e0;
			--light-yellow: #feca57;
			--yellow: #ff9f43;
			--light-red: #ff6b6b;
			--red: #ee5253;
			--light-cyan: #48dbfb;
			--cyan: #0abde3;
			--light-green: #1dd1a1;
			--green: #10ac84;
			--light-emerald: #00d2d3;
			--emerald: #01a3a4;
			--light-blue: #54a0ff;
			--blue: #2e86de;
			--light-indigo: #5f27cd;
			--indigo: #341f97;
			--light-gray: #c8d6e5;
			--gray: #8395a7;
			--light-slate: #576574;
			--slate: #222f3e;

			/* Semantic color assignments */
			--button-color-primary: #6161ff;
			--button-text-primary: #fafbfb;
			--button-color-secondary: var(--green);
			--button-text-secondary: var(--white);
			--button-color-disabled: #282637;
			--button-text-disabled: #6b6a75;
			--body-bg: #282637;
			--global-border-color: #27262c;
			--font-color: #d9d9d9;
			--font-color-light: var(--neutral-dark-gray);
			--loading-spinner-active-color: #6161ff;;
			--loading-spinner-passive-color: var(--global-border-color);
			--pill-background: #282637;
			--pill-border: var(--global-border-color);
			--review-status-approved: #ef537b; /* Inverted --green */
			--review-status-commented: #0060bc; /* Inverted --yellow */
			--review-status-declined: #11adac; /* Inverted --red */
			--review-pill-callout-me: #6161ff;;
			--widget-background: #1a1927;
			--widget-box-shadow: 5px 5px 20px rgb(26 25 39 / 37%);
			--navbar-brand-color: var(--green);
			--navbar-background: #1a1927;
			--healthbar-color-high: var(--light-green);
			--pr-diff-additions: var(--green);
			--pr-diff-deletions: var(--red);
			--pr-error-overlay-background: rgba(255, 255, 255, 0.8);
			--search-prs-widget-zebra-stripe-background: #1c1b27;

			/* Font characteristics */
			--root-font-size: 14px;
			--weight-normal: 400;
			--weight-bold: 700;

			/* Gutters */
			--base-grid: 8px;
			--off-grid: 10px;
			--off-grid-2x: 20px;
			--grid-4s: calc(var(--base-grid) / 4);
			--grid-2s: calc(var(--base-grid) / 2);
			--grid-1x: var(--base-grid);
			--grid-2x: calc(var(--base-grid) * 2);
			--grid-3x: calc(var(--base-grid) * 3);
			--grid-4x: calc(var(--base-grid) * 4);
			--grid-6x: calc(var(--base-grid) * 6);
			--grid-8x: calc(var(--base-grid) * 8);
			--slightly-rounded: 4px;
			--form-element-height: 38px;

			/* Semantic spacing assignments  */
			--summary-line-height: var(--off-grid-2x);
			--button-roundness: var(--slightly-rounded);
			--pill-roundness: var(--slightly-rounded);
			--widget-roundness: var(--slightly-rounded);
			--widget-title-bar-spacing: 12px;
			--global-gutter: var(--grid-2x);
			--loading-spinner-thiccness: 3px;
			--navbar-height: var(--grid-6x);
			--navbar-active-tab-indicator-height: 2px;
			--healthbar-roundness: var(--slightly-rounded);
			--healthbar-thiccness: var(--grid-1x);
			--non-grid-max-width: 1200px;
		}

		img[src*="icons"] {
			filter: invert(1);
		}
	</style>
</svelte:head>

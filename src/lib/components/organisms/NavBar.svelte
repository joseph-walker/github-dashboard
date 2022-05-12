<script lang="ts">
	import type { Writable, Readable } from "svelte/store";
	import type { HoardboardConfiguration } from "$lib/stores/configuration";

	import { getContext } from "svelte";
	import { page } from "$app/stores";

	import Button from "$lib/components/atoms/Button.svelte";
	import { getTabsAndSlugs } from "$lib/stores/configuration";
	import { __configuration, __remaining } from "$lib/stores/keys";

	const configuration: Writable<HoardboardConfiguration> = getContext(__configuration);
	const remaining: Readable<string | number> = getContext(__remaining);

	$: tabs = getTabsAndSlugs($configuration);
</script>

<nav class="nav-bar">
	<h1><img class="logo" src="/icons/dragon.svg" alt="Logo" /><em>Hoard</em>Board</h1>
	<ul class="tabs">
		<li><a class:active={$page.url.pathname === "/app"} href="/app">Search</a></li>
		{#each tabs as tab}
			<li><a class:active={$page.url.pathname === `/app/${tab.slug}`} href={`/app/${tab.slug}`}>{tab.tab}</a></li>
		{/each}
		<li class="config-link">
			<a class:active={$page.url.pathname === "/app/configuration"} href="/app/configuration">
				<img src="/icons/cog-outline.svg" alt="Configuration" />
			</a>
		</li>
	</ul>
	<div class="resources">
		<p>Rate Limit:</p>
		<em>{$remaining} / 5000</em>
		<div class="hp-bar">
			<div class="hp" style={`width: ${((Number($remaining) || 2500) / 5000) * 100}px`}></div>
		</div>
	</div>
	<Button role="link" href="/auth/logout">Log Out</Button>
</nav>

<style>
	.nav-bar {
		display: flex;
		align-items: center;
		height: var(--navbar-height);
		background: var(--navbar-background);
		border-bottom: 1px solid var(--global-border-color);
		padding: 0 var(--global-gutter);
		background-attachment: fixed;
		background-size: cover;
	}

	h1 {
		font-weight: var(--weight-bold);
		font-size: 1.4rem;
		display: flex;
		align-items: center;
	}

	h1 em {
		color: var(--navbar-brand-color);
	}

	.logo {
		height: 2rem;
		margin-right: var(--grid-2s);
		filter: invert(0); /* Don't invert colors when switched to dark mode */
	}

	.tabs {
		margin: 0 var(--grid-1x) 0 var(--grid-2x);
		flex: 1;
		display: flex;
		align-items: center;
		height: var(--navbar-height);
	}

	.tabs a {
		position: relative;
		line-height: var(--navbar-height);
		display: block;
		font-weight: bold;
		padding: 0 var(--grid-1x);
	}

	.tabs a.active:after {
		content: "";
		display: block;
		width: 100%;
		height: var(--navbar-active-tab-indicator-height);
		background: var(--navbar-brand-color);
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.config-link {
		display: contents;
	}

	.config-link a {
		margin-left: auto;
		display: flex;
		align-items: center;
		height: 100%;
	}

	.config-link img {
		width: 20px;
		animation: spin 30s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.resources {
		margin-left: auto;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		margin-right: var(--grid-2x);
	}

	.resources p {
		margin-right: var(--grid-2s);
	}

	.resources em {
		font-weight: var(--weight-bold);
	}

	.hp-bar {
		position: relative;
		width: 100px;
		height: var(--healthbar-thiccness);
		background: var(--global-border-color);
		margin-left: var(--grid-1x);
		border-radius: var(--healthbar-roundness);
	}

	.hp-bar .hp {
		background-color: var(--healthbar-color-high);
		height: var(--healthbar-thiccness);
		position: absolute;
		top: 0;
		left: 0;
		border-radius: var(--healthbar-roundness);
	}
</style>

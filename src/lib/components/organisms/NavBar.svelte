<script lang="ts">
	import type { Writable, Readable } from "svelte/store";
	import type { WidgetConfig } from "$lib/stores/configuration";

	import { getContext } from "svelte";
	import { page } from "$app/stores";

	import Button from "$lib/components/atoms/Button.svelte";
	import { __configuration, __remaining } from "$lib/stores/keys";

	const configuration: Writable<WidgetConfig> = getContext(__configuration);
	const remaining: Readable<string | number> = getContext(__remaining);

	$: tabs = Object
		.entries($configuration)
		.map(function ([slug, tab]) {
			return [slug, tab.tabName];
		});
</script>

<nav class="nav-bar">
	<h1><img class="logo" src="/icons/dragon.svg" alt="Logo" /><em>Hoard</em>Board</h1>
	<ul class="tabs">
		<li><a class:active={$page.url.pathname === "/app"} href="/app">Search</a></li>
		{#each tabs as tab}
			<li><a class:active={$page.url.pathname === `/app/${tab[0]}`} href={`/app/${tab[0]}`}>{tab[1]}</a></li>
		{/each}
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
		border-bottom: 1px solid var(--global-border-color);
		padding: 0 var(--global-gutter);
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
	}

	.tabs {
		margin-left: var(--grid-3x);
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

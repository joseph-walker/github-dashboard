<script lang="ts">
	import type { Writable, Readable } from "svelte/store";
	import type { WidgetConfig } from "$lib/stores/configuration";

	import { getContext } from "svelte";
	import { page } from "$app/stores";

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
	<a class="logout" href="/auth/logout">Log Out</a>
</nav>

<style>
	.nav-bar {
		display: flex;
		align-items: center;
		height: 48px;
		background: white;
		border-bottom: 1px solid var(--global-border-color);
		padding: 0 16px;
	}

	h1 {
		font-weight: var(--weight-bold);
		font-size: 1.4rem;
		display: flex;
		align-items: center;
	}

	h1 em {
		color: #10ac84;
	}

	.logo {
		height: 2rem;
		margin-right: 4px;
		margin-bottom: 2px;
	}

	.logout {
		font-size: 0.9rem;
		padding: 8px 16px;
		cursor: pointer;
		background: #2e86de;
		color: white;
		border-radius: 4px;
	}

	.tabs {
		margin-left: 24px;
		list-style: none;
		display: flex;
		align-items: center;
		height: 48px;
	}

	.tabs a {
		position: relative;
		line-height: 48px;
		display: block;
		font-weight: bold;
		padding: 0 8px;
	}

	.tabs a.active:after {
		content: "";
		display: block;
		width: 100%;
		height: 2px;
		background: #10ac84;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.resources {
		margin-left: auto;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		margin-right: 16px;
	}

	.resources p {
		margin-right: 4px;
	}

	.resources em {
		font-weight: var(--weight-bold);
	}

	.hp-bar {
		position: relative;
		width: 100px;
		height: 8px;
		background: var(--global-border-color);
		margin-left: 8px;
		border-radius: 4px;
	}

	.hp-bar .hp {
		background-color: #1dd1a1;
		height: 8px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		width: 32px;
	}
</style>

<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { writable } from "svelte/store";

	const now = writable(new Date());

	if (browser) {
		setInterval(function () {
			now.set(new Date());
		}, 60000); // 1 Minute
	}

	function formatDistanceShort(now: Date, updatedAtRaw: any) {
		const updatedAt = new Date(updatedAtRaw);
		const delta = intervalToDuration({
			start: updatedAt,
			end: now
		});

		if (delta.years > 0) {
			return `>${delta.years}y`;
		} else if (delta.months > 0) {
			return `>${delta.months}m`;
		} else if (delta.weeks > 0) {
			return `${delta.weeks}w`;
		} else if (delta.days > 0) {
			return `${delta.days}d`;
		} else if (delta.hours > 0) {
			return `${delta.hours}h`;
		} else if (delta.minutes > 0) {
			return `${delta.minutes}m`;
		} else {
			return `<1m`;
		}
	}
</script>

<script lang="ts">
	import { intervalToDuration } from "date-fns"

	export let isMe: boolean = false;
	export let author: string;
	export let url: string;
	export let state: string;
	export let updatedAt: Date;
</script>

<a class:me={isMe} href={url} target="_blank" rel="noopener noreferrer">
	{#if state === "APPROVED"}
		<img class="icon approved" src="/icons/checkmark.svg" alt="approved" />
	{:else if state === "COMMENTED"}
		<img class="icon commented" src="/icons/alert.svg" alt="commented" />
	{:else}
		<img class="icon not-approved" src="/icons/close.svg" alt="not-approved" />
	{/if}
	<em>
		{author}<span class="time">&nbsp;-&nbsp;{formatDistanceShort($now, updatedAt)}</span>
	</em>
</a>


<style>
	.icon {
		height: 100%;
		width: calc(var(--summary-line-height) - 2px); /* Square: height - 2px for top & bottom border */
		padding: var(--grid-4s);
		margin: 0;
		filter: invert(100%);
		border-top-left-radius: var(--pill-roundness);
		border-bottom-left-radius: var(--pill-roundness);
	}

	a {
		display: inline-flex;
		align-items: center;
		background: var(--pill-background);
		font-size: 0.8rem;
		cursor: pointer;
		border: 1px solid var(--pill-border);
		border-radius: var(--pill-roundness);
		height: var(--summary-line-height);
	}

	a em {
		border-left: 1px solid var(--pill-border);
		padding: 0 var(--grid-1x);
		display: flex;
		align-items: center;
	}

	.icon.approved {
		background: var(--review-status-approved);
	}

	.icon.commented {
		background: var(--review-status-commented);
	}

	.icon.not-approved {
		background:var(--review-status-declined);
	}

	a.me {
		font-weight: var(--weight-bold);
		color: var(--review-pill-callout-me);
	}

	.time {
		font-size: 0.7rem;
		font-weight: var(--weight-bold);
		color: var(--font-color-light);
	}
</style>

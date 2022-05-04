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
		padding: 2px;
		margin: 0;
		filter: invert(100%);
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	a {
		display: inline-flex;
		align-items: center;
		background: #f9f9f9;
		font-size: 0.8rem;
		cursor: pointer;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		height: var(--summary-line-height);
	}

	a em {
		border-left: 1px solid var(--border-color);
		padding: 0 6px;
		display: flex;
		align-items: center;
	}

	.icon.approved {
		background: #ef537b;
	}

	.icon.commented {
		background: #0060bc;
	}

	.icon.not-approved {
		background: #11adac;
	}

	a.me {
		font-weight: var(--weight-bold);
		color: #2e86de;
	}

	.time {
		font-size: 0.7rem;
		font-weight: bold;
		color: #9d9d9d;
	}
</style>

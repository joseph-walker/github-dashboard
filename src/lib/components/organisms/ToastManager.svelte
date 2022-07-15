<script context="module" lang="ts">
	import { writable } from "svelte/store";

	type IToast = {
		title: string;
		message: string;
		life: number;
	}

	const toastList = writable<Map<number, IToast>>(new Map());

	function * toastId(): Generator<number> {
		let n = 0;

		while (true) {
			yield n++;
		}
	}

	const toastIdGen = toastId();

	export function dispatchToast(title: string, message: string, life: number = 2500) {
		const id = toastIdGen.next().value;
		toastList.update(m => m.set(id, { title, message, life }));
	}

	function expireToast(id: number) {
		return () => toastList.update(m => {
			m.delete(id);
			return m;
		});
	}
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from "svelte/easing";

	import Toast from "$lib/components/atoms/Toast.svelte";
</script>

<ul class="toast-list">
	{#each [...$toastList.entries()] as [id, toast] (id)}
		<li
			in:fly={{ duration: 250, x: 100, easing: quintOut }}
			out:fade={{duration: 250, easing: quintOut}}
			animate:flip={{ delay: 0, duration: 250, easing: quintOut }}>
				<Toast life={toast.life} title={toast.title} message={toast.message} on:expire={expireToast(id)} />
		</li>
	{/each}
</ul>

<style>
	.toast-list {
		z-index: 10;
		position: fixed;
		bottom: var(--grid-2x);
		right: var(--grid-2x);
	}

	.toast-list li {
		margin-top: var(--grid-1x);
	}
</style>

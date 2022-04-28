<script lang="ts">
	import Widget from "./Widget.svelte";

	export let title: string = "Modal!";

	export function openModal() {
		isOpen = true;
	}

	let isOpen: boolean = false;

	function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="overlay" on:mousedown={close}>
		<aside class="modal" on:mousedown|stopPropagation={_ => _}>
			<Widget>
				<h2 slot="header"><b>{title}</b></h2>
				<button class="close" slot="meta" on:click={close}>
					<img src="/close-circle-outline.svg" alt="close" />
				</button>
				<slot></slot>
			</Widget>
		</aside>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.25);
		z-index: 10;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.modal {
		width: auto;
		height: auto;
		display: block;
		z-index: 11;
	}

	.close {
		width: 1.2rem;
		height: 1.2rem;
		display: grid;
		place-items: center;
		cursor: pointer;
	}
</style>

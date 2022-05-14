<script lang="ts">
	export let icon: string = "/icons/chatbubble-outline.svg";
</script>

<div class="message-overlay">
	<img src={icon} alt="message" />
	<p>
		<slot></slot>
	</p>
</div>

<style>
	.message-overlay {
		position: var(--position, static);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 0.8rem;
		gap: var(--grid-1x);
	}

	.message-overlay img {
		width: var(--grid-3x);
		height: var(--grid-3x);
	}
</style>

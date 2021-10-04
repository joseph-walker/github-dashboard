<script lang="ts">
	export let icon: string = "/foo.svg";
</script>

<section class="summary-line">
	<img class="icon" src={icon} alt="summary-icon" />
	<slot></slot>
	<div class="meta">
		<slot name="meta"></slot>
	</div>
</section>

<style>
	.summary-line {
		display: flex;
		align-items: flex-start;
		min-height: var(--summary-line-height);
	}

	.icon {
		height: 1.2rem;
		margin-right: 4px;

		/* Adjust icon placement for spacing issues */
		margin-bottom: 2px;
		margin-left: -2px;
	}

	.meta {
		margin-left: 8px;
	}
</style>

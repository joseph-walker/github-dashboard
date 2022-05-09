<script lang="ts">
	//
</script>

<div class="widget">
	<header>
		<slot name="header"></slot>
		<div class="meta">
			<slot name="meta"></slot>
		</div>
	</header>
	<slot></slot>
</div>

<style>
	.widget {
		height: 100%; /* 100% of grid row - makes all widgets on a row the same height */
		background: var(--widget-background);
		border-radius: var(--widget-roundness);
		box-shadow: var(--widget-box-shadow);
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		font-size: 1rem;
		border-bottom: 1px solid var(--global-border-color);
		padding: var(--widget-title-bar-spacing) var(--global-gutter);
	}

	.meta {
		margin-left: auto;
	}
</style>

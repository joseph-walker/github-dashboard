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
		background: white;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		font-size: 1rem;
		border-bottom: 1px solid var(--border-color);
		padding: 10px var(--gutter-common);
	}

	.meta {
		margin-left: auto;
	}
</style>

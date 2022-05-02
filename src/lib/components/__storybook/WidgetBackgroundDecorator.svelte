<div>
	<slot></slot>
</div>

<style>
	div {
		/* TODO: This bg should probably be a variable - both here and in the Widget component */
		background: white;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		padding: 16px;
	}
</style>

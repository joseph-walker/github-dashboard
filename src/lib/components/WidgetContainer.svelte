<script lang="ts">
	export let colStart: number;
	export let colEnd: number;
	export let rowStart: number;
	export let rowEnd: number;

	$: style = `
		grid-column-start: ${colStart};
		grid-column-end: ${colEnd + 1};
		grid-row-start: ${rowStart};
		grid-row-end: ${rowEnd};
	`;
</script>

<section class="widget-container" style={style}>
	<slot></slot>
</section>

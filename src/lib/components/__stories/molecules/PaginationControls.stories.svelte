<script>
	import { readable } from "svelte/store";
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import PaginationControls from "../../molecules/PaginationControls.svelte";
	import WidgetBackgroundDecorator from "../../__storybook/WidgetBackgroundDecorator.svelte";

	const mockPaginator = {
		pageInfo: readable({
			hasNextPage: true,
			hasPrevPage: false
		}),
		nextPage: () => {},
		prevPage: () => {}
	};
</script>

<Meta
	title="Molecules / Pagination Controls"
	component={PaginationControls} />

<Story name="Pagination Controls">
	<WidgetBackgroundDecorator>
		<PaginationControls paginator={mockPaginator} />
	</WidgetBackgroundDecorator>
</Story>

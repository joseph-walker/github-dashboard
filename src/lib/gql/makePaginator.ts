import type { OperationStore } from "@urql/svelte";

type PageInfo = {
	startCursor?: string;
	endCursor?: string;
}

type PaginationVars = {
	first?: number;
    last?: number;
    after?: string;
    before?: string;
}

export function makePaginator<T extends object> (
	query: OperationStore<T, PaginationVars>,
	pageSize: number,
	pageInfoLens: (data: T) => PageInfo
) {
	const cursors: PageInfo = {};

	query.subscribe(function (next) {
		if (!next.fetching && !next.error) {
			const nextPageInfo = pageInfoLens(next.data);

			cursors.startCursor = nextPageInfo.startCursor;
			cursors.endCursor = nextPageInfo.endCursor;
		}
	});

	function nextPage() {
		query.set({
			variables: {
				...query.variables,
				first: pageSize,
				last: null,
				after: cursors.endCursor!,
				before: null
			}
		});
	}

	function prevPage() {
		query.set({
			variables: {
				...query.variables,
				first: null,
				last: pageSize,
				after: null,
				before: cursors.startCursor!
			}
		});
	}

	return {
		nextPage,
		prevPage
	};
}

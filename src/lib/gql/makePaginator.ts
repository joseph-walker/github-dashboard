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

export function makePaginator<T extends OperationStore<any, PaginationVars, any>> (query: T, pageSize: number) {
	let currentPage: number = 1;

	const cursors: PageInfo = {};

	query.subscribe(function (next) {
		if (!next.fetching && !next.error) {
			const nextPageInfo = next.data.user.pullRequests.pageInfo;

			cursors.startCursor = nextPageInfo.startCursor;
			cursors.endCursor = nextPageInfo.endCursor;
		}
	})

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

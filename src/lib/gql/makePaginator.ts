import type { OperationStore } from "@urql/svelte";
import type { Readable } from "svelte/store";
import { derived, writable } from "svelte/store";

import type { PageInfo } from "$lib/generated/graphql";

type PaginationVars = {
	first?: number;
    last?: number;
    after?: string;
    before?: string;
}

export type Paginator = {
    pageInfo: Readable<{
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }>;
    nextPage: () => void;
    prevPage: () => void;
}

export function makePaginator<T extends object> (
	query: OperationStore<T, PaginationVars>,
	pageSize: number,
	pageInfoLens: (data: T) => PageInfo
): Paginator {
	const nextPrevInfo = writable({
		hasNextPage: false,
		hasPrevPage: false
	});

	const cursors: Pick<PageInfo, "startCursor" | "endCursor"> = {};

	query.subscribe(function (next) {
		if (!next.fetching && !next.error) {
			const nextPageInfo = pageInfoLens(next.data);

			cursors.startCursor = nextPageInfo.startCursor;
			cursors.endCursor = nextPageInfo.endCursor;
			nextPrevInfo.set({
				hasNextPage: nextPageInfo.hasNextPage,
				hasPrevPage: nextPageInfo.hasPreviousPage,
			})
		}
	});

	function nextPage() {
		console.log("Next Page", {
			...query.variables,
			first: pageSize,
			last: null,
			after: cursors.endCursor!,
			before: null
		});
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
		console.log("Prev Page");
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
		pageInfo: derived(nextPrevInfo, id => id),
		nextPage,
		prevPage
	};
}

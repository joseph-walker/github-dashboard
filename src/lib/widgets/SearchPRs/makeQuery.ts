import type { O } from "ts-toolbelt";
import { gql, operationStore } from '@urql/svelte';

import type { SearchPrQuery, SearchPrQueryVariables } from '$lib/generated/graphql';
import { makePaginator } from '$lib/gql/makePaginator';

type Nodes = SearchPrQuery["search"]["nodes"];
type SearchPRQueryPullRequest = Extract<Nodes[number], { __typename?: "PullRequest" }>;
type SearchPrQueryResult = O.P.Update<SearchPrQuery, ["search", "nodes"], SearchPRQueryPullRequest[]>;

export function makeQuery(searchQuery: string, pageSize: number) {
	const query = operationStore<SearchPrQuery, SearchPrQueryVariables, SearchPrQueryResult>(gql`
		query SearchPR (
			$searchQuery: String!,
			$first: Int,
			$last: Int,
			$after: String,
			$before: String
		) {
			search(
				first: $first,
				last: $last,
				after: $after,
				before: $before,
				query: $searchQuery,
				type: ISSUE
			) {
				issueCount
				nodes {
					...on PullRequest {
						id
						number
						repository {
							name
							owner {
								login
							}
						}
					}
				}
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
			}
		}
	`, {
		searchQuery,
		first: pageSize,
		last: null,
		after: null,
		before: null
	});

	const paginator = makePaginator(query, pageSize, function (next) {
		return next.search.pageInfo;
	});

	return {
		query,
		paginator
	}
}

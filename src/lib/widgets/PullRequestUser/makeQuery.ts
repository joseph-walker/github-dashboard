import type { OperationStore } from '@urql/svelte';
import { gql, operationStore } from '@urql/svelte';

import type { PullRequestUserQuery, PullRequestUserQueryVariables } from '$lib/generated/graphql';

import { makePaginator } from '$lib/gql/makePaginator';

export function makeQuery(login: string, pageSize: number) {
	const query: OperationStore<PullRequestUserQuery, PullRequestUserQueryVariables> = operationStore(gql`
		query PullRequestUser (
			$login: String!,
			$first: Int,
			$last: Int,
			$after: String,
			$before: String
		) {
			user(login: $login) {
				avatarUrl
				pullRequests (
					first: $first,
					last: $last,
					after: $after,
					before: $before,
					states: OPEN
				) {
					totalCount
					nodes {
						title
						repository {
							name
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
		}
	`, {
		login,
		first: pageSize,
		last: null,
		after: null,
		before: null
	});

	const paginator = makePaginator(query, pageSize);

	return {
		query,
		paginator
	}
}

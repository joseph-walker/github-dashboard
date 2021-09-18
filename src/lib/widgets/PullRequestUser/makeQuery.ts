import { gql, operationStore } from '@urql/svelte';

import type { PullRequestUserQuery, PullRequestUserQueryVariables } from '$lib/generated/graphql';

import { makePaginator } from '$lib/gql/makePaginator';

export function makeQuery(login: string, pageSize: number) {
	const query = operationStore<PullRequestUserQuery, PullRequestUserQueryVariables>(gql`
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
						number
						repository {
							name
							owner {
								login
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
			rateLimit {
				remaining
				resetAt
			}
		}
	`, {
		login,
		first: pageSize,
		last: null,
		after: null,
		before: null
	});

	const pullRequestPaginator = makePaginator(query, pageSize, function (next) {
		return next.user.pullRequests.pageInfo;
	});

	return {
		query,
		pullRequestPaginator
	}
}

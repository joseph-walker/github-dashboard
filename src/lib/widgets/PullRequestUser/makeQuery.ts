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
						url
						changedFiles
						additions
						deletions
						title
						repository {
							name
						}
						comments(first: 5) {
							totalCount
							nodes {
								author {
									login
								}
							}
						}
						latestReviews(first: 5) {
							totalCount
							nodes {
								author {
									login
								}
								updatedAt
								state
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

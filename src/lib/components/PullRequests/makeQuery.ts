import { gql, operationStore } from '@urql/svelte';

import type { PullRequestQuery, PullRequestQueryVariables } from '$lib/generated/graphql';

export function makeQuery(owner: string, repo: string, number: number) {
	const pullRequestQuery = operationStore<PullRequestQuery, PullRequestQueryVariables>(gql`
		query PullRequest(
			$owner: String!,
			$repo: String!,
			$number: Int!
		) {
			repository(owner: $owner, name: $repo) {
				pullRequest(number: $number) {
					url
					changedFiles
					additions
					deletions
					title
					updatedAt
					labels(first: 10) {
						totalCount
						nodes {
							color
							name
						}
					}
					repository {
						name
					}
					comments(first: 0) {
						totalCount
					}
					latestReviews(first: 10) {
						totalCount
						nodes {
							url
							state
							updatedAt
							author {
								login
							}
						}
					}
				}
			}
			rateLimit {
				remaining
				resetAt
			}
		}
	`, {
		owner,
		repo,
		number
	});

	return pullRequestQuery;
}

import { gql, operationStore } from '@urql/svelte';

import type { PullRequestQuery, PullRequestQueryVariables } from '$lib/generated/graphql';
import { makePaginator } from '$lib/gql/makePaginator';

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

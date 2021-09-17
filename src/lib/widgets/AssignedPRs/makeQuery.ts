import { gql, operationStore } from '@urql/svelte';

import type { PullRequest, Repository, RepositoryOwner, User } from '$lib/generated/graphql';
import type { RepoNameIso } from '$lib/gql/repoNameIso';

import { pullRequestFragment } from '$lib/gql/fragments';

/**
 * This query is dynamic, so its types can't be determined through build-time introspection
 * We need to construct the types manually
 */
export type PullRequestAssignmentsQuery = {
	[repoName: string]: {
		pullRequests: {
			nodes: {
				number: PullRequest["number"];
				repository: {
					name: Repository["name"];
					owner: {
						login: RepositoryOwner["login"];
					}
				}
				assignees: {
					nodes: {
						login: User["login"];
					}[]
				}
			}[]
		}
	}
}

export function makeQuery(repos: [string, string][], iso: RepoNameIso) {
	const repoFragments = repos.map(function ([org, repo]) {
		return `
			${iso.safeName(repo)}: repository(name: "${repo}", owner: "${org}") {
				pullRequests(first: 100, states: OPEN) {
					nodes {
						number
						repository {
						  name
						  owner {
							login
						  }
						}
						assignees(first: 10) {
							nodes {
								login
							}
						}
					}
				}
			}
		`;
	}).join("\n");

	return operationStore<PullRequestAssignmentsQuery, never>(`
		query PullRequestAssignments {
			${repoFragments}
			rateLimit {
				remaining
				resetAt
			}
		}
	`);
}

export function makeAssignedPullRequestQuery(owner: string, repo: string, prNumber: number) {
	return operationStore(gql`
		query AssignedPullRequest (
			$owner: String!,
			$repo: String!,
			$prNumber: Int!
		) {
			repository(owner: $owner, name: $repo) {
				pullRequest(number: $prNumber) {
					...pullRequest
				}
			}
			rateLimit {
				remaining
				resetAt
			}
		}
		${pullRequestFragment}
	`, {
		owner,
		repo,
		prNumber
	});
}

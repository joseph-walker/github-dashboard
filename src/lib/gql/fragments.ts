import { gql } from "@urql/svelte";

export const pullRequest = gql`
	fragment pullRequest on PullRequest {
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
`;

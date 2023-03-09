import type { Iso } from '$lib/gql/iso';

import { gql, operationStore } from '@urql/svelte';
import { subDays } from 'date-fns';

export type AuthoredKey = `${string}_authored`
export type ReviewedKey = `${string}_reviewed`

type ReviewBalanceResult = {
	[a: AuthoredKey]: {
		issueCount: number;
	};
	[r: ReviewedKey]: {
		issueCount: number;
	}
}

const makeQueryForUser = (userIso: Iso, org: string, date: Date) => (user: string) => {
	return `
		${userIso.safeName(user)}_authored: search(
			query: "org:${org} is:pr is:merged author:${user} merged:>${date.toISOString()}",
			type: ISSUE
		) {
			issueCount
		}
		${userIso.safeName(user)}_reviewed: search(
			query: "org:${org} is:pr is:merged reviewed-by:${user} merged:>${date.toISOString()}",
			type: ISSUE
		) {
			issueCount
		}
	`;
};

export function makeQuery(userIso: Iso, org: string, users: string[], sinceDays: number) {
	const now = new Date();
	const then = subDays(now, sinceDays);

	const query = operationStore<ReviewBalanceResult, never, ReviewBalanceResult>(gql`
		query UserReviewsAndPRs {
			${users.map(makeQueryForUser(userIso, org, then)).join('\n')}
		}
	`);

	return query;
}

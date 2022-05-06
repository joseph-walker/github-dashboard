import { query as baseQuery } from "@urql/svelte";

import { _remaining } from '$lib/stores/remaining';

export const DEFAULT_RATE_LIMIT_MAX = 5000;

export const queryWithUtilization: typeof baseQuery = (store) => {
	store.subscribe(function(next) {
		const scoreRemaining = next.data?.rateLimit?.remaining;

		if (scoreRemaining) {
			_remaining.set(scoreRemaining);
		}
	});

	return baseQuery(store);
}

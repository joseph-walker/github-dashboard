import { writable, derived } from 'svelte/store';
import { query as baseQuery } from "@urql/svelte";

export const DEFAULT_RATE_LIMIT_MAX = 5000;

const _remaining = writable<string | number>("?");

export const queryWithUtilization: typeof baseQuery = (store) => {
	store.subscribe(function(next) {
		const scoreRemaining = next.data?.rateLimit?.remaining;

		if (scoreRemaining) {
			_remaining.set(scoreRemaining);
		}
	});

	return baseQuery(store);
}

export const remaining = derived(_remaining, _ => _);

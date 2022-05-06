import { writable, derived } from 'svelte/store';

export const _remaining = writable<string | number>("?");
export const remaining = derived(_remaining, _ => _);

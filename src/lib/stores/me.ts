import { writable } from 'svelte/store';

export const me = writable<string | undefined>(undefined);

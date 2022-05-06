import { readable } from 'svelte/store';

export const remaining = readable<string | number>(3000);

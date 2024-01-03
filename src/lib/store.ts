import { writable, type Writable } from 'svelte/store';

export let worker: Writable<Worker> = writable<Worker>(undefined);

import { writable, type Writable } from 'svelte/store';

export let worker: Writable<Worker> = writable<Worker>(undefined);

export let isPlay: Writable<boolean> = writable<boolean>(false);
export let isLoading: Writable<boolean> = writable<boolean>(false);
export let isPip: Writable<boolean> = writable<boolean>(false);

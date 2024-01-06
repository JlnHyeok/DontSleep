import { writable, type Writable } from 'svelte/store';

export type TPlayingStatus = 'play' | 'pause' | 'stop';

// For Worker
export let worker: Writable<Worker> = writable<Worker>(undefined);

// For Study Timer
export let timerForStudy: Writable<NodeJS.Timeout> = writable<NodeJS.Timeout>(undefined);
export let studyTargetTime: Writable<number> = writable<number>(200 * 1000);
export let progressTime: Writable<number> = writable<number>(0);

// For Webcam Control
export let isWebcamReady: Writable<boolean> = writable<boolean>(false);
export let isPlay: Writable<TPlayingStatus> = writable<TPlayingStatus>('pause');
export let isLoading: Writable<boolean> = writable<boolean>(false);
export let isPip: Writable<boolean> = writable<boolean>(false);

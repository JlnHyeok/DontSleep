import { writable, type Writable } from 'svelte/store';

export type TPlayingStatus = 'play' | 'pause' | 'stop';

// For Worker
export let worker: Writable<Worker> = writable<Worker>(undefined);

// For Study Timer
export let timerForStudy: Writable<any> = writable<any>(undefined);
export let studyTargetTime: Writable<number> = writable<number>(3600);
export let progressTime: Writable<string> = writable<string>('');

// For Webcam Control
export let isWebcamReady: Writable<boolean> = writable<boolean>(false);
export let isPlay: Writable<TPlayingStatus> = writable<TPlayingStatus>('stop');
export let isLoading: Writable<boolean> = writable<boolean>(false);
export let isPip: Writable<boolean> = writable<boolean>(false);

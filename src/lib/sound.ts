import { browser } from '$app/environment';

let snd: HTMLAudioElement;
if (browser) {
	snd = new Audio('/alarm/alarm_ring_1.mp3');
}
export function beep(status: string) {
	if (status == 'sleep') {
		snd.play();
	} else {
		snd.pause();
		snd.currentTime = 0;
	}
}
